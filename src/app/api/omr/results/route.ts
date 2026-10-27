import { NextResponse } from 'next/server';
import { OMRRepository } from '@/repositories/omr.repository';
import { authService } from '@/services/auth/auth.service';

const omrRepo = new OMRRepository();

export async function GET(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const url = new URL(req.url);
    const paperId = url.searchParams.get('paper_id') || undefined;

    const results = await omrRepo.getResults(user.instituteId, paperId);
    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
