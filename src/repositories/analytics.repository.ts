import { db } from '@/lib/db';
import { DashboardMetrics } from '@/types';

export class AnalyticsRepository {
  async getDashboardMetrics(instituteId: string): Promise<DashboardMetrics> {
    const students = Array.from(db.students.values()).filter(s => s.institute_id === instituteId && s.is_active);
    const batches = Array.from(db.batches.values()).filter(b => b.institute_id === instituteId && b.is_active);
    const papers = Array.from(db.questionPapers.values()).filter(p => p.institute_id === instituteId);
    const results = Array.from(db.omrResults.values()).filter(r => r.institute_id === instituteId);
    const attendance = Array.from(db.attendance.values()).filter(a => a.institute_id === instituteId);
    const fees = Array.from(db.studentFees.values()).filter(f => f.institute_id === instituteId);
    const payments = Array.from(db.payments.values()).filter(p => p.institute_id === instituteId);
    const waMessages = Array.from(db.whatsappMessages.values()).filter(m => m.institute_id === instituteId);

    // Compute average percentage across all tests
    const avgMarks = results.length > 0 
      ? Math.round(results.reduce((acc, r) => acc + (r.percentage || 0), 0) / results.length) 
      : 0;

    // Compute attendance percentage
    const presentCount = attendance.filter(a => a.status === 'present').length;
    const attPercentage = attendance.length > 0 
      ? Math.round((presentCount / attendance.length) * 100) 
      : 0;

    // Financials
    const pendingFees = fees.reduce((acc, f) => acc + (f.balance_amount || 0), 0);
    const totalFeeCollected = payments.reduce((acc, p) => acc + (p.amount || 0), 0);

    // WhatsApp delivery rate
    const deliveredCount = waMessages.filter(m => m.status === 'delivered' || m.status === 'read').length;
    const waRate = waMessages.length > 0 
      ? Math.round((deliveredCount / waMessages.length) * 100) 
      : 100;

    return {
      totalStudents: students.length,
      activeBatches: batches.length,
      testsConducted: papers.length,
      averageMarks: avgMarks,
      attendancePercentage: attPercentage,
      pendingFees,
      totalFeeCollected,
      whatsappDeliveryRate: waRate,
      aiPapersGeneratedThisMonth: papers.filter(p => p.source_type === 'ai_generation').length,
    };
  }
}
