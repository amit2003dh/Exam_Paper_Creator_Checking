'use client';

import { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, ShieldCheck, Phone, Users, Sparkles } from 'lucide-react';

export default function ParentCommunicationPage() {
  const [targetType, setTargetType] = useState<'batch' | 'individual' | 'all'>('batch');
  const [template, setTemplate] = useState<'result' | 'attendance' | 'fee' | 'announcement'>('result');
  const [phone, setPhone] = useState('+919811199988');
  const [studentName, setStudentName] = useState('Aarav Singhania');
  const [customText, setCustomText] = useState('');
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatusMessage('');

    let finalMessage = customText;
    if (!finalMessage) {
      if (template === 'result') {
        finalMessage = `🏆 *Apex Academy – Result Update*\n\nDear Parent, Assessment results for *${studentName}* have been declared.\n\n📝 Test: JEE Advanced Minor Test 01\n📊 Score: 12 / 12 (100%)\n🏅 Batch Rank: #1\n\n_TestSetu AI – Smart Coaching Operating System_`;
      } else if (template === 'attendance') {
        finalMessage = `📋 *Apex Academy – Attendance Alert*\n\nStudent: *${studentName}*\nStatus: ✅ Present for JEE Advanced 2027 Super-30\nDate: ${new Date().toLocaleDateString('en-IN')}`;
      } else if (template === 'fee') {
        finalMessage = `💳 *Apex Academy – Fee Reminder*\n\nDear Parent,\nThis is a gentle reminder regarding Term 1 Tuition Fee for *${studentName}*.\n\nOutstanding: ₹32,500\nDue Date: 15 Nov 2026\n\nPay via UPI: https://rzp.io/i/apex102`;
      } else {
        finalMessage = `📢 *Apex Academy Announcement*\n\nPlease note that the special doubt clearance session will be held this Sunday at 10:00 AM.`;
      }
    }

    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient_phone: phone,
          message_type: template === 'result' ? 'result_alert' : template === 'attendance' ? 'attendance_alert' : 'fee_reminder',
          message_text: finalMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch message');
      }

      setStatusMessage(`Official Meta Cloud WhatsApp message dispatched to ${phone} (Meta ID: ${data.messageId})!`);
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Parent Communication Hub</h1>
          <p className="text-xs text-slate-500">
            Send Meta Cloud API verified result cards, attendance alerts, and payment reminders
          </p>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Settings (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <form onSubmit={handleSend} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Recipient Target</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTargetType('batch')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                    targetType === 'batch' ? 'bg-navy-900 text-white border-navy-900' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  Specific Batch
                </button>
                <button
                  type="button"
                  onClick={() => setTargetType('individual')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                    targetType === 'individual' ? 'bg-navy-900 text-white border-navy-900' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  Individual Student
                </button>
                <button
                  type="button"
                  onClick={() => setTargetType('all')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                    targetType === 'all' ? 'bg-navy-900 text-white border-navy-900' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  All Parents
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Message Template Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setTemplate('result')}
                  className={`p-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                    template === 'result' ? 'bg-indigo-50 border-indigo-500 text-indigo-900' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  🏆 Test Result
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('attendance')}
                  className={`p-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                    template === 'attendance' ? 'bg-indigo-50 border-indigo-500 text-indigo-900' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  📋 Attendance
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('fee')}
                  className={`p-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                    template === 'fee' ? 'bg-indigo-50 border-indigo-500 text-indigo-900' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  💳 Fee Due Link
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('announcement')}
                  className={`p-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                    template === 'announcement' ? 'bg-indigo-50 border-indigo-500 text-indigo-900' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  📢 Circular
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Parent WhatsApp Mobile</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Custom Notes / Additions (Optional)</label>
              <textarea
                rows={3}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Leave blank to use the official approved Meta template shown on the right..."
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
            >
              <Send className="w-4 h-4" />
              {sending ? 'Dispatching to Meta Cloud API...' : 'Send WhatsApp Message Now'}
            </button>
          </form>
        </div>

        {/* Live Smartphone Chat Mockup (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 text-white">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Meta WhatsApp Cloud API Live Preview
            </span>
            <span className="text-[10px]">Recipient: {phone}</span>
          </div>

          {/* Smartphone Chat Bubble */}
          <div className="bg-[#0b141a] p-4 rounded-2xl border border-slate-800 space-y-3 font-sans text-xs">
            <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tl-none shadow-sm space-y-2 max-w-sm">
              {template === 'result' && (
                <>
                  <div className="font-bold text-teal-200">🏆 Apex Academy – Official Result</div>
                  <div>Dear Parent, Assessment results for <strong>{studentName}</strong> have been declared.</div>
                  <div className="text-[11px] bg-black/20 p-2 rounded">
                    <div>📝 Test: JEE Advanced Minor Test 01</div>
                    <div>📊 Score: 12 / 12 (100%)</div>
                    <div>🏅 Batch Rank: #1</div>
                  </div>
                  <div className="text-[10px] text-teal-200">📄 PDF Report Card Attached</div>
                </>
              )}

              {template === 'attendance' && (
                <>
                  <div className="font-bold text-teal-200">📋 Apex Academy – Attendance Alert</div>
                  <div>Student: <strong>{studentName}</strong></div>
                  <div>Status: ✅ Present for JEE Advanced 2027 Super-30</div>
                  <div className="text-[10px] text-teal-300">Date: {new Date().toLocaleDateString('en-IN')}</div>
                </>
              )}

              {template === 'fee' && (
                <>
                  <div className="font-bold text-teal-200">💳 Apex Academy – Fee Due Reminder</div>
                  <div>Dear Parent, tuition fees for <strong>{studentName}</strong> are due.</div>
                  <div className="text-[11px] bg-black/20 p-2 rounded">
                    <div>💰 Amount Due: ₹32,500</div>
                    <div>📅 Due Date: 15 Nov 2026</div>
                  </div>
                  <div className="text-teal-200 underline text-[11px]">Pay via UPI: https://rzp.io/i/apex102</div>
                </>
              )}

              {template === 'announcement' && (
                <>
                  <div className="font-bold text-teal-200">📢 Official Institute Circular</div>
                  <div>{customText || 'Please note that special doubt classes will be held this Sunday at 10:00 AM.'}</div>
                </>
              )}

              <div className="text-[9px] text-teal-300/80 text-right">
                10:14 AM • Delivered ✓✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
