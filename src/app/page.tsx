'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { MarketingHeader, Language } from '@/components/MarketingHeader';
import { MarketingFooter } from '@/components/MarketingFooter';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, 
  Smartphone, BarChart3, Clock, Users, Building2, CreditCard,
  Star
} from 'lucide-react';

// Custom hook for fade-in on scroll effect
function useFadeInOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
}

export default function MarketingHomePage() {
  const [lang, handleLangChange] = useLanguage('ar');
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  useFadeInOnScroll();

  const features = [
    { icon: <Clock className="w-6 h-6 text-violet-400" />, title: isAr ? 'نظام حجز متكامل' : 'Complete Booking System', desc: isAr ? 'إدارة المواعيد والحجوزات بسهولة وتزامن فوري.' : 'Smart calendar and real-time sync.' },
    { icon: <Users className="w-6 h-6 text-emerald-400" />, title: isAr ? 'إدارة العملاء' : 'Client Management', desc: isAr ? 'قاعدة بيانات للعملاء، سجل التاريخ، وبرنامج الولاء.' : 'Client database, history tracking, loyalty program.' },
    { icon: <CreditCard className="w-6 h-6 text-blue-400" />, title: isAr ? 'مدفوعات آمنة' : 'Secure Payments', desc: isAr ? 'استقبال المدفوعات عبر الإنترنت بشكل آمن.' : 'Accept online payments securely.' },
    { icon: <Smartphone className="w-6 h-6 text-amber-400" />, title: isAr ? 'إشعارات واتساب' : 'WhatsApp Notifications', desc: isAr ? 'تنبيهات وتذكيرات تلقائية للحجوزات.' : 'Automatic booking reminders.' },
    { icon: <BarChart3 className="w-6 h-6 text-rose-400" />, title: isAr ? 'تقارير وتحليلات' : 'Reports & Analytics', desc: isAr ? 'لوحة تحكم تفصيلية لأداء المركز.' : 'Performance dashboard.' },
    { icon: <Building2 className="w-6 h-6 text-indigo-400" />, title: isAr ? 'موقع إلكتروني خاص' : 'Custom Website', desc: isAr ? 'موقع حجز مخصص بنطاقك الخاص.' : 'Dedicated booking website with your domain.' },
  ];

  return (
    <div className={`min-h-screen bg-[#040405] text-slate-100 selection:bg-violet-500/30 ${isAr ? 'font-cairo' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <MarketingHeader lang={lang} onLanguageChange={handleLangChange} />

      <main>
        {/* Section 2: Hero Section */}
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-start fade-in-section opacity-0 translate-y-4 transition-all duration-700 delay-100">
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 px-4 py-1.5 rounded-full text-violet-300 text-sm font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>{isAr ? 'المنصة رقم #1 لمراكز الفروسية' : '#1 Equestrian Center Platform'}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-black text-white tracking-tight leading-[1.15]">
                {isAr ? 'منصة الحجز الرائدة لمراكز الفروسية' : 'The Leading Equestrian Center Booking Platform'}
              </h1>
              
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {isAr ? 'أطلق مركزك عبر الإنترنت اليوم واستقبل الحجوزات والمدفوعات بكل سهولة.' : 'Launch your center online today and accept bookings and payments with ease.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href="/register" className="bg-white text-black hover:bg-violet-50 px-8 py-3.5 rounded-full text-base font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto justify-center">
                  {isAr ? 'سجل مركزك مجاناً' : 'Register Your Center Free'}
                  <ArrowIcon size={18} />
                </Link>
                <a href="#demo" className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-3.5 rounded-full text-base font-bold flex items-center gap-2 transition-all w-full sm:w-auto justify-center">
                  {isAr ? 'شاهد العرض التوضيحي' : 'Watch Demo'}
                </a>
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div id="demo" className="relative mx-auto w-full max-w-lg lg:max-w-none perspective-[1000px] fade-in-section opacity-0 translate-y-4 transition-all duration-700 delay-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-indigo-500/20 rounded-3xl blur-2xl transform rotate-3 scale-105" />
              <div className="relative bg-[#0b1120] border border-white/10 rounded-3xl p-6 shadow-2xl transform lg:rotate-[-2deg] lg:hover:rotate-0 transition-transform duration-700 group backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="font-bold text-sm text-slate-300 tracking-wide uppercase">MK Dashboard</div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 opacity-80" />
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Mock Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 transition-colors group-hover:bg-white/[0.07]">
                      <div className="text-[10px] text-slate-400 mb-1 font-medium">{isAr ? 'حجوزات اليوم' : 'Today\'s Bookings'}</div>
                      <div className="text-xl font-black text-white">12</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 transition-colors group-hover:bg-white/[0.07]">
                      <div className="text-[10px] text-slate-400 mb-1 font-medium">{isAr ? 'الإيرادات' : 'Revenue'}</div>
                      <div className="text-xl font-black text-emerald-400">4,200 <span className="text-xs font-bold text-emerald-500/50">SAR</span></div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 transition-colors group-hover:bg-white/[0.07]">
                      <div className="text-[10px] text-slate-400 mb-1 font-medium">{isAr ? 'العملاء' : 'Clients'}</div>
                      <div className="text-xl font-black text-blue-400">89</div>
                    </div>
                  </div>
                  {/* Mock Schedule List */}
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col gap-3">
                    <div className="text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">{isAr ? 'الجدول القادم' : 'Upcoming Schedule'}</div>
                    <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-default">
                      <div className="text-sm font-black text-violet-400 w-12">09:00</div>
                      <div className="text-sm font-medium text-slate-200">Private Training - Ahmed</div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-default">
                      <div className="text-sm font-black text-violet-400 w-12">10:30</div>
                      <div className="text-sm font-medium text-slate-200">Group Showjumping</div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-default">
                      <div className="text-sm font-black text-violet-400 w-12">14:00</div>
                      <div className="text-sm font-medium text-slate-200">Livery Service - Sara</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Stats Bar */}
        <section className="border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10 fade-in-section opacity-0 translate-y-4 transition-all duration-700" style={{ direction: 'ltr' }}>
            <div className="pt-4 sm:pt-0">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">500+</div>
              <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{isAr ? 'حجز ناجح' : 'Bookings Managed'}</div>
            </div>
            <div className="pt-8 sm:pt-0">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">50+</div>
              <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{isAr ? 'مركز مسجل' : 'Registered Centers'}</div>
            </div>
            <div className="pt-8 sm:pt-0">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">99%</div>
              <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{isAr ? 'رضا العملاء' : 'Client Satisfaction'}</div>
            </div>
          </div>
        </section>

        {/* Section 4: Features Section */}
        <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 fade-in-section opacity-0 translate-y-4 transition-all duration-700">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {isAr ? 'كل ما تحتاجه لإدارة مركزك' : 'Everything You Need to Manage Your Center'}
            </h2>
            <p className="text-slate-400 text-lg">
              {isAr ? 'أدوات متكاملة لتبسيط العمليات اليومية وزيادة الإيرادات.' : 'Integrated tools to streamline daily operations and increase revenue.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/5 hover:border-violet-500/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 group fade-in-section opacity-0 translate-y-4" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-violet-500/10 transition-all">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Testimonials Section */}
        <section className="py-24 md:py-32 bg-[#09090b] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 fade-in-section opacity-0 translate-y-4 transition-all duration-700">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                {isAr ? 'مراكز تثق في المنصة' : 'Centers That Trust MK'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Khalid Al-Saud', role: 'Owner', center: 'Al-Faris Equestrian', quote: 'MK completely transformed how we manage our riding school. The automated payments save us hours of work every week.' },
                { name: 'Sara Al-Ghamdi', role: 'Manager', center: 'Riyadh Riders', quote: 'The WhatsApp notifications drastically reduced our no-show rate. Best investment for our center.' },
                { name: 'Fahad Al-Otaibi', role: 'Head Coach', center: 'Jeddah Stables', quote: 'Clients love the easy booking interface, and I love having my schedule perfectly organized in the dashboard.' }
              ].map((t, i) => (
                <div key={i} className="bg-[#040405] border border-white/10 rounded-3xl p-8 relative hover:border-white/20 transition-colors fade-in-section opacity-0 translate-y-4" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="text-violet-500 mb-6 flex gap-1">
                    {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-300 text-base leading-relaxed mb-8 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-white font-black text-lg">{t.name[0]}</div>
                    <div>
                      <div className="text-white font-bold text-sm">{t.name}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{t.role}, {t.center}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: 3 Simple Steps */}
        <section className="py-24 md:py-32 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20 fade-in-section opacity-0 translate-y-4 transition-all duration-700">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                {isAr ? 'ابدأ في 3 خطوات بسيطة' : 'Get Started in 3 Simple Steps'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-violet-500/0" />
              
              {[
                { step: '1', title: isAr ? 'سجل' : 'Register', desc: isAr ? 'أنشئ حسابك المجاني.' : 'Create your free account.' },
                { step: '2', title: isAr ? 'خصص' : 'Customize', desc: isAr ? 'أضف الخدمات، الخيل، والمدربين.' : 'Add services, horses, and instructors.' },
                { step: '3', title: isAr ? 'انطلق' : 'Go Live', desc: isAr ? 'ابدأ باستقبال الحجوزات والمدفوعات.' : 'Start accepting bookings and payments.' },
              ].map((s, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center fade-in-section opacity-0 translate-y-4" style={{ transitionDelay: `${i * 200}ms` }}>
                  <div className="w-24 h-24 rounded-full bg-[#040405] border-[3px] border-violet-500 flex items-center justify-center text-3xl font-black text-white mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm max-w-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Pricing */}
        <section className="py-24 md:py-32 bg-[#09090b] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 fade-in-section opacity-0 translate-y-4 transition-all duration-700">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                {isAr ? 'تسعير بسيط وواضح' : 'Simple & Transparent Pricing'}
              </h2>
              <p className="text-slate-400 text-lg">
                {isAr ? 'بدون رسوم شهرية - ادفع فقط لكل حجز' : 'No monthly fees — pay only per booking'}
              </p>
            </div>

            <div className="bg-[#040405] border border-violet-500/30 rounded-3xl p-8 md:p-14 w-full max-w-lg shadow-[0_0_50px_rgba(139,92,246,0.15)] relative overflow-hidden fade-in-section opacity-0 translate-y-4 transition-all duration-700 delay-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
              
              <div className="relative z-10 text-center mb-10 border-b border-white/10 pb-10">
                <div className="text-6xl font-black text-white mb-3 flex items-baseline justify-center gap-3">
                  6 <span className="text-2xl text-slate-400 font-bold">SAR</span>
                </div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{isAr ? 'لكل حجز ناجح' : 'per successful booking'}</div>
              </div>
              
              <ul className="relative z-10 space-y-5 mb-10">
                {[
                  isAr ? 'موقع حجز مخصص لمركزك' : 'Custom booking website for your center',
                  isAr ? 'إدارة عدد لا محدود من الخيل والمدربين' : 'Unlimited horses & instructors management',
                  isAr ? 'استقبال المدفوعات عبر الإنترنت' : 'Accept online payments securely',
                  isAr ? 'إشعارات واتساب تلقائية' : 'Automatic WhatsApp notifications',
                  isAr ? 'تقارير وتحليلات شاملة' : 'Comprehensive reports & analytics',
                  isAr ? 'دعم فني متواصل' : 'Priority Support',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-200 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/register" className="relative z-10 block w-full bg-white text-black hover:bg-violet-50 py-4 rounded-xl text-center text-lg font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                {isAr ? 'ابدأ مجاناً' : 'Start Free'}
              </Link>
            </div>
          </div>
        </section>

        {/* Section 8: Final CTA Banner */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-900/20" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-violet-600/20 blur-[120px] rounded-t-full pointer-events-none" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center fade-in-section opacity-0 translate-y-4 transition-all duration-700">
            {/* Dashboard Mockup Small */}
            <div className="relative mx-auto w-full max-w-sm mb-12">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/30 to-indigo-500/30 rounded-3xl blur-2xl transform scale-90" />
              <div className="relative bg-[#0b1120] border border-white/10 rounded-3xl p-5 shadow-2xl flex items-center justify-between backdrop-blur-xl">
                <div className="flex flex-col text-left">
                  <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Total Revenue</div>
                  <div className="text-xl font-black text-emerald-400">142,500 <span className="text-sm">SAR</span></div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-violet-500/20 border border-violet-500/20 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-violet-400" />
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight max-w-3xl">
              {isAr ? 'جاهز لإطلاق مركزك عبر الإنترنت؟' : 'Ready to Launch Your Center Online?'}
            </h2>
            <Link href="/register" className="bg-violet-600 hover:bg-violet-500 text-white px-10 py-5 rounded-full text-lg font-bold inline-flex items-center gap-3 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:-translate-y-1">
              {isAr ? 'سجل مركزك الآن' : 'Register Your Center Now'}
              <ArrowIcon size={20} />
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter lang={lang} />
      
      {/* Global styles for animation */}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
