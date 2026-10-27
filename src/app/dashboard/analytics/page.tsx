'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Award, Users, Filter, ArrowUpRight } from 'lucide-react';

export default function AnalyticsPage() {
  const [selectedBatch, setSelectedBatch] = useState('All');

  const subjectAverages = [
    { subject: 'Physics', score: 76, color: 'bg-indigo-600', count: '14 Tests' },
    { subject: 'Chemistry', score: 82, color: 'bg-teal-600', count: '12 Tests' },
    { subject: 'Mathematics', score: 71, color: 'bg-amber-600', count: '15 Tests' },
    { subject: 'Biology', score: 88, color: 'bg-emerald-600', count: '9 Tests' },
  ];

  const batchPerformance = [
    { batch: 'JEE Advanced 2027 Super-30', avg: '84.2%', topStudent: 'Aarav Singhania (100%)', attendance: '92%' },
    { batch: 'NEET Sankalp Dropper Batch', avg: '78.5%', topStudent: 'Sneha Iyer (94%)', attendance: '88%' },
    { batch: 'Class 10 NTSE & Olympiad', avg: '81.0%', topStudent: 'Karan Joshi (92%)', attendance: '95%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Performance Analytics</h1>
          <p className="text-xs text-slate-500">
            Real academic metrics, subject strengths, batch comparisons, and score progression
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white shadow-sm"
          >
            <option value="All">All Institute Batches</option>
            <option value="JEE">JEE Advanced 2027</option>
            <option value="NEET">NEET Sankalp</option>
          </select>
        </div>
      </div>

      {/* Subject Averages Progress Bars */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-navy-900">Subject-wise Score Averages</h2>
          <p className="text-xs text-slate-500">Aggregated across all conducted OMR & online tests</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjectAverages.map((s) => (
            <div key={s.subject} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-navy-900">{s.subject}</span>
                <span className="text-[10px] text-slate-400 font-semibold">{s.count}</span>
              </div>
              <div className="text-2xl font-black text-navy-900">{s.score}%</div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className={`${s.color} h-2 rounded-full`} style={{ width: `${s.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Batch Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-base font-bold text-navy-900">Batch Performance Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Batch Name</th>
                <th className="py-3 px-4 text-center">Batch Avg Score</th>
                <th className="py-3 px-4">Current Topper</th>
                <th className="py-3 px-4 text-center">Avg Attendance</th>
                <th className="py-3 px-4 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {batchPerformance.map((b, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-navy-900">{b.batch}</td>
                  <td className="py-3 px-4 text-center font-extrabold text-navy-900">{b.avg}</td>
                  <td className="py-3 px-4 font-semibold text-indigo-700">{b.topStudent}</td>
                  <td className="py-3 px-4 text-center">{b.attendance}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <TrendingUp className="w-3.5 h-3.5" /> +4.2%
                    </span>
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
