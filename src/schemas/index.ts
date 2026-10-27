import { z } from 'zod';

export const AuthLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const AuthSignupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  instituteName: z.string().min(3, 'Institute name must be at least 3 characters'),
  phone: z.string().regex(/^\+?[0-9]{10,13}$/, 'Enter a valid Indian phone number (10-12 digits)'),
  city: z.string().min(2, 'City is required'),
});

export const QuestionOptionSchema = z.object({
  option_letter: z.enum(['A', 'B', 'C', 'D', 'E']),
  option_text: z.string().min(1, 'Option text is required'),
  option_latex: z.string().optional(),
  is_correct: z.boolean().default(false),
});

export const QuestionCreateSchema = z.object({
  type: z.enum(['mcq_single', 'mcq_multiple', 'numerical', 'true_false', 'descriptive']),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  language: z.string().default('en'),
  content_text: z.string().min(5, 'Question text must have at least 5 characters'),
  content_latex: z.string().optional(),
  marks: z.number().positive().default(4),
  negative_marks: z.number().min(0).default(1),
  explanation: z.string().optional(),
  options: z.array(QuestionOptionSchema).optional(),
});

export const GeneratePaperRequestSchema = z.object({
  title: z.string().min(3, 'Test title must be at least 3 characters'),
  class_grade: z.string().min(1, 'Class/Grade is required'),
  subject: z.string().min(1, 'Subject is required'),
  total_questions: z.number().int().min(1).max(100).default(20),
  total_marks: z.number().positive().default(80),
  duration_minutes: z.number().int().min(5).max(360).default(60),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  language: z.enum(['en', 'hi', 'bilingual']).default('en'),
  layout: z.enum(['single_column', 'dual_column']).default('single_column'),
  raw_text: z.string().optional(),
  source_type: z.enum(['text', 'image', 'pdf', 'whatsapp']).default('text'),
  instructions: z.string().optional(),
});

export const StudentCreateSchema = z.object({
  roll_number: z.string().min(1, 'Roll number is required'),
  full_name: z.string().min(2, 'Student name is required'),
  class_grade: z.string().min(1, 'Class is required'),
  stream: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  parent_name: z.string().min(2, 'Parent name is required'),
  parent_phone: z.string().regex(/^\+?[0-9]{10,13}$/, 'Valid parent 10-12 digit phone number required'),
  parent_email: z.string().email().optional().or(z.literal('')),
  batch_id: z.string().optional(),
});

export const BatchCreateSchema = z.object({
  name: z.string().min(2, 'Batch name is required'),
  class_grade: z.string().min(1, 'Class is required'),
  stream: z.string().optional(),
  timing: z.string().optional(),
});

export const MarkAttendanceSchema = z.object({
  batch_id: z.string().min(1, 'Batch ID is required'),
  attendance_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  records: z.array(z.object({
    student_id: z.string().min(1),
    status: z.enum(['present', 'absent', 'late', 'excused']),
    remarks: z.string().optional(),
  })),
  send_whatsapp_alerts: z.boolean().default(false),
});

export const FeeRecordCreateSchema = z.object({
  student_id: z.string().min(1, 'Student ID is required'),
  title: z.string().min(2, 'Fee title is required'),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Valid due date required'),
  total_amount: z.number().positive('Total amount must be greater than zero'),
});

export const SendWhatsAppMessageSchema = z.object({
  recipient_phone: z.string().regex(/^\+?[0-9]{10,13}$/, 'Valid phone number required'),
  student_id: z.string().optional(),
  message_type: z.enum(['result_alert', 'attendance_alert', 'fee_reminder', 'announcement', 'teacher_bot']),
  template_name: z.string().optional(),
  message_text: z.string().min(1, 'Message text cannot be empty'),
  media_url: z.string().url().optional(),
});

export const EvaluateOMRSchema = z.object({
  template_id: z.string().min(1, 'OMR Template is required'),
  paper_id: z.string().min(1, 'Test Paper is required'),
  detected_answers: z.record(z.string()),
  roll_number: z.string().optional(),
  student_id: z.string().optional(),
  bubble_confidences: z.record(z.number()).optional(),
  is_manually_verified: z.boolean().default(false),
});
