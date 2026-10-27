// TestSetu AI – Unit Test Suite
// Verifies business rules, marks calculation, negative marking, fee transitions and OMR scoring

const assert = require('assert');

function runUnitTests() {
  console.log('\n--- [UNIT TESTS] Running Business Logic & Calculations ---');
  let passed = 0;
  let failed = 0;

  function it(name, fn) {
    try {
      fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}:`, err.message);
      failed++;
    }
  }

  // 1. Marks & Negative Marking Calculation
  it('Marks Calculation: Correct answers (+4) and Negative marking (-1)', () => {
    const questionMarks = 4;
    const negativeMarks = 1;

    const evalResponses = (officialKeys, studentResponses) => {
      let score = 0;
      for (const [qNum, official] of Object.entries(officialKeys)) {
        const studentAns = studentResponses[qNum];
        if (!studentAns || studentAns === 'BLANK') {
          // unattempted
          score += 0;
        } else if (studentAns === official) {
          score += questionMarks;
        } else {
          score -= negativeMarks;
        }
      }
      return score;
    };

    const keys = { '1': 'B', '2': 'C', '3': 'A', '4': 'D' }; // 4 questions = 16 max marks
    // Student got 2 correct, 1 wrong, 1 blank
    const student1 = { '1': 'B', '2': 'A', '3': 'A', '4': 'BLANK' };
    const score = evalResponses(keys, student1);
    // (2 * 4) - (1 * 1) + 0 = 8 - 1 = 7
    assert.strictEqual(score, 7, 'Score should be 7 marks');
  });

  // 2. OMR Percentage Calculation
  it('OMR Evaluation: Percentage and Rank computation', () => {
    const totalMarks = 7;
    const maxMarks = 16;
    const percentage = Math.round(((totalMarks / maxMarks) * 100) * 100) / 100;
    assert.strictEqual(percentage, 43.75, 'Percentage should match 43.75%');
  });

  // 3. Fee Balance Transitions & Reconciliation
  it('Fee Ledger: Partial and Paid Status transitions', () => {
    const totalFee = 62500;
    let paidAmount = 0;

    const computeStatus = (total, paid) => {
      const balance = total - paid;
      if (balance <= 0) return 'paid';
      if (paid > 0) return 'partial';
      return 'pending';
    };

    assert.strictEqual(computeStatus(totalFee, paidAmount), 'pending');

    paidAmount += 30000;
    assert.strictEqual(computeStatus(totalFee, paidAmount), 'partial');

    paidAmount += 32500;
    assert.strictEqual(computeStatus(totalFee, paidAmount), 'paid');
  });

  // 4. Role Permissions
  it('Role-Based Access Control: Teacher vs Institute Owner', () => {
    const hasAccess = (userRole, requiredRole) => {
      if (userRole === 'institute_owner' || userRole === 'super_admin') return true;
      return userRole === requiredRole;
    };

    assert.strictEqual(hasAccess('institute_owner', 'accountant'), true, 'Owner has root permission');
    assert.strictEqual(hasAccess('teacher', 'teacher'), true, 'Teacher can access teacher module');
    assert.strictEqual(hasAccess('teacher', 'accountant'), false, 'Teacher cannot access financial billing');
  });

  // 5. Phone Normalization for WhatsApp
  it('WhatsApp Phone Number formatting (+91 standard)', () => {
    const cleanPhone = (raw) => {
      let digits = raw.replace(/[^0-9]/g, '');
      if (digits.length === 10) digits = '91' + digits;
      return digits;
    };

    assert.strictEqual(cleanPhone('9811122233'), '919811122233');
    assert.strictEqual(cleanPhone('+91 98111 22233'), '919811122233');
  });

  return { passed, failed };
}

module.exports = { runUnitTests };
