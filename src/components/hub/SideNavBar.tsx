'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideNavBar() {
  const pathname = usePathname();

  const links = [
    { name: 'My Horses', href: '/hub/horses' },
    { name: 'Lessons', href: '/hub' }, // Making Lessons the default hub page as per design active state
    { name: 'Events', href: '/hub/events' },
    { name: 'Finances', href: '/hub/finances' },
  ];

  return (
    <nav className="hidden lg:flex flex-col h-full p-4 gap-2 bg-surface-container-low dark:bg-surface-container-highest shadow-xl shadow-primary/5 docked left-0 w-64 fixed z-40">
      <div className="mb-8 px-4 flex flex-col items-center pt-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-outline-variant/30">
          <img
            alt="Center Logo"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=200&q=80"
          />
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary text-center">Al-Fursan Stable</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant text-center">Riyadh, KSA</p>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <Link href="/hub/catalog" className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high px-4 py-3 rounded-lg hover:bg-surface-container-high dark:hover:bg-surface-container-low transition-colors active:translate-x-1 transition-transform">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-sm text-label-sm">Overview</span>
        </Link>
        <Link href="/hub/horses" className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high px-4 py-3 rounded-lg hover:bg-surface-container-high dark:hover:bg-surface-container-low transition-colors active:translate-x-1 transition-transform">
          <span className="material-symbols-outlined">bedroom_baby</span>
          <span className="font-label-sm text-label-sm">Horses</span>
        </Link>
        <Link href="/hub/trainers" className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high px-4 py-3 rounded-lg hover:bg-surface-container-high dark:hover:bg-surface-container-low transition-colors active:translate-x-1 transition-transform">
          <span className="material-symbols-outlined">sports_and_outdoors</span>
          <span className="font-label-sm text-label-sm">Trainers</span>
        </Link>
        <Link href="/hub" className="flex items-center gap-3 bg-primary-container text-on-primary-container rounded-lg px-4 py-3 hover:bg-surface-container-high dark:hover:bg-surface-container-low transition-colors active:translate-x-1 transition-transform">
          <span className="material-symbols-outlined filled" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
          <span className="font-label-sm text-label-sm">Bookings</span>
        </Link>
        <Link href="/hub/revenue" className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high px-4 py-3 rounded-lg hover:bg-surface-container-high dark:hover:bg-surface-container-low transition-colors active:translate-x-1 transition-transform">
          <span className="material-symbols-outlined">payments</span>
          <span className="font-label-sm text-label-sm">Revenue</span>
        </Link>
        <Link href="/hub/settings" className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high px-4 py-3 rounded-lg hover:bg-surface-container-high dark:hover:bg-surface-container-low transition-colors active:translate-x-1 transition-transform">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-sm text-label-sm">Settings</span>
        </Link>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-outline-variant/30">
        <button className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high px-4 py-3 rounded-lg hover:bg-surface-container-high transition-colors text-left">
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-sm text-label-sm">Support</span>
        </button>
        <button className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high px-4 py-3 rounded-lg hover:bg-surface-container-high transition-colors text-left">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-sm text-label-sm">Logout</span>
        </button>
        <button className="mt-2 w-full py-2 border border-secondary text-secondary rounded-lg font-label-sm text-label-sm hover:bg-secondary/10 transition-colors">
          Switch Tenant
        </button>
      </div>
    </nav>
  );
}
