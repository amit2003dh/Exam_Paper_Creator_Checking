// TestSetu AI Data Access Layer (Tier 3)
// Provides unified access to PostgreSQL / Supabase with in-memory seeded persistence fallback

import { 
  Institute, 
  Student, 
  Batch, 
  QuestionPaper, 
  Question, 
  OMRTemplate, 
  OMRResult, 
  AttendanceRecord, 
  StudentFee, 
  Payment, 
  WhatsAppMessage 
} from '@/types';

// Pre-seeded multi-tenant store for instant local operation & automated tests
const DEFAULT_INSTITUTE_ID = 'e2b4f9d0-1234-4567-89ab-cdef01234567';
const SECOND_INSTITUTE_ID = 'f3c5a0e1-2345-5678-90bc-def012345678';

class MemoryDatabase {
  public institutes: Map<string, Institute> = new Map();
  public students: Map<string, Student> = new Map();
  public batches: Map<string, Batch> = new Map();
  public batchStudents: Map<string, { batch_id: string; student_id: string }> = new Map();
  public questionPapers: Map<string, QuestionPaper> = new Map();
  public questions: Map<string, Question> = new Map();
  public omrTemplates: Map<string, OMRTemplate> = new Map();
  public omrResults: Map<string, OMRResult> = new Map();
  public attendance: Map<string, AttendanceRecord> = new Map();
  public studentFees: Map<string, StudentFee> = new Map();
  public payments: Map<string, Payment> = new Map();
  public whatsappMessages: Map<string, WhatsAppMessage> = new Map();

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    // 1. Institutes
    this.institutes.set(DEFAULT_INSTITUTE_ID, {
      id: DEFAULT_INSTITUTE_ID,
      name: 'Apex IIT-JEE & Medical Academy',
      code: 'APEX-KOTA',
      tagline: 'Pioneering Excellence in National Competitive Exams',
      address: 'Plot 42, Vigyan Nagar, Near Allen Circle',
      city: 'Kota',
      state: 'Rajasthan',
      pincode: '324005',
      phone: '+919829012345',
      email: 'contact@apexkota.edu.in',
      whatsapp_number: '+919829012345',
      subscription_tier: 'growth',
      is_active: true,
      created_at: new Date().toISOString(),
    });

    this.institutes.set(SECOND_INSTITUTE_ID, {
      id: SECOND_INSTITUTE_ID,
      name: 'Prerana Career Institute',
      code: 'PRERANA-PATNA',
      tagline: 'Nurturing Talent from Roots to Results',
      city: 'Patna',
      state: 'Bihar',
      phone: '+919431054321',
      email: 'admin@preranainstitute.com',
      subscription_tier: 'starter',
      is_active: true,
      created_at: new Date().toISOString(),
    });

    // 2. Batches
    const batch1Id = 'b1111111-0000-0000-0000-000000000001';
    const batch2Id = 'b2222222-0000-0000-0000-000000000002';
    this.batches.set(batch1Id, {
      id: batch1Id,
      institute_id: DEFAULT_INSTITUTE_ID,
      name: 'JEE Advanced 2027 Super-30',
      class_grade: 'Class 11',
      stream: 'Science-JEE',
      timing: '07:30 AM - 01:00 PM',
      is_active: true,
      students_count: 3,
      created_at: new Date().toISOString(),
    });
    this.batches.set(batch2Id, {
      id: batch2Id,
      institute_id: DEFAULT_INSTITUTE_ID,
      name: 'NEET Sankalp Dropper Batch',
      class_grade: 'Class 12+',
      stream: 'Medical-NEET',
      timing: '02:00 PM - 07:30 PM',
      is_active: true,
      students_count: 2,
      created_at: new Date().toISOString(),
    });

    // 3. Students
    const student1Id = 's1111111-0000-0000-0000-000000000001';
    const student2Id = 's2222222-0000-0000-0000-000000000002';
    const student3Id = 's3333333-0000-0000-0000-000000000003';
    const student4Id = 's4444444-0000-0000-0000-000000000004';
    const student5Id = 's5555555-0000-0000-0000-000000000005';

    this.students.set(student1Id, {
      id: student1Id,
      institute_id: DEFAULT_INSTITUTE_ID,
      roll_number: 'APEX-26-001',
      full_name: 'Aarav Singhania',
      class_grade: 'Class 11',
      stream: 'Science-JEE',
      phone: '+919811122233',
      parent_name: 'Rajesh Singhania',
      parent_phone: '+919811199988',
      parent_email: 'rajesh.singhania@gmail.com',
      is_active: true,
      created_at: new Date().toISOString(),
    });

    this.students.set(student2Id, {
      id: student2Id,
      institute_id: DEFAULT_INSTITUTE_ID,
      roll_number: 'APEX-26-002',
      full_name: 'Priya Deshmukh',
      class_grade: 'Class 11',
      stream: 'Science-JEE',
      phone: '+919822233344',
      parent_name: 'Anand Deshmukh',
      parent_phone: '+919822288877',
      parent_email: 'anand.deshmukh@yahoo.co.in',
      is_active: true,
      created_at: new Date().toISOString(),
    });

    this.students.set(student3Id, {
      id: student3Id,
      institute_id: DEFAULT_INSTITUTE_ID,
      roll_number: 'APEX-26-003',
      full_name: 'Rohan Meena',
      class_grade: 'Class 11',
      stream: 'Science-JEE',
      phone: '+919833344455',
      parent_name: 'Mahesh Chand Meena',
      parent_phone: '+919833377766',
      is_active: true,
      created_at: new Date().toISOString(),
    });

    this.students.set(student4Id, {
      id: student4Id,
      institute_id: DEFAULT_INSTITUTE_ID,
      roll_number: 'APEX-26-004',
      full_name: 'Sneha Iyer',
      class_grade: 'Class 12+',
      stream: 'Medical-NEET',
      phone: '+919844455566',
      parent_name: 'Venkatesh Iyer',
      parent_phone: '+919844466655',
      is_active: true,
      created_at: new Date().toISOString(),
    });

    this.students.set(student5Id, {
      id: student5Id,
      institute_id: DEFAULT_INSTITUTE_ID,
      roll_number: 'APEX-26-005',
      full_name: 'Kabir Hussain',
      class_grade: 'Class 12+',
      stream: 'Medical-NEET',
      phone: '+919855566677',
      parent_name: 'Tariq Hussain',
      parent_phone: '+919855555544',
      is_active: true,
      created_at: new Date().toISOString(),
    });

    // 4. Questions & Paper
    const q1Id = 'q1111111-0000-0000-0000-000000000001';
    const q2Id = 'q2222222-0000-0000-0000-000000000002';
    const q3Id = 'q3333333-0000-0000-0000-000000000003';

    const q1: Question = {
      id: q1Id,
      institute_id: DEFAULT_INSTITUTE_ID,
      type: 'mcq_single',
      difficulty: 'medium',
      language: 'bilingual',
      content_text: 'A solid cylinder of mass M and radius R rolls down without slipping along an inclined plane of inclination theta. Find its linear acceleration.',
      content_latex: 'a = \\frac{g \\sin \\theta}{1 + \\frac{I}{MR^2}} = \\frac{2}{3} g \\sin \\theta',
      marks: 4,
      negative_marks: 1,
      explanation: 'Using torque tau = I * alpha and Newton equation mg sin(theta) - f = ma.',
      is_verified: true,
      options: [
        { option_letter: 'A', option_text: 'g sin(theta)', option_latex: 'g \\sin \\theta', is_correct: false },
        { option_letter: 'B', option_text: '(2/3) g sin(theta)', option_latex: '\\frac{2}{3} g \\sin \\theta', is_correct: true },
        { option_letter: 'C', option_text: '(1/2) g sin(theta)', option_latex: '\\frac{1}{2} g \\sin \\theta', is_correct: false },
        { option_letter: 'D', option_text: '(3/4) g sin(theta)', option_latex: '\\frac{3}{4} g \\sin \\theta', is_correct: false },
      ],
      created_at: new Date().toISOString(),
    };

    const q2: Question = {
      id: q2Id,
      institute_id: DEFAULT_INSTITUTE_ID,
      type: 'mcq_single',
      difficulty: 'hard',
      language: 'bilingual',
      content_text: 'The escape velocity from the surface of the Earth is v_e. If a projectile is fired with speed 2 * v_e, its speed in interstellar space will be:',
      content_latex: 'v_\\infty = \\sqrt{v^2 - v_e^2} = \\sqrt{(2v_e)^2 - v_e^2} = \\sqrt{3} v_e',
      marks: 4,
      negative_marks: 1,
      explanation: 'Conservation of mechanical energy: 1/2 m v^2 - GMm/R = 1/2 m v_inf^2.',
      is_verified: true,
      options: [
        { option_letter: 'A', option_text: 'v_e', option_latex: 'v_e', is_correct: false },
        { option_letter: 'B', option_text: 'sqrt(3) * v_e', option_latex: '\\sqrt{3} v_e', is_correct: true },
        { option_letter: 'C', option_text: 'sqrt(2) * v_e', option_latex: '\\sqrt{2} v_e', is_correct: false },
        { option_letter: 'D', option_text: '2 * v_e', option_latex: '2 v_e', is_correct: false },
      ],
      created_at: new Date().toISOString(),
    };

    const q3: Question = {
      id: q3Id,
      institute_id: DEFAULT_INSTITUTE_ID,
      type: 'mcq_single',
      difficulty: 'medium',
      language: 'bilingual',
      content_text: 'Which of the following organic compounds will give a positive Iodoform test upon reaction with I2 and NaOH?',
      content_latex: '\\text{CH}_3-\\text{CO}-\\text{R} \\xrightarrow{\\text{I}_2/\\text{NaOH}} \\text{CHI}_3 \\downarrow',
      marks: 4,
      negative_marks: 1,
      explanation: 'Methyl ketones or secondary alcohols with CH3-CH(OH)- group give positive iodoform test.',
      is_verified: true,
      options: [
        { option_letter: 'A', option_text: 'Ethanol', option_latex: '\\text{CH}_3\\text{CH}_2\\text{OH}', is_correct: true },
        { option_letter: 'B', option_text: 'Methanol', option_latex: '\\text{CH}_3\\text{OH}', is_correct: false },
        { option_letter: 'C', option_text: 'Benzophenone', option_latex: '\\text{Ph-CO-Ph}', is_correct: false },
        { option_letter: 'D', option_text: 'Diethyl ether', option_latex: '\\text{C}_2\\text{H}_5\\text{OC}_2\\text{H}_5', is_correct: false },
      ],
      created_at: new Date().toISOString(),
    };

    this.questions.set(q1Id, q1);
    this.questions.set(q2Id, q2);
    this.questions.set(q3Id, q3);

    const paper1Id = 'p1111111-0000-0000-0000-000000000001';
    this.questionPapers.set(paper1Id, {
      id: paper1Id,
      institute_id: DEFAULT_INSTITUTE_ID,
      title: 'JEE Advanced Minor Test 01 (Physics & Chemistry)',
      exam_code: 'JEE-26-MIN-01',
      class_grade: 'Class 11',
      subject: 'Physics & Chemistry',
      total_questions: 3,
      total_marks: 12,
      duration_minutes: 45,
      difficulty: 'hard',
      language: 'bilingual',
      layout: 'dual_column',
      instructions: 'Each correct response carries +4 marks. -1 mark will be deducted for every incorrect response.',
      status: 'ready',
      source_type: 'ai_generation',
      questions: [
        { ...q1, question_order: 1, section_name: 'Physics' },
        { ...q2, question_order: 2, section_name: 'Physics' },
        { ...q3, question_order: 3, section_name: 'Chemistry' },
      ],
      created_at: new Date().toISOString(),
    });

    // 5. OMR Templates
    this.omrTemplates.set('omr-tpl-20-q', {
      id: 'omr-tpl-20-q',
      institute_id: DEFAULT_INSTITUTE_ID,
      name: 'Standard 20-Question Quick Test OMR',
      total_questions: 20,
      options_per_question: 4,
      has_roll_number: true,
      has_test_id: true,
      layout_config: {
        columns: 2,
        rows_per_col: 10,
        bubble_radius: 14,
        spacing_x: 30,
        spacing_y: 28,
        markers: [[40,40], [550,40], [40,780], [550,780]],
      },
    });

    this.omrTemplates.set('omr-tpl-50-q', {
      id: 'omr-tpl-50-q',
      institute_id: DEFAULT_INSTITUTE_ID,
      name: 'Standard 50-Question Minor Exam OMR',
      total_questions: 50,
      options_per_question: 4,
      has_roll_number: true,
      has_test_id: true,
      layout_config: {
        columns: 2,
        rows_per_col: 25,
        bubble_radius: 12,
        spacing_x: 26,
        spacing_y: 22,
        markers: [[30,30], [560,30], [30,800], [560,800]],
      },
    });

    // 6. OMR Results
    this.omrResults.set('res-1', {
      id: 'res-1',
      institute_id: DEFAULT_INSTITUTE_ID,
      sheet_id: 'sheet-101',
      student_id: student1Id,
      student_name: 'Aarav Singhania',
      roll_number: 'APEX-26-001',
      paper_id: paper1Id,
      paper_title: 'JEE Advanced Minor Test 01',
      detected_answers: { '1': 'B', '2': 'B', '3': 'A' },
      bubble_confidences: { '1': 0.98, '2': 0.95, '3': 0.92 },
      correct_count: 3,
      incorrect_count: 0,
      unattempted_count: 0,
      multiple_marked_count: 0,
      total_marks: 12,
      max_marks: 12,
      percentage: 100,
      rank: 1,
      is_manually_verified: true,
      created_at: new Date(Date.now() - 3600000).toISOString(),
    });

    this.omrResults.set('res-2', {
      id: 'res-2',
      institute_id: DEFAULT_INSTITUTE_ID,
      sheet_id: 'sheet-102',
      student_id: student2Id,
      student_name: 'Priya Deshmukh',
      roll_number: 'APEX-26-002',
      paper_id: paper1Id,
      paper_title: 'JEE Advanced Minor Test 01',
      detected_answers: { '1': 'B', '2': 'C', '3': 'A' },
      bubble_confidences: { '1': 0.96, '2': 0.89, '3': 0.91 },
      correct_count: 2,
      incorrect_count: 1,
      unattempted_count: 0,
      multiple_marked_count: 0,
      total_marks: 7, // 2*4 - 1
      max_marks: 12,
      percentage: 58.33,
      rank: 2,
      is_manually_verified: false,
      created_at: new Date(Date.now() - 3400000).toISOString(),
    });

    // 7. Fees & Payments
    this.studentFees.set('sf-1', {
      id: 'sf-1',
      institute_id: DEFAULT_INSTITUTE_ID,
      student_id: student1Id,
      student_name: 'Aarav Singhania',
      roll_number: 'APEX-26-001',
      title: 'Term 1 Tuition Fee (Physics, Chemistry & Maths)',
      due_date: '2026-11-15',
      total_amount: 62500,
      paid_amount: 62500,
      balance_amount: 0,
      status: 'paid',
      razorpay_payment_link_id: 'plink_apex101',
      razorpay_payment_url: 'https://rzp.io/i/apex101',
      created_at: new Date().toISOString(),
    });

    this.studentFees.set('sf-2', {
      id: 'sf-2',
      institute_id: DEFAULT_INSTITUTE_ID,
      student_id: student2Id,
      student_name: 'Priya Deshmukh',
      roll_number: 'APEX-26-002',
      title: 'Term 1 Tuition Fee (Physics, Chemistry & Maths)',
      due_date: '2026-11-15',
      total_amount: 62500,
      paid_amount: 30000,
      balance_amount: 32500,
      status: 'partial',
      razorpay_payment_link_id: 'plink_apex102',
      razorpay_payment_url: 'https://rzp.io/i/apex102',
      created_at: new Date().toISOString(),
    });

    this.studentFees.set('sf-3', {
      id: 'sf-3',
      institute_id: DEFAULT_INSTITUTE_ID,
      student_id: student3Id,
      student_name: 'Rohan Meena',
      roll_number: 'APEX-26-003',
      title: 'Term 1 Tuition Fee (Physics, Chemistry & Maths)',
      due_date: '2026-10-15',
      total_amount: 62500,
      paid_amount: 0,
      balance_amount: 62500,
      status: 'overdue',
      razorpay_payment_link_id: 'plink_apex103',
      razorpay_payment_url: 'https://rzp.io/i/apex103',
      created_at: new Date().toISOString(),
    });

    this.payments.set('pay-1', {
      id: 'pay-1',
      institute_id: DEFAULT_INSTITUTE_ID,
      student_fee_id: 'sf-1',
      student_id: student1Id,
      amount: 62500,
      payment_mode: 'razorpay',
      razorpay_payment_id: 'pay_rzp_apex_98765',
      receipt_number: 'REC-APEX-2026-001',
      status: 'completed',
      payment_date: new Date().toISOString(),
    });

    // 8. Attendance
    this.attendance.set('att-1', {
      id: 'att-1',
      institute_id: DEFAULT_INSTITUTE_ID,
      batch_id: batch1Id,
      student_id: student1Id,
      student_name: 'Aarav Singhania',
      roll_number: 'APEX-26-001',
      attendance_date: new Date().toISOString().split('T')[0],
      status: 'present',
      whatsapp_alert_sent: true,
    });
    this.attendance.set('att-2', {
      id: 'att-2',
      institute_id: DEFAULT_INSTITUTE_ID,
      batch_id: batch1Id,
      student_id: student2Id,
      student_name: 'Priya Deshmukh',
      roll_number: 'APEX-26-002',
      attendance_date: new Date().toISOString().split('T')[0],
      status: 'present',
      whatsapp_alert_sent: true,
    });
    this.attendance.set('att-3', {
      id: 'att-3',
      institute_id: DEFAULT_INSTITUTE_ID,
      batch_id: batch1Id,
      student_id: student3Id,
      student_name: 'Rohan Meena',
      roll_number: 'APEX-26-003',
      attendance_date: new Date().toISOString().split('T')[0],
      status: 'absent',
      remarks: 'Informed fever',
      whatsapp_alert_sent: true,
    });

    // 9. WhatsApp Messages
    this.whatsappMessages.set('wa-1', {
      id: 'wa-1',
      institute_id: DEFAULT_INSTITUTE_ID,
      recipient_phone: '+919811199988',
      student_id: student1Id,
      message_type: 'result_alert',
      content_preview: 'Dear Parent, Aarav Singhania scored 12/12 (100%, Rank 1) in JEE Advanced Minor Test 01.',
      status: 'delivered',
      sent_at: new Date(Date.now() - 3000000).toISOString(),
      delivered_at: new Date(Date.now() - 2990000).toISOString(),
      created_at: new Date(Date.now() - 3000000).toISOString(),
    });

    this.whatsappMessages.set('wa-2', {
      id: 'wa-2',
      institute_id: DEFAULT_INSTITUTE_ID,
      recipient_phone: '+919833377766',
      student_id: student3Id,
      message_type: 'attendance_alert',
      content_preview: 'Apex Academy Alert: Rohan Meena was marked ABSENT today for JEE Advanced 2027 Super-30.',
      status: 'read',
      sent_at: new Date(Date.now() - 7200000).toISOString(),
      delivered_at: new Date(Date.now() - 7190000).toISOString(),
      read_at: new Date(Date.now() - 6500000).toISOString(),
      created_at: new Date(Date.now() - 7200000).toISOString(),
    });

    this.whatsappMessages.set('wa-3', {
      id: 'wa-3',
      institute_id: DEFAULT_INSTITUTE_ID,
      recipient_phone: '+919833377766',
      student_id: student3Id,
      message_type: 'fee_reminder',
      content_preview: 'Fee Reminder: ₹62,500 is overdue for Rohan Meena. Pay securely: https://rzp.io/i/apex103',
      status: 'delivered',
      sent_at: new Date(Date.now() - 14400000).toISOString(),
      delivered_at: new Date(Date.now() - 14380000).toISOString(),
      created_at: new Date(Date.now() - 14400000).toISOString(),
    });
  }
}

// Global singleton for memory database across API endpoints
declare global {
  var __testsetu_db: MemoryDatabase | undefined;
}

export const db = global.__testsetu_db || (global.__testsetu_db = new MemoryDatabase());
export const DEFAULT_TENANT_ID = DEFAULT_INSTITUTE_ID;
