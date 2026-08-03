'use client';

import React from 'react';
import Link from 'next/link';

export function MarketingFooter({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const isAr = lang === 'ar';
  
  return (
    <footer className="bg-[#040405] border-t border-white/5 py-16 px-4" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1 flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-2 text-white no-underline group mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all">
              MK
            </div>
            <span className="font-bold text-xl tracking-tight">Platform</span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            {isAr 
              ? 'المنصة الرائدة لإدارة مراكز الفروسية في المملكة العربية السعودية.' 
              : 'The leading equestrian center management platform in Saudi Arabia.'}
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">{isAr ? 'المنتج' : 'Product'}</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">{isAr ? 'نظام الحجز' : 'Booking System'}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{isAr ? 'إدارة العملاء' : 'Client Management'}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{isAr ? 'المدفوعات' : 'Payments'}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{isAr ? 'الدعم' : 'Support'}</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">{isAr ? 'مركز المساعدة' : 'Help Center'}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{isAr ? 'اتصل بنا' : 'Contact Us'}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{isAr ? 'قانوني' : 'Legal'}</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{isAr ? 'شروط الخدمة' : 'Terms of Service'}</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} MK Platform. {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
      </div>
    </footer>
  );
}
