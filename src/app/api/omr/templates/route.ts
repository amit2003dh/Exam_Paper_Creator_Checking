import { NextResponse } from 'next/server';
import { OMRRepository } from '@/repositories/omr.repository';
import { authService } from '@/services/auth/auth.service';

const omrRepo = new OMRRepository();

export async function GET(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const templates = await omrRepo.getTemplates(user.instituteId);
    return NextResponse.json({ success: true, data: templates });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const body = await req.json();

    const template = await omrRepo.createTemplate(user.instituteId, {
      name: body.name || `${body.total_questions || 50}-Question Custom Template`,
      total_questions: body.total_questions || 50,
      options_per_question: body.options_per_question || 4,
      has_roll_number: true,
      has_test_id: true,
      layout_config: {
        columns: body.total_questions > 50 ? 4 : 2,
        rows_per_col: body.total_questions > 50 ? 25 : Math.ceil(body.total_questions / 2),
        bubble_radius: 12,
        spacing_x: 26,
        spacing_y: 22,
        markers: [[30, 30], [560, 30], [30, 800], [560, 800]],
      },
    });

    return NextResponse.json({ success: true, data: template });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
