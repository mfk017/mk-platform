'use client';

import React from 'react';
import { Language } from '@/lib/i18n';

interface HorsesSectionProps {
  horses: any[];
  lang: Language;
}

const HORSE_PLACEHOLDER = 'https://lh3.googleusercontent.com/aida-public/AB6AXuANET-i3QwWFY1slt7ZxIcYuBUUCKsAH8rpROI8fr8VUE2mPAoOph41hgqAY50Cax234dFhncS_okcvO1HLG7vNvojUq9gbPSJZYvEGjD6Kd1XBDBV-KtMnERcy67u7Hem6KBKfDoXr26RZ6iFly0qzYF4B1rJCPfCiroGFGwIsDVQ25HJJdHEqy_lA7fTdNTjVdG3EEs6yQ1OOAA2PLyDlOJp-YKApmvLchfPr6rlrM4UNaP4TVKI';

export function HorsesSection({ horses, lang }: HorsesSectionProps) {
  const isAr = lang === 'ar';

  if (!horses || horses.length === 0) return null;

  return (
    <section id="horses-section" className="mb-24">
      <div className="text-center mb-12">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
          {isAr ? 'خيولنا' : 'Our Horses'}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          {isAr
            ? 'تعرف على شركائنا في التدريب. لكل خيل شخصية ومستوى مهارة فريد.'
            : 'Meet our training partners. Each horse has a unique personality and skill level.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {horses.map((horse) => {
          const name = isAr ? horse.name_ar : horse.name_en;
          const breed = isAr ? horse.breed_ar : horse.breed_en;
          const imageUrl = horse.image_url || HORSE_PLACEHOLDER;

          return (
            <article
              key={horse.id}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl shadow-primary/5 border border-secondary/10 flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative h-48 w-full">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-title-md text-title-md text-primary">{name}</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 border-t border-outline-variant/30 pt-3">
                  <div className="flex flex-col">
                    <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">
                      {isAr ? 'السلالة' : 'Breed'}
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      {breed || (isAr ? 'عربي' : 'Arabian')}
                    </span>
                  </div>
                  {horse.age && (
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">
                        {isAr ? 'العمر' : 'Age'}
                      </span>
                      <span className="font-body-md text-body-md text-on-surface">
                        {horse.age} {isAr ? 'سنوات' : 'Years'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
