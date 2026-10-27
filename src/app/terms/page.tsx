import MarketingNavbar from '@/components/marketing/Navbar';
import MarketingFooter from '@/components/marketing/Footer';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-3xl font-extrabold text-navy-900">Terms and Conditions of Service</h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: October 27, 2026 • TestSetu AI Technologies Pvt Ltd</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-900">1. Acceptance of Terms</h2>
            <p>
              By signing up for or using TestSetu AI SaaS services, you agree to comply with and be bound by these Terms. If you are registering on behalf of a coaching institute, you affirm that you have the authority to bind the entity.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-900">2. Permitted Use</h2>
            <p>
              TestSetu AI is provided exclusively for legitimate educational assessment, question paper preparation, OMR grading, and parent notifications. Any malicious use, attempted penetration testing without authorization, or spamming is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-900">3. Subscription, Quotas & Payments</h2>
            <p>
              Subscriptions are billed in Indian Rupees (INR) through Razorpay. Quotas for AI question papers, OMR scans, and active students reset on a monthly cycle according to your chosen plan.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-900">4. Jurisdiction</h2>
            <p>
              These terms are governed by the laws of India. Any disputes arising out of the service shall be subject to the exclusive jurisdiction of the competent courts in Kota / New Delhi, India.
            </p>
          </section>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
