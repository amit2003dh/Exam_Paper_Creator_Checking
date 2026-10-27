'use client';

import { useEffect, useState } from 'react';
import { Receipt, CheckCircle2, Download, Printer, CreditCard } from 'lucide-react';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayments() {
      try {
        const res = await fetch('/api/payments/history');
        const data = await res.json();
        if (data.success) {
          setPayments(data.data);
        }
      } catch (err) {
        console.error('Error loading payments:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPayments();
  }, []);

  const handlePrintReceipt = (p: any) => {
    alert(`Receipt #${p.receipt_number}\nAmount: ₹${p.amount.toLocaleString('en-IN')}\nMode: ${p.payment_mode}\nTransaction ID: ${p.razorpay_payment_id || 'N/A'}\nStatus: Verified Complete`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Payment History & Receipts</h1>
          <p className="text-xs text-slate-500">
            Reconciled transactions, digital receipts, and verified payment gateway records
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Receipt Number</th>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Payment Mode</th>
                <th className="py-3 px-4 text-right">Amount Paid</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Date & Time</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-navy-900">{p.receipt_number}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{p.razorpay_payment_id || 'CASH_REC'}</td>
                  <td className="py-3.5 px-4 uppercase text-[11px] font-bold text-slate-700">{p.payment_mode}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-extrabold text-emerald-700 text-sm">
                    ₹{p.amount?.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Reconciled
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500 font-mono text-[11px]">
                    {new Date(p.payment_date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handlePrintReceipt(p)}
                      className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] inline-flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5 text-indigo-600" /> Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
