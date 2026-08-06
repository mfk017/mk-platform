'use client';

import React from 'react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface FooterProps {
  centerName: string;
  lang: Language;
  center?: any; // full center object for socials, phone, etc.
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    twitter?: string;
    snapchat?: string;
    whatsapp?: string;
  };
}

// SVG Icons for platforms without a Lucide equivalent
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z" />
    </svg>
  );
}

function SnapchatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.001 2c-2.295 0-4.764.62-6.373 2.485C4.172 5.97 3.88 7.88 3.88 9.499v.42c0 .3-.04.586-.1.871-.21 1.003-1.258 1.586-2.244 1.814-.292.068-.585.135-.876.2-.065.015-.17.045-.17.14 0 .096.07.178.16.218.74.33 1.49.51 2.235.62.14.022.16.11.2.255.095.351.19.705.33 1.044.046.116.06.25-.04.347-.432.411-.988.67-1.471.943a.327.327 0 0 0-.15.27c0 .155.109.29.26.317.54.095 1.075.21 1.6.36.71.197 1.243.578 1.624 1.24.232.408.557.832 1.052.909.36.056.726-.01 1.076-.1.425-.108.85-.24 1.296-.278.47-.04.915.06 1.367.18a8.52 8.52 0 0 0 .946.198c.195.022.39.034.584.034h.004c.193 0 .388-.012.583-.034.248-.029.497-.094.745-.167.459-.13.917-.245 1.392-.212.44.033.856.162 1.275.266.36.09.726.156 1.076.1.5-.077.82-.501 1.053-.91.382-.66.914-1.042 1.625-1.239.523-.149 1.058-.265 1.597-.36a.322.322 0 0 0 .26-.317.328.328 0 0 0-.15-.27c-.483-.273-1.04-.532-1.47-.943-.1-.097-.087-.231-.04-.347.14-.339.234-.693.33-1.044.04-.145.06-.233.2-.255.745-.11 1.495-.29 2.235-.62.09-.04.16-.122.16-.218 0-.095-.105-.125-.17-.14-.291-.065-.584-.132-.876-.2-.986-.228-2.034-.811-2.244-1.814a4.085 4.085 0 0 1-.1-.87V9.5c0-1.62-.293-3.53-1.748-5.015C16.764 2.62 14.296 2 12 2z"/>
    </svg>
  );
}

function TwitterXIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
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

export function Footer({ centerName, lang, center, socialLinks }: FooterProps) {
  const isAr = lang === 'ar';
  const year = new Date().getFullYear();
  const links = navLinks[lang];

  // Merge data from both props (center object takes precedence)
  const instagram = center?.instagram_url || socialLinks?.instagram;
  const tiktok = center?.tiktok_url || socialLinks?.tiktok;
  const snapchat = center?.snapchat_url || socialLinks?.snapchat;
  const twitter = center?.twitter_url || socialLinks?.twitter;
  const whatsappNumber = center?.whatsapp_number;
  const phone = center?.phone;
  const email = center?.email;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socialItems = [
    instagram && { href: instagram, icon: <InstagramIcon />, label: 'Instagram' },
    snapchat && { href: snapchat, icon: <SnapchatIcon />, label: 'Snapchat' },
    tiktok && { href: tiktok, icon: <TikTokIcon />, label: 'TikTok' },
    twitter && { href: twitter, icon: <TwitterXIcon />, label: 'X (Twitter)' },
    whatsappNumber && {
      href: `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`,
      icon: <WhatsAppIcon />,
      label: 'WhatsApp',
    },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string }[];

  return (
    <footer className="bg-primary text-on-primary" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="font-display-lg text-[28px] font-bold text-on-primary">
            {centerName}
          </div>
          <p className="font-body-md text-body-md text-on-primary/70 max-w-xs">
            {isAr
              ? 'مركز فروسية احترافي يقدم برامج تدريبية متكاملة في بيئة آمنة ومنظمة.'
              : 'A premier equestrian center offering structured training programs in a safe and well-managed environment.'}
          </p>

          {/* Social Media Icons */}
          {socialItems.length > 0 && (
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="w-10 h-10 rounded-full bg-on-primary/10 hover:bg-on-primary/20 flex items-center justify-center text-on-primary transition-all duration-200 hover:-translate-y-1"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-title-md text-title-md text-on-primary mb-2">
            {isAr ? 'روابط سريعة' : 'Quick Links'}
          </h3>
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body-md text-body-md text-on-primary/70 hover:text-on-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-on-primary/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-on-primary/50 font-label-sm text-label-sm">
          <span>
            © {year} {centerName}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </span>
          <span>
            {isAr ? 'مدعوم من' : 'Powered by'}{' '}
            <a
              href="https://mkplatform.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-primary/80 font-bold hover:text-on-primary transition-colors"
            >
              MKplatform
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
