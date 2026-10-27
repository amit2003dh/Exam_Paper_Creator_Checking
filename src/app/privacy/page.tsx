import MarketingNavbar from '@/components/marketing/Navbar';
import MarketingFooter from '@/components/marketing/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-3xl font-extrabold text-navy-900">Privacy Policy & DPDP Compliance</h1>
            <p className="text-xs text-slate-500 mt-1">Effective Date: October 27, 2026 • Compliant with Digital Personal Data Protection (DPDP) Act, India</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-900">1. Data Fiduciary & Ownership</h2>
            <p>
              TestSetu AI acts as a Data Processor on behalf of the registered Coaching Institute (the Data Fiduciary). All student information, parent phone numbers, academic scores, and fee records remain the exclusive property of the respective coaching institute.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-900">2. Collection of Student & Parent Information</h2>
            <p>
              We process student names, roll numbers, academic performance data, and parent mobile numbers exclusively for automated educational reporting (e.g. test marks, attendance alerts, fee receipts) requested by the institute.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-900">3. Multi-Tenant Data Isolation (Row-Level Security)</h2>
            <p>
              Each coaching institute’s data is strictly partitioned using PostgreSQL Row-Level Security (RLS) policies. No institute, teacher, or student from another tenant can view, access, or query data outside their authorized domain.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-900">4. Official Meta Cloud API & Third-Party Processors</h2>
            <p>
              WhatsApp parent notifications are routed exclusively through official Meta Cloud API infrastructure. Payments are processed securely via PCI-DSS Level 1 compliant Razorpay gateways. We do not store raw card details or banking passwords.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-900">5. Data Retention & Deletion</h2>
            <p>
              Institutes may request complete erasure of student records, answer sheets, or test papers upon written notification to privacy@testsetu.ai.
            </p>
          </section>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
