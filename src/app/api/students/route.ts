import { NextResponse } from 'next/server';
import { StudentCreateSchema } from '@/schemas';
import { StudentRepository } from '@/repositories/student.repository';
import { authService } from '@/services/auth/auth.service';

const studentRepo = new StudentRepository();

export async function GET(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const url = new URL(req.url);
    const search = url.searchParams.get('q') || undefined;

    const students = await studentRepo.getByInstitute(user.instituteId, search);
    return NextResponse.json({ success: true, data: students });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const body = await req.json();
    const validated = StudentCreateSchema.parse(body);

    // Check duplicate roll number
    const existing = await studentRepo.getByRollNumber(user.instituteId, validated.roll_number);
    if (existing) {
      return NextResponse.json(
        { success: false, error: `Roll number '${validated.roll_number}' already exists in this institute.` },
        { status: 400 }
      );
    }

    const student = await studentRepo.create(user.instituteId, {
      roll_number: validated.roll_number,
      full_name: validated.full_name,
      class_grade: validated.class_grade,
      stream: validated.stream,
      phone: validated.phone,
      email: validated.email,
      parent_name: validated.parent_name,
      parent_phone: validated.parent_phone,
      parent_email: validated.parent_email,
      is_active: true,
    });

    return NextResponse.json({ success: true, message: 'Student registered successfully', data: student });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
