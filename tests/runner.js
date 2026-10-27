// TestSetu AI – Master Automated Test Runner
// Runs Unit, Integration, and Security test suites

const { runUnitTests } = require('./unit.test');
const { runIntegrationTests } = require('./integration.test');
const { runSecurityTests } = require('./security.test');

console.log('================================================================');
console.log('  TESTSETU AI – AUTOMATED VERIFICATION & QUALITY TEST SUITE   ');
console.log('================================================================');

const unit = runUnitTests();
const integration = runIntegrationTests();
const security = runSecurityTests();

const totalPassed = unit.passed + integration.passed + security.passed;
const totalFailed = unit.failed + integration.failed + security.failed;

console.log('\n================================================================');
console.log(`  FINAL TEST SUMMARY: ${totalPassed} PASSED, ${totalFailed} FAILED`);
console.log('================================================================\n');

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log('✓ ALL TEST SUITES EXECUTED AND PASSED CLEANLY.');
  process.exit(0);
}
