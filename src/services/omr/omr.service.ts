// TestSetu AI – Smartphone & Upload OMR Evaluation Engine (Tier 2 Service)
// Precision bubble detection, perspective grid mapping, confidence scoring, and grading

import { OMRTemplate, OMRResult, QuestionPaper } from '@/types';
import { randomUUID } from 'crypto';

export interface BubbleAnalysisResult {
  detectedAnswers: Record<string, string>; // e.g. {"1": "B", "2": "C"}
  confidences: Record<string, number>;
  rollNumberDetected: string;
  lowConfidenceQuestions: number[];
  multipleMarkedQuestions: number[];
  blankQuestions: number[];
  overallConfidence: number;
}

export class OMRService {
  /**
   * Generates Standard Printable OMR Sheet HTML (20, 50, or 100 questions)
   */
  generatePrintableOMRHTML(template: OMRTemplate, instituteName: string, examTitle = 'Standard Assessment'): string {
    const totalQ = template.total_questions;
    const cols = template.layout_config.columns || 2;
    const qPerCol = Math.ceil(totalQ / cols);
    const options = ['A', 'B', 'C', 'D'];

    let columnsHTML = '';
    for (let c = 0; c < cols; c++) {
      let rowsHTML = '';
      const startQ = c * qPerCol + 1;
      const endQ = Math.min((c + 1) * qPerCol, totalQ);

      for (let q = startQ; q <= endQ; q++) {
        const bubblesHTML = options.map(opt => `
          <div class="bubble-circle">${opt}</div>
        `).join('');

        rowsHTML += `
          <div class="omr-row" data-q="${q}">
            <span class="q-label">${String(q).padStart(2, '0')}</span>
            <div class="bubbles-wrap">${bubblesHTML}</div>
          </div>
        `;
      }

      columnsHTML += `
        <div class="omr-column">
          <div class="col-head">
            <span>Q.No</span>
            <span>Response</span>
          </div>
          ${rowsHTML}
        </div>
      `;
    }

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>OMR Sheet – ${template.name}</title>
  <style>
    @page { size: A4 portrait; margin: 10mm; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    * { box-sizing: border-box; }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 10px;
      background: #ffffff;
      color: #0b132b;
    }
    .fiducial-marker {
      width: 22px;
      height: 22px;
      background: #000000;
      position: absolute;
    }
    .top-left { top: 12px; left: 12px; }
    .top-right { top: 12px; right: 12px; }
    .bottom-left { bottom: 12px; left: 12px; }
    .bottom-right { bottom: 12px; right: 12px; }

    .sheet-container {
      border: 2px solid #000000;
      padding: 15px;
      min-height: 980px;
      position: relative;
    }
    .sheet-header {
      text-align: center;
      border-bottom: 2px solid #000000;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    .inst-title {
      font-size: 18px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .exam-sub {
      font-size: 13px;
      font-weight: 700;
      margin-top: 3px;
    }
    .student-info-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 12px;
      border: 1px solid #000;
      padding: 8px;
      margin-bottom: 14px;
      font-size: 12px;
    }
    .field-row {
      display: flex;
      margin-bottom: 6px;
    }
    .field-label {
      width: 130px;
      font-weight: bold;
    }
    .field-line {
      flex: 1;
      border-bottom: 1px solid #000;
      min-height: 16px;
    }
    .roll-bubbles-box {
      border-left: 1px dashed #000;
      padding-left: 10px;
    }
    .instructions-strip {
      font-size: 10px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 4px 8px;
      margin-bottom: 12px;
      text-align: center;
    }
    .omr-grid {
      display: grid;
      grid-template-columns: repeat(${cols}, 1fr);
      gap: 16px;
    }
    .omr-column {
      border: 1px solid #000;
      padding: 6px;
    }
    .col-head {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #000;
      padding-bottom: 4px;
      font-size: 11px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .omr-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      height: 22px;
    }
    .q-label {
      font-size: 11px;
      font-weight: bold;
      width: 25px;
    }
    .bubbles-wrap {
      display: flex;
      gap: 8px;
    }
    .bubble-circle {
      width: 17px;
      height: 17px;
      border: 1.5px solid #000000;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      font-weight: bold;
      color: #334155;
    }
  </style>
</head>
<body>
  <div class="sheet-container">
    <div class="fiducial-marker top-left"></div>
    <div class="fiducial-marker top-right"></div>
    <div class="fiducial-marker bottom-left"></div>
    <div class="fiducial-marker bottom-right"></div>

    <div class="sheet-header">
      <div class="inst-title">${instituteName}</div>
      <div class="exam-sub">${examTitle} – Official OMR Answer Sheet (${totalQ} Questions)</div>
    </div>

    <div class="student-info-grid">
      <div>
        <div class="field-row">
          <span class="field-label">Student Name:</span>
          <span class="field-line"></span>
        </div>
        <div class="field-row">
          <span class="field-label">Roll Number:</span>
          <span class="field-line"></span>
        </div>
        <div class="field-row">
          <span class="field-label">Batch / Section:</span>
          <span class="field-line"></span>
        </div>
        <div class="field-row">
          <span class="field-label">Candidate Signature:</span>
          <span class="field-line"></span>
        </div>
      </div>
      <div class="roll-bubbles-box">
        <strong>Test ID:</strong> ${template.id.slice(0, 10)}
        <div style="margin-top: 6px; font-size: 10px;">Use Blue/Black Ball Point Pen only. Completely darken the circle.</div>
      </div>
    </div>

    <div class="instructions-strip">
      CORRECT METHOD: [●] Darken completely | WRONG METHODS: [✔] Tick, [✖] Cross, [◐] Half-fill
    </div>

    <div class="omr-grid">
      ${columnsHTML}
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Evaluates detected or scanned bubble matrix against official answer key
   */
  evaluateResponses(
    paper: QuestionPaper, 
    detectedAnswers: Record<string, string>,
    confidences: Record<string, number> = {}
  ): {
    totalMarks: number;
    maxMarks: number;
    percentage: number;
    correctCount: number;
    incorrectCount: number;
    unattemptedCount: number;
    multipleMarkedCount: number;
    isHighConfidence: boolean;
  } {
    let totalMarks = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let multipleMarkedCount = 0;

    const questions = paper.questions || [];
    let minConfidence = 1.0;

    questions.forEach((q, idx) => {
      const qNum = String(idx + 1);
      const studentAns = (detectedAnswers[qNum] || '').trim().toUpperCase();
      const conf = confidences[qNum] !== undefined ? confidences[qNum] : 0.95;
      if (conf < minConfidence) minConfidence = conf;

      // Find official correct option
      const correctOpt = (q.options || []).find(o => o.is_correct)?.option_letter;

      if (!studentAns || studentAns === 'BLANK' || studentAns === '') {
        unattemptedCount++;
      } else if (studentAns.includes(',') || studentAns === 'MULTIPLE') {
        multipleMarkedCount++;
        // Multiple marked treated as penalty
        totalMarks -= (q.negative_marks || 1);
      } else if (studentAns === correctOpt) {
        correctCount++;
        totalMarks += (q.marks || 4);
      } else {
        incorrectCount++;
        totalMarks -= (q.negative_marks || 1);
      }
    });

    const maxMarks = paper.total_marks || (questions.length * 4);
    const percentage = maxMarks > 0 ? Math.max(0, Math.round(((totalMarks / maxMarks) * 100) * 100) / 100) : 0;

    return {
      totalMarks,
      maxMarks,
      percentage,
      correctCount,
      incorrectCount,
      unattemptedCount,
      multipleMarkedCount,
      isHighConfidence: minConfidence >= 0.75,
    };
  }
}
