'use client';

import React from 'react';
import Link from 'next/link';

export default function CustomerHubPage() {
  return (
    <>
      {/* Welcome Header */}
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-2">
            أهلاً بعودتك، سارة | Welcome back, Sarah
          </h1>
          <p className="font-body-md text-on-surface-variant">
            إليك نظرة عامة على أنشطة الفروسية القادمة الخاصة بك. | Here is an overview of your upcoming equestrian activities.
          </p>
        </div>
        <div className="hidden md:block">
          <button className="flex items-center gap-2 font-label-sm text-secondary hover:text-secondary-container transition-colors group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
            عرض الجدول الزمني الكامل | View Full Schedule
          </button>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Left Column: Upcoming & Progress (8 cols on desktop) */}
        <div className="col-span-1 md:col-span-8 flex flex-col gap-gutter">
          
          {/* Upcoming Sessions Card */}
          <section className="bg-surface-container-lowest rounded-xl p-8 border border-secondary/10 shadow-xl shadow-primary/5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            {/* Left Color Accent */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary"></div>
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-title-md text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">event_upcoming</span>
                الجلسات القادمة | Upcoming Sessions
              </h2>
              <span className="bg-surface-container text-on-surface-variant font-label-xs px-3 py-1 rounded-full">
                الـ 7 أيام القادمة | Next 7 Days
              </span>
            </div>
            
            <div className="space-y-4">
              {/* Session Item 1 */}
              <Link href="/checkout" className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/30 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-fixed/20 rounded-lg flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <h3 className="font-label-sm text-on-surface mb-1">مستوى متقدم في الترويض | Advanced Dressage Form</h3>
                    <p className="font-label-xs text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> اليوم، 14:00 | Today, 14:00
                      <span className="material-symbols-outlined text-[14px] ml-2">person</span> المدرب | Trainer: Marcus L.
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-label-sm text-on-surface">الخيل | Horse: Apollo</div>
                  <span className="inline-block mt-1 bg-secondary-fixed/50 text-on-secondary-container font-label-xs px-2 py-0.5 rounded">مؤكد | Confirmed</span>
                </div>
              </Link>

              {/* Session Item 2 */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/30 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-fixed/20 rounded-lg flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined">landscape</span>
                  </div>
                  <div>
                    <h3 className="font-label-sm text-on-surface mb-1">التحضير لركوب المسار | Trail Riding Prep</h3>
                    <p className="font-label-xs text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> الخميس 24، 09:00 | Thu 24th, 09:00
                      <span className="material-symbols-outlined text-[14px] ml-2">person</span> المدرب | Trainer: Elena V.
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-label-sm text-on-surface">الخيل | Horse: Starfire</div>
                  <span className="inline-block mt-1 bg-surface-dim text-on-surface-variant font-label-xs px-2 py-0.5 rounded">معلق بسبب الطقس | Pending Weather</span>
                </div>
              </div>
            </div>
          </section>

          {/* Progress Tracker Card */}
          <section className="bg-surface-container-lowest rounded-xl p-8 border border-secondary/10 shadow-xl shadow-primary/5 hover:-translate-y-1 transition-transform duration-300">
            <h2 className="font-title-md text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">trending_up</span>
              متتبع التقدم | Progress Tracker
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Skill 1 */}
              <div className="bg-surface p-5 rounded-lg border border-outline-variant/20 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-4 shadow-md">
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                </div>
                <h3 className="font-label-sm text-on-surface mb-2">التحكم الأساسي | Basic Control</h3>
                <div className="w-full bg-surface-container-high rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="font-label-xs text-primary font-semibold">برونزية محققة | Bronze Achieved</span>
              </div>

              {/* Skill 2 */}
              <div className="bg-surface p-5 rounded-lg border border-outline-variant/20 flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-4">
                  <span className="material-symbols-outlined text-[32px]">emoji_events</span>
                </div>
                <h3 className="font-label-sm text-on-surface mb-2">مقدمة للترويض | Dressage Intro</h3>
                <div className="w-full bg-surface-container-high rounded-full h-2 mb-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="font-label-xs text-secondary">فضية - قيد التقدم | Silver - In Progress</span>
              </div>

              {/* Skill 3 */}
              <div className="bg-surface p-5 rounded-lg border border-outline-variant/20 flex flex-col items-center text-center opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-surface-container-high border-2 border-dashed border-outline-variant flex items-center justify-center text-outline mb-4">
                  <span className="material-symbols-outlined text-[32px]">lock</span>
                </div>
                <h3 className="font-label-sm text-on-surface mb-2">أساسيات القفز | Jumping Basics</h3>
                <div className="w-full bg-surface-container-high rounded-full h-2 mb-2">
                  <div className="bg-surface-dim h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <span className="font-label-xs text-on-surface-variant">ذهبية - مقفلة | Gold - Locked</span>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: My Stable & Finances (4 cols on desktop) */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-gutter">
          
          {/* My Stable Widget */}
          <section className="bg-primary text-on-primary rounded-xl overflow-hidden shadow-xl shadow-primary/10 relative hover:-translate-y-1 transition-transform duration-300">
            {/* Atmospheric Background */}
            <div 
              className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=600&q=80')" }}
            ></div>
            
            <div className="relative p-6 z-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-title-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-inverse-primary" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                  إسطبلي | My Stable
                </h2>
                <button className="text-inverse-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>

              {/* Horse Profile Mini */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-surface/20 p-1">
                  <div 
                    className="w-full h-full rounded bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=200&q=80')" }}
                  ></div>
                </div>
                <div>
                  <h3 className="font-label-sm text-white text-lg">عداء منتصف الليل | Midnight Runner</h3>
                  <p className="font-label-xs text-inverse-primary">إيواء: شامل | Livery: Full Board</p>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-primary-fixed/10 p-3 rounded-lg backdrop-blur-sm border border-white/5">
                  <span className="font-label-xs text-inverse-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">health_and_safety</span> الحالة الصحية | Health Status
                  </span>
                  <span className="bg-primary-fixed text-on-primary-fixed font-label-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> ممتازة | Optimal
                  </span>
                </div>
                <div className="flex justify-between items-center bg-primary-fixed/10 p-3 rounded-lg backdrop-blur-sm border border-white/5">
                  <span className="font-label-xs text-inverse-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">directions_run</span> النشاط الحالي | Current Activity
                  </span>
                  <span className="bg-surface-dim/30 text-white font-label-xs px-2 py-0.5 rounded border border-white/20">
                    راحة في الحلبة | Resting in Paddock
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 bg-white text-primary font-label-sm py-3 rounded-lg hover:bg-surface-container-low transition-colors shadow-md">
                عرض السجلات كاملة | View Full Records
              </button>
            </div>
          </section>

          {/* Payment History Summary */}
          <section className="bg-surface-container-lowest rounded-xl p-6 border border-secondary/10 shadow-xl shadow-primary/5 hover:-translate-y-1 transition-transform duration-300">
            <h2 className="font-title-md text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-outline">receipt_long</span>
              المعاملات الأخيرة | Recent Transactions
            </h2>
            <ul className="space-y-3 mb-6">
              <li className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                <div>
                  <p className="font-label-sm text-on-surface">درس: الترويض | Lesson: Dressage</p>
                  <p className="font-label-xs text-on-surface-variant">Oct 15, 2023</p>
                </div>
                <div className="text-right">
                  <p className="font-body-md text-on-surface font-mono">$85.00</p>
                  <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">مدفوع | Paid</span>
                </div>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                <div>
                  <p className="font-label-sm text-on-surface">رسوم الإيواء الشهرية | Monthly Livery Fee</p>
                  <p className="font-label-xs text-on-surface-variant">Oct 01, 2023</p>
                </div>
                <div className="text-right">
                  <p className="font-body-md text-on-surface font-mono">$1,200.00</p>
                  <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">مدفوع | Paid</span>
                </div>
              </li>
            </ul>
            <button className="w-full text-center font-label-sm text-secondary hover:text-secondary-container transition-colors py-2 border border-secondary/20 rounded-lg hover:bg-secondary/5">
              عرض الكشف | View Statement
            </button>
          </section>

        </div>
      </div>
    </>
  );
}
