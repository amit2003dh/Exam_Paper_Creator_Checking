'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function MarketingNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-teal-400 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-navy-900">
              TestSetu <span className="text-teal-600">AI</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
              Coaching Operating System
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                pathname === l.href ? 'text-indigo-600 font-semibold' : 'text-slate-600'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Auth CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-700 hover:text-navy-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy-900 text-white font-medium text-sm hover:bg-navy-800 transition-all shadow-sm"
          >
            Institute Dashboard
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-navy-900"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-700 hover:text-indigo-600"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full text-center py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-navy-900 rounded-lg"
            >
              Open Institute Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
