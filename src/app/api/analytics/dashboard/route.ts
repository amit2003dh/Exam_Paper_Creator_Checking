import { NextResponse } from 'next/server';
import { AnalyticsRepository } from '@/repositories/analytics.repository';
import { authService } from '@/services/auth/auth.service';

const analyticsRepo = new AnalyticsRepository();

export async function GET(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const metrics = await analyticsRepo.getDashboardMetrics(user.instituteId);
    return NextResponse.json({ success: true, data: metrics });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
