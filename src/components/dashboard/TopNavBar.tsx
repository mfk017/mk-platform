'use client';

import React from 'react';
import Link from 'next/link';

export default function TopNavBar() {
  return (
    <header className="bg-surface dark:bg-surface-container-low w-full top-0 shadow-xl shadow-primary/5 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 flex-shrink-0 z-30 sticky border-b border-outline-variant/30">
      {/* Mobile Brand */}
      <div className="lg:hidden flex items-center gap-2">
        <span className="font-title-md text-title-md text-primary font-bold">Canter</span>
      </div>

      <div className="flex-1 flex items-center justify-end gap-6">
        <div className="hidden md:flex items-center gap-4 bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all w-64">
          <span className="material-symbols-outlined text-on-surface-variant">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/70 w-full p-0 outline-none"
            placeholder="Search..."
            type="text"
          />
        </div>

        <button disabled className="text-on-surface-variant opacity-50 cursor-not-allowed" title="Coming soon">
          <span className="material-symbols-outlined">language</span>
        </button>

        <button disabled className="text-on-surface-variant relative opacity-50 cursor-not-allowed" title="Coming soon">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
        </button>

        <Link href="/dashboard/settings" className="w-10 h-10 rounded-full bg-tertiary-fixed overflow-hidden border border-outline-variant/30 hover:ring-2 hover:ring-primary/20 transition-all block">
          <img
            alt="User Avatar"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
          />
        </Link>
      </div>
    </header>
  );
}
