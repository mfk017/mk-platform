'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { MarketingHeader, Language } from '@/components/MarketingHeader';
import { MarketingFooter } from '@/components/MarketingFooter';

export default function AboutPage() {
  const [lang, setLang] = useLanguage('ar');
  const isAr = lang === 'ar';

  return (
    <div className={`min-h-screen bg-[#040405] text-slate-100 ${isAr ? 'font-cairo' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <MarketingHeader lang={lang} onLanguageChange={setLang} />

      <main className="pt-32 pb-24 max-w-3xl mx-auto px-4 md:px-8">
        <div className="space-y-12">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight text-center">
            {isAr ? 'عن المنصة' : 'About Platform'}
          </h1>
          
          <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
            <p>
              {isAr 
                ? 'نحن نؤمن بأن مراكز الفروسية تستحق تقنية متطورة تسهل عليها إدارة أعمالها وتقديم تجربة حجز سلسة لعملائها.'
                : 'We believe equestrian centers deserve advanced technology to streamline their operations and provide a seamless booking experience for their clients.'}
            </p>
            <p>
              {isAr 
                ? 'تم بناء المنصة لتكون الحل الشامل الذي يربط بين المراكز والفرسان، مع توفير لوحات تحكم متقدمة، بوابات دفع آمنة، ونظام حجز لا مثيل له في بساطته وفعاليته.'
                : 'Our platform was built as the comprehensive solution bridging centers and riders, providing advanced dashboards, secure payment gateways, and a booking system unmatched in its simplicity and effectiveness.'}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isAr ? 'تواصل معنا' : 'Contact Us'}
            </h2>
            <div className="flex flex-col gap-4 text-slate-300">
              <a href="https://wa.me/966549485894" className="hover:text-emerald-400 transition-colors" target="_blank" rel="noreferrer">
                {isAr ? 'واتساب: 966549485894+' : 'WhatsApp: +966 54 948 5894'}
              </a>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter lang={lang} />
    </div>
  );
}
