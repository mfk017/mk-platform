'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function TopNavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="hidden md:flex flex-col w-full bg-surface shadow-xl shadow-primary/5 border-b border-outline-variant sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-20">
        <div className="flex items-center gap-8 h-full">
          <Link href="/hub" className="font-display-lg text-display-lg text-primary tracking-tight">
            The Canter Platform
          </Link>
          <nav className="flex gap-6 items-end h-full pt-4">
            <Link 
              href="/hub/catalog" 
              className={`font-title-md text-title-md transition-colors duration-200 ${pathname.includes('catalog') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant font-medium pb-[6px] hover:text-secondary'}`}
            >
              Catalog
            </Link>
            <Link 
              href="/hub" 
              className={`font-title-md text-title-md transition-colors duration-200 ${pathname === '/hub' || pathname.includes('bookings') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant font-medium pb-[6px] hover:text-secondary'}`}
            >
              Bookings
            </Link>
            <Link 
              href="/hub/stable" 
              className={`font-title-md text-title-md transition-colors duration-200 ${pathname.includes('stable') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant font-medium pb-[6px] hover:text-secondary'}`}
            >
              My Stable
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button disabled className="text-primary hover:text-secondary transition-colors duration-200 scale-95 opacity-50 cursor-not-allowed" title="Coming Soon">
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
          <div className="flex gap-3">
            <ThemeToggle />
            <button disabled className="text-on-surface-variant hover:text-secondary transition-colors duration-200 scale-95 opacity-50 cursor-not-allowed" title="Coming Soon">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            {session ? (
              <button 
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="text-on-surface-variant hover:text-error transition-colors duration-200 scale-95 active:scale-90 transition-transform"
                title="Sign Out"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            ) : null}
          </div>
          {!session && (
            <Link 
              href="/login"
              className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label-sm text-label-sm hover:bg-surface-tint hover:text-on-primary transition-colors active:scale-90 transition-transform"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
