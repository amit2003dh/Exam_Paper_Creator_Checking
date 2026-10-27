import { NextResponse } from 'next/server';
import { WhatsAppService } from '@/services/whatsapp/whatsapp.service';
import { WhatsAppRepository } from '@/repositories/whatsapp.repository';
import { GeminiAIService } from '@/services/ai/gemini.service';
import { QuestionPaperRepository } from '@/repositories/question-paper.repository';
import { db, DEFAULT_TENANT_ID } from '@/lib/db';

const waService = new WhatsAppService();
const waRepo = new WhatsAppRepository();
const aiService = new GeminiAIService();
const paperRepo = new QuestionPaperRepository();

// 1. Meta Webhook Verification (GET)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  const verified = waService.verifyWebhookChallenge(mode, token, challenge);
  if (verified) {
    return new Response(verified, { status: 200 });
  }

  return new Response('Forbidden', { status: 403 });
}

// 2. Inbound Messages & Delivery Status Webhook (POST)
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-hub-signature-256');

    // Cryptographic validation
    if (!waService.verifySignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid HMAC signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // Parse Meta webhook entry
    const entry = payload.entry?.[0];
    const change = entry?.changes?.[0]?.value;

    // A. Handle Status Updates (sent, delivered, read)
    if (change?.statuses && change.statuses.length > 0) {
      for (const st of change.statuses) {
        const metaId = st.id;
        const status = st.status; // 'sent' | 'delivered' | 'read' | 'failed'
        console.log(`[WhatsAppWebhook] Status update for ${metaId}: ${status}`);
        // Update in repo if matching
        for (const msg of Array.from(db.whatsappMessages.values())) {
          if (msg.id.includes(metaId) || (msg as any).meta_message_id === metaId) {
            await waRepo.updateStatus(msg.id, status, metaId);
          }
        }
      }
    }

    // B. Handle Inbound Message / Teacher Bot
    if (change?.messages && change.messages.length > 0) {
      const message = change.messages[0];
      const senderPhone = message.from;
      const messageType = message.type;

      let inboundText = '';
      if (messageType === 'text') {
        inboundText = message.text?.body || '';
      } else if (messageType === 'image') {
        inboundText = message.image?.caption || 'Generate test paper from uploaded handwritten notes';
      }

      console.log(`[WhatsAppWebhook] Inbound message from +${senderPhone}: "${inboundText}"`);

      // Match institute from registered phone or fallback to primary institute
      const instituteId = db.institutes.keys().next().value || DEFAULT_TENANT_ID;
      const parsedPrompt = waService.parseTeacherBotPrompt(inboundText);

      // Trigger AI Question Generation via Teacher Bot
      const questions = await aiService.extractQuestions(instituteId, {
        text: inboundText,
        subject: parsedPrompt.subject,
        class_grade: parsedPrompt.classGrade,
        targetCount: parsedPrompt.totalQuestions,
        difficulty: parsedPrompt.difficulty,
      });

      const paper = await paperRepo.create(instituteId, {
        title: `${parsedPrompt.subject} WhatsApp AI Test (${parsedPrompt.classGrade})`,
        class_grade: parsedPrompt.classGrade,
        subject: parsedPrompt.subject,
        total_questions: questions.length,
        total_marks: questions.length * 4,
        duration_minutes: 60,
        difficulty: parsedPrompt.difficulty,
        language: 'bilingual',
        layout: 'dual_column',
        instructions: 'Test generated via TestSetu AI WhatsApp Teacher Bot.',
        status: 'ready',
        source_type: 'whatsapp',
        questions: questions.map((q, idx) => ({ ...q, question_order: idx + 1 })),
      });

      // Send WhatsApp Response back to the Teacher
      const pdfLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/question-papers/${paper.id}/pdf`;
      const replyBody = `✅ *TestSetu AI Teacher Bot*

Your question paper has been generated successfully!

📄 *Title:* ${paper.title}
🔢 *Questions:* ${paper.total_questions} Questions (${paper.total_marks} Marks)
⏱️ *Duration:* ${paper.duration_minutes} Mins
📊 *Difficulty:* ${paper.difficulty.toUpperCase()}

📥 *Download Print-Ready PDF & Answer Key:*
${pdfLink}

_Powered by TestSetu AI Operating System_`;

      await waService.sendMessage({
        recipientPhone: senderPhone,
        instituteId,
        messageType: 'teacher_bot',
        bodyText: replyBody,
      });

      await waRepo.logMessage(instituteId, {
        recipient_phone: senderPhone,
        message_type: 'teacher_bot',
        content_preview: replyBody.slice(0, 160),
        status: 'delivered',
      });
    }

    return NextResponse.json({ status: 'EVENT_RECEIVED' });
  } catch (error: any) {
    console.error('[WhatsAppWebhook] Error handling event:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
