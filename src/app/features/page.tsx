import MarketingNavbar from '@/components/marketing/Navbar';
import MarketingFooter from '@/components/marketing/Footer';
import Link from 'next/link';
import { 
  FileText, 
  Camera, 
  MessageSquare, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Binary,
  Layers,
  Sparkles
} from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">Product Capabilities</span>
            <h1 className="text-4xl font-extrabold text-navy-900 tracking-tight">
              Enterprise Features Crafted for Indian Coaching Institutes
            </h1>
            <p className="text-slate-600 text-lg">
              Explore the detailed mechanics of our AI question generator, mobile OMR checker, Meta WhatsApp parent alerts, and integrated fees.
            </p>
          </div>

          {/* Feature 1 Deep Dive */}
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                1. AI Question Paper Generator
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Powered by Google Gemini 1.5 Flash Vision. Extract questions from teacher handwritten notes, textbooks, and past papers with 100% mathematical equation fidelity in LaTeX.
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Supports Hindi, English, and bilingual exam layouts</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Single-column & dual-column print-ready A4 PDFs with KaTeX math rendering</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Interactive human verification step: teachers can edit text, options & marks before final export</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link href="/dashboard/generator" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                  Try Question Generator in Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs font-mono space-y-3">
              <div className="font-bold text-slate-700 pb-2 border-b border-slate-200 flex justify-between">
                <span>LaTeX Equation Extraction</span>
                <span className="text-teal-600 font-bold">KaTeX Rendered</span>
              </div>
              <div className="p-3 bg-white rounded border border-slate-200 text-navy-900">
                Q. Find linear acceleration of solid cylinder rolling down an incline:
                <div className="font-serif text-sm mt-1 text-indigo-900 font-semibold">
                  a = (g sin θ) / (1 + I / MR²) = (2/3) g sin θ
                </div>
              </div>
              <div className="text-[11px] text-slate-500">
                Extracted cleanly without hallucinating formulas or answers.
              </div>
            </div>
          </div>

          {/* Feature 2 Deep Dive */}
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs font-mono space-y-3">
              <div className="font-bold text-slate-700 pb-2 border-b border-slate-200 flex justify-between">
                <span>OMR Bubble Confidence Engine</span>
                <span className="text-emerald-600 font-bold">98.4% Accuracy</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                  <span>Q.01: Option B (Darkness: 94%)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">High Confidence</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                  <span>Q.02: Option C (Darkness: 52%)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">Flagged for Review</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-500">
                Zero low-confidence results are finalized automatically without teacher inspection.
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-5">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 font-bold">
                <Camera className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                2. Smartphone OMR Scanner
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Check up to 100 answer sheets in 10 minutes using your smartphone camera or uploaded scans. Standardized printable sheets with 4-corner perspective alignment.
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>20, 50, and 100-question templates with Roll Number and Test ID barcodes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Configurable marking scheme: supports negative marking & unattempted rules</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Manual review modal: inspect ambiguous marks with zoomed bubble preview</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link href="/dashboard/omr-scanner" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-800">
                  Open OMR Scanner Module <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 3 Deep Dive */}
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                3. WhatsApp Parent Communication & Teacher Bot
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Direct integration with official Meta WhatsApp Cloud API. Send automated test report cards, attendance alerts, and fee reminders without risking phone number bans.
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Teacher Bot: Teachers can text "Generate 20-Q Physics test for class 12" and receive PDF via WhatsApp</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Automated test report card delivery with marks, percentage, rank & PDF links</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Absence alerts: automatically notify parents the moment daily attendance is submitted</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link href="/dashboard/parent-communication" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-800">
                  Test WhatsApp Broadcasts <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="bg-emerald-950 text-white p-6 rounded-xl border border-emerald-800 text-xs font-mono space-y-3">
              <div className="font-bold text-emerald-300 pb-2 border-b border-emerald-800 flex justify-between">
                <span>Official Meta Cloud API Message</span>
                <span>Delivered</span>
              </div>
              <div className="p-3 bg-emerald-900/60 rounded border border-emerald-700/50 leading-relaxed">
                🏆 *Apex Academy – Result Update*<br /><br />
                Dear Parent, Aarav Singhania scored *12/12 (100%, Rank #1)* in JEE Advanced Minor Test 01.<br /><br />
                📄 Report Card: https://testsetu.ai/r/apex101
              </div>
              <div className="text-[11px] text-emerald-400">
                Cryptographic HMAC SHA-256 Webhook Verified
              </div>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
