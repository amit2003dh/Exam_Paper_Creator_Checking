'use client';

import { useState } from 'react';
import { CreditCard, Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function BillingPage() {
  const [currentTier, setCurrentTier] = useState('growth');

  const usageMeters = [
    { label: 'Active Students Enrolled', current: 5, max: 300, unit: 'Students' },
    { label: 'AI Question Papers Generated', current: 2, max: 40, unit: 'Papers' },
    { label: 'OMR Answer Sheets Scanned', current: 2, max: 500, unit: 'Sheets' },
    { label: 'Meta WhatsApp Messages Dispatched', current: 3, max: 2000, unit: 'Messages' },
  ];

  const handleUpgrade = (tierName: string) => {
    alert(`Initiating Razorpay Subscription checkout for ${tierName}... Plan limits will update automatically upon webhook confirmation.`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-navy-900">Subscription & Usage Quotas</h1>
        <p className="text-xs text-slate-500">
          Manage your institute subscription tier, active billing cycle, and resource quotas
        </p>
      </div>

      {/* Active Plan Overview Banner */}
      <div className="bg-gradient-to-r from-navy-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Active Tier: Growth Plan
            </span>
            <span className="text-xs text-slate-300">Renews on 27 Nov 2026</span>
          </div>
          <div className="text-3xl font-extrabold">₹1,499 <span className="text-sm font-normal text-slate-300">/ month</span></div>
          <p className="text-xs text-slate-300 max-w-md">
            Your plan includes OMR scanning, official Meta WhatsApp automation, and custom institute branding.
          </p>
        </div>

        <button
          onClick={() => handleUpgrade('Annual Pro (₹11,999/year)')}
          className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs flex items-center gap-2 shadow"
        >
          <Zap className="w-4 h-4 fill-navy-950" /> Switch to Annual Pro (Save 33%)
        </button>
      </div>

      {/* Monthly Usage Meters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-navy-900">Current Monthly Quota Consumption</h2>
          <p className="text-xs text-slate-500">Quotas reset on the 1st of every calendar month</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {usageMeters.map((u, i) => {
            const pct = Math.round((u.current / u.max) * 100);
            return (
              <div key={i} className="space-y-2 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">{u.label}</span>
                  <span className="font-mono font-bold text-navy-900">{u.current} / {u.max} {u.unit}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${Math.max(4, pct)}%` }}></div>
                </div>
                <div className="text-[10px] text-slate-400 text-right">{pct}% utilized</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
