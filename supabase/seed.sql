-- TestSetu AI Seed Data
-- Realistic dataset for Indian Coaching Institutes (Apex Academy & Prerana Classes)

-- 1. Institutes
INSERT INTO institutes (id, name, code, tagline, address, city, state, pincode, phone, email, whatsapp_number, subscription_tier)
VALUES 
(
  'e2b4f9d0-1234-4567-89ab-cdef01234567',
  'Apex IIT-JEE & Medical Academy',
  'APEX-KOTA',
  'Pioneering Excellence in National Competitive Exams',
  'Plot 42, Vigyan Nagar, Near Allen Circle',
  'Kota',
  'Rajasthan',
  '324005',
  '+919829012345',
  'contact@apexkota.edu.in',
  '+919829012345',
  'growth'
),
(
  'f3c5a0e1-2345-5678-90bc-def012345678',
  'Prerana Career Institute',
  'PRERANA-PATNA',
  'Nurturing Talent from Roots to Results',
  'Boring Road Crossing, Above PNB',
  'Patna',
  'Bihar',
  '800001',
  '+919431054321',
  'admin@preranainstitute.com',
  '+919431054321',
  'starter'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Profiles (Admin & Teachers)
INSERT INTO profiles (id, email, full_name, phone, is_super_admin)
VALUES 
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'director@apexkota.edu.in', 'Dr. Ramesh Chandra Verma', '+919829012345', false),
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'sharma.physics@apexkota.edu.in', 'Prof. Arvind K. Sharma', '+919829012346', false),
('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'gupta.maths@apexkota.edu.in', 'Er. Neeraj Gupta', '+919829012347', false)
ON CONFLICT (id) DO NOTHING;

-- 3. Institute Members
INSERT INTO institute_members (id, institute_id, profile_id, role)
VALUES 
('11111111-1111-1111-1111-111111111111', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'institute_owner'),
('22222222-2222-2222-2222-222222222222', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'teacher'),
('33333333-3333-3333-3333-333333333333', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'teacher')
ON CONFLICT (id) DO NOTHING;

-- 4. Batches
INSERT INTO batches (id, institute_id, name, class_grade, stream, timing)
VALUES 
('b1111111-0000-0000-0000-000000000001', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'JEE Advanced 2027 Super-30', 'Class 11', 'Science-JEE', '07:30 AM - 01:00 PM'),
('b2222222-0000-0000-0000-000000000002', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'NEET Sankalp Dropper Batch', 'Class 12+', 'Medical-NEET', '02:00 PM - 07:30 PM'),
('b3333333-0000-0000-0000-000000000003', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'Class 10 NTSE & Olympiad', 'Class 10', 'Foundation', '04:00 PM - 06:30 PM')
ON CONFLICT (id) DO NOTHING;

-- 5. Students
INSERT INTO students (id, institute_id, roll_number, full_name, class_grade, stream, phone, parent_name, parent_phone, parent_email)
VALUES 
('s1111111-0000-0000-0000-000000000001', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'APEX-26-001', 'Aarav Singhania', 'Class 11', 'Science-JEE', '+919811122233', 'Rajesh Singhania', '+919811199988', 'rajesh.singhania@gmail.com'),
('s2222222-0000-0000-0000-000000000002', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'APEX-26-002', 'Priya Deshmukh', 'Class 11', 'Science-JEE', '+919822233344', 'Anand Deshmukh', '+919822288877', 'anand.deshmukh@yahoo.co.in'),
('s3333333-0000-0000-0000-000000000003', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'APEX-26-003', 'Rohan Meena', 'Class 11', 'Science-JEE', '+919833344455', 'Mahesh Chand Meena', '+919833377766', 'mc.meena@gmail.com'),
('s4444444-0000-0000-0000-000000000004', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'APEX-26-004', 'Sneha Iyer', 'Class 12+', 'Medical-NEET', '+919844455566', 'Venkatesh Iyer', '+919844466655', 'venkat.iyer@gmail.com'),
('s5555555-0000-0000-0000-000000000005', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'APEX-26-005', 'Kabir Hussain', 'Class 12+', 'Medical-NEET', '+919855566677', 'Tariq Hussain', '+919855555544', 'tariq.hussain@gmail.com')
ON CONFLICT (id) DO NOTHING;

-- 6. Batch Students mapping
INSERT INTO batch_students (institute_id, batch_id, student_id)
VALUES 
('e2b4f9d0-1234-4567-89ab-cdef01234567', 'b1111111-0000-0000-0000-000000000001', 's1111111-0000-0000-0000-000000000001'),
('e2b4f9d0-1234-4567-89ab-cdef01234567', 'b1111111-0000-0000-0000-000000000001', 's2222222-0000-0000-0000-000000000002'),
('e2b4f9d0-1234-4567-89ab-cdef01234567', 'b1111111-0000-0000-0000-000000000001', 's3333333-0000-0000-0000-000000000003'),
('e2b4f9d0-1234-4567-89ab-cdef01234567', 'b2222222-0000-0000-0000-000000000002', 's4444444-0000-0000-0000-000000000004'),
('e2b4f9d0-1234-4567-89ab-cdef01234567', 'b2222222-0000-0000-0000-000000000002', 's5555555-0000-0000-0000-000000000005')
ON CONFLICT DO NOTHING;

-- 7. Fee Structures
INSERT INTO fee_structures (id, institute_id, name, class_grade, total_amount, frequency)
VALUES 
('f1111111-0000-0000-0000-000000000001', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'JEE 2-Year Target Course', 'Class 11', 125000.00, 'annual'),
('f2222222-0000-0000-0000-000000000002', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 'NEET Repeater Batch Fee', 'Class 12+', 85000.00, 'annual')
ON CONFLICT (id) DO NOTHING;

-- 8. Student Fees
INSERT INTO student_fees (id, institute_id, student_id, fee_structure_id, title, due_date, total_amount, paid_amount, status)
VALUES 
('sf111111-0000-0000-0000-000000000001', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 's1111111-0000-0000-0000-000000000001', 'f1111111-0000-0000-0000-000000000001', 'Term 1 Tuition Fee', '2026-11-15', 62500.00, 62500.00, 'paid'),
('sf222222-0000-0000-0000-000000000002', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 's2222222-0000-0000-0000-000000000002', 'f1111111-0000-0000-0000-000000000001', 'Term 1 Tuition Fee', '2026-11-15', 62500.00, 30000.00, 'partial'),
('sf333333-0000-0000-0000-000000000003', 'e2b4f9d0-1234-4567-89ab-cdef01234567', 's3333333-0000-0000-0000-000000000003', 'f1111111-0000-0000-0000-000000000001', 'Term 1 Tuition Fee', '2026-10-15', 62500.00, 0.00, 'overdue')
ON CONFLICT (id) DO NOTHING;

-- 9. Sample Question Papers & Master Bank
INSERT INTO question_papers (id, institute_id, title, exam_code, class_grade, subject, total_questions, total_marks, duration_minutes, difficulty, language, status)
VALUES 
(
  'p1111111-0000-0000-0000-000000000001',
  'e2b4f9d0-1234-4567-89ab-cdef01234567',
  'JEE Main Rotational Motion & Gravitation Minor Test 01',
  'JEE-26-MIN-01',
  'Class 11',
  'Physics',
  5,
  20.00,
  30,
  'hard',
  'bilingual',
  'ready'
)
ON CONFLICT (id) DO NOTHING;

-- 10. Sample Questions with KaTeX equations
INSERT INTO questions (id, institute_id, type, difficulty, language, content_text, content_latex, marks, negative_marks, explanation)
VALUES 
(
  'q1111111-0000-0000-0000-000000000001',
  'e2b4f9d0-1234-4567-89ab-cdef01234567',
  'mcq_single',
  'medium',
  'bilingual',
  'A solid cylinder of mass M and radius R rolls without slipping down an inclined plane of inclination theta. The linear acceleration of the cylinder is:',
  'a = \\frac{g \\sin \\theta}{1 + \\frac{I}{MR^2}}',
  4.00,
  1.00,
  'For a solid cylinder, moment of inertia I = (1/2)MR^2. Hence acceleration a = (2/3)g sin(theta).'
),
(
  'q2222222-0000-0000-0000-000000000002',
  'e2b4f9d0-1234-4567-89ab-cdef01234567',
  'mcq_single',
  'hard',
  'bilingual',
  'Two particles of masses m_1 and m_2 are separated by a distance r. The gravitational potential at the center of mass is given by:',
  'V_{cm} = -\\frac{G(m_1 + m_2)^2}{m_1 m_2 r}',
  4.00,
  1.00,
  'Calculate r1 = m2*r/(m1+m2) and r2 = m1*r/(m1+m2), then compute V = -G(m1/r1 + m2/r2).'
)
ON CONFLICT (id) DO NOTHING;

-- Options for Q1
INSERT INTO question_options (question_id, option_letter, option_text, option_latex, is_correct)
VALUES 
('q1111111-0000-0000-0000-000000000001', 'A', 'g sin(theta)', 'g \\sin \\theta', false),
('q1111111-0000-0000-0000-000000000001', 'B', '(2/3) g sin(theta)', '\\frac{2}{3} g \\sin \\theta', true),
('q1111111-0000-0000-0000-000000000001', 'C', '(1/2) g sin(theta)', '\\frac{1}{2} g \\sin \\theta', false),
('q1111111-0000-0000-0000-000000000001', 'D', '(3/4) g sin(theta)', '\\frac{3}{4} g \\sin \\theta', false)
ON CONFLICT DO NOTHING;

-- Link to paper
INSERT INTO paper_questions (paper_id, question_id, section_name, question_order)
VALUES 
('p1111111-0000-0000-0000-000000000001', 'q1111111-0000-0000-0000-000000000001', 'Section A (Physics)', 1)
ON CONFLICT DO NOTHING;

-- OMR Template default
INSERT INTO omr_templates (id, institute_id, name, total_questions, options_per_question, layout_config)
VALUES 
(
  'omr-tpl-20-q',
  'e2b4f9d0-1234-4567-89ab-cdef01234567',
  'Standard 20-Question Quick Test OMR',
  20,
  4,
  '{"columns": 2, "rows_per_col": 10, "bubble_radius": 14, "spacing_x": 30, "spacing_y": 28, "markers": [[40,40],[550,40],[40,780],[550,780]]}'::jsonb
),
(
  'omr-tpl-50-q',
  'e2b4f9d0-1234-4567-89ab-cdef01234567',
  'Standard 50-Question Minor Exam OMR',
  50,
  4,
  '{"columns": 2, "rows_per_col": 25, "bubble_radius": 12, "spacing_x": 26, "spacing_y": 22, "markers": [[30,30],[560,30],[30,800],[560,800]]}'::jsonb
),
(
  'omr-tpl-100-q',
  'e2b4f9d0-1234-4567-89ab-cdef01234567',
  'NEET Full Mock 100-Question OMR',
  100,
  4,
  '{"columns": 4, "rows_per_col": 25, "bubble_radius": 10, "spacing_x": 22, "spacing_y": 20, "markers": [[30,30],[565,30],[30,810],[565,810]]}'::jsonb
)
ON CONFLICT (id) DO NOTHING;
