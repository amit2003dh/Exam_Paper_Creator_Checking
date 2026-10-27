'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Database, 
  Globe, 
  Camera, 
  Award, 
  Users, 
  GraduationCap, 
  BookOpen, 
  CalendarCheck, 
  BarChart3, 
  MessageSquare, 
  Inbox, 
  CreditCard, 
  Receipt, 
  FileSpreadsheet, 
  CreditCard as BillingIcon, 
  Settings, 
  ShieldAlert, 
  Bell, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  const navSections = [
    {
      title: 'Overview',
      items: [
        { label: 'Main Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Performance Analytics', href: '/dashboard/analytics', icon: BarChart3 },
        { label: 'Academic Reports', href: '/dashboard/reports', icon: FileSpreadsheet },
      ],
    },
    {
      title: 'Testing & AI Engines',
      items: [
        { label: 'Question Paper Maker', href: '/dashboard/generator', icon: FileText, badge: 'AI' },
        { label: 'Master Question Bank', href: '/dashboard/questions', icon: Database },
        { label: 'Online Tests', href: '/dashboard/online-tests', icon: Globe },
        { label: 'Smartphone OMR Scanner', href: '/dashboard/omr-scanner', icon: Camera, badge: 'Live' },
        { label: 'OMR Graded Results', href: '/dashboard/omr-results', icon: Award },
      ],
    },
    {
      title: 'Institute Operations',
      items: [
        { label: 'Students', href: '/dashboard/students', icon: Users },
        { label: 'Batches', href: '/dashboard/batches', icon: BookOpen },
        { label: 'Teachers', href: '/dashboard/teachers', icon: GraduationCap },
        { label: 'Attendance', href: '/dashboard/attendance', icon: CalendarCheck },
      ],
    },
    {
      title: 'Parent Communication',
      items: [
        { label: 'Parent Communication', href: '/dashboard/parent-communication', icon: MessageSquare },
        { label: 'WhatsApp Inbox', href: '/dashboard/whatsapp-inbox', icon: Inbox },
        { label: 'Notification Centre', href: '/dashboard/notifications', icon: Bell },
      ],
    },
    {
      title: 'Financials & Administration',
      items: [
        { label: 'Fee Management', href: '/dashboard/fees', icon: CreditCard },
        { label: 'Payment History', href: '/dashboard/payments', icon: Receipt },
        { label: 'Plan & Billing', href: '/dashboard/billing', icon: BillingIcon },
        { label: 'Institute Settings', href: '/dashboard/settings', icon: Settings },
        { label: 'Roles & Permissions', href: '/dashboard/users', icon: ShieldAlert },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-navy-950 border-r border-slate-800 text-slate-300 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-white">
                  TestSetu <span className="text-teal-400">AI</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 truncate">
                  Apex Academy Kota
                </span>
              </div>
            )}
          </Link>

          {/* Collapse Toggle on Desktop */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle sidebar collapse"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {!collapsed && (
                <div className="px-3 text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2">
                  {sec.title}
                </div>
              )}
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-300' : 'text-slate-400'}`} />
                    {!collapsed && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Institute Badge */}
        {!collapsed ? (
          <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
            <div>
              <div className="font-semibold text-white truncate">Apex IIT-JEE Kota</div>
              <div className="text-[10px] text-teal-400">Growth Tier Active</div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        ) : (
          <div className="p-3 border-t border-slate-800 flex justify-center shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Online"></span>
          </div>
        )}
      </aside>
    </>
  );
}
