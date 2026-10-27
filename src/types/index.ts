export type UserRole = 
  | 'super_admin' 
  | 'institute_owner' 
  | 'institute_admin' 
  | 'teacher' 
  | 'accountant' 
  | 'student' 
  | 'parent';

export type PaperStatus = 'draft' | 'generating' | 'ready' | 'archived';
export type QuestionType = 'mcq_single' | 'mcq_multiple' | 'numerical' | 'true_false' | 'descriptive';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export type FeeStatus = 'pending' | 'partial' | 'paid' | 'overdue';
export type PaymentMode = 'razorpay' | 'cash' | 'upi' | 'bank_transfer' | 'cheque';
export type MessageStatus = 'queued' | 'sent' | 'delivered' | 'read' | 'failed';
export type AttemptStatus = 'in_progress' | 'submitted' | 'evaluated' | 'abandoned';
export type SubscriptionTier = 'free_trial' | 'starter' | 'growth' | 'annual_pro';

export interface Institute {
  id: string;
  name: string;
  code: string;
  tagline?: string;
  logo_url?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone: string;
  email: string;
  whatsapp_number?: string;
  subscription_tier: SubscriptionTier;
  is_active: boolean;
  settings?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  is_super_admin: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface InstituteMember {
  id: string;
  institute_id: string;
  profile_id: string;
  role: UserRole;
  is_active: boolean;
  profile?: Profile;
}

export interface Student {
  id: string;
  institute_id: string;
  profile_id?: string;
  roll_number: string;
  full_name: string;
  class_grade: string;
  stream?: string;
  phone?: string;
  email?: string;
  parent_name?: string;
  parent_phone: string;
  parent_email?: string;
  admission_date?: string;
  address?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Batch {
  id: string;
  institute_id: string;
  name: string;
  class_grade: string;
  stream?: string;
  timing?: string;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  students_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Teacher {
  id: string;
  institute_id: string;
  profile_id?: string;
  full_name: string;
  subject_specialty: string;
  phone: string;
  email?: string;
  is_active: boolean;
  created_at?: string;
}

export interface QuestionOption {
  id?: string;
  question_id?: string;
  option_letter: 'A' | 'B' | 'C' | 'D' | 'E';
  option_text: string;
  option_latex?: string;
  image_url?: string;
  is_correct: boolean;
}

export interface Question {
  id: string;
  institute_id: string;
  subject_id?: string;
  chapter_id?: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  language: string;
  content_text: string;
  content_latex?: string;
  diagram_url?: string;
  marks: number;
  negative_marks: number;
  explanation?: string;
  is_verified: boolean;
  tags?: string[];
  options?: QuestionOption[];
  created_at?: string;
  updated_at?: string;
}

export interface QuestionPaper {
  id: string;
  institute_id: string;
  title: string;
  exam_code?: string;
  class_grade: string;
  subject: string;
  total_questions: number;
  total_marks: number;
  duration_minutes: number;
  difficulty: DifficultyLevel;
  language: string;
  layout: 'single_column' | 'dual_column';
  instructions?: string;
  status: PaperStatus;
  source_type?: string;
  metadata?: Record<string, any>;
  questions?: (Question & { question_order: number; section_name?: string })[];
  created_at?: string;
  updated_at?: string;
}

export interface OMRTemplate {
  id: string;
  institute_id: string;
  name: string;
  total_questions: number; // 20, 50, 100
  options_per_question: number; // 4 or 5
  has_roll_number: boolean;
  has_test_id: boolean;
  layout_config: {
    columns: number;
    rows_per_col: number;
    bubble_radius: number;
    spacing_x: number;
    spacing_y: number;
    markers: [number, number][];
  };
  created_at?: string;
}

export interface OMRResult {
  id: string;
  institute_id: string;
  sheet_id: string;
  student_id?: string;
  student_name?: string;
  roll_number?: string;
  paper_id: string;
  paper_title?: string;
  detected_answers: Record<string, string>; // e.g. {"1": "B", "2": "C"}
  bubble_confidences: Record<string, number>;
  correct_count: number;
  incorrect_count: number;
  unattempted_count: number;
  multiple_marked_count: number;
  total_marks: number;
  max_marks: number;
  percentage: number;
  rank?: number;
  is_manually_verified: boolean;
  verified_by?: string;
  created_at?: string;
}

export interface AttendanceRecord {
  id: string;
  institute_id: string;
  batch_id: string;
  student_id: string;
  student_name?: string;
  roll_number?: string;
  attendance_date: string;
  status: AttendanceStatus;
  remarks?: string;
  whatsapp_alert_sent?: boolean;
}

export interface StudentFee {
  id: string;
  institute_id: string;
  student_id: string;
  student_name?: string;
  roll_number?: string;
  title: string;
  due_date: string;
  total_amount: number;
  paid_amount: number;
  balance_amount: number;
  status: FeeStatus;
  razorpay_payment_link_id?: string;
  razorpay_payment_url?: string;
  created_at?: string;
}

export interface Payment {
  id: string;
  institute_id: string;
  student_fee_id?: string;
  student_id: string;
  amount: number;
  payment_mode: PaymentMode;
  razorpay_payment_id?: string;
  receipt_number: string;
  status: string;
  payment_date: string;
}

export interface WhatsAppMessage {
  id: string;
  institute_id: string;
  recipient_phone: string;
  student_id?: string;
  parent_id?: string;
  message_type: 'result_alert' | 'attendance_alert' | 'fee_reminder' | 'announcement' | 'teacher_bot';
  content_preview: string;
  status: MessageStatus;
  sent_at?: string;
  delivered_at?: string;
  read_at?: string;
  created_at?: string;
}

export interface DashboardMetrics {
  totalStudents: number;
  activeBatches: number;
  testsConducted: number;
  averageMarks: number;
  attendancePercentage: number;
  pendingFees: number;
  totalFeeCollected: number;
  whatsappDeliveryRate: number;
  aiPapersGeneratedThisMonth: number;
}
