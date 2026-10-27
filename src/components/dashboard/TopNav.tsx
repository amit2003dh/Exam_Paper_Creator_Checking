'use client';

import Link from 'next/link';
import { Menu, Bell, Search, User, ShieldCheck, ChevronDown, ExternalLink } from 'lucide-react';

interface TopNavProps {
  onMobileMenuClick: () => void;
}

export default function TopNav({ onMobileMenuClick }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left side: Mobile menu & Institute indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:text-navy-900 rounded-lg hover:bg-slate-100"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-navy-900">Apex IIT-JEE & Medical Academy</span>
            <span className="text-[10px] text-slate-500">Kota, Rajasthan • Code: APEX-KOTA</span>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Tenant Active
          </span>
        </div>
      </div>

      {/* Center Search (Desktop) */}
      <div className="hidden md:flex items-center relative max-w-xs w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3" />
        <input
          type="text"
          placeholder="Search roll no, tests, students..."
          className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
        />
      </div>

      {/* Right side: Quick links, Notifications & Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-indigo-600"
        >
          <span>Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Notifications Icon with live counter */}
        <Link
          href="/dashboard/notifications"
          className="p-2 text-slate-600 hover:text-navy-900 relative rounded-lg hover:bg-slate-100 transition-colors"
          title="Notification Centre"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
        </Link>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-navy-900 text-teal-400 font-bold text-xs flex items-center justify-center">
            RV
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-navy-900">Dr. R. C. Verma</span>
            <span className="text-[10px] text-slate-500">Institute Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
}
