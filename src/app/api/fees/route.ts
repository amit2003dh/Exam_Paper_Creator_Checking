import { NextResponse } from 'next/server';
import { FeeRecordCreateSchema } from '@/schemas';
import { FeeRepository } from '@/repositories/fee.repository';
import { StudentRepository } from '@/repositories/student.repository';
import { RazorpayService } from '@/services/payments/razorpay.service';
import { authService } from '@/services/auth/auth.service';

const feeRepo = new FeeRepository();
const studentRepo = new StudentRepository();
const rzpService = new RazorpayService();

export async function GET(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const url = new URL(req.url);
    const studentId = url.searchParams.get('student_id') || undefined;

    const fees = await feeRepo.getStudentFees(user.instituteId, studentId);
    return NextResponse.json({ success: true, data: fees });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const body = await req.json();
    const validated = FeeRecordCreateSchema.parse(body);

    const student = await studentRepo.getById(user.instituteId, validated.student_id);
    if (!student) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
    }

    // Generate Razorpay Payment Link
    const rzpLink = await rzpService.createPaymentLink({
      amountInRupees: validated.total_amount,
      description: `${validated.title} for ${student.full_name} (${student.roll_number})`,
      customerName: student.parent_name || student.full_name,
      customerPhone: student.parent_phone,
      receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
    });

    const fee = await feeRepo.createFee(user.instituteId, {
      student_id: student.id,
      student_name: student.full_name,
      roll_number: student.roll_number,
      title: validated.title,
      due_date: validated.due_date,
      total_amount: validated.total_amount,
      paid_amount: 0,
      status: 'pending',
      razorpay_payment_link_id: rzpLink.id,
      razorpay_payment_url: rzpLink.shortUrl,
    });

    return NextResponse.json({
      success: true,
      message: 'Fee record and Razorpay payment link generated successfully',
      data: fee,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
