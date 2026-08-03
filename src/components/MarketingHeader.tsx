'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, User, ArrowRight, ArrowLeft, Menu, X } from 'lucide-react';

export type Language = 'en' | 'ar';

interface MarketingHeaderProps {
  lang?: Language;
  onLanguageChange?: (l: Language) => void;
}

export function MarketingHeader({ lang = 'en', onLanguageChange }: MarketingHeaderProps) {
  const pathname = usePathname();
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
    { label: isAr ? 'الأسعار' : 'Pricing', href: '/pricing' },
    { label: isAr ? 'عن المنصة' : 'About', href: '/about' },
  ];

  const handleLangToggle = () => {
    if (onLanguageChange) {
      onLanguageChange(isAr ? 'en' : 'ar');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white no-underline group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all">
            MK
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">Platform</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => {
            const active = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-violet-400 ${active ? 'text-violet-400' : 'text-slate-300'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {onLanguageChange && (
            <button 
              onClick={handleLangToggle}
              className="text-slate-300 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors hidden sm:block"
              title="Toggle Language"
            >
              <Globe size={18} />
            </button>
          )}
          
          <Link 
            href="/login" 
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <User size={16} />
            {isAr ? 'تسجيل الدخول' : 'Login'}
          </Link>

          <Link 
            href="/register" 
            className="bg-white text-black hover:bg-violet-50 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-white/20"
          >
            {isAr ? 'سجل مركزك مجاناً' : 'Register Center'}
            <ArrowIcon size={16} />
          </Link>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#09090b] border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
          {links.map(link => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-slate-200 p-2 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <Link 
            href="/login" 
            className="text-slate-200 p-2 font-medium flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User size={16} />
            {isAr ? 'تسجيل الدخول' : 'Login'}
          </Link>
        </div>
      )}
    </header>
  );
}
