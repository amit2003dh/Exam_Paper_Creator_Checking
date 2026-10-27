import MarketingNavbar from '@/components/marketing/Navbar';
import MarketingFooter from '@/components/marketing/Footer';
import Link from 'next/link';
import { Check, Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '₹799',
      period: '/ month',
      description: 'Ideal for independent teachers and small tuition centres up to 100 students.',
      popular: false,
      features: [
        'Up to 100 Active Students',
        '15 AI Question Papers / Month',
        'Text & Image OCR Processing',
        'Single & Dual Column PDF Export',
        'Basic Online Test Portal',
        'Standard Email & Chat Support',
      ],
      cta: 'Get Started with Starter',
      badge: 'Tuition Centres',
    },
    {
      name: 'Growth',
      price: '₹1,499',
      period: '/ month',
      description: 'For established coaching institutes and JEE/NEET competitive academies.',
      popular: true,
      features: [
        'Up to 300 Active Students',
        '40 AI Question Papers / Month',
        'Smartphone OMR Scanner & Templates',
        'WhatsApp Parent Notifications & Bot',
        'Automated Fee Reminders & Razorpay',
        'Institute Logo & Custom Branding',
        'Excel & PDF Result Analytics Export',
      ],
      cta: 'Upgrade to Growth Plan',
      badge: 'Most Popular for Academies',
    },
    {
      name: 'Annual Pro',
      price: '₹11,999',
      period: '/ year',
      description: 'Maximum value with annual billing. Save 33% compared to monthly.',
      popular: false,
      features: [
        'All Growth Plan Capabilities',
        'Up to 1,000 Active Students',
        'Unlimited AI Question Papers',
        'Unlimited Smartphone OMR Scans',
        'Priority Meta Cloud Delivery Queue',
        'Dedicated Institute Onboarding Engineer',
        'Multi-Branch & Teacher Role Management',
      ],
      cta: 'Choose Annual Pro Plan',
      badge: 'Save 33% Yearly',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">Transparent Indian Pricing</span>
            <h1 className="text-4xl font-extrabold text-navy-900 tracking-tight">
              Invest in Speed, Precision & Parent Trust
            </h1>
            <p className="text-slate-600 text-lg">
              Affordable INR subscription plans designed for Indian educators. No hidden setup charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all bg-white border ${
                  p.popular
                    ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-xl relative'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {p.badge}
                    </span>
                    {p.popular && (
                      <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-indigo-600 text-white">
                        <Sparkles className="w-3 h-3" /> Recommended
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-extrabold text-navy-900">{p.name}</h3>
                  <p className="text-sm text-slate-500 mt-2 min-h-[40px]">{p.description}</p>
                  <div className="my-6">
                    <span className="text-4xl font-extrabold text-navy-900">{p.price}</span>
                    <span className="text-slate-500 font-medium text-sm">{p.period}</span>
                    <div className="text-xs text-slate-500 mt-1">Exclusive of GST</div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Features</span>
                    {p.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="/dashboard/billing"
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      p.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                        : 'bg-navy-900 hover:bg-navy-800 text-white'
                    }`}
                  >
                    {p.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-100/80 rounded-2xl p-6 border border-slate-200 text-center max-w-2xl mx-auto text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">Secure Indian Payments via Razorpay</div>
            <div>All subscriptions support UPI (Google Pay, PhonePe, Paytm), NetBanking, and RuPay/Visa/MasterCard credit and debit cards.</div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
