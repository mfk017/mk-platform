'use client';

import React, { useState } from 'react';
import { Clock, Package, Home, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface ServicesSectionProps {
  services: any[];
  lang: Language;
  onSelectService: (service: any) => void;
}

/**
 * Training Service Card — shows name, description, duration, price, Book Now button.
 * If the same service has related packages (category='package' with same name pattern),
 * those are shown inline. Since packages are separate records, we show all 'package'
 * category items in a dedicated subsection below the training grid.
 */
function TrainingServiceCard({ service, lang, onSelect }: { service: any; lang: Language; onSelect: () => void }) {
  const isAr = lang === 'ar';
  const name = isAr ? service.name_ar : service.name_en;
  const desc = isAr ? service.description_ar : service.description_en;

  return (
    <div className="service-card">
      <div className="service-card-name">{name}</div>
      {desc && <div className="service-card-desc">{desc}</div>}

      <div className="service-card-meta">
        {service.duration_minutes && (
          <span className="service-card-duration">
            <Clock size={13} />
            {service.duration_minutes} {isAr ? 'دقيقة' : 'min'}
          </span>
        )}
        <span className="service-card-price">
          {service.price?.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}
        </span>
      </div>

      <button className="btn-book-now" onClick={onSelect} id={`book-service-${service.id}`}>
        {isAr ? 'احجز الآن' : 'Book Now'}
      </button>
    </div>
  );
}

function PackageServiceCard({ service, lang, onSelect }: { service: any; lang: Language; onSelect: () => void }) {
  const isAr = lang === 'ar';
  const name = isAr ? service.name_ar : service.name_en;
  const originalPrice = service.original_price ?? service.price;
  const finalPrice = service.price;
  const discountPct = service.discount_percent ?? (originalPrice > finalPrice ? Math.round((1 - finalPrice / originalPrice) * 100) : 0);

  return (
    <div className="service-card">
      <div className="service-card-name">{name}</div>
      {service.session_count && (
        <div className="service-card-duration" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
          <Package size={13} />
          {service.session_count} {isAr ? 'جلسات' : 'sessions'}
        </div>
      )}

      <div className="service-card-meta" style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {discountPct > 0 && (
            <span className="badge-discount">-{discountPct}%</span>
          )}
          {discountPct > 0 && originalPrice && (
            <span className="package-price-original">{originalPrice.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}</span>
          )}
          <span className="service-card-price">
            {finalPrice?.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}
          </span>
        </div>
        <button className="btn-add-package" onClick={onSelect} aria-label="Select package">
          <ShoppingCart size={13} />
        </button>
      </div>

      <button className="btn-book-now" onClick={onSelect} id={`book-package-${service.id}`}>
        {isAr ? 'احجز الباقة' : 'Book Package'}
      </button>
    </div>
  );
}

function LiveryServiceCard({ service, lang, onSelect }: { service: any; lang: Language; onSelect: () => void }) {
  const isAr = lang === 'ar';
  const name = isAr ? service.name_ar : service.name_en;
  const desc = isAr ? service.description_ar : service.description_en;

  return (
    <div className="service-card">
      <div className="service-card-name">{name}</div>
      {desc && <div className="service-card-desc">{desc}</div>}

      <div className="service-card-meta">
        <span className="service-card-duration">
          <Clock size={13} />
          {isAr ? 'شهري' : 'Monthly'}
        </span>
        <span className="livery-price">
          {service.price?.toLocaleString()} <span className="livery-price-sub">{isAr ? 'ر.س/شهر' : 'SAR/mo'}</span>
        </span>
      </div>

      <button className="btn-book-now" onClick={onSelect} id={`book-livery-${service.id}`}>
        {isAr ? 'احجز الآن' : 'Book Now'}
      </button>
    </div>
  );
}

export function ServicesSection({ services, lang, onSelectService }: ServicesSectionProps) {
  const isAr = lang === 'ar';
  const [showAllPackages, setShowAllPackages] = useState(false);

  const training = services.filter((s) => s.category === 'training');
  const packages = services.filter((s) => s.category === 'package');
  const livery = services.filter((s) => s.category === 'livery');

  // Fallback: if no category set, treat all as training
  const allTraining = training.length === 0 && packages.length === 0 && livery.length === 0
    ? services
    : training;

  if (services.length === 0) return null;

  const visiblePackages = showAllPackages ? packages : packages.slice(0, 3);
  const hiddenPkgCount = Math.max(0, packages.length - 3);

  return (
    <section id="services-section" className="section">
      <div className="section-header">
        <h2 className="section-title">{isAr ? 'الخدمات' : 'Services'}</h2>
        <span className="section-link" style={{ cursor: 'default' }}>
          {isAr ? 'الكل' : 'All'} ›
        </span>
      </div>

      {/* Training Services */}
      {allTraining.length > 0 && (
        <div className="subsection-spacing">
          <div className="subsection-title">
            <Clock size={16} />
            {isAr ? 'خدمات التدريب' : 'Training Services'}
          </div>
          <div className="services-grid">
            {allTraining.map((service) => (
              <TrainingServiceCard
                key={service.id}
                service={service}
                lang={lang}
                onSelect={() => onSelectService(service)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Package Services */}
      {packages.length > 0 && (
        <div className="subsection-spacing">
          <div className="subsection-title">
            <Package size={16} />
            {isAr ? 'الباقات' : 'Packages'}
          </div>
          <div className="services-grid">
            {visiblePackages.map((service) => (
              <PackageServiceCard
                key={service.id}
                service={service}
                lang={lang}
                onSelect={() => onSelectService(service)}
              />
            ))}
          </div>
          {hiddenPkgCount > 0 && (
            <button className="show-more-btn" onClick={() => setShowAllPackages(!showAllPackages)} style={{ marginTop: 12 }}>
              {showAllPackages ? (
                <><ChevronUp size={14} /> {isAr ? 'إخفاء' : 'Show less'}</>
              ) : (
                <><ChevronDown size={14} /> {isAr ? `عرض المزيد (${hiddenPkgCount})` : `Show more (${hiddenPkgCount})`}</>
              )}
            </button>
          )}
        </div>
      )}

      {/* Livery Services */}
      {livery.length > 0 && (
        <div className="subsection-spacing">
          <div className="subsection-title">
            <Home size={16} />
            {isAr ? 'خدمات الإيواء' : 'Livery Services'}
          </div>
          <div className="services-grid">
            {livery.map((service) => (
              <LiveryServiceCard
                key={service.id}
                service={service}
                lang={lang}
                onSelect={() => onSelectService(service)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
