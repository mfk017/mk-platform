'use client';

import React, { useEffect, useState } from 'react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

export default function SettingsPage() {
  const [rate, setRate] = useState<string>('6.0');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data.settings) {
          setRate(data.settings.default_commission_rate.toString());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ default_commission_rate: parseFloat(rate) }),
      });
      
      if (res.ok) {
        setMessage('Settings saved successfully. New centers will use this rate.');
      } else {
        setMessage('Error saving settings.');
      }
    } catch (err) {
      setMessage('Network error.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopBar title="Platform Settings" subtitle="Configure global platform defaults" />

      <div className="p-4 md:p-8 flex-1 max-w-3xl">
        {loading ? (
          <Spinner center size="lg" />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Commission Structure</CardTitle>
              <CardDescription>
                Set the default commission fee applied to all new center registrations. Existing centers are unaffected and keep the rate they had when they joined.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-w-sm">
                <label className="block text-sm font-bold text-slate-900">
                  Default Commission Rate (SAR)
                </label>
                <input 
                  type="number" 
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all"
                />
              </div>

              {message && (
                <div className={`mt-6 p-4 rounded-xl text-sm font-medium ${
                  message.includes('Error') || message.includes('error') 
                    ? 'bg-red-50 text-red-700 border border-red-100' 
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                }`}>
                  {message}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end bg-slate-50 border-t border-slate-100 rounded-b-2xl">
              <Button 
                onClick={handleSave}
                isLoading={saving}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
