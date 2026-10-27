'use client';

import { FileSpreadsheet, Download, FileText, Printer, CheckCircle2 } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      title: 'Batch Performance & Rank Ledger',
      description: 'Comprehensive rankings, percentile distributions, and question accuracy for JEE & NEET batches.',
      category: 'Academic',
      format: 'PDF & CSV',
    },
    {
      title: 'Monthly Attendance Roster',
      description: 'Daily student attendance percentage, absence logs, and parent alert dispatch audit.',
      category: 'Attendance',
      format: 'Excel (XLSX)',
    },
    {
      title: 'Tuition Fee Collection & Outstanding Audit',
      description: 'Complete financial statement showing student balances, partial payments, and overdue amounts.',
      category: 'Financial',
      format: 'PDF & CSV',
    },
    {
      title: 'WhatsApp Delivery & Read Receipts Summary',
      description: 'Meta Cloud API message tracking, parent response rates, and bounce analytics.',
      category: 'Communication',
      format: 'CSV Export',
    },
  ];

  const handleDownload = (title: string) => {
    alert(`Generating ${title} from database records... Download starting.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-navy-900">Institute Reports & Audits</h1>
        <p className="text-xs text-slate-500">
          Generate print-ready administrative, academic, and financial reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((r, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-indigo-300 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {r.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{r.format}</span>
              </div>
              <h3 className="font-extrabold text-base text-navy-900">{r.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{r.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => handleDownload(r.title)}
                className="w-full py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-teal-400" /> Export Official Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
