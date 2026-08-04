'use client';

import React from 'react';
import { Language } from '@/lib/i18n';

interface TrainersSectionProps {
  trainers: any[];
  lang: Language;
}

const TRAINER_PLACEHOLDER = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80'; // Fallback human portrait

export function TrainersSection({ trainers, lang }: TrainersSectionProps) {
  const isAr = lang === 'ar';

  if (!trainers || trainers.length === 0) return null;

  return (
    <section id="trainers-section" className="mb-24">
      <div className="text-center mb-12">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
          {isAr ? 'المدربون' : 'Our Instructors'}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          {isAr
            ? 'تعلم من أفضل الخبراء في المجال.'
            : 'Learn from the best experts in the field.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => {
          const name = isAr ? trainer.name_ar : trainer.name_en;
          const bio = isAr ? trainer.bio_ar : trainer.bio_en;
          const specialty = isAr ? trainer.specialty_ar : trainer.specialty_en;
          const imageUrl = trainer.image_url || TRAINER_PLACEHOLDER;

          return (
            <article
              key={trainer.id}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl shadow-primary/5 border border-secondary/10 flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative h-48 w-full bg-surface-container-high">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-5 flex flex-col gap-3 flex-grow">
                <div>
                  <h3 className="font-title-md text-title-md text-primary">{name}</h3>
                  {specialty && (
                    <div className="inline-block mt-1 bg-surface-container-low text-primary px-2 py-1 rounded font-label-sm text-label-xs">
                      {specialty}
                    </div>
                  )}
                </div>
                {bio && (
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mt-2">
                    {bio}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
