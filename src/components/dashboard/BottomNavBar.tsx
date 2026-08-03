'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavBar() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/dashboard', icon: 'home' },
    { name: 'Schedule', href: '/dashboard/bookings', icon: 'event' },
    { name: 'Wallet', href: '/dashboard/payouts', icon: 'account_balance_wallet' },
    { name: 'Menu', href: '/dashboard/menu', icon: 'menu' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface text-primary font-label-xs rounded-t-xl shadow-xl shadow-primary/10 border-t border-outline-variant/20">
      {links.map((link) => {
        const isActive = pathname === link.href || (link.name === 'Home' && pathname === '/dashboard');
        
        if (link.name === 'Menu') {
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-5 py-1 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                {link.icon}
              </span>
              <span>{link.name}</span>
            </Link>
          );
        }

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
    </nav>
  );
}
