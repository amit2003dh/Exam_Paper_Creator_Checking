import { NextResponse } from 'next/server';
import { BatchCreateSchema } from '@/schemas';
import { BatchRepository } from '@/repositories/batch.repository';
import { authService } from '@/services/auth/auth.service';

const batchRepo = new BatchRepository();

export async function GET(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const batches = await batchRepo.getByInstitute(user.instituteId);
    return NextResponse.json({ success: true, data: batches });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const body = await req.json();
    const validated = BatchCreateSchema.parse(body);

    const batch = await batchRepo.create(user.instituteId, {
      name: validated.name,
      class_grade: validated.class_grade,
      stream: validated.stream,
      timing: validated.timing || '09:00 AM - 12:00 PM',
      is_active: true,
    });

    return NextResponse.json({ success: true, message: 'Batch created successfully', data: batch });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
