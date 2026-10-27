import { NextResponse } from 'next/server';
import { WhatsAppRepository } from '@/repositories/whatsapp.repository';
import { authService } from '@/services/auth/auth.service';

const waRepo = new WhatsAppRepository();

export async function GET(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const messages = await waRepo.getMessages(user.instituteId);
    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
