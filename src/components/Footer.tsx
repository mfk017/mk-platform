'use client';

import React from 'react';
import { Instagram } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface FooterProps {
  centerName: string;
  lang: Language;
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    twitter?: string;
  };
}

export function Footer({ centerName, lang, socialLinks }: FooterProps) {
  const isAr = lang === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className="canter-footer">
      <div className="footer-name">{centerName}</div>

      <div className="footer-social">
        {socialLinks?.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
        )}
        {/* TikTok icon as SVG */}
        {socialLinks?.tiktok && (
          <a
            href={socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="TikTok"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z" />
            </svg>
          </a>
        )}
      </div>

      <div className="footer-powered">
        © {year} {centerName}. {isAr ? 'مدعوم من' : 'Powered by'}{' '}
        <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>Canter</span>
      </div>
    </footer>
  );
}
