'use client';

import React from 'react';
import { Language } from '@/lib/i18n';

interface HeroSectionProps {
  center: any;
  lang: Language;
  onBookSessionClick: () => void;
}

const HERO_FALLBACK = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrpO7iYZ6nsV6vCsQ3mmncNWdOqHDLC98rPIJli_qeFWfJ2zuqYJxuoSKLMeRi-BR1xGmJ-KlS7kE2wOHunVkHF7wykFr2I2jDWFWz4aCpgLglo01vOramjnuvb9YeUOOn8ZNfTsGrRE7x83c-Abqk-k7FcoOQJRF9-YnHRtcIKTA98JUA_moX_kM7tsjDSaocdPlY-JS22BFiZvf98UiyhCWQXaruUww1IURz5VY-xRjvZmqhwUg';

export function HeroSection({ center, lang, onBookSessionClick }: HeroSectionProps) {
  const isAr = lang === 'ar';
  const name = isAr ? center.name_ar : center.name_en;
  const desc = isAr ? center.description_ar : center.description_en;
  const heroImage = center.hero_image_url || HERO_FALLBACK;

  return (
    <header className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center w-full h-full z-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-primary/40 z-10" />

      <div className="relative z-20 text-center px-4 md:px-12 text-on-primary max-w-4xl mx-auto" dir={isAr ? 'rtl' : 'ltr'}>
        <h1 className="font-display-lg text-display-lg md:text-6xl lg:text-7xl mb-4 font-bold drop-shadow-lg">
          {name}
        </h1>
        <p className="font-body-lg text-body-lg md:text-xl mb-8 drop-shadow-md text-surface-container-low">
          {desc || (isAr
            ? 'مركز فروسية احترافي يقدم برامج تدريبية متكاملة في بيئة آمنة ومنظمة.'
            : 'Experience premier equestrian services in a world-class facility.'
          )}
        </p>
        <button
          onClick={onBookSessionClick}
          id="hero-book-session-btn"
          className="bg-primary text-on-primary font-title-md text-title-md px-8 py-4 rounded hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 shadow-xl shadow-primary/20 transform hover:-translate-y-1"
        >
          {isAr ? 'احجز الآن' : 'Book Now'}
        </button>
      </div>
    </header>
  );
}
