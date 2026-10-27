'use client';

import { useState } from 'react';
import MarketingNavbar from '@/components/marketing/Navbar';
import MarketingFooter from '@/components/marketing/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    institute: '',
    phone: '',
    city: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">Get in Touch</span>
            <h1 className="text-4xl font-extrabold text-navy-900 tracking-tight">Contact TestSetu AI Sales & Support</h1>
            <p className="text-slate-600">Have questions about setting up your coaching institute or need custom high-volume quotas?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-navy-900">Head Office</h3>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Kota & Delhi Innovation Hubs, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>+91 98290 12345 (Sales & Onboarding)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>support@testsetu.ai</span>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50/70 p-6 rounded-2xl border border-teal-200 text-teal-900 text-sm space-y-2">
                <div className="font-bold text-teal-950">Free 30-Minute Institute Onboarding</div>
                <p className="text-xs text-teal-800 leading-relaxed">
                  Our academic engineers will help you calibrate your OMR camera checking and configure official WhatsApp templates for your institute.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900">Message Received</h3>
                  <p className="text-sm text-slate-600">Our team will call or WhatsApp you on {formData.phone || '+91'} within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="e.g. Er. Arvind Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Coaching Institute Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="e.g. Apex IIT Academy"
                      value={formData.institute}
                      onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / WhatsApp</label>
                      <input
                        required
                        type="tel"
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                      <input
                        required
                        type="text"
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        placeholder="Kota / Patna / Delhi"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Requirement / Message</label>
                    <textarea
                      rows={3}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="We have 250 JEE students and need OMR checking and WhatsApp alerts..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    Send Inquiry <Send className="w-4 h-4 text-teal-400" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
