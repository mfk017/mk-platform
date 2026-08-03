'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideNavBar() {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', href: '/dashboard', icon: 'dashboard' },
    { name: 'Horses', href: '/dashboard/horses', icon: 'bedroom_baby' },
    { name: 'Trainers', href: '/dashboard/trainers', icon: 'sports_and_outdoors' },
    { name: 'Bookings', href: '/dashboard/bookings', icon: 'calendar_month' },
    { name: 'Services', href: '/dashboard/services', icon: 'list_alt' },
    { name: 'Revenue', href: '/dashboard/payouts', icon: 'payments' },
    { name: 'Settings', href: '/dashboard/settings', icon: 'settings' },
  ];

  return (
    <nav className="bg-surface-container-low dark:bg-surface-container-highest h-full w-64 shadow-xl shadow-primary/5 hidden lg:flex flex-col p-4 gap-2 flex-shrink-0 z-40 border-r border-outline-variant/20 sticky top-0">
      <div className="mb-8 px-4 flex flex-col gap-1 mt-4">
        <span className="font-headline-lg text-headline-lg text-primary">Canter</span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">Al-Fursan Stable</span>
        <span className="font-label-xs text-label-xs text-on-surface-variant opacity-70">Riyadh, KSA</span>
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
        <button className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high px-4 py-3 rounded-lg transition-colors w-full text-left">
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-sm text-label-sm">Support</span>
        </button>
        <button className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high px-4 py-3 rounded-lg transition-colors w-full text-left">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-sm text-label-sm">Logout</span>
        </button>
        <button className="mt-4 border border-secondary text-secondary hover:bg-secondary/10 px-4 py-2 rounded-lg font-label-sm text-label-sm transition-colors w-full">
          Switch Tenant
        </button>
      </div>
    </nav>
  );
}
