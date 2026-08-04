'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/i18n';

interface ServicesSectionProps {
  services: any[];
  lang: Language;
  onSelectService: (service: any) => void;
}

const SERVICE_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA_gqCp9kOZBoCtkUICH2EM_XgPznYe8UbxtkOLcVQXitgwoGUELdP77mvRCcATc2nkH1a2pHfwfUbY95a-MrEKVNsbQnEr8q57O44iXKvpaaEHeu_YmXMYhZ1ED3ijoluwdJN5MlB1kU0yXOyp5GxrlzOCCRO0z3xJ02L1mnfdTjvQ3fsuyydrY7Kb4So9zSWJc-o-n4_61v67Uwn41Wk2XX18N_6m1BVvSpQLCmHa0YOKHblKoI8',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD9qdtJkkFau8wgsx1otA4_03vztYM3ZAHQs-JOcnd7p_c9cHB9TdwcdA1xq3d6t7W7L1zRjenLakO4ZhjgZBKGb9wDB7ufsXd6yKNczp1G0qMPII3sO2U8RZoLd7bqsmVGmDWzf4D1kfkrmQGkrAsOhxS8sAXO9UqJSoHImr3yVMNHby_zHCoKtuusk9CJ_AB8YxYIwtvmR0hPoyqnPj6ereWYVkthzda42wZnzPE5vaE1Jv3AhEE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAfgCKY-L8DkpKuVpVv6V9JFWYJqPLCnUpJoRadBfUoLQl7-rI_sWM7oCUvqwgic1-BfJ2qXjAzVARgUSPGm5GQiHiXTRBmqWmRq6VAEeIAPSliCGHhGz3bs2zOuVTJD_9lZh2Wf_c4bKPfZAtRu5l4m09wTqBK33hvjhW_KqA300SEoLp-IHHqG7X6Fz3BhFTQ0z3I0L1y0Dwr-VMN-XpaK1zKSzA4saBzDwl4A-ABDH3JIzGvQbY',
];

export function ServicesSection({ services, lang, onSelectService }: ServicesSectionProps) {
  const isAr = lang === 'ar';

  const training = services.filter((s) => s.category === 'training');
  const packages = services.filter((s) => s.category === 'package');
  const livery = services.filter((s) => s.category === 'livery');
  const allTraining = training.length === 0 && packages.length === 0 && livery.length === 0
    ? services
    : training;

  if (services.length === 0) return null;

  const allBookable = [...allTraining, ...livery];

  return (
    <section id="services-section" className="mb-24">
      <div className="text-center mb-12">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
          {isAr ? 'خدماتنا' : 'Our Services'}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          {isAr
            ? 'تجارب فروسية مصممة لكل مستوى مهارة، بتوجيه من مدربينا الخبراء.'
            : 'Tailored equestrian experiences for every skill level, guided by our expert trainers.'}
        </p>
      </div>

      {/* Training / Bookable Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allBookable.map((service, idx) => {
          const name = isAr ? service.name_ar : service.name_en;
          const desc = isAr ? service.description_ar : service.description_en;
          const imgUrl = service.image_url || SERVICE_IMAGES[idx % SERVICE_IMAGES.length];

          return (
            <div
              key={service.id}
              className="bg-surface-container-lowest rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col"
            >
              <div
                className="h-48 bg-cover bg-center w-full"
                style={{ backgroundImage: `url(${imgUrl})` }}
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-title-md text-title-md text-primary">{name}</h3>
                  <span className="bg-surface-container-low text-primary px-2 py-1 rounded font-label-sm text-label-sm whitespace-nowrap">
                    {service.duration_minutes} {isAr ? 'دقيقة' : 'Min'}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-6 line-clamp-2">
                  {desc || (isAr ? 'تدريب فروسي احترافي' : 'Professional equestrian training')}
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-outline-variant/30">
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">
                    SAR {service.price}
                  </span>
                  <button
                    onClick={() => onSelectService(service)}
                    id={`book-service-${service.id}`}
                    className="bg-primary text-on-primary px-4 py-2 rounded font-label-sm text-label-sm hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  >
                    {isAr ? 'احجز' : 'Book'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Package Services */}
      {packages.length > 0 && (
        <div className="mt-16">
          <h3 className="font-headline-lg text-headline-lg text-primary mb-6 text-center">
            {isAr ? 'الباقات' : 'Packages'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const name = isAr ? pkg.name_ar : pkg.name_en;
              const discount = pkg.original_price && pkg.original_price > pkg.price
                ? Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100)
                : 0;
              return (
                <div
                  key={pkg.id}
                  className="bg-surface-container-lowest rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 overflow-hidden flex flex-col relative hover:-translate-y-1 transition-transform duration-300"
                >
                  {discount > 0 && (
                    <div className="absolute top-4 right-4 bg-error-container text-on-error-container text-[10px] font-bold px-2 py-1 rounded-full shadow-sm z-10">
                      {discount}% OFF
                    </div>
                  )}
                  <div className="h-2 bg-tertiary" />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-title-md text-title-md text-primary mb-1">{name}</h3>
                    {pkg.session_count && (
                      <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">
                        {pkg.session_count} {isAr ? 'جلسات' : 'sessions'} • {pkg.duration_minutes} {isAr ? 'دقيقة/جلسة' : 'min/session'}
                      </p>
                    )}
                    <div className="flex items-end gap-2 mt-auto pt-4 border-t border-outline-variant/30">
                      <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">
                        SAR {pkg.price}
                      </span>
                      {pkg.original_price && (
                        <span className="text-on-surface-variant text-sm line-through mb-1">
                          SAR {pkg.original_price}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onSelectService(pkg)}
                      id={`book-package-${pkg.id}`}
                      className="mt-4 w-full bg-primary text-on-primary px-4 py-2 rounded font-label-sm text-label-sm hover:bg-primary-container hover:text-on-primary-container transition-colors"
                    >
                      {isAr ? 'احجز الباقة' : 'Book Package'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
