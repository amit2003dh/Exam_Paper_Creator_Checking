import MarketingNavbar from '@/components/marketing/Navbar';
import MarketingFooter from '@/components/marketing/Footer';
import Link from 'next/link';
import { UploadCloud, CheckCircle, Smartphone, Send, ArrowRight } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Input Questions via Any Channel',
      icon: UploadCloud,
      desc: 'Type questions, upload photographs of handwritten teacher notes, extract from past question PDFs, or simply message our WhatsApp Teacher Bot.',
      badge: 'Multi-Modal Input',
    },
    {
      num: '02',
      title: 'Human Verification & 1-Click Export',
      icon: CheckCircle,
      desc: 'Our Gemini-powered engine structures LaTeX equations and options. Review in the visual editor, add your institute watermark, and export single or dual-column A4 PDFs with answer keys.',
      badge: 'Zero Hallucinations',
    },
    {
      num: '03',
      title: 'Print & Scan OMR via Mobile Camera',
      icon: Smartphone,
      desc: 'Distribute standard 20, 50, or 100-Q OMR sheets. After the exam, evaluate answer sheets in seconds using your smartphone camera with automatic corner detection.',
      badge: 'Sub-Second Scoring',
    },
    {
      num: '04',
      title: 'Automated WhatsApp Delivery & Analytics',
      icon: Send,
      desc: 'Individual report cards with student rank, percentage, and PDF links are sent to parents on WhatsApp. Collect pending fees via Razorpay UPI links.',
      badge: 'Instant Parent Trust',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">Workflow Blueprint</span>
            <h1 className="text-4xl font-extrabold text-navy-900 tracking-tight">
              How TestSetu AI Works in Real Coaching Classes
            </h1>
            <p className="text-slate-600 text-lg">
              Designed specifically around the daily operating workflow of Indian tuition centres and premier exam academies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.num} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-slate-200">{st.num}</span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-teal-50 text-teal-700 border border-teal-200">
                      {st.badge}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-navy-900 text-teal-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900">{st.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to see it in action?</h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm">
              You can immediately test question generation, OMR evaluation, and WhatsApp messaging in our pre-loaded coaching sandbox.
            </p>
            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold transition-all"
              >
                Launch Sandbox Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
