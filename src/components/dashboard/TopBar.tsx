'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';

export function TopBar({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <header className="h-[76px] bg-white border-b border-slate-200 flex items-center justify-between px-6 rounded-t-2xl md:rounded-none">
      <div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5 hidden sm:block">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {action && (
          <div className="hidden sm:block">
            {action}
          </div>
        )}
        
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 ps-4 md:ps-6 border-s border-slate-200">
          <div className="text-end hidden sm:block">
            <div className="text-sm font-bold text-slate-900">{session?.user?.name || 'Center Admin'}</div>
            <div className="text-xs text-slate-500 truncate max-w-[120px]">{session?.user?.centerSlug || 'Dashboard'}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
            {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'C'}
          </div>
        </div>
      </div>
    </header>
  );
}
