import { NextResponse } from 'next/server';
import { EvaluateOMRSchema } from '@/schemas';
import { OMRRepository } from '@/repositories/omr.repository';
import { QuestionPaperRepository } from '@/repositories/question-paper.repository';
import { StudentRepository } from '@/repositories/student.repository';
import { OMRService } from '@/services/omr/omr.service';
import { authService } from '@/services/auth/auth.service';

const omrRepo = new OMRRepository();
const paperRepo = new QuestionPaperRepository();
const studentRepo = new StudentRepository();
const omrService = new OMRService();

export async function POST(req: Request) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const body = await req.json();
    const validated = EvaluateOMRSchema.parse(body);

    const paper = await paperRepo.getById(user.instituteId, validated.paper_id);
    if (!paper) {
      return NextResponse.json({ success: false, error: 'Question Paper not found' }, { status: 404 });
    }

    // Match student by ID or roll number
    let student = null;
    if (validated.student_id) {
      student = await studentRepo.getById(user.instituteId, validated.student_id);
    } else if (validated.roll_number) {
      student = await studentRepo.getByRollNumber(user.instituteId, validated.roll_number);
    }

    // Evaluate answers
    const evaluation = omrService.evaluateResponses(
      paper,
      validated.detected_answers,
      validated.bubble_confidences || {}
    );

    // If confidence is low and not yet manually verified, flag for teacher verification
    const requiresVerification = !evaluation.isHighConfidence && !validated.is_manually_verified;

    const savedResult = await omrRepo.saveResult(user.instituteId, {
      sheet_id: `sheet-${Date.now()}`,
      student_id: student?.id,
      student_name: student?.full_name || (validated.roll_number ? `Student ${validated.roll_number}` : 'Unassigned Candidate'),
      roll_number: student?.roll_number || validated.roll_number || 'N/A',
      paper_id: paper.id,
      paper_title: paper.title,
      detected_answers: validated.detected_answers,
      bubble_confidences: validated.bubble_confidences || {},
      correct_count: evaluation.correctCount,
      incorrect_count: evaluation.incorrectCount,
      unattempted_count: evaluation.unattemptedCount,
      multiple_marked_count: evaluation.multipleMarkedCount,
      total_marks: evaluation.totalMarks,
      max_marks: evaluation.maxMarks,
      percentage: evaluation.percentage,
      is_manually_verified: validated.is_manually_verified,
      verified_by: validated.is_manually_verified ? user.fullName : undefined,
    });

    return NextResponse.json({
      success: true,
      message: requiresVerification ? 'OMR processed. Low confidence flagged for teacher verification.' : 'OMR evaluated and graded successfully.',
      requiresVerification,
      data: savedResult,
    });
  } catch (error: any) {
    console.error('OMR Evaluation error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
