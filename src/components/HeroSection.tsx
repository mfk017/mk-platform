'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface HeroSectionProps {
  center: any;
  lang: Language;
  onBookSessionClick: () => void;
}

// Beautiful equestrian stable image from Unsplash
const HERO_FALLBACK = 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1600&q=80';

export function HeroSection({ center, lang, onBookSessionClick }: HeroSectionProps) {
  const isAr = lang === 'ar';
  const name = isAr ? center.name_ar : center.name_en;
  const desc = isAr ? center.description_ar : center.description_en;
  const heroImage = center.hero_image_url || HERO_FALLBACK;

  return (
    <section className="hero-section" style={{ minHeight: '520px' }}>
      {/* Background Image */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content" dir={isAr ? 'rtl' : 'ltr'}>
        <h1 className="hero-title">
          {isAr ? `مرحباً بكم في ${name}` : `Welcome to ${name}`}
        </h1>
        <p className="hero-desc">
          {desc || (isAr
            ? 'مركز فروسية احترافي يقدم برامج تدريبية متكاملة في بيئة آمنة ومنظمة. نقدم دروس الفروسية والتدريب الخاص والرحلات الخارجية تحت إشراف مدربين متمرسين.'
            : 'A professional equestrian center offering structured training programs in a safe and well-managed environment. Providing riding lessons, private training, and outdoor rides under expert supervision.'
          )}
        </p>
        <div className="hero-actions">
          <button
            className="btn-hero-primary"
            onClick={onBookSessionClick}
            id="hero-book-session-btn"
          >
            {isAr ? 'احجز جلسة' : 'Book a Ride'}
            <ChevronRight size={16} />
          </button>
          <a
            href="#services-section"
            className="btn-hero-secondary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {isAr ? 'الخدمات' : 'Services'}
          </a>
        </div>
      </div>
    </section>
  );
}
