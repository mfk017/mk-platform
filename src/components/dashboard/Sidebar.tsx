'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  LayoutDashboard, Dumbbell, CalendarDays, BookOpen,
  Wallet, Settings, LogOut, ChevronRight, Zap, Menu, X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/services', label: 'Services', icon: Dumbbell },
  { href: '/dashboard/schedule', label: 'Schedule', icon: CalendarDays },
  { href: '/dashboard/bookings', label: 'Bookings', icon: BookOpen },
  { href: '/dashboard/payouts', label: 'Payouts', icon: Wallet },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shrink-0 shadow-sm">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-black text-slate-900 tracking-tight">MK Platform</div>
            <div className="text-xs text-slate-500 font-medium">Center Dashboard</div>
          </div>
        </div>
        <button 
          className="md:hidden text-slate-400 hover:text-slate-600"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center Badge */}
      {session?.user?.centerSlug && (
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Your Center
          </div>
          <Link
            href={`/${session.user.centerSlug}`}
            target="_blank"
            className="text-sm font-bold text-slate-900 hover:text-violet-600 flex items-center justify-between group transition-colors"
          >
            <span>/{session.user.centerSlug}</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
          </Link>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active 
                  ? 'bg-violet-50 text-violet-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? 'text-violet-600' : 'text-slate-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <div className="text-sm font-bold text-slate-900 mb-0.5 truncate">
          {session?.user?.name || 'Center Admin'}
        </div>
        <div className="text-xs text-slate-500 mb-4 truncate">
          {session?.user?.email}
        </div>
        <Button
          variant="outline"
          className="w-full justify-start text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
          onClick={() => signOut({ callbackUrl: '/login' })}
          leftIcon={<LogOut className="w-4 h-4" />}
        >
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 p-4 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-sm font-black text-slate-900">MK Platform</h1>
        </div>
        <button onClick={() => setIsMobileOpen(true)} className="p-2 -mr-2 text-slate-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 start-0 z-50 w-72 bg-white border-e border-slate-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
      }`}>
        {sidebarContent}
      </aside>
    </>
  );
}
