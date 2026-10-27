import { NextResponse } from 'next/server';
import { QuestionPaperRepository } from '@/repositories/question-paper.repository';
import { authService } from '@/services/auth/auth.service';

const paperRepo = new QuestionPaperRepository();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const paper = await paperRepo.getById(user.instituteId, params.id);
    if (!paper) {
      return NextResponse.json({ success: false, error: 'Paper not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: paper });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const body = await req.json();

    const updated = await paperRepo.update(user.instituteId, params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Paper not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Paper updated successfully', data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const success = await paperRepo.delete(user.instituteId, params.id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
