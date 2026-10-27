import Link from 'next/link';
import { Sparkles, Shield, Lock, Award, Heart } from 'lucide-react';

export default function MarketingFooter() {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                TestSetu <span className="text-teal-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The AI-Powered Operating System purpose-built for offline and hybrid coaching institutes, tuition centres, and academies across India.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              Official Meta Cloud API & Razorpay Verified Partner
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Core Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/features" className="hover:text-teal-400 transition-colors">AI Question Paper Generator</Link></li>
              <li><Link href="/features" className="hover:text-teal-400 transition-colors">Smartphone OMR Checker</Link></li>
              <li><Link href="/features" className="hover:text-teal-400 transition-colors">Parent WhatsApp Automation</Link></li>
              <li><Link href="/features" className="hover:text-teal-400 transition-colors">Fee Collection & Razorpay</Link></li>
              <li><Link href="/pricing" className="hover:text-teal-400 transition-colors">Pricing & Plans</Link></li>
            </ul>
          </div>

          {/* Target Institutes */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Exam Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="text-slate-400">JEE Main & Advanced Institutes</span></li>
              <li><span className="text-slate-400">NEET-UG Medical Academies</span></li>
              <li><span className="text-slate-400">CBSE Class 9th to 12th Tuitions</span></li>
              <li><span className="text-slate-400">State Board & Foundation Batches</span></li>
              <li><span className="text-slate-400">Banking & Govt. Exam Centres</span></li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Trust & Compliance</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacy" className="hover:text-teal-400 transition-colors">DPDP Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-teal-400 transition-colors">FAQ & Support</Link></li>
              <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contact Indian Sales</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 TestSetu AI Technologies Pvt Ltd. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" /> in Kota, Delhi & Bengaluru for Indian Educators.
          </div>
        </div>
      </div>
    </footer>
  );
}
