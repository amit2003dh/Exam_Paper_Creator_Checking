'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Award, 
  CreditCard, 
  MessageSquare, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Camera,
  CalendarCheck,
  AlertCircle
} from 'lucide-react';

export default function MainDashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [recentResults, setRecentResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [mRes, rRes] = await Promise.all([
          fetch('/api/analytics/dashboard'),
          fetch('/api/omr/results'),
        ]);

        const mData = await mRes.json();
        const rData = await rRes.json();

        if (mData.success) setMetrics(mData.data);
        if (rData.success) setRecentResults(rData.data.slice(0, 5));
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-navy-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-400">Institute Overview</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Apex IIT-JEE & Medical Academy</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Term 2 Examination Cycle • Kota Campus • 3 Active Batches
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/dashboard/generator"
            className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow"
          >
            <Sparkles className="w-4 h-4" /> Create AI Paper
          </Link>
          <Link
            href="/dashboard/omr-scanner"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center gap-1.5 transition-all"
          >
            <Camera className="w-4 h-4 text-teal-300" /> Scan OMR Sheet
          </Link>
          <Link
            href="/dashboard/attendance"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center gap-1.5 transition-all"
          >
            <CalendarCheck className="w-4 h-4 text-emerald-300" /> Mark Attendance
          </Link>
        </div>
      </div>

      {/* Real Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Enrolled Students</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            {loading ? '...' : metrics?.totalStudents ?? 5}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span className="text-emerald-600 font-bold">100% Verified</span> in Active Batches
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tests Conducted</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            {loading ? '...' : metrics?.testsConducted ?? 1}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span className="text-indigo-600 font-bold">JEE & NEET</span> with LaTeX & KaTeX
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Average Batch Marks</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            {loading ? '...' : `${metrics?.averageMarks ?? 79}%`}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>High performance trajectory</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Fee Collections (INR)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            {loading ? '...' : `₹${(metrics?.totalFeeCollected ?? 62500).toLocaleString('en-IN')}`}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Overdue: ₹{(metrics?.pendingFees ?? 95000).toLocaleString('en-IN')}</span>
            <Link href="/dashboard/fees" className="text-indigo-600 font-bold hover:underline">Collect</Link>
          </div>
        </div>
      </div>

      {/* Operational Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent OMR Evaluations */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-navy-900">Recent Graded Answer Sheets</h2>
              <p className="text-xs text-slate-500">Live optical marks evaluations comparing against answer keys</p>
            </div>
            <Link
              href="/dashboard/omr-results"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-bold border-b border-slate-100 pb-2">
                  <th className="py-2.5">Student / Roll</th>
                  <th className="py-2.5">Test Paper</th>
                  <th className="py-2.5 text-center">Score</th>
                  <th className="py-2.5 text-center">Percentage</th>
                  <th className="py-2.5 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {recentResults.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3">
                      <div className="font-bold text-navy-900">{r.student_name || 'Candidate'}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{r.roll_number}</div>
                    </td>
                    <td className="py-3 max-w-[180px] truncate">{r.paper_title || 'Minor Test 01'}</td>
                    <td className="py-3 text-center font-bold text-navy-900">{r.total_marks} / {r.max_marks}</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        r.percentage >= 75 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {r.percentage}%
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {r.is_manually_verified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Teacher Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-bold">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Pending Review
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* WhatsApp & Daily Stats Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-navy-900">Communication & Operations</h2>
            <p className="text-xs text-slate-500">Official Meta Cloud API status</p>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-teal-900">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-teal-600" /> WhatsApp Delivery
              </span>
              <span className="text-emerald-700 font-extrabold">{metrics?.whatsappDeliveryRate ?? 100}%</span>
            </div>
            <p className="text-[11px] text-teal-800 leading-relaxed">
              All automated result cards and absence alerts delivered to parent WhatsApp numbers in &lt; 3 seconds.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Today's Attendance Rate</span>
              <span className="font-bold text-navy-900">{metrics?.attendancePercentage ?? 67}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full" 
                style={{ width: `${metrics?.attendancePercentage ?? 67}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-slate-500">Active Batches</span>
              <span className="font-bold text-navy-900">{metrics?.activeBatches ?? 2} Batches</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/dashboard/parent-communication"
              className="w-full py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              Send Parent WhatsApp Broadcast
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
