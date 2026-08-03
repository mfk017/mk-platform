'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';

export function AdminTopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { data: session } = useSession();

  return (
    <header className="h-[76px] bg-white border-b border-slate-200 flex items-center justify-between px-6 rounded-t-2xl md:rounded-none">
      <div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5 hidden sm:block">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search platform..."
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          />
        </div>
        
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 ps-4 md:ps-6 border-s border-slate-200">
          <div className="text-end hidden sm:block">
            <div className="text-sm font-bold text-slate-900">{session?.user?.name || 'Platform Admin'}</div>
            <div className="text-xs text-slate-500">Super Administrator</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
            PA
          </div>
        </div>
      </div>
    </header>
  );
}
