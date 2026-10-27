// TestSetu AI – PDF Generation Service (Tier 2 Service)
// Supports A4 single/dual-column layouts, KaTeX rendering, Hindi & English, separate answer keys

import { QuestionPaper, Institute } from '@/types';

export class PDFService {
  /**
   * Generates a complete, print-optimized HTML string ready for client-side print/save
   * or headless Puppeteer / jsPDF printing.
   */
  generatePaperHTML(paper: QuestionPaper, institute: Institute, includeSolutions = false): string {
    const isDual = paper.layout === 'dual_column';

    const questionsHTML = (paper.questions || []).map((q, idx) => {
      const optionsHTML = (q.options || []).map(opt => `
        <div class="option-row ${includeSolutions && opt.is_correct ? 'correct-opt' : ''}">
          <span class="opt-bullet">(${opt.option_letter})</span>
          <span class="opt-content">${opt.option_text}</span>
          ${opt.option_latex ? `<div class="latex-snippet">${opt.option_latex}</div>` : ''}
        </div>
      `).join('');

      return `
        <div class="question-block" id="q-${idx + 1}">
          <div class="question-header">
            <span class="q-num">Q.${idx + 1}</span>
            <span class="q-marks">[${q.marks} Marks, -${q.negative_marks}]</span>
          </div>
          <div class="q-statement">${q.content_text}</div>
          ${q.content_latex ? `<div class="q-latex">$$ ${q.content_latex} $$</div>` : ''}
          ${q.diagram_url ? `<div class="q-diagram"><img src="${q.diagram_url}" alt="Diagram Q.${idx + 1}" /></div>` : ''}
          <div class="options-container ${isDual ? 'options-dual' : 'options-grid'}">
            ${optionsHTML}
          </div>
          ${includeSolutions && q.explanation ? `
            <div class="solution-box">
              <strong>Solution:</strong> ${q.explanation}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    return `
<!DOCTYPE html>
<html lang="${paper.language === 'hi' ? 'hi' : 'en'}">
<head>
  <meta charset="utf-8">
  <title>${institute.name} – ${paper.title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <style>
    @page {
      size: A4;
      margin: 15mm 12mm 15mm 12mm;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
      .page-break { page-break-before: always; }
    }
    * { box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 10px;
      line-height: 1.45;
      font-size: 13px;
    }
    .paper-header {
      text-align: center;
      border-bottom: 2px solid #0b132b;
      padding-bottom: 12px;
      margin-bottom: 14px;
    }
    .inst-name {
      font-size: 20px;
      font-weight: 800;
      color: #0b132b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .inst-tagline {
      font-size: 11px;
      color: #475569;
      margin-top: 2px;
    }
    .exam-title-badge {
      display: inline-block;
      margin-top: 8px;
      padding: 4px 14px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      font-weight: 700;
      font-size: 14px;
      color: #1e293b;
    }
    .meta-bar {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 600;
      margin-top: 10px;
      border-top: 1px dashed #cbd5e1;
      padding-top: 6px;
      color: #334155;
    }
    .instructions-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #0d9488;
      padding: 6px 10px;
      font-size: 11px;
      margin-bottom: 12px;
      border-radius: 3px;
    }
    .paper-body {
      ${isDual ? 'column-count: 2; column-gap: 20px; column-rule: 1px solid #e2e8f0;' : ''}
    }
    .question-block {
      break-inside: avoid;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px dotted #e2e8f0;
    }
    .question-header {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      color: #0b132b;
      margin-bottom: 4px;
    }
    .q-num {
      color: #0b132b;
    }
    .q-marks {
      font-size: 11px;
      color: #64748b;
    }
    .q-statement {
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 6px;
    }
    .q-latex {
      background: #f8fafc;
      padding: 4px;
      margin: 4px 0;
      border-radius: 4px;
      font-family: serif;
      font-size: 13px;
      color: #1e1b4b;
    }
    .options-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px 12px;
      margin-top: 6px;
    }
    .options-dual {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 6px;
    }
    .option-row {
      display: flex;
      align-items: baseline;
      gap: 6px;
      font-size: 12px;
    }
    .opt-bullet {
      font-weight: 700;
      color: #334155;
    }
    .correct-opt {
      font-weight: 700;
      color: #0f766e;
    }
    .solution-box {
      margin-top: 6px;
      background: #f0fdf4;
      border-left: 3px solid #16a34a;
      padding: 6px 8px;
      font-size: 11px;
      color: #14532d;
    }
    .paper-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      padding-top: 4px;
    }
  </style>
</head>
<body>
  <div class="paper-header">
    <div class="inst-name">${institute.name}</div>
    <div class="inst-tagline">${institute.tagline || 'Excellence in Coaching & Assessment'} • ${institute.city || 'India'}</div>
    <div class="exam-title-badge">${paper.title}</div>
    <div class="meta-bar">
      <span>Class: ${paper.class_grade}</span>
      <span>Subject: ${paper.subject}</span>
      <span>Duration: ${paper.duration_minutes} Mins</span>
      <span>Max Marks: ${paper.total_marks}</span>
    </div>
  </div>

  ${paper.instructions ? `
    <div class="instructions-box">
      <strong>General Instructions:</strong> ${paper.instructions}
    </div>
  ` : ''}

  <div class="paper-body">
    ${questionsHTML}
  </div>

  <div class="paper-footer">
    <span>${institute.name} • Generated by TestSetu AI</span>
    <span>Page 1 of 1</span>
  </div>
</body>
</html>
    `;
  }

  /**
   * Generates a separate Answer Key & Solutions PDF HTML
   */
  generateAnswerKeyHTML(paper: QuestionPaper, institute: Institute): string {
    return this.generatePaperHTML(paper, institute, true);
  }
}
