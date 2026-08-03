'use client';

import React, { useState } from 'react';
import { Clock, Users, ArrowRight, ArrowLeft, BookmarkCheck, Warehouse, Sparkles } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';

export interface ServiceData {
  id: string;
  name_en: string;
  name_ar: string;
  price: number;
  duration_minutes: number;
  category: string; // lesson | livery | package
  description_en?: string | null;
  description_ar?: string | null;
  image_url?: string | null;
}

interface ServiceListProps {
  services: ServiceData[];
  lang: Language;
  onSelectService: (service: ServiceData) => void;
}

// Fallback high quality equestrian photos matching canter-app.com services
const serviceImages: Record<string, string> = {
  lesson: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80',
  livery: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
  package: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=600&q=80',
};

export const ServiceList: React.FC<ServiceListProps> = ({
  services,
  lang,
  onSelectService,
}) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: isAr ? 'جميع الخدمات' : 'All Services' },
    { id: 'lesson', label: isAr ? 'حصص الركوب' : 'Riding Lessons' },
    { id: 'livery', label: isAr ? 'إيواء الخيل' : 'Livery' },
    { id: 'package', label: isAr ? 'الباقات' : 'Packages' },
  ];

  const filteredServices = services.filter(
    (s) => selectedCategory === 'all' || s.category === selectedCategory
  );

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid (3 cols on desktop matching canter-app.com) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => {
          const name = isAr ? service.name_ar : service.name_en;
          const desc = isAr
            ? service.description_ar || service.description_en
            : service.description_en || service.description_ar;

          const imageUrl =
            service.image_url ||
            serviceImages[service.category] ||
            serviceImages.lesson;

          return (
            <div
              key={service.id}
              className="group card-warm border border-transparent hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden"
            >
              {/* Aspect Ratio Video Image Thumbnail */}
              <div className="aspect-video w-full overflow-hidden rounded-t-xl relative bg-slate-900">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {service.category === 'livery' ? (
                    <span className="badge-teal">
                      <Warehouse className="w-3 h-3" />
                      {t.categoryLivery}
                    </span>
                  ) : (
                    <span className="badge-amber">
                      <Sparkles className="w-3 h-3" />
                      {service.category === 'lesson' ? t.categoryLesson : t.categoryPackage}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors font-cairo">
                    {name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-cairo">
                    {desc}
                  </p>
                </div>

                {/* Attributes: Duration & Capacity */}
                <div className="space-y-3 pt-2 border-t border-slate-800/80 text-xs">
                  {service.category === 'livery' ? (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>{isAr ? 'اشتراك شهري شامل' : 'Monthly Full Board'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>
                          {service.duration_minutes} {t.minutes}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>
                          4 {t.participants}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Skill level tag */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                      {isAr ? 'جميع المستويات' : 'All Levels'}
                    </span>
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div className="text-2xl font-bold text-amber-400 font-montserrat">
                    {service.price.toLocaleString()}
                    <span className="text-xs font-normal text-slate-400 ml-1">
                      {t.sar}
                      {service.category === 'livery' ? (isAr ? '/شهر' : '/mo') : ''}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="btn-amber text-xs py-2 px-4"
                  >
                    <span>{t.bookNow}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
