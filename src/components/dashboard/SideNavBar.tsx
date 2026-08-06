'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function SideNavBar() {
  const pathname = usePathname();
  const [center, setCenter] = useState<any>(null);

  useEffect(() => {
    fetch('/api/dashboard/settings')
      .then(res => res.json())
      .then(data => {
        if (data.center) setCenter(data.center);
      })
      .catch(err => console.error(err));
  }, []);

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
    <nav className="bg-surface-container-low dark:bg-surface-container-highest h-full w-64 shadow-xl shadow-primary/5 hidden lg:flex flex-col p-4 gap-2 flex-shrink-0 z-40 border-r border-outline-variant/20 sticky top-0">
      <div className="mb-8 px-4 flex flex-col gap-1 mt-4">
        {center ? (
          <>
            <span className="font-label-sm text-label-sm text-on-surface-variant line-clamp-1">{center.name_en}</span>
            <span className="font-label-xs text-label-xs text-on-surface-variant opacity-70 line-clamp-1">{center.city || 'KSA'}</span>
          </>
        ) : (
          <div className="animate-pulse flex flex-col gap-2 mt-1">
            <div className="h-4 bg-outline-variant/30 rounded w-3/4"></div>
            <div className="h-3 bg-outline-variant/20 rounded w-1/2"></div>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors active:translate-x-1 transition-transform ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-low'
              }`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {link.icon}
              </span>
              <span className="font-label-sm text-label-sm">{link.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-outline-variant/30">
        <button onClick={() => signOut({ callbackUrl: '/login' })} className="flex items-center gap-3 text-error hover:bg-error/10 px-4 py-3 rounded-lg transition-colors w-full text-left">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-sm text-label-sm">تسجيل الخروج | Logout</span>
        </button>
      </div>
    </nav>
  );
}
