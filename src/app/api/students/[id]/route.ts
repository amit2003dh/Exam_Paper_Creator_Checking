import { NextResponse } from 'next/server';
import { StudentRepository } from '@/repositories/student.repository';
import { authService } from '@/services/auth/auth.service';

const studentRepo = new StudentRepository();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const student = await studentRepo.getById(user.instituteId, params.id);
    if (!student) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: student });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const body = await req.json();

    const updated = await studentRepo.update(user.instituteId, params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Student updated successfully', data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const success = await studentRepo.delete(user.instituteId, params.id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
