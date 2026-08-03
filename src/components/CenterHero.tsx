'use client';

import React from 'react';
import { MapPin, Phone, Mail, CheckCircle2, ShieldCheck, Star, Ticket, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';

interface CenterData {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  logo_url?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  phone: string;
  email: string;
  city: string;
  vat_enabled: boolean;
}

interface CenterHeroProps {
  center: CenterData;
  lang: Language;
}

export const CenterHero: React.FC<CenterHeroProps> = ({ center, lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const name = isAr ? center.name_ar : center.name_en;
  const description = isAr
    ? center.description_ar || center.description_en
    : center.description_en || center.description_ar;

  return (
    <div className="space-y-6">
      {/* Top Banner matching canter-app.com packages banner */}
      <div className="card-warm p-4 border-amber-500/20 bg-amber-500/5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">
            <Ticket className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-slate-200">
            {t.packagesBanner}
          </span>
        </div>

        <a href="#services-section" className="btn-outline-amber text-xs py-1.5 px-3 flex-shrink-0">
          <span>{t.viewPackages}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Center Banner Card */}
      <div className="card-warm p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Center Logo */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-500/30 flex-shrink-0 flex items-center justify-center shadow-xl">
              {center.logo_url ? (
                <img
                  src={center.logo_url}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-600 to-slate-900 flex items-center justify-center text-amber-400 font-bold text-3xl font-montserrat">
                  {name.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-extrabold text-white tracking-tight font-cairo">
                  {name}
                </h1>
                <span className="badge-teal">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.certifiedCenter}
                </span>
                {center.vat_enabled && (
                  <span className="badge-amber">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t.vatRegistered}
                  </span>
                )}
              </div>

              <p className="text-slate-300 max-w-2xl text-sm leading-relaxed font-cairo">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <MapPin className="w-4 h-4" />
                  <span>{center.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-300" />
                  <span dir="ltr">{center.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-300" />
                  <span>{center.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-slate-900/60 border border-slate-700/50 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-1 min-w-[150px] self-stretch md:self-auto">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <span className="text-xl font-bold font-montserrat">4.9</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Verified Center</p>
            <span className="text-[11px] text-amber-400 mt-1">{t.vatInclusive}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
