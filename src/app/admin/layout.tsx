'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
        <AdminSidebar />
        <main className="flex-1 flex flex-col h-[calc(100vh-64px)] md:h-screen overflow-y-auto">
          <div className="p-4 md:p-8 flex-1 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
