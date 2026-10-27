'use client';

import { useEffect, useState } from 'react';
import { CreditCard, Plus, Copy, Check, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function FeesPage() {
  const [fees, setFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notification, setNotification] = useState('');

  const [formData, setFormData] = useState({
    student_id: 's1111111-0000-0000-0000-000000000001',
    title: 'Term 2 Tuition Fee (PCM)',
    due_date: '2026-11-30',
    total_amount: 62500,
  });

  const loadFees = async () => {
    try {
      const res = await fetch('/api/fees');
      const data = await res.json();
      if (data.success) {
        setFees(data.data);
      }
    } catch (err) {
      console.error('Error loading fees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFees();
  }, []);

  const handleCreateFee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/fees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_amount: Number(formData.total_amount),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create fee');
      }

      setNotification(`Fee record and Razorpay payment link created for ${data.data.student_name}!`);
      setShowAddModal(false);
      loadFees();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Tuition Fee Management</h1>
          <p className="text-xs text-slate-500">
            Student-wise tuition fee tracking, partial payment reconciliation, and Razorpay links
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4 text-teal-400" /> Create Fee Record
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Fees Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Roll / Student</th>
                <th className="py-3 px-4">Fee Particulars</th>
                <th className="py-3 px-4 text-right">Total Fee</th>
                <th className="py-3 px-4 text-right">Paid</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Due Date</th>
                <th className="py-3 px-4 text-right">Razorpay Payment Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {fees.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-navy-900">{f.student_name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{f.roll_number}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{f.title}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-navy-900">
                    ₹{f.total_amount?.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-700 font-bold">
                    ₹{f.paid_amount?.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-rose-700 font-extrabold">
                    ₹{f.balance_amount?.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      f.status === 'paid'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : f.status === 'partial'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {f.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500 font-mono text-[11px]">{f.due_date}</td>
                  <td className="py-3.5 px-4 text-right">
                    {f.razorpay_payment_url ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleCopyLink(f.razorpay_payment_url, f.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center gap-1"
                        >
                          {copiedId === f.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === f.id ? 'Copied' : 'Copy'}</span>
                        </button>
                        <a
                          href={f.razorpay_payment_url}
                          target="_blank"
                          className="p-1 text-slate-400 hover:text-indigo-600 rounded"
                          title="Open Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-[11px]">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Fee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-navy-900">Create Fee Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateFee} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Student</label>
                <select
                  value={formData.student_id}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                >
                  <option value="s1111111-0000-0000-0000-000000000001">Aarav Singhania (APEX-26-001)</option>
                  <option value="s2222222-0000-0000-0000-000000000002">Priya Deshmukh (APEX-26-002)</option>
                  <option value="s3333333-0000-0000-0000-000000000003">Rohan Meena (APEX-26-003)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fee Particulars Title</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  placeholder="Term 2 Tuition Fee"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (₹ INR)</label>
                  <input
                    required
                    type="number"
                    value={formData.total_amount}
                    onChange={(e) => setFormData({ ...formData, total_amount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
                  <input
                    required
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs">
                  Generate Razorpay Link
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
