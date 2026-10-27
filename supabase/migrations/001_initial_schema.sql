-- TestSetu AI Complete Multi-Tenant Database Schema
-- Standard: PostgreSQL 15+ / Supabase
-- Covers all 34 required entities with Institute Tenant Isolation, RLS and Indexes

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'institute_owner',
  'institute_admin',
  'teacher',
  'accountant',
  'student',
  'parent'
);

CREATE TYPE paper_status AS ENUM ('draft', 'generating', 'ready', 'archived');
CREATE TYPE question_type AS ENUM ('mcq_single', 'mcq_multiple', 'numerical', 'true_false', 'descriptive');
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
CREATE TYPE fee_status AS ENUM ('pending', 'partial', 'paid', 'overdue');
CREATE TYPE payment_mode AS ENUM ('razorpay', 'cash', 'upi', 'bank_transfer', 'cheque');
CREATE TYPE message_status AS ENUM ('queued', 'sent', 'delivered', 'read', 'failed');
CREATE TYPE attempt_status AS ENUM ('in_progress', 'submitted', 'evaluated', 'abandoned');
CREATE TYPE subscription_tier AS ENUM ('free_trial', 'starter', 'growth', 'annual_pro');

-- 1. INSTITUTES
CREATE TABLE IF NOT EXISTS institutes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  tagline VARCHAR(255),
  logo_url TEXT,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(20),
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp_number VARCHAR(20),
  subscription_tier subscription_tier DEFAULT 'starter',
  is_active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{"theme": "navy", "paper_header": true, "enable_whatsapp": true}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES (Users mapped to Supabase auth.users or internal users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  is_super_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INSTITUTE_MEMBERS (Tenant mapping & authorization)
CREATE TABLE IF NOT EXISTS institute_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'teacher',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(institute_id, profile_id)
);

-- 4. ROLES
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PERMISSIONS
CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role user_role NOT NULL,
  action VARCHAR(100) NOT NULL,
  resource VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role, action, resource)
);

-- 6. STUDENTS
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  roll_number VARCHAR(50) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  class_grade VARCHAR(50) NOT NULL,
  stream VARCHAR(100), -- 'Science-JEE', 'NEET', 'Foundation', 'Commerce'
  phone VARCHAR(20),
  email VARCHAR(255),
  parent_name VARCHAR(255),
  parent_phone VARCHAR(20) NOT NULL,
  parent_email VARCHAR(255),
  admission_date DATE DEFAULT CURRENT_DATE,
  address TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(institute_id, roll_number)
);

-- 7. PARENTS
CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  whatsapp_opt_in BOOLEAN DEFAULT true,
  preferred_language VARCHAR(10) DEFAULT 'en', -- 'en' or 'hi'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(institute_id, phone)
);

-- 8. TEACHERS
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  full_name VARCHAR(255) NOT NULL,
  subject_specialty VARCHAR(100),
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. BATCHES
CREATE TABLE IF NOT EXISTS batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  class_grade VARCHAR(50) NOT NULL,
  stream VARCHAR(100),
  start_date DATE,
  end_date DATE,
  timing VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. BATCH_STUDENTS
CREATE TABLE IF NOT EXISTS batch_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(batch_id, student_id)
);

-- 11. SUBJECTS
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50),
  color VARCHAR(20) DEFAULT '#4F46E5',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. CHAPTERS
CREATE TABLE IF NOT EXISTS chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_grade VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  chapter_number INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. QUESTIONS (Master Question Bank)
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
  type question_type NOT NULL DEFAULT 'mcq_single',
  difficulty difficulty_level DEFAULT 'medium',
  language VARCHAR(10) DEFAULT 'en', -- 'en', 'hi', 'bilingual'
  content_text TEXT NOT NULL,
  content_latex TEXT,
  diagram_url TEXT,
  marks NUMERIC(5,2) DEFAULT 4.00,
  negative_marks NUMERIC(5,2) DEFAULT 1.00,
  explanation TEXT,
  is_verified BOOLEAN DEFAULT true,
  tags TEXT[],
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. QUESTION_OPTIONS
CREATE TABLE IF NOT EXISTS question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option_letter CHAR(1) NOT NULL, -- 'A', 'B', 'C', 'D', 'E'
  option_text TEXT NOT NULL,
  option_latex TEXT,
  image_url TEXT,
  is_correct BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(question_id, option_letter)
);

-- 15. QUESTION_PAPERS
CREATE TABLE IF NOT EXISTS question_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  exam_code VARCHAR(50),
  class_grade VARCHAR(50) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  total_questions INT NOT NULL DEFAULT 20,
  total_marks NUMERIC(6,2) NOT NULL DEFAULT 80.00,
  duration_minutes INT DEFAULT 60,
  difficulty difficulty_level DEFAULT 'medium',
  language VARCHAR(20) DEFAULT 'en',
  layout VARCHAR(20) DEFAULT 'single_column', -- 'single_column', 'dual_column'
  instructions TEXT,
  status paper_status DEFAULT 'draft',
  source_type VARCHAR(50) DEFAULT 'ai_generation', -- 'text', 'image', 'pdf', 'whatsapp'
  metadata JSONB DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. PAPER_QUESTIONS
CREATE TABLE IF NOT EXISTS paper_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID NOT NULL REFERENCES question_papers(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  section_name VARCHAR(100) DEFAULT 'Section A',
  question_order INT NOT NULL,
  custom_marks NUMERIC(5,2),
  custom_negative_marks NUMERIC(5,2),
  UNIQUE(paper_id, question_order)
);

-- 17. ANSWER_KEYS
CREATE TABLE IF NOT EXISTS answer_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID UNIQUE NOT NULL REFERENCES question_papers(id) ON DELETE CASCADE,
  answers JSONB NOT NULL, -- e.g. {"1": "A", "2": "C", "3": "2.5"}
  scoring_scheme JSONB DEFAULT '{"correct": 4, "incorrect": -1, "unattempted": 0}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. ONLINE_TESTS
CREATE TABLE IF NOT EXISTS online_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  paper_id UUID NOT NULL REFERENCES question_papers(id) ON DELETE CASCADE,
  batch_id UUID REFERENCES batches(id) ON DELETE SET NULL,
  access_code VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  start_window TIMESTAMPTZ NOT NULL,
  end_window TIMESTAMPTZ NOT NULL,
  duration_minutes INT NOT NULL,
  auto_submit BOOLEAN DEFAULT true,
  shuffle_questions BOOLEAN DEFAULT false,
  show_results_immediately BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. TEST_ATTEMPTS
CREATE TABLE IF NOT EXISTS test_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  online_test_id UUID NOT NULL REFERENCES online_tests(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  status attempt_status DEFAULT 'in_progress',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  total_score NUMERIC(6,2) DEFAULT 0.00,
  accuracy_percentage NUMERIC(5,2) DEFAULT 0.00,
  ip_address VARCHAR(50),
  UNIQUE(online_test_id, student_id)
);

-- 20. STUDENT_ANSWERS
CREATE TABLE IF NOT EXISTS student_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES test_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selected_option VARCHAR(20),
  text_response TEXT,
  is_correct BOOLEAN,
  marks_awarded NUMERIC(5,2) DEFAULT 0.00,
  time_spent_seconds INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(attempt_id, question_id)
);

-- 21. OMR_TEMPLATES
CREATE TABLE IF NOT EXISTS omr_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  total_questions INT NOT NULL, -- 20, 50, 100
  options_per_question INT DEFAULT 4, -- 4 or 5
  has_roll_number BOOLEAN DEFAULT true,
  has_test_id BOOLEAN DEFAULT true,
  layout_config JSONB NOT NULL, -- Coordinates, fiducial markers, bubble spacing
  printable_pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. OMR_SHEETS
CREATE TABLE IF NOT EXISTS omr_sheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES omr_templates(id) ON DELETE RESTRICT,
  paper_id UUID REFERENCES question_papers(id) ON DELETE SET NULL,
  raw_image_url TEXT NOT NULL,
  processed_image_url TEXT,
  scan_source VARCHAR(50) DEFAULT 'camera', -- 'camera', 'upload', 'pdf_batch'
  alignment_confidence NUMERIC(5,2) DEFAULT 0.00,
  detected_roll_number VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'verified', 'flagged'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 23. OMR_RESULTS
CREATE TABLE IF NOT EXISTS omr_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  sheet_id UUID UNIQUE NOT NULL REFERENCES omr_sheets(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  paper_id UUID NOT NULL REFERENCES question_papers(id) ON DELETE CASCADE,
  detected_answers JSONB NOT NULL,
  bubble_confidences JSONB DEFAULT '{}'::jsonb,
  correct_count INT DEFAULT 0,
  incorrect_count INT DEFAULT 0,
  unattempted_count INT DEFAULT 0,
  multiple_marked_count INT DEFAULT 0,
  total_marks NUMERIC(6,2) NOT NULL DEFAULT 0.00,
  max_marks NUMERIC(6,2) NOT NULL DEFAULT 0.00,
  percentage NUMERIC(5,2) DEFAULT 0.00,
  rank INT,
  is_manually_verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 24. ATTENDANCE
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  attendance_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status attendance_status NOT NULL DEFAULT 'present',
  remarks TEXT,
  marked_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  whatsapp_alert_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(batch_id, student_id, attendance_date)
);

-- 25. FEE_STRUCTURES
CREATE TABLE IF NOT EXISTS fee_structures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  class_grade VARCHAR(50) NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  frequency VARCHAR(50) DEFAULT 'monthly', -- 'monthly', 'quarterly', 'annual', 'one_time'
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 26. STUDENT_FEES
CREATE TABLE IF NOT EXISTS student_fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  fee_structure_id UUID REFERENCES fee_structures(id) ON DELETE SET NULL,
  title VARCHAR(150) NOT NULL,
  due_date DATE NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  paid_amount NUMERIC(10,2) DEFAULT 0.00,
  balance_amount NUMERIC(10,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
  status fee_status DEFAULT 'pending',
  razorpay_payment_link_id VARCHAR(100),
  razorpay_payment_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 27. PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  student_fee_id UUID REFERENCES student_fees(id) ON DELETE SET NULL,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  payment_mode payment_mode DEFAULT 'razorpay',
  razorpay_payment_id VARCHAR(100),
  razorpay_order_id VARCHAR(100),
  razorpay_signature VARCHAR(255),
  reference_number VARCHAR(100),
  receipt_number VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'completed', -- 'completed', 'failed', 'refunded'
  notes TEXT,
  received_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  payment_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 28. WHATSAPP_MESSAGES
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  recipient_phone VARCHAR(20) NOT NULL,
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES parents(id) ON DELETE SET NULL,
  message_type VARCHAR(50) NOT NULL, -- 'result_alert', 'attendance_alert', 'fee_reminder', 'announcement', 'teacher_bot'
  template_name VARCHAR(100),
  content_preview TEXT NOT NULL,
  media_url TEXT,
  meta_message_id VARCHAR(100),
  status message_status DEFAULT 'queued',
  error_details TEXT,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  retry_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 29. WHATSAPP_TEMPLATES
CREATE TABLE IF NOT EXISTS whatsapp_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID REFERENCES institutes(id) ON DELETE CASCADE, -- NULL means global system template
  template_name VARCHAR(100) NOT NULL,
  language_code VARCHAR(10) DEFAULT 'en',
  category VARCHAR(50) NOT NULL, -- 'UTILITY', 'MARKETING', 'AUTHENTICATION'
  meta_status VARCHAR(50) DEFAULT 'APPROVED', -- 'APPROVED', 'PENDING', 'REJECTED'
  body_text TEXT NOT NULL,
  variable_mapping JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 30. WHATSAPP_WEBHOOK_EVENTS
CREATE TABLE IF NOT EXISTS whatsapp_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,
  sender_phone VARCHAR(20),
  meta_message_id VARCHAR(100),
  payload JSONB NOT NULL,
  is_processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 31. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  recipient_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info', -- 'info', 'warning', 'success', 'error'
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 32. SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID UNIQUE NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  tier subscription_tier DEFAULT 'starter',
  price_inr NUMERIC(10,2) NOT NULL,
  billing_cycle VARCHAR(20) DEFAULT 'monthly', -- 'monthly', 'yearly'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  auto_renew BOOLEAN DEFAULT true,
  razorpay_subscription_id VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 33. USAGE_RECORDS
CREATE TABLE IF NOT EXISTS usage_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
  month_year VARCHAR(7) NOT NULL, -- '2026-10'
  ai_papers_generated INT DEFAULT 0,
  omr_sheets_scanned INT DEFAULT 0,
  whatsapp_messages_sent INT DEFAULT 0,
  active_students_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(institute_id, month_year)
);

-- 34. AUDIT_LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id UUID REFERENCES institutes(id) ON DELETE CASCADE,
  performed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100) NOT NULL,
  resource_id UUID,
  details JSONB,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- INDEXES FOR HIGH-PERFORMANCE TENANT QUERIES
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_institute_members_tenant ON institute_members(institute_id, profile_id);
CREATE INDEX IF NOT EXISTS idx_students_tenant ON students(institute_id);
CREATE INDEX IF NOT EXISTS idx_students_roll ON students(institute_id, roll_number);
CREATE INDEX IF NOT EXISTS idx_batches_tenant ON batches(institute_id);
CREATE INDEX IF NOT EXISTS idx_questions_tenant ON questions(institute_id, subject_id);
CREATE INDEX IF NOT EXISTS idx_papers_tenant ON question_papers(institute_id);
CREATE INDEX IF NOT EXISTS idx_attendance_tenant_date ON attendance(institute_id, attendance_date);
CREATE INDEX IF NOT EXISTS idx_fees_tenant ON student_fees(institute_id, student_id);
CREATE INDEX IF NOT EXISTS idx_omr_results_tenant ON omr_results(institute_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_tenant ON whatsapp_messages(institute_id, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_tenant ON audit_logs(institute_id, created_at);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================
ALTER TABLE institutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE institute_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE paper_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answer_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE online_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE omr_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE omr_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE omr_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to extract user's current tenant institute IDs
CREATE OR REPLACE FUNCTION get_user_institute_ids()
RETURNS SETOF UUID AS $$
  SELECT institute_id FROM institute_members WHERE profile_id = auth.uid() AND is_active = true;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Tenant Isolation RLS Policies (Example applied to core entities)
DO $$
DECLARE
  t text;
  tenant_tables text[] := ARRAY[
    'students', 'parents', 'teachers', 'batches', 'batch_students',
    'subjects', 'chapters', 'questions', 'question_papers',
    'online_tests', 'omr_templates', 'omr_sheets', 'omr_results',
    'attendance', 'fee_structures', 'student_fees', 'payments',
    'whatsapp_messages', 'subscriptions', 'usage_records', 'audit_logs'
  ];
BEGIN
  FOREACH t IN ARRAY tenant_tables LOOP
    EXECUTE format('
      DROP POLICY IF EXISTS tenant_isolation_policy ON %I;
      CREATE POLICY tenant_isolation_policy ON %I
        USING (institute_id IN (SELECT get_user_institute_ids()))
        WITH CHECK (institute_id IN (SELECT get_user_institute_ids()));
    ', t, t);
  END LOOP;
END $$;
