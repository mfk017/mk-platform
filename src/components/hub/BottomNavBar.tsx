'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavBar() {
  const pathname = usePathname();

  const links = [
    { name: 'Catalog', href: '/hub/catalog', icon: 'menu_book' },
    { name: 'Bookings', href: '/hub', icon: 'calendar_month' },
    { name: 'Profile', href: '/hub/profile', icon: 'person' },
    { name: 'More', href: '/hub/more', icon: 'more_horiz' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 bg-surface shadow-xl border-t border-outline-variant shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 h-16 pb-safe">
      {links.map((link) => {
        const isActive = pathname === link.href || (link.name === 'Bookings' && pathname === '/hub');

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex flex-col items-center justify-center transition-colors active:scale-95 ${
              isActive 
                ? 'bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 hover:bg-surface-container-highest' 
                : 'text-on-surface-variant hover:bg-surface-container-highest rounded-lg p-2'
            }`}
          >
            <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {link.icon}
            </span>
            <span className="font-label-xs text-label-xs mt-1 font-bold">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
