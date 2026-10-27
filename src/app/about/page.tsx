import MarketingNavbar from '@/components/marketing/Navbar';
import MarketingFooter from '@/components/marketing/Footer';
import { Target, Users, ShieldCheck, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">Our Mission</span>
            <h1 className="text-4xl font-extrabold text-navy-900 tracking-tight">
              Empowering India's Offline & Hybrid Coaching Institutes
            </h1>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              We bridge the gap between world-class AI technology and physical classroom instruction for tuition centres and competitive exam academies across Bharat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-navy-900">Built for Real Teachers</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Teachers shouldn't have to spend late nights manually typing math formulas into Microsoft Word or grading hundreds of paper circles by hand.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-navy-900">Direct Parent Trust</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Parents in India prioritize transparency. By sending immediate attendance and test report cards via WhatsApp, institutes build generational trust.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-navy-900">DPDP Privacy Compliance</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Strict multi-tenant database isolation ensures student phone numbers, parent contact info, and marks are never exposed or shared across institutes.
              </p>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
