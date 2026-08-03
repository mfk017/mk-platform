'use client';

import React, { useEffect, useState } from 'react';
import { TopBar } from '@/components/dashboard/TopBar';
import { Save, Loader2, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

interface CenterSettings {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  logo_url: string;
  description_en: string;
  description_ar: string;
  phone: string;
  email: string;
  whatsapp_number: string;
  location_url: string;
  city: string;
  vat_enabled: boolean;
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

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
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
      <TopBar title="Center Settings" subtitle="Manage your center's profile, contact information, and preferences" />

      <div className="p-4 md:p-8 flex-1 max-w-4xl">
        {loading ? (
          <Spinner center size="lg" />
        ) : (
          <form onSubmit={handleSave} className="space-y-6">

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldGroup label="Center Name (English)">
                    <input className={inputClassName} value={form.name_en || ''} onChange={(e) => handleChange('name_en', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="Center Name (Arabic)">
                    <input className={`${inputClassName} dir-rtl`} value={form.name_ar || ''} onChange={(e) => handleChange('name_ar', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="City">
                    <input className={inputClassName} value={form.city || ''} onChange={(e) => handleChange('city', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="Public Slug (URL)">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">mkplatform.sa/</span>
                      <input className={`${inputClassName} pl-32 bg-slate-50 text-slate-500`} value={form.slug || ''} readOnly />
                    </div>
                  </FieldGroup>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <FieldGroup label="Description (English)">
                    <textarea rows={3} className={inputClassName} value={form.description_en || ''} onChange={(e) => handleChange('description_en', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="Description (Arabic)">
                    <textarea rows={3} className={`${inputClassName} dir-rtl`} value={form.description_ar || ''} onChange={(e) => handleChange('description_ar', e.target.value)} />
                  </FieldGroup>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldGroup label="Phone Number">
                    <input type="tel" className={inputClassName} value={form.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="Email Address">
                    <input type="email" className={inputClassName} value={form.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="WhatsApp Number">
                    <input type="tel" className={inputClassName} placeholder="+966501234567" value={form.whatsapp_number || ''} onChange={(e) => handleChange('whatsapp_number', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="Google Maps URL">
                    <input className={inputClassName} placeholder="https://maps.google.com/..." value={form.location_url || ''} onChange={(e) => handleChange('location_url', e.target.value)} />
                  </FieldGroup>
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader>
                <CardTitle>Logo & Branding</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup label="Logo URL">
                  <input className={inputClassName} placeholder="https://..." value={form.logo_url || ''} onChange={(e) => handleChange('logo_url', e.target.value)} />
                </FieldGroup>
                {form.logo_url && (
                  <div className="mt-4 flex items-center gap-3">
                    <img src={form.logo_url} alt="Logo preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    <span className="text-sm font-medium text-slate-500">Logo preview</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Compliance */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance & Billing</CardTitle>
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
                      VAT Enabled {form.vat_enabled ? '(15% added)' : '(prices shown as-is)'}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      When enabled, VAT is displayed on customer invoices and booking receipts.
                    </div>
                  </div>
                </label>
              </CardContent>
              <CardFooter className="flex justify-end gap-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
                {saved && (
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                    <CheckCircle className="w-4 h-4" />
                    Settings saved!
                  </div>
                )}
                <Button 
                  type="submit"
                  isLoading={saving}
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

          </form>
        )}
      </div>
    </div>
  );
}
