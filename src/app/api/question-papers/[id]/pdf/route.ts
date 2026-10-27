import { NextResponse } from 'next/server';
import { QuestionPaperRepository } from '@/repositories/question-paper.repository';
import { InstituteRepository } from '@/repositories/institute.repository';
import { PDFService } from '@/services/pdf/pdf.service';
import { authService } from '@/services/auth/auth.service';

const paperRepo = new QuestionPaperRepository();
const instRepo = new InstituteRepository();
const pdfService = new PDFService();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const paper = await paperRepo.getById(user.instituteId, params.id);
    if (!paper) {
      return new Response('Paper not found', { status: 404 });
    }

    const institute = await instRepo.getById(user.instituteId);
    if (!institute) {
      return new Response('Institute not found', { status: 404 });
    }

    const url = new URL(req.url);
    const solutions = url.searchParams.get('solutions') === 'true';

    const html = solutions 
      ? pdfService.generateAnswerKeyHTML(paper, institute)
      : pdfService.generatePaperHTML(paper, institute);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error: any) {
    return new Response(`Error generating PDF view: ${error.message}`, { status: 500 });
  }
}
