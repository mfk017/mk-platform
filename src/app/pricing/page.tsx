'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MarketingHeader, Language } from '@/components/MarketingHeader';
import { MarketingFooter } from '@/components/MarketingFooter';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function PricingPage() {
  const [lang, setLang] = useState<Language>('ar');
  const isAr = lang === 'ar';

  return (
    <div className={`min-h-screen bg-[#040405] text-slate-100 ${isAr ? 'font-cairo' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <MarketingHeader lang={lang} onLanguageChange={setLang} />

      <main className="pt-32 pb-24 max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            {isAr ? 'تسعير شفاف وعادل' : 'Transparent, Fair Pricing'}
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            {isAr ? 'لا توجد رسوم اشتراك شهرية ولا رسوم خفية. نحن نربح فقط عندما تتلقى حجزاً ناجحاً.' : 'No monthly subscription fees, no hidden costs. We only make money when you receive a successful booking.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Free Tier */}
          <div className="bg-[#09090b] border border-white/5 rounded-3xl p-8 flex flex-col opacity-70">
            <h3 className="text-2xl font-bold text-white mb-2">{isAr ? 'الاشتراك الشهري' : 'Monthly Subscription'}</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-black text-white">SAR 0</span>
              <span className="text-slate-400">{isAr ? '/ شهر' : '/ month'}</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-slate-300">
                <XCircle className="w-5 h-5 text-slate-500" />
                <span>{isAr ? 'لا توجد رسوم إعداد' : 'No setup fees'}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <XCircle className="w-5 h-5 text-slate-500" />
                <span>{isAr ? 'لا توجد رسوم صيانة' : 'No maintenance fees'}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <XCircle className="w-5 h-5 text-slate-500" />
                <span>{isAr ? 'لا توجد رسوم استضافة' : 'No hosting fees'}</span>
              </li>
            </ul>
          </div>

          {/* Pay per booking */}
          <div className="bg-gradient-to-b from-violet-900/40 to-indigo-900/10 border border-violet-500/30 rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-2xl shadow-violet-900/20">
            <div className="absolute top-0 right-0 bg-violet-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
              {isAr ? 'النموذج المعتمد' : 'Standard Model'}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">{isAr ? 'عمولة المنصة' : 'Platform Commission'}</h3>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-black text-violet-400">SAR 6</span>
              <span className="text-slate-400">{isAr ? '/ حجز' : '/ booking'}</span>
            </div>
            <p className="text-sm text-slate-400 mb-8">
              {isAr ? 'عمولة ثابتة مهما كانت قيمة الحجز.' : 'A flat fee regardless of the booking value.'}
            </p>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-violet-400" />
                <span>{isAr ? 'تشمل الموقع الخاص بك' : 'Includes your custom booking page'}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-violet-400" />
                <span>{isAr ? 'تشمل لوحة التحكم الكاملة' : 'Includes full center dashboard'}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-violet-400" />
                <span>{isAr ? 'تشمل التقارير والتحليلات' : 'Includes reports and analytics'}</span>
              </li>
              <li className="flex items-start gap-3 text-slate-200 mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xs text-slate-400 leading-relaxed">
                  * {isAr 
                    ? 'رسوم بوابات الدفع الإلكتروني (مدى، أبل باي، بطاقات ائتمانية) تُحسب بشكل منفصل بناءً على تسعيرة البنك وتخصم مباشرة.'
                    : 'Payment gateway fees (Mada, Apple Pay, Visa/Mastercard) are calculated separately based on standard bank rates and deducted directly.'}
                </span>
              </li>
            </ul>

            <Link href="/register" className="bg-white text-black text-center py-4 rounded-xl font-bold hover:bg-violet-50 transition-colors w-full">
              {isAr ? 'ابدأ الآن' : 'Get Started Now'}
            </Link>
          </div>
        </div>
      </main>

      <MarketingFooter lang={lang} />
    </div>
  );
}
