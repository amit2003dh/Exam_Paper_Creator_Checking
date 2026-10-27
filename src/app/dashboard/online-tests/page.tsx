'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, Clock, ShieldCheck, Copy, Check, Users, ArrowUpRight, Play } from 'lucide-react';

export default function OnlineTestsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const tests = [
    {
      id: 'test-2026-01',
      title: 'JEE Advanced Minor Test 01 (Physics & Chemistry)',
      batch: 'JEE Advanced 2027 Super-30',
      duration: '45 Mins',
      accessCode: 'APEX-JEE-9812',
      window: '27 Oct 2026, 10:00 AM – 28 Oct 2026, 10:00 PM',
      totalQuestions: 20,
      totalMarks: 80,
      attemptsCount: 28,
      status: 'Live Active',
    },
    {
      id: 'test-2026-02',
      title: 'NEET Sankalp Biology & Organic Chemistry Quick Quiz',
      batch: 'NEET Sankalp Dropper Batch',
      duration: '60 Mins',
      accessCode: 'APEX-NEET-4431',
      window: '29 Oct 2026, 02:00 PM – 30 Oct 2026, 06:00 PM',
      totalQuestions: 50,
      totalMarks: 200,
      attemptsCount: 0,
      status: 'Scheduled',
    },
  ];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/exam/${code}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Online Computer-Based Tests (CBT)</h1>
          <p className="text-xs text-slate-500">
            Publish tests for desktop and mobile taking with secure access codes and auto-submit
          </p>
        </div>
        <Link
          href="/dashboard/generator"
          className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
        >
          <Play className="w-4 h-4 text-teal-400" /> Create Online Test from Paper
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-indigo-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                t.status === 'Live Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
              }`}>
                {t.status}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {t.id}</span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-navy-900">{t.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Assigned Batch: <strong>{t.batch}</strong></p>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Duration</span>
                <span className="font-bold text-navy-900">{t.duration}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Questions</span>
                <span className="font-bold text-navy-900">{t.totalQuestions} ({t.totalMarks} M)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Submitted</span>
                <span className="font-bold text-emerald-700">{t.attemptsCount} Students</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Student Access Link:</span>
                <span className="font-mono font-bold text-indigo-700">{t.accessCode}</span>
              </div>

              <button
                onClick={() => handleCopy(t.accessCode, t.id)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                {copiedId === t.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Test Link Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Copy Student Online Exam URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
