import { NextResponse } from 'next/server';
import { MarkAttendanceSchema } from '@/schemas';
import { db } from '@/lib/db';
import { WhatsAppService } from '@/services/whatsapp/whatsapp.service';
import { WhatsAppRepository } from '@/repositories/whatsapp.repository';
import { InstituteRepository } from '@/repositories/institute.repository';
import { StudentRepository } from '@/repositories/student.repository';
import { BatchRepository } from '@/repositories/batch.repository';
import { authService } from '@/services/auth/auth.service';
import { randomUUID } from 'crypto';

const waService = new WhatsAppService();
const waRepo = new WhatsAppRepository();
const instRepo = new InstituteRepository();
const studentRepo = new StudentRepository();
const batchRepo = new BatchRepository();

export async function GET(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const url = new URL(req.url);
    const batchId = url.searchParams.get('batch_id');
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

    let records = Array.from(db.attendance.values()).filter(a => a.institute_id === user.instituteId);
    if (batchId) records = records.filter(a => a.batch_id === batchId);
    if (date) records = records.filter(a => a.attendance_date === date);

    return NextResponse.json({ success: true, data: records });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const body = await req.json();
    const validated = MarkAttendanceSchema.parse(body);

    const institute = await instRepo.getById(user.instituteId);
    const batch = await batchRepo.getById(user.instituteId, validated.batch_id);

    const savedRecords = [];
    let waAlertsSent = 0;

    for (const rec of validated.records) {
      const student = await studentRepo.getById(user.instituteId, rec.student_id);
      const id = `att-${randomUUID()}`;

      const attRecord = {
        id,
        institute_id: user.instituteId,
        batch_id: validated.batch_id,
        student_id: rec.student_id,
        student_name: student?.full_name || 'Student',
        roll_number: student?.roll_number || 'N/A',
        attendance_date: validated.attendance_date,
        status: rec.status,
        remarks: rec.remarks,
        whatsapp_alert_sent: false,
      };

      // If absent and WhatsApp alerts requested, dispatch WhatsApp alert
      if (validated.send_whatsapp_alerts && student?.parent_phone && rec.status === 'absent') {
        const msgText = waService.formatAttendanceNotification({
          instituteName: institute?.name || 'Apex Academy',
          studentName: student.full_name,
          batchName: batch?.name || 'Class',
          date: validated.attendance_date,
          status: 'absent',
        });

        const sendResult = await waService.sendMessage({
          recipientPhone: student.parent_phone,
          instituteId: user.instituteId,
          studentId: student.id,
          messageType: 'attendance_alert',
          bodyText: msgText,
        });

        await waRepo.logMessage(user.instituteId, {
          recipient_phone: student.parent_phone,
          student_id: student.id,
          message_type: 'attendance_alert',
          content_preview: msgText.slice(0, 150),
          status: sendResult.status,
        });

        attRecord.whatsapp_alert_sent = true;
        waAlertsSent++;
      }

      db.attendance.set(id, attRecord);
      savedRecords.push(attRecord);
    }

    return NextResponse.json({
      success: true,
      message: `Attendance recorded for ${savedRecords.length} students. ${waAlertsSent} WhatsApp alerts dispatched.`,
      data: savedRecords,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
