'use client';

import { useState } from 'react';
import { ShieldAlert, Plus, UserCheck, Mail, Phone, Lock, CheckCircle2 } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([
    {
      id: 'u-1',
      name: 'Dr. Ramesh Chandra Verma',
      email: 'director@apexkota.edu.in',
      phone: '+919829012345',
      role: 'Institute Owner',
      permissions: 'Full Root Access, Financials, Billing, Papers, OMR',
      status: 'Active',
    },
    {
      id: 'u-2',
      name: 'Prof. Arvind K. Sharma',
      email: 'sharma.physics@apexkota.edu.in',
      phone: '+919829012346',
      role: 'Teacher',
      permissions: 'Paper Generation, OMR Evaluation, Daily Attendance',
      status: 'Active',
    },
    {
      id: 'u-3',
      name: 'Pooja Agarwal',
      email: 'accounts@apexkota.edu.in',
      phone: '+919829012349',
      role: 'Accountant',
      permissions: 'Fee Records, Razorpay Links, Payment Receipts',
      status: 'Active',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">User & Role Management (RBAC)</h1>
          <p className="text-xs text-slate-500">
            Enforce granular role-based permissions: Institute Owner, Admin, Teacher, and Accountant
          </p>
        </div>

        <button
          onClick={() => alert('Invite Staff Member: Assign email and role (Teacher, Accountant, or Admin).')}
          className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4 text-teal-400" /> Invite Staff Member
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Authorized Permissions</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-navy-900">{u.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      u.role === 'Institute Owner'
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : u.role === 'Teacher'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-normal max-w-xs">{u.permissions}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{u.phone}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {u.status}
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
