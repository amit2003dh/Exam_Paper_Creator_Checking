import { NextResponse } from 'next/server';
import { RazorpayService } from '@/services/payments/razorpay.service';
import { FeeRepository } from '@/repositories/fee.repository';
import { db, DEFAULT_TENANT_ID } from '@/lib/db';

const rzpService = new RazorpayService();
const feeRepo = new FeeRepository();

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    // 1. Verify Webhook Signature HMAC SHA-256
    const isValid = rzpService.verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn('[RazorpayWebhook] Invalid signature received.');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    // Handle payment.captured or payment_link.paid
    if (event === 'payment.captured' || event === 'payment_link.paid') {
      const paymentEntity = payload.payload?.payment?.entity || payload.payload?.payment_link?.entity;
      const paymentId = paymentEntity?.id || `pay_${Date.now()}`;
      const amount = (paymentEntity?.amount || 0) / 100; // convert paise to rupees
      const feeId = paymentEntity?.notes?.fee_id;
      const instituteId = paymentEntity?.notes?.institute_id || db.institutes.keys().next().value || DEFAULT_TENANT_ID;
      const studentId = paymentEntity?.notes?.student_id;

      if (feeId) {
        // Record payment and update fee record idempotently
        await feeRepo.recordPayment(instituteId, {
          student_fee_id: feeId,
          student_id: studentId || 'unknown',
          amount,
          payment_mode: 'razorpay',
          razorpay_payment_id: paymentId,
          receipt_number: `REC-RZP-${Date.now().toString().slice(-6)}`,
          status: 'completed',
          payment_date: new Date().toISOString(),
        });
        console.log(`[RazorpayWebhook] Reconciled payment ${paymentId} for fee ${feeId}: ₹${amount}`);
      }
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (error: any) {
    console.error('[RazorpayWebhook] Processing error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
