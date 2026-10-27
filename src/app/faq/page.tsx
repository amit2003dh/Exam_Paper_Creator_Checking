import MarketingNavbar from '@/components/marketing/Navbar';
import MarketingFooter from '@/components/marketing/Footer';
import { HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'Do I need expensive OMR scanners or dedicated hardware?',
      a: 'No. TestSetu AI is engineered to evaluate standard printed OMR sheets using any smartphone camera (Android or iOS) or standard flatbed scanner. Our computer vision algorithm performs four-corner perspective alignment automatically.',
    },
    {
      q: 'Does the AI Question Generator hallucinate mathematical equations?',
      a: 'No. We strictly forbid unchecked generation. We extract mathematical equations into standard LaTeX, render them via KaTeX, and present a human verification step where the teacher can inspect and edit every question, diagram, and mark before export.',
    },
    {
      q: 'Is WhatsApp messaging safe from phone number bans?',
      a: 'Yes. We strictly use Meta’s official WhatsApp Cloud API with approved messaging templates and cryptographically verified webhooks. We never use unofficial Selenium or browser scraping tools that get WhatsApp numbers banned.',
    },
    {
      q: 'Can we collect tuition fees via UPI and Razorpay?',
      a: 'Yes. Every student fee record can generate an instant Razorpay payment link. Parents can pay via Google Pay, PhonePe, Paytm, Cards, or NetBanking. Our server-side webhook reconciles payments automatically and issues receipts.',
    },
    {
      q: 'Can other coaching institutes see my students or question papers?',
      a: 'Never. TestSetu AI enforces strict tenant isolation using PostgreSQL Row-Level Security (RLS) and cryptographic tenant derivation. Each institute’s data is completely siloed and inaccessible to other users.',
    },
    {
      q: 'Does it support bilingual (Hindi and English) test papers?',
      a: 'Yes. You can generate papers in English, Hindi, or bilingual formats with proper Devanagari font rendering.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">Answers to Common Questions</span>
            <h1 className="text-4xl font-extrabold text-navy-900 tracking-tight">Frequently Asked Questions</h1>
            <p className="text-slate-600">Everything you need to know about TestSetu AI features, technology, and compliance.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                <h3 className="font-bold text-base text-navy-900 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-slate-600 pl-7 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
