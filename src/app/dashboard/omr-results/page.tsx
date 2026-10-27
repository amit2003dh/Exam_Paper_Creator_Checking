'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Download, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  FileSpreadsheet, 
  Printer, 
  Search,
  Filter
} from 'lucide-react';

export default function OMRResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingWaId, setSendingWaId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    async function loadResults() {
      try {
        const res = await fetch('/api/omr/results');
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        }
      } catch (err) {
        console.error('Failed to load OMR results:', err);
      } finally {
        setLoading(false);
      }
    }
    loadResults();
  }, []);

  const handleSendWhatsAppResult = async (result: any) => {
    setSendingWaId(result.id);
    setStatusMsg('');

    try {
      const msgText = `🏆 *Apex Academy – Result Declared*

Dear Parent,
Assessment results for *${result.student_name}* (Roll: ${result.roll_number}) have been officially recorded.

📝 Test: ${result.paper_title || 'JEE Advanced Minor Test 01'}
📊 Marks: ${result.total_marks} / ${result.max_marks} (${result.percentage}%)
🏅 Rank: Rank #${result.rank || 1}

✅ Correct: ${result.correct_count} | ❌ Incorrect: ${result.incorrect_count} | ⚪ Unattempted: ${result.unattempted_count}

_TestSetu AI – Smart Coaching Operating System_`;

      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient_phone: '+919811199988',
          student_id: result.student_id,
          message_type: 'result_alert',
          message_text: msgText,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMsg(`WhatsApp Result Card dispatched to parent of ${result.student_name}!`);
      }
    } catch (err: any) {
      alert('Error sending WhatsApp result: ' + err.message);
    } finally {
      setSendingWaId(null);
    }
  };

  const handleExportCSV = () => {
    if (results.length === 0) return;
    const headers = ['Roll Number', 'Student Name', 'Test Title', 'Marks Obtained', 'Max Marks', 'Percentage', 'Rank', 'Status'];
    const rows = results.map(r => [
      r.roll_number,
      `"${r.student_name}"`,
      `"${r.paper_title}"`,
      r.total_marks,
      r.max_marks,
      `${r.percentage}%`,
      r.rank || 'N/A',
      r.is_manually_verified ? 'Verified' : 'Pending',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `OMR_Results_ApexAcademy_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">OMR Graded Results</h1>
          <p className="text-xs text-slate-500">
            Batch-wise student answer scores, accuracy analytics, and 1-click WhatsApp parent reporting
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export Excel (CSV)
          </button>
          <Link
            href="/dashboard/omr-scanner"
            className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
          >
            Scan More Sheets
          </Link>
        </div>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-navy-900">
            <span>Exam: JEE Advanced Minor Test 01</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal">{results.length} Answer Sheets Evaluated</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Roll No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 text-center">Percentage</th>
                <th className="py-3 px-4 text-center">Accuracy (C / W / U)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Parent WhatsApp Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {results.map((r, idx) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-navy-900">
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-navy-900">{r.roll_number}</td>
                  <td className="py-3.5 px-4 font-bold text-navy-900">{r.student_name}</td>
                  <td className="py-3.5 px-4 text-center font-extrabold text-navy-900">
                    {r.total_marks} / {r.max_marks}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      r.percentage >= 75 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {r.percentage}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="text-emerald-700 font-bold">{r.correct_count}</span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span className="text-rose-700 font-bold">{r.incorrect_count}</span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span className="text-slate-500 font-bold">{r.unattempted_count}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {r.is_manually_verified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Needs Review
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleSendWhatsAppResult(r)}
                      disabled={sendingWaId === r.id}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      {sendingWaId === r.id ? 'Sending...' : 'Send WhatsApp'}
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
