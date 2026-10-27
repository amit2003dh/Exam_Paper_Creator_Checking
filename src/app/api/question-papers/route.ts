import { NextResponse } from 'next/server';
import { GeneratePaperRequestSchema } from '@/schemas';
import { GeminiAIService } from '@/services/ai/gemini.service';
import { QuestionPaperRepository } from '@/repositories/question-paper.repository';
import { authService } from '@/services/auth/auth.service';

const aiService = new GeminiAIService();
const paperRepo = new QuestionPaperRepository();

export async function GET(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const papers = await paperRepo.getByInstitute(user.instituteId);
    return NextResponse.json({ success: true, data: papers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const body = await req.json();
    const validated = GeneratePaperRequestSchema.parse(body);

    // Call AI Extraction Service (Google Gemini or deterministic local engine)
    const questions = await aiService.extractQuestions(user.instituteId, {
      text: validated.raw_text,
      class_grade: validated.class_grade,
      subject: validated.subject,
      targetCount: validated.total_questions,
      difficulty: validated.difficulty,
      language: validated.language,
    });

    // Calculate marks
    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 4), 0);

    // Save Paper
    const paper = await paperRepo.create(user.instituteId, {
      title: validated.title,
      class_grade: validated.class_grade,
      subject: validated.subject,
      total_questions: questions.length,
      total_marks: totalMarks,
      duration_minutes: validated.duration_minutes,
      difficulty: validated.difficulty,
      language: validated.language,
      layout: validated.layout,
      instructions: validated.instructions || 'All questions are compulsory. Use blue or black ball pen.',
      status: 'ready',
      source_type: validated.source_type,
      questions: questions.map((q, idx) => ({ ...q, question_order: idx + 1 })),
    });

    return NextResponse.json({
      success: true,
      message: 'Question paper generated successfully',
      data: paper,
    });
  } catch (error: any) {
    console.error('Error generating paper:', error);
    return NextResponse.json({ success: false, error: error.message || 'Generation failed' }, { status: 400 });
  }
}
