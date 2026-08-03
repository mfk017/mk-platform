'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CalendarDays, Receipt, LogOut, Settings, Menu, X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const links = [
    { href: '/admin', label: 'Platform Overview', icon: LayoutDashboard },
    { href: '/admin/centers', label: 'Centers', icon: Users },
    { href: '/admin/bookings', label: 'All Bookings', icon: CalendarDays },
    { href: '/admin/payouts', label: 'Payouts', icon: Receipt },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const sidebarContent = (
    <>
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">MK Admin</h1>
          <p className="text-xs text-slate-400 mt-1">Super Admin Area</p>
        </div>
        <button 
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-violet-600/20 text-white' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <link.icon className={`w-5 h-5 ${isActive ? 'text-violet-400' : 'text-slate-400'}`} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#0B1320] text-white p-4 sticky top-0 z-20">
        <h1 className="text-lg font-bold">MK Admin</h1>
        <button onClick={() => setIsMobileOpen(true)} className="p-2 -mr-2 text-slate-300">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 start-0 z-50 w-72 bg-[#0B1320] flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
      }`}>
        {sidebarContent}
      </aside>
    </>
  );
}
