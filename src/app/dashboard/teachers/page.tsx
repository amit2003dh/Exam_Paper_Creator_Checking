'use client';

import { useState } from 'react';
import { GraduationCap, Plus, Mail, Phone, BookOpen, CheckCircle2 } from 'lucide-react';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([
    {
      id: 't-1',
      name: 'Prof. Arvind K. Sharma',
      subject: 'Physics (Mechanics & Electrodynamics)',
      phone: '+919829012346',
      email: 'sharma.physics@apexkota.edu.in',
      assignedBatches: ['JEE Advanced 2027 Super-30', 'Class 10 NTSE'],
      status: 'Active',
    },
    {
      id: 't-2',
      name: 'Er. Neeraj Gupta',
      subject: 'Mathematics (Calculus & Coordinate Geometry)',
      phone: '+919829012347',
      email: 'gupta.maths@apexkota.edu.in',
      assignedBatches: ['JEE Advanced 2027 Super-30'],
      status: 'Active',
    },
    {
      id: 't-3',
      name: 'Dr. Sunita Mehra',
      subject: 'Chemistry (Organic & Physical Chemistry)',
      phone: '+919829012348',
      email: 'mehra.chem@apexkota.edu.in',
      assignedBatches: ['NEET Sankalp Dropper Batch'],
      status: 'Active',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Faculty & Teachers</h1>
          <p className="text-xs text-slate-500">
            Subject specialties, batch allocations, and WhatsApp teacher bot authorization
          </p>
        </div>

        <button
          onClick={() => alert('Add Teacher: Specify teacher name, phone for WhatsApp bot, and assigned subjects.')}
          className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4 text-teal-400" /> Add Faculty Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teachers.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {t.status}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-navy-900">{t.name}</h3>
                <p className="text-xs font-semibold text-teal-700 mt-0.5">{t.subject}</p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{t.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{t.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Assigned Batches</span>
              <div className="flex flex-wrap gap-1.5">
                {t.assignedBatches.map((b, i) => (
                  <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
