import { OMRRepository } from '@/repositories/omr.repository';
import { InstituteRepository } from '@/repositories/institute.repository';
import { OMRService } from '@/services/omr/omr.service';
import { authService } from '@/services/auth/auth.service';

const omrRepo = new OMRRepository();
const instRepo = new InstituteRepository();
const omrService = new OMRService();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authService.getAuthenticatedUser(req);
    const template = await omrRepo.getTemplateById(user.instituteId, params.id);
    if (!template) {
      return new Response('Template not found', { status: 404 });
    }

    const institute = await instRepo.getById(user.instituteId);
    const html = omrService.generatePrintableOMRHTML(
      template, 
      institute?.name || 'Apex Academy',
      'National Standard Assessment'
    );

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (error: any) {
    return new Response(`Error rendering printable OMR: ${error.message}`, { status: 500 });
  }
}
