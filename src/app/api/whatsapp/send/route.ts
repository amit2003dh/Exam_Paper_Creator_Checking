import { NextResponse } from 'next/server';
import { SendWhatsAppMessageSchema } from '@/schemas';
import { WhatsAppService } from '@/services/whatsapp/whatsapp.service';
import { WhatsAppRepository } from '@/repositories/whatsapp.repository';
import { authService } from '@/services/auth/auth.service';

const waService = new WhatsAppService();
const waRepo = new WhatsAppRepository();

export async function POST(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const body = await req.json();
    const validated = SendWhatsAppMessageSchema.parse(body);

    const sendResult = await waService.sendMessage({
      recipientPhone: validated.recipient_phone,
      instituteId: user.instituteId,
      studentId: validated.student_id,
      messageType: validated.message_type,
      templateName: validated.template_name,
      bodyText: validated.message_text,
      mediaUrl: validated.media_url,
    });

    const logged = await waRepo.logMessage(user.instituteId, {
      recipient_phone: validated.recipient_phone,
      student_id: validated.student_id,
      message_type: validated.message_type,
      content_preview: validated.message_text.slice(0, 160),
      status: sendResult.status,
    });

    return NextResponse.json({
      success: sendResult.success,
      messageId: sendResult.metaMessageId,
      status: sendResult.status,
      data: logged,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
