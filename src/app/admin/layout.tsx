'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import SideNavBar from '@/components/admin/SideNavBar';
import TopNavBar from '@/components/admin/TopNavBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="text-on-background font-body-md antialiased overflow-x-hidden bg-[#F4F1DE]">
        <div className="flex h-screen overflow-hidden">
          <SideNavBar />
          
          <main className="flex-1 md:ml-64 w-full max-w-container-max mx-auto overflow-y-auto relative bg-[#F4F1DE]">
            <TopNavBar />
            
            <div className="px-margin-mobile md:px-gutter py-8 min-h-screen pb-24 md:pb-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
