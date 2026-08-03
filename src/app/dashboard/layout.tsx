'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import SideNavBar from '@/components/dashboard/SideNavBar';
import TopNavBar from '@/components/dashboard/TopNavBar';
import BottomNavBar from '@/components/dashboard/BottomNavBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="bg-[#F4F1DE] min-h-screen font-body-md text-on-surface flex flex-col overflow-hidden h-screen">
        <TopNavBar />
        <div className="flex max-w-container-max mx-auto w-full h-[calc(100vh-5rem)] relative">
          <SideNavBar />
          <main className="flex-1 p-margin-mobile md:p-gutter lg:p-margin-desktop overflow-y-auto w-full pb-24 md:pb-8">
            {children}
          </main>
        </div>
        <BottomNavBar />
      </div>
    </SessionProvider>
  );
}
