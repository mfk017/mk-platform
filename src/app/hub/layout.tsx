'use client';

import React from 'react';
import TopNavBar from '@/components/hub/TopNavBar';
import BottomNavBar from '@/components/hub/BottomNavBar';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col pb-24 md:pb-0">
        <TopNavBar />
        {/* Main Content Canvas */}
        <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-8 md:py-margin-desktop">
          {children}
        </main>
        <BottomNavBar />
      </div>
    </ThemeProvider>
  );
}
