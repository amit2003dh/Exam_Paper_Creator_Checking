import { db } from '@/lib/db';
import { StudentFee, Payment } from '@/types';
import { randomUUID } from 'crypto';

export class FeeRepository {
  async getStudentFees(instituteId: string, studentId?: string): Promise<StudentFee[]> {
    let list = Array.from(db.studentFees.values()).filter(f => f.institute_id === instituteId);
    if (studentId) {
      list = list.filter(f => f.student_id === studentId);
    }
    return list;
  }

  async getFeeById(instituteId: string, id: string): Promise<StudentFee | null> {
    const fee = db.studentFees.get(id);
    if (!fee || fee.institute_id !== instituteId) return null;
    return fee;
  }

  async createFee(instituteId: string, data: Omit<StudentFee, 'id' | 'institute_id' | 'balance_amount' | 'created_at'>): Promise<StudentFee> {
    const id = `sf-${randomUUID()}`;
    const fee: StudentFee = {
      ...data,
      id,
      institute_id: instituteId,
      paid_amount: data.paid_amount || 0,
      balance_amount: data.total_amount - (data.paid_amount || 0),
      created_at: new Date().toISOString(),
    };
    db.studentFees.set(id, fee);
    return fee;
  }

  async recordPayment(instituteId: string, data: Omit<Payment, 'id' | 'institute_id' | 'created_at'>): Promise<Payment> {
    const id = `pay-${randomUUID()}`;
    const payment: Payment = {
      ...data,
      id,
      institute_id: instituteId,
      payment_date: data.payment_date || new Date().toISOString(),
      status: data.status || 'completed',
    };
    db.payments.set(id, payment);

    // If attached to a fee, update paid amount & status
    if (data.student_fee_id) {
      const fee = db.studentFees.get(data.student_fee_id);
      if (fee && fee.institute_id === instituteId) {
        const newPaid = fee.paid_amount + data.amount;
        const newBalance = Math.max(0, fee.total_amount - newPaid);
        let status: 'paid' | 'partial' | 'pending' | 'overdue' = fee.status;
        if (newBalance === 0) status = 'paid';
        else if (newPaid > 0) status = 'partial';

        db.studentFees.set(fee.id, {
          ...fee,
          paid_amount: newPaid,
          balance_amount: newBalance,
          status,
        });
      }
    }

    return payment;
  }

  async getPayments(instituteId: string): Promise<Payment[]> {
    return Array.from(db.payments.values())
      .filter(p => p.institute_id === instituteId)
      .sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime());
  }
}
