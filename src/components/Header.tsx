'use client';

import React from 'react';
import { Language } from '@/lib/i18n';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (l: Language) => void;
  centerName?: string;
  centerLogo?: string | null;
  onOpenMyBookings?: () => void;
  onBookNowClick?: () => void;
}

const navLinks = {
  ar: [
    { label: 'الخدمات', href: '#services-section' },
    { label: 'الخيول', href: '#horses-section' },
    { label: 'المدربون', href: '#trainers-section' },
  ],
  en: [
    { label: 'Services', href: '#services-section' },
    { label: 'Horses', href: '#horses-section' },
    { label: 'Instructors', href: '#trainers-section' },
  ],
};

export function Header({
  lang,
  onLanguageChange,
  centerName = 'Equestrian Center',
  centerLogo,
  onOpenMyBookings,
  onBookNowClick,
}: HeaderProps) {
  const isAr = lang === 'ar';
  const links = navLinks[lang];
  const oppLang: Language = isAr ? 'en' : 'ar';
  const oppLangText = isAr ? 'English' : 'عربي';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* TopNavBar (Desktop) */}
      <nav
        className="bg-surface border-b border-outline-variant shadow-xl shadow-primary/5 docked full-width top-0 z-50 sticky hidden md:block"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div className="flex justify-between items-center w-full px-6 max-w-[1440px] mx-auto h-20">
          <div className="flex items-center gap-8">
            <div className="font-display-lg text-[24px] md:text-display-lg font-bold text-primary flex items-center gap-2">
              {centerLogo && <img src={centerLogo} alt={centerName} className="h-10 w-10 object-contain" />}
              {centerName}
            </div>
            <div className="flex gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-on-surface-variant font-medium hover:text-secondary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLanguageChange(oppLang)}
              className="text-label-sm font-label-sm text-primary hover:text-secondary transition-colors px-2"
            >
              {oppLangText}
            </button>
            {onOpenMyBookings && (
              <button
                onClick={onOpenMyBookings}
                className="text-on-surface-variant hover:text-secondary transition-colors duration-200 p-2"
                title={isAr ? 'الملف الشخصي' : 'Profile'}
              >
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            )}
            {onBookNowClick && (
              <button
                onClick={onBookNowClick}
                className="bg-primary text-on-primary font-label-sm rounded px-4 py-2 hover:bg-primary-container hover:text-on-primary-container transition-colors duration-200 scale-95 active:scale-90"
              >
                {isAr ? 'احجز الآن' : 'Book Now'}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* BottomNavBar (Mobile) */}
      <nav className="bg-surface border-t border-outline-variant shadow-xl fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 md:hidden z-50">
        <a
          href="#services-section"
          onClick={(e) => handleNavClick(e, '#services-section')}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-full p-2"
        >
          <span className="material-symbols-outlined mb-1">menu_book</span>
          <span className="font-label-xs text-[10px]">{isAr ? 'الخدمات' : 'Services'}</span>
        </a>
        <a
          href="#schedule-section"
          onClick={(e) => handleNavClick(e, '#schedule-section')}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-full p-2"
        >
          <span className="material-symbols-outlined mb-1">calendar_month</span>
          <span className="font-label-xs text-[10px]">{isAr ? 'الحجوزات' : 'Bookings'}</span>
        </a>
        <button
          onClick={onOpenMyBookings}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-full p-2"
        >
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="font-label-xs text-[10px]">{isAr ? 'الملف الشخصي' : 'Profile'}</span>
        </button>
        <button
          onClick={() => onLanguageChange(oppLang)}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-full p-2"
        >
          <span className="material-symbols-outlined mb-1">language</span>
          <span className="font-label-xs text-[10px]">{oppLangText}</span>
        </button>
      </nav>
    </>
  );
}
