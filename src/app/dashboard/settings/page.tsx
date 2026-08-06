'use client';

import React, { useEffect, useState } from 'react';
import { TopBar } from '@/components/dashboard/TopBar';
import { Save, Loader2, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { WorkingHoursEditor } from '@/components/dashboard/WorkingHoursEditor';
import { WorkingHoursConfig, DEFAULT_WORKING_HOURS } from '@/types/workingHours';

interface CenterSettings {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  logo_url: string;
  hero_image_url: string;
  description_en: string;
  description_ar: string;
  phone: string;
  email: string;
  whatsapp_number: string;
  location_url: string;
  city: string;
  instagram_url: string;
  snapchat_url: string;
  tiktok_url: string;
  twitter_url: string;
  vat_enabled: boolean;
  working_hours?: WorkingHoursConfig;
  work_start_hour: number;
  work_end_hour: number;
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-bold text-slate-900">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClassName = "w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all text-sm";

export default function SettingsPage() {
  const [form, setForm] = useState<Partial<CenterSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/dashboard/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.center) setForm(d.center);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleImageUpload = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (e.g. limit to 4MB to prevent huge base64 strings)
    if (file.size > 4 * 1024 * 1024) {
      alert('File is too large. Please select an image under 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      handleChange(field, event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const res = await fetch('/api/dashboard/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
  };

  return (
    <div className="flex-1 flex flex-col">
      <TopBar title="إعدادات المركز | Center Settings" subtitle="إدارة الملف التعريفي وساعات العمل والمرافق | Manage your profile, hours, and facilities" />

      <div className="p-4 md:p-8 flex-1 max-w-4xl">
        {loading ? (
          <Spinner center size="lg" />
        ) : (
          <form onSubmit={handleSave} className="space-y-6">

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>الملف التعريفي | Public Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldGroup label="الاسم | Center Name (EN)">
                    <input className={inputClassName} value={form.name_en || ''} onChange={(e) => handleChange('name_en', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="الاسم | Name (AR)">
                    <input className={`${inputClassName} dir-rtl`} value={form.name_ar || ''} onChange={(e) => handleChange('name_ar', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="المدينة | City">
                    <input className={inputClassName} value={form.city || ''} onChange={(e) => handleChange('city', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="رابط الصفحة | Public Slug (URL)">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">mkplatform.sa/</span>
                      <input className={`${inputClassName} pl-32 bg-slate-50 text-slate-500`} value={form.slug || ''} readOnly />
                    </div>
                  </FieldGroup>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <FieldGroup label="الوصف | Description (EN)">
                    <textarea rows={3} className={inputClassName} value={form.description_en || ''} onChange={(e) => handleChange('description_en', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="الوصف | Description (AR)">
                    <textarea rows={3} className={`${inputClassName} dir-rtl`} value={form.description_ar || ''} onChange={(e) => handleChange('description_ar', e.target.value)} />
                  </FieldGroup>
                </div>
              </CardContent>
            </Card>


            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات التواصل | Contact & Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldGroup label="رقم الهاتف | Phone Number">
                    <input type="tel" className={inputClassName} value={form.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="البريد الإلكتروني | Email Address">
                    <input type="email" className={inputClassName} value={form.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="رقم واتساب | WhatsApp Number">
                    <input type="tel" className={inputClassName} placeholder="+966501234567" value={form.whatsapp_number || ''} onChange={(e) => handleChange('whatsapp_number', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="رابط خرائط جوجل | Google Maps URL">
                    <input className={inputClassName} placeholder="https://maps.google.com/..." value={form.location_url || ''} onChange={(e) => handleChange('location_url', e.target.value)} />
                  </FieldGroup>
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader>
                <CardTitle>الشعار والهوية | Logo & Branding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldGroup label="شعار المركز | Logo Image">
                  <div className="flex items-center gap-4">
                    {form.logo_url && (
                      <img src={form.logo_url} alt="Logo preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    )}
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload('logo_url')}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 transition-all cursor-pointer" 
                      />
                      <p className="mt-1 text-xs text-slate-400">الحد الأقصى 4 ميجا. ينصح بـ 512x512. | Max size 4MB. Recommended 512x512px.</p>
                    </div>
                  </div>
                </FieldGroup>
                
                <FieldGroup label="صورة الواجهة | Hero Image (Storefront Background)">
                  <div className="flex items-center gap-4">
                    {form.hero_image_url && (
                      <img src={form.hero_image_url} alt="Hero preview" className="w-32 h-16 rounded-xl object-cover border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    )}
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload('hero_image_url')}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 transition-all cursor-pointer" 
                      />
                      <p className="mt-1 text-xs text-slate-400">الحد الأقصى 4 ميجا. ينصح بشكل أفقي. | Max size 4MB. Recommended landscape ratio.</p>
                    </div>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>التواصل الاجتماعي | Social Media & Online Presence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldGroup label="Instagram URL">
                    <input className={inputClassName} placeholder="https://instagram.com/yourhandle" value={(form as any).instagram_url || ''} onChange={(e) => handleChange('instagram_url', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="Snapchat URL">
                    <input className={inputClassName} placeholder="https://snapchat.com/add/yourhandle" value={(form as any).snapchat_url || ''} onChange={(e) => handleChange('snapchat_url', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="TikTok URL">
                    <input className={inputClassName} placeholder="https://tiktok.com/@yourhandle" value={(form as any).tiktok_url || ''} onChange={(e) => handleChange('tiktok_url', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="X (Twitter) URL">
                    <input className={inputClassName} placeholder="https://x.com/yourhandle" value={(form as any).twitter_url || ''} onChange={(e) => handleChange('twitter_url', e.target.value)} />
                  </FieldGroup>
                </div>
              </CardContent>
            </Card>

            {/* Compliance */}
            <Card>
              <CardHeader>
                <CardTitle>الامتثال والفوترة | Compliance & Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex items-center gap-4 cursor-pointer p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={form.vat_enabled || false} onChange={() => handleChange('vat_enabled', !form.vat_enabled)} />
                    <div className={`block w-12 h-6 rounded-full transition-colors ${form.vat_enabled ? 'bg-violet-600' : 'bg-slate-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${form.vat_enabled ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      تفعيل ضريبة القيمة المضافة | VAT Enabled {form.vat_enabled ? '(15% added)' : '(prices shown as-is)'}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      عند التفعيل، سيتم عرض الضريبة في فواتير العملاء. | When enabled, VAT is displayed on customer invoices and booking receipts.
                    </div>
                  </div>
                </label>
              </CardContent>
              <CardFooter className="flex justify-end gap-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
                {saved && (
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                    <CheckCircle className="w-4 h-4" />
                    تم الحفظ | Settings saved!
                  </div>
                )}
                <Button 
                  type="submit"
                  isLoading={saving}
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  حفظ التعديلات | Save Changes
                </Button>
              </CardFooter>
            </Card>

          </form>
        )}
      </div>
    </div>
  );
}
