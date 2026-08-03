'use client';

import React from 'react';
import { Globe, User, ChevronRight } from 'lucide-react';
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
    { label: 'اتصل بنا', href: '#contact-section' },
  ],
  en: [
    { label: 'Services', href: '#services-section' },
    { label: 'Horses', href: '#horses-section' },
    { label: 'Instructors', href: '#trainers-section' },
    { label: 'Contact Us', href: '#contact-section' },
  ],
};

export function Header({ lang, onLanguageChange, centerName = 'Canter', centerLogo, onOpenMyBookings, onBookNowClick }: HeaderProps) {
  const isAr = lang === 'ar';
  const links = navLinks[lang];
  const oppLang: Language = isAr ? 'en' : 'ar';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="canter-navbar" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="navbar-inner">
        {/* Logo */}
        <a href="#" className="navbar-logo">
          {centerLogo ? (
            <img src={centerLogo} alt={centerName} />
          ) : (
            <div className="navbar-logo-icon">🐎</div>
          )}
          <span>{centerName}</span>
        </a>

        {/* Nav Links */}
        <ul className="navbar-nav">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          <button
            className="btn-lang"
            onClick={() => onLanguageChange(oppLang)}
            title="Change language"
          >
            <Globe size={16} />
          </button>

          {onOpenMyBookings && (
            <button className="btn-login" onClick={onOpenMyBookings}>
              <User size={15} />
              {isAr ? 'حجوزاتي' : 'Login'}
            </button>
          )}

          {onBookNowClick && (
            <button className="btn-primary" onClick={onBookNowClick} id="header-book-now-btn">
              {isAr ? 'احجز الآن' : 'Book Now'}
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
