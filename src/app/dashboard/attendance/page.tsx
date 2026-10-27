'use client';

import { useState } from 'react';
import { CalendarCheck, MessageSquare, CheckCircle2, AlertCircle, Clock, Send } from 'lucide-react';

export default function AttendancePage() {
  const [selectedBatch, setSelectedBatch] = useState('b1111111-0000-0000-0000-000000000001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sendWhatsApp, setSendWhatsApp] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const [students, setStudents] = useState([
    { id: 's1111111-0000-0000-0000-000000000001', name: 'Aarav Singhania', roll: 'APEX-26-001', status: 'present' as 'present' | 'absent' | 'late' },
    { id: 's2222222-0000-0000-0000-000000000002', name: 'Priya Deshmukh', roll: 'APEX-26-002', status: 'present' as 'present' | 'absent' | 'late' },
    { id: 's3333333-0000-0000-0000-000000000003', name: 'Rohan Meena', roll: 'APEX-26-003', status: 'absent' as 'present' | 'absent' | 'late' },
  ]);

  const handleStatusChange = (id: string, newStatus: 'present' | 'absent' | 'late') => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleSubmitAttendance = async () => {
    setSubmitting(true);
    setStatusMsg('');

    try {
      const records = students.map(s => ({
        student_id: s.id,
        status: s.status,
      }));

      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batch_id: selectedBatch,
          attendance_date: date,
          records,
          send_whatsapp_alerts: sendWhatsApp,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit attendance');
      }

      setStatusMsg(data.message);
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Daily Batch Attendance</h1>
          <p className="text-xs text-slate-500">
            Record physical classroom attendance with automated parent WhatsApp absence alerts
          </p>
        </div>

        <button
          onClick={handleSubmitAttendance}
          disabled={submitting}
          className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center gap-2 shadow"
        >
          <Send className="w-4 h-4 text-teal-400" />
          {submitting ? 'Submitting & Dispatching Alerts...' : 'Save & Dispatch WhatsApp Alerts'}
        </button>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Filter and Date Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Batch</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
            >
              <option value="b1111111-0000-0000-0000-000000000001">JEE Advanced 2027 Super-30</option>
              <option value="b2222222-0000-0000-0000-000000000002">NEET Sankalp Dropper Batch</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
            />
          </div>
        </div>

        {/* WhatsApp Checkbox Toggle */}
        <label className="flex items-center gap-2.5 p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold cursor-pointer">
          <input
            type="checkbox"
            checked={sendWhatsApp}
            onChange={(e) => setSendWhatsApp(e.target.checked)}
            className="w-4 h-4 text-teal-600 rounded"
          />
          <MessageSquare className="w-4 h-4 text-teal-600" />
          <span>Send automated WhatsApp alert to absent students' parents</span>
        </label>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Roll No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Attendance Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-navy-900">{s.roll}</td>
                  <td className="py-3.5 px-4 font-bold text-navy-900">{s.name}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      s.status === 'present'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : s.status === 'absent'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                      <button
                        onClick={() => handleStatusChange(s.id, 'present')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                          s.status === 'present' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-navy-900'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleStatusChange(s.id, 'absent')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                          s.status === 'absent' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-navy-900'
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => handleStatusChange(s.id, 'late')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                          s.status === 'late' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-navy-900'
                        }`}
                      >
                        Late
                      </button>
                    </div>
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
