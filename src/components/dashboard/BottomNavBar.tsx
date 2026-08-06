'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function BottomNavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: 'الرئيسية | Home', href: '/dashboard', icon: 'home' },
    { name: 'الحجوزات | Schedule', href: '/dashboard/bookings', icon: 'event' },
    { name: 'المحفظة | Wallet', href: '/dashboard/payouts', icon: 'account_balance_wallet' },
  ];

  const menuLinks = [
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
    <>
      {/* Slide-up Menu Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex flex-col justify-end">
          <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative bg-surface-container-low w-full rounded-t-3xl p-6 pb-24 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-full duration-300">
            <div className="w-12 h-1.5 bg-outline-variant/50 rounded-full mx-auto mb-6"></div>
            
            <h1 className="font-title-lg text-title-lg text-primary font-bold mb-4">القائمة | Menu</h1>
            
            <div className="flex flex-col gap-2">
              {menuLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors bg-surface-container"
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  <span className="font-label-lg text-label-lg">{link.name}</span>
                  <span className="material-symbols-outlined ml-auto opacity-30 text-sm">chevron_right</span>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-outline-variant/30">
              <button 
                onClick={() => signOut({ callbackUrl: '/login' })} 
                className="w-full flex items-center gap-4 text-error hover:bg-error/10 px-4 py-4 rounded-xl transition-colors bg-surface-container"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-label-lg text-label-lg">تسجيل الخروج | Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface text-primary font-label-xs rounded-t-xl shadow-xl shadow-primary/10 border-t border-outline-variant/20">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.name === 'الرئيسية | Home' && pathname === '/dashboard');
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center transition-colors active:scale-90 transition-transform w-16 h-14 rounded-lg ${
                isActive ? 'text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className={`material-symbols-outlined mb-1 ${isActive ? 'filled' : ''}`} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {link.icon}
              </span>
              <span>{link.name}</span>
            </Link>
          );
        })}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-5 py-1 active:scale-90 transition-transform ${isMenuOpen ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface' : ''}`}
        >
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
            {isMenuOpen ? 'close' : 'menu'}
          </span>
          <span>القائمة | Menu</span>
        </button>
      </nav>
    </>
  );
}
