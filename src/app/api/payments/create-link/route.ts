import { NextResponse } from 'next/server';
import { RazorpayService } from '@/services/payments/razorpay.service';
import { FeeRepository } from '@/repositories/fee.repository';
import { StudentRepository } from '@/repositories/student.repository';
import { authService } from '@/services/auth/auth.service';

const rzpService = new RazorpayService();
const feeRepo = new FeeRepository();
const studentRepo = new StudentRepository();

export async function POST(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const body = await req.json();
    const { fee_id } = body;

    const fee = await feeRepo.getFeeById(user.instituteId, fee_id);
    if (!fee) {
      return NextResponse.json({ success: false, error: 'Fee record not found' }, { status: 404 });
    }

    const student = await studentRepo.getById(user.instituteId, fee.student_id);

    const link = await rzpService.createPaymentLink({
      amountInRupees: fee.balance_amount,
      description: `${fee.title} - ${fee.student_name}`,
      customerName: student?.parent_name || fee.student_name || 'Parent',
      customerPhone: student?.parent_phone || '+919800000000',
      receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
      notes: {
        institute_id: user.instituteId,
        fee_id: fee.id,
        student_id: fee.student_id,
      },
    });

    return NextResponse.json({ success: true, data: link });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
