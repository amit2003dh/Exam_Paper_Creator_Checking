import Link from 'next/link';
import MarketingNavbar from '@/components/marketing/Navbar';
import MarketingFooter from '@/components/marketing/Footer';
import { 
  Sparkles, 
  FileText, 
  Camera, 
  MessageSquare, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Layers,
  GraduationCap
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MarketingNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Designed for Offline & Hybrid Institutes in India
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.15]">
                The AI-Powered Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-600">Coaching Institutes</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Generate bilingual question papers with LaTeX in 60 seconds, evaluate OMR sheets with your smartphone camera, and deliver report cards to parents directly through official WhatsApp.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-base shadow-lg shadow-navy-900/10 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  Enter Institute Dashboard
                  <ArrowRight className="w-5 h-5 text-teal-400" />
                </Link>
                <Link
                  href="/features"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-300 shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  Explore Core Modules
                </Link>
              </div>

              {/* Live Highlights / Exam Badges */}
              <div className="pt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600">
                <span className="px-3 py-1 bg-white rounded-md border border-slate-200">JEE Main & Advanced</span>
                <span className="px-3 py-1 bg-white rounded-md border border-slate-200">NEET-UG</span>
                <span className="px-3 py-1 bg-white rounded-md border border-slate-200">CBSE Class 9th–12th</span>
                <span className="px-3 py-1 bg-white rounded-md border border-slate-200">Hindi & English Bilingual</span>
                <span className="px-3 py-1 bg-white rounded-md border border-slate-200">Mobile Camera OMR</span>
                <span className="px-3 py-1 bg-white rounded-md border border-slate-200">Meta Cloud WhatsApp</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 CORE CAPABILITIES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-600">Complete Institute Stack</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                Four Powerful Engines In One Platform
              </h2>
              <p className="text-slate-600">
                Eliminate multiple fragmented tools. TestSetu AI unifies paper generation, optical checking, parent communication, and fee operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition-all hover:shadow-md space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">AI Question Paper Maker</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Type questions, upload textbook photos, handwritten teacher notes, or trigger test generation via WhatsApp bot. Outputs A4 single/dual-column PDFs with KaTeX equations.
                </p>
                <div className="pt-2 text-xs font-semibold text-indigo-600 flex items-center gap-1">
                  Human verification step included <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-all hover:shadow-md space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">Smartphone OMR Scanner</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Print standardized 20, 50, or 100-question sheets. Scan using any phone camera or flatbed scanner with perspective correction and confidence scoring.
                </p>
                <div className="pt-2 text-xs font-semibold text-teal-600 flex items-center gap-1">
                  Auto-flags uncertain bubbles <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all hover:shadow-md space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">WhatsApp Parent Bot</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Official Meta Cloud API integration. Instantly dispatch student rank, percentage, absent alerts, and fee receipts to parents' WhatsApp with 99.8% open rate.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  Meta compliant templates <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all hover:shadow-md space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">Fees & Razorpay Payments</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Student-wise fee tracking with automated payment links, partial payment management, UPI reconciliation, and verifiable digital receipts.
                </p>
                <div className="pt-2 text-xs font-semibold text-amber-600 flex items-center gap-1">
                  Server-side webhook verified <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THREE TIER ARCHITECTURE PROOF */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs uppercase font-bold tracking-wider text-teal-400">Enterprise Engineering</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Built on a Strict Three-Tier Multi-Tenant SaaS Architecture
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  No mock data or client-side trust. TestSetu AI enforces tenant isolation through verified server-side institute memberships and PostgreSQL Row-Level Security (RLS).
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200"><strong>Tier 1 (Presentation):</strong> Next.js App Router, Tailwind CSS, KaTeX mathematical rendering, and accessible interactive interfaces.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200"><strong>Tier 2 (Business Logic):</strong> Dedicated Gemini AI extraction, PDF engine, OMR computer vision analysis, and Meta webhook services.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200"><strong>Tier 3 (Data & Infrastructure):</strong> 34 relational entities, strict RLS policies, audit logs, and encrypted credentials.</span>
                  </div>
                </div>
              </div>

              {/* Code / Visual Box */}
              <div className="bg-navy-950 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Verified Tenant Isolation Policy
                  </span>
                  <span>PostgreSQL / RLS</span>
                </div>
                <pre className="text-xs font-mono text-teal-300 overflow-x-auto leading-relaxed p-2">
{`CREATE POLICY tenant_isolation_policy ON students
  USING (
    institute_id IN (
      SELECT institute_id FROM institute_members 
      WHERE profile_id = auth.uid() AND is_active = true
    )
  );`}
                </pre>
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Cryptographic Webhook HMAC SHA-256</span>
                  <span className="text-emerald-400 font-semibold">Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-16 bg-gradient-to-r from-navy-900 to-indigo-950 text-white">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Upgrade Your Coaching Institute?</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Save over 25 hours every week in manual question paper typing and answer sheet checking.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-base shadow-lg transition-all"
              >
                Launch Institute Dashboard
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-all"
              >
                View Plans (Starting at ₹799/mo)
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
