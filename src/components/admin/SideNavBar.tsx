'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function SideNavBar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
    { name: 'Centers', href: '/admin/centers', icon: 'store' },
    { name: 'Finances', href: '/admin/payouts', icon: 'payments' },
    { name: 'Riders', href: '/admin/riders', icon: 'group' },
  ];

  return (
    <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 py-6 bg-surface-container border-r border-outline-variant/20 z-50">
      {/* Brand/Header */}
      <div className="px-6 mb-8 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
        </div>
        <div>
          <h1 className="font-title-md text-title-md text-primary">Canter OS</h1>
          <p className="font-label-xs text-label-xs text-on-surface-variant">Super Admin</p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 mb-6">
        <button className="w-full py-3 px-4 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          Onboard Center
        </button>
      </div>

      {/* Main Nav */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 my-1 font-label-sm text-label-sm transition-transform duration-200 active:scale-[0.98] ${
                isActive
                  ? 'bg-primary text-on-primary hover:translate-x-1'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:translate-x-1'
              }`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {link.icon}
              </span>
              {link.name}
            </Link>
          );
        })}

        <Link
          href="/admin/alerts"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 font-label-sm text-label-sm transition-transform duration-200 hover:translate-x-1 active:scale-[0.98] justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined">notifications</span>
            Alerts
          </div>
          <span className="bg-error text-on-error px-2 py-0.5 rounded-full font-label-xs text-[10px]">3</span>
        </Link>
      </div>

      {/* Footer Nav */}
      <div className="mt-auto px-2 pt-4 border-t border-outline-variant/20 space-y-1">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 font-label-sm text-label-sm transition-transform duration-200 hover:translate-x-1 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">settings</span>
          Settings
        </Link>
        <Link
          href="/admin/support"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 font-label-sm text-label-sm transition-transform duration-200 hover:translate-x-1 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">help</span>
          Support
        </Link>
        
        {/* User Profile Mini */}
        <div className="mt-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              alt="Admin profile"
              className="w-10 h-10 rounded-full object-cover border border-outline-variant/30 shrink-0"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
            />
            <div className="overflow-hidden">
              <p className="font-label-sm text-label-sm text-on-surface truncate">Admin User</p>
              <p className="font-label-xs text-label-xs text-on-surface-variant truncate">admin@canter.sa</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-on-surface-variant hover:text-error transition-colors p-2 rounded-lg hover:bg-error-container/20"
            title="Sign Out"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
