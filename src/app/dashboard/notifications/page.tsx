'use client';

import { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, CreditCard, Camera, Sparkles, Check } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: 'Fee Payment Received (₹62,500)',
      message: 'Aarav Singhania (APEX-26-001) paid Term 1 Tuition Fee via Razorpay UPI. Receipt REC-APEX-2026-001 issued.',
      type: 'payment',
      time: '15 mins ago',
      read: false,
    },
    {
      id: 'n-2',
      title: 'OMR Low Confidence Inspection Flagged',
      message: 'Sheet #sheet-102 (Priya Deshmukh) has 1 bubble marked with 52% fill darkness. Teacher manual verification recommended.',
      type: 'omr',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 'n-3',
      title: 'Absence WhatsApp Alert Dispatched',
      message: 'Rohan Meena was marked absent for JEE Advanced 2027 Super-30. Parent WhatsApp alert delivered successfully.',
      type: 'whatsapp',
      time: '2 hours ago',
      read: true,
    },
    {
      id: 'n-4',
      title: 'AI Question Paper Ready',
      message: 'JEE Main Rotational Motion & Gravitation Minor Test 01 generated with 5 KaTeX formulas.',
      type: 'paper',
      time: '3 hours ago',
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Notification Centre</h1>
          <p className="text-xs text-slate-500">
            Real-time institute alerts, OMR review flags, fee receipts, and parent communication statuses
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Check className="w-3.5 h-3.5 text-indigo-600" /> Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
              !n.read ? 'bg-white border-indigo-200 shadow-sm' : 'bg-slate-50/60 border-slate-200 text-slate-600'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              n.type === 'payment'
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : n.type === 'omr'
                ? 'bg-amber-50 text-amber-600 border border-amber-200'
                : n.type === 'whatsapp'
                ? 'bg-teal-50 text-teal-600 border border-teal-200'
                : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
            }`}>
              {n.type === 'payment' && <CreditCard className="w-4 h-4" />}
              {n.type === 'omr' && <Camera className="w-4 h-4" />}
              {n.type === 'whatsapp' && <CheckCircle2 className="w-4 h-4" />}
              {n.type === 'paper' && <Sparkles className="w-4 h-4" />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-navy-900">{n.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
