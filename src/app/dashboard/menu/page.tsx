'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function MobileMenuPage() {
  const links = [
    { name: 'الرئيسية | Overview', href: '/dashboard', icon: 'dashboard' },
    { name: 'الخيل | Horses', href: '/dashboard/horses', icon: 'bedroom_baby' },
    { name: 'المدربين | Trainers', href: '/dashboard/trainers', icon: 'sports_and_outdoors' },
    { name: 'الحجوزات | Bookings', href: '/dashboard/bookings', icon: 'calendar_month' },
    { name: 'الخدمات | Services', href: '/dashboard/services', icon: 'list_alt' },
    { name: 'الباقات | Packages', href: '/dashboard/packages', icon: 'package' },
    { name: 'أوقات العمل | Working Hours', href: '/dashboard/working-hours', icon: 'schedule' },
    { name: 'المالية | Revenue', href: '/dashboard/payouts', icon: 'payments' },
    { name: 'الإعدادات | Settings', href: '/dashboard/settings', icon: 'settings' },
  ];

  return (
    <div className="flex flex-col h-full bg-surface-container-low p-4 gap-4 pb-32">
      <h1 className="font-title-lg text-title-lg text-primary font-bold mb-4">القائمة | Menu</h1>
      
      <div className="flex-1 flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-4 px-4 py-4 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors bg-surface-container"
          >
            <span className="material-symbols-outlined">{link.icon}</span>
            <span className="font-label-lg text-label-lg">{link.name}</span>
            <span className="material-symbols-outlined ml-auto opacity-30 text-sm">chevron_right</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-2 pt-4 border-t border-outline-variant/30">
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })} 
          className="flex items-center gap-4 text-error hover:bg-error/10 px-4 py-4 rounded-xl transition-colors bg-surface-container"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-lg text-label-lg">تسجيل الخروج | Logout</span>
        </button>
      </div>
    </div>
  );
}
