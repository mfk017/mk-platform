'use client';

import React from 'react';
import { Language } from '@/lib/i18n';

interface TrainersSectionProps {
  trainers: any[];
  lang: Language;
}

export function TrainersSection({ trainers, lang }: TrainersSectionProps) {
  const isAr = lang === 'ar';

  if (!trainers || trainers.length === 0) return null;

  return (
    <section id="trainers-section" className="section">
      <div className="section-header">
        <h2 className="section-title">{isAr ? 'المدربون' : 'Instructors'}</h2>
      </div>

      <div className="trainers-grid">
        {trainers.map((trainer) => {
          const name = isAr ? trainer.name_ar : trainer.name_en;
          const bio = isAr ? trainer.bio_ar : trainer.bio_en;

          return (
            <div key={trainer.id} className="trainer-card">
              {trainer.image_url ? (
                <img
                  src={trainer.image_url}
                  alt={name}
                  className="trainer-card-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="trainer-card-placeholder">👤</div>
              )}
              <div className="trainer-card-body">
                <div className="trainer-card-name">{name}</div>
                {bio && <div className="trainer-card-bio">{bio}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
