import { NextResponse } from 'next/server';
import { FeeRepository } from '@/repositories/fee.repository';
import { authService } from '@/services/auth/auth.service';

const feeRepo = new FeeRepository();

export async function GET(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const payments = await feeRepo.getPayments(user.instituteId);
    return NextResponse.json({ success: true, data: payments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
