'use client';

import React from 'react';
import { Language } from '@/lib/i18n';

interface HorsesSectionProps {
  horses: any[];
  lang: Language;
}

const HORSE_PLACEHOLDER = '🐴';

export function HorsesSection({ horses, lang }: HorsesSectionProps) {
  const isAr = lang === 'ar';

  if (!horses || horses.length === 0) return null;

  return (
    <section id="horses-section" className="section">
      <div className="section-header">
        <h2 className="section-title">{isAr ? 'الخيول' : 'Horses'}</h2>
      </div>

      <div className="horses-grid">
        {horses.map((horse) => {
          const name = isAr ? horse.name_ar : horse.name_en;
          const breed = isAr ? horse.breed_ar : horse.breed_en;

          return (
            <div key={horse.id} className="horse-card">
              {horse.image_url ? (
                <img
                  src={horse.image_url}
                  alt={name}
                  className="horse-card-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="horse-card-placeholder">{HORSE_PLACEHOLDER}</div>
              )}
              <div className="horse-card-body">
                <div className="horse-card-name">{name}</div>
                <div className="horse-card-meta">
                  {horse.age && `${horse.age} • `}
                  {breed || (isAr ? 'خيل عربي' : 'Arabian')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
