'use client';

import React, { useState } from 'react';
import { MarketingHeader, Language } from '@/components/MarketingHeader';
import { MarketingFooter } from '@/components/MarketingFooter';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [lang, setLang] = useState<Language>('ar');
  const isAr = lang === 'ar';
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    centerNameEn: '',
    centerNameAr: '',
    ownerName: '',
    phone: '',
    email: '',
    city: '',
    services: '',
    password: '',
    termsAccepted: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setError(isAr ? 'يجب الموافقة على الشروط والأحكام' : 'You must accept the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#040405] text-slate-100 ${isAr ? 'font-cairo' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <MarketingHeader lang={lang} onLanguageChange={setLang} />

      <main className="pt-32 pb-24 max-w-2xl mx-auto px-4 md:px-8">
        <div className="bg-[#09090b] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {success ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                {isAr ? 'تم استلام طلبك بنجاح' : 'Application Received!'}
              </h2>
              <p className="text-lg text-slate-400">
                {isAr 
                  ? 'سنقوم بمراجعة طلبك والتواصل معك قريباً لتفعيل حسابك.'
                  : 'We will review your application and be in touch soon to activate your account.'}
              </p>
              <div className="pt-8">
                <Link href="/" className="text-violet-400 font-medium hover:text-violet-300">
                  {isAr ? 'العودة للرئيسية' : 'Back to Home'}
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-10 space-y-3">
                <h1 className="text-3xl font-black text-white">
                  {isAr ? 'سجل مركزك الآن' : 'Register Your Center'}
                </h1>
                <p className="text-slate-400">
                  {isAr ? 'انضم للمنصة الرائدة لإدارة الحجوزات والمدفوعات.' : 'Join the leading platform for booking and payment management.'}
                </p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8 text-sm text-center font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{isAr ? 'اسم المركز (عربي)' : 'Center Name (Arabic)'} *</label>
                    <input required type="text" value={formData.centerNameAr} onChange={e => setFormData({...formData, centerNameAr: e.target.value})} className="w-full bg-[#0B1320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{isAr ? 'اسم المركز (إنجليزي)' : 'Center Name (English)'} *</label>
                    <input required type="text" value={formData.centerNameEn} onChange={e => setFormData({...formData, centerNameEn: e.target.value})} className="w-full bg-[#0B1320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">{isAr ? 'المدينة' : 'City'} *</label>
                  <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-[#0B1320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{isAr ? 'اسم المالك/المدير' : 'Owner/Manager Name'} *</label>
                    <input required type="text" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} className="w-full bg-[#0B1320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{isAr ? 'رقم الجوال' : 'Phone Number'} *</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0B1320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" dir="ltr" placeholder="+966" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{isAr ? 'البريد الإلكتروني' : 'Email Address'} *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0B1320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{isAr ? 'كلمة المرور' : 'Password'} *</label>
                    <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-[#0B1320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" dir="ltr" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">{isAr ? 'وصف مبسط للخدمات' : 'Brief description of services'} *</label>
                  <textarea required rows={3} value={formData.services} onChange={e => setFormData({...formData, services: e.target.value})} className="w-full bg-[#0B1320] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" />
                </div>

                <div className="pt-4 pb-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-1">
                      <input 
                        type="checkbox" 
                        required
                        checked={formData.termsAccepted}
                        onChange={e => setFormData({...formData, termsAccepted: e.target.checked})}
                        className="peer appearance-none w-5 h-5 rounded bg-[#0B1320] border border-white/20 checked:bg-violet-500 checked:border-violet-500 transition-all cursor-pointer"
                      />
                      <CheckCircle2 className="absolute text-white w-4 h-4 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors select-none">
                      {isAr ? 'أوافق على ' : 'I agree to the '}
                      <a href="#" className="text-violet-400 underline underline-offset-2">{isAr ? 'الشروط والأحكام' : 'Terms and Conditions'}</a>
                      {isAr ? ' وسياسة الخصوصية الخاصة بالمنصة.' : ' and Privacy Policy.'}
                    </span>
                  </label>
                </div>

                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-violet-50 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isAr ? 'تأكيد وإرسال الطلب' : 'Submit Application'}
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      <MarketingFooter lang={lang} />
    </div>
  );
}
