'use client';

import React, { useState, useEffect } from 'react';
import { Save, Loader2, Clock } from 'lucide-react';
import { WorkingHoursConfig, DEFAULT_WORKING_HOURS } from '@/types/workingHours';

export default function WorkingHoursPage() {
  const [workingHours, setWorkingHours] = useState<WorkingHoursConfig>(DEFAULT_WORKING_HOURS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const DAYS = [
    { label_en: 'Sunday', label_ar: 'الأحد' },
    { label_en: 'Monday', label_ar: 'الإثنين' },
    { label_en: 'Tuesday', label_ar: 'الثلاثاء' },
    { label_en: 'Wednesday', label_ar: 'الأربعاء' },
    { label_en: 'Thursday', label_ar: 'الخميس' },
    { label_en: 'Friday', label_ar: 'الجمعة' },
    { label_en: 'Saturday', label_ar: 'السبت' },
  ];

  useEffect(() => {
    fetch('/api/dashboard/settings')
      .then(res => res.json())
      .then(data => {
        if (data.center?.working_hours) {
          setWorkingHours(data.center.working_hours);
        }
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch('/api/dashboard/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ working_hours: workingHours }),
      });
      if (!res.ok) throw new Error('Failed to save working hours');
      setMessage({ text: 'تم الحفظ بنجاح | Saved successfully', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const updateDay = (dayIndex: number, field: string, value: any, shiftIndex?: number) => {
    setWorkingHours(prev => {
      const next = [...prev];
      if (field === 'isOpen') {
        next[dayIndex].isOpen = value;
      } else if (field === 'shiftStart' && shiftIndex !== undefined) {
        next[dayIndex].shifts[shiftIndex].start = value;
      } else if (field === 'shiftEnd' && shiftIndex !== undefined) {
        next[dayIndex].shifts[shiftIndex].end = value;
      }
      return next as WorkingHoursConfig;
    });
  };

  const addShift = (dayIndex: number) => {
    setWorkingHours(prev => {
      const next = [...prev];
      next[dayIndex].shifts.push({ start: '09:00', end: '17:00' });
      return next as WorkingHoursConfig;
    });
  };

  const removeShift = (dayIndex: number, shiftIndex: number) => {
    setWorkingHours(prev => {
      const next = [...prev];
      next[dayIndex].shifts.splice(shiftIndex, 1);
      return next as WorkingHoursConfig;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <header className="h-20 flex items-center justify-between px-6 lg:px-8 border-b border-outline-variant/30 bg-surface-container-lowest shrink-0">
        <div>
          <h2 className="font-display-lg text-title-md text-on-surface m-0 p-0">أوقات العمل | Working Hours</h2>
          <p className="font-ibm-plex-sans text-label-sm text-on-surface-variant hidden sm:block">
            إدارة أوقات عمل المركز | Manage your center's operating hours
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-0">
          
          <div className="flex justify-between items-center bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm">
            <div>
              <h2 className="font-title-lg text-primary font-bold">أوقات العمل | Working Hours</h2>
              <p className="font-label-sm text-on-surface-variant mt-1">
                تحديد أوقات العمل للمركز لتظهر للعملاء عند الحجز | Define your center's operating hours
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="px-6 py-2.5 bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري الحفظ... | Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  حفظ | Save
                </>
              )}
            </button>
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl font-label-sm flex items-center gap-2 ${
              message.type === 'success' ? 'bg-[#e6f4ea] text-[#137333]' : 'bg-error-container text-on-error-container'
            }`}>
              <span className="material-symbols-outlined text-[18px]">
                {message.type === 'success' ? 'check_circle' : 'error'}
              </span>
              {message.text}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              {DAYS.map((day, i) => {
                const config = workingHours[i];
                return (
                  <div key={i} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm transition-all hover:border-primary/30">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      
                      <div className="flex items-center gap-4 min-w-[200px]">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={config.isOpen}
                            onChange={(e) => updateDay(i, 'isOpen', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                        <div className="font-title-md font-bold text-on-surface">
                          {day.label_ar} | {day.label_en}
                        </div>
                      </div>

                      {config.isOpen ? (
                        <div className="flex-1 flex flex-col gap-3">
                          {config.shifts.map((shift, sIndex) => (
                            <div key={sIndex} className="flex items-center gap-3 flex-wrap">
                              <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg border border-outline-variant/30">
                                <Clock className="w-4 h-4 text-on-surface-variant" />
                                <input
                                  type="time"
                                  value={shift.start}
                                  onChange={(e) => updateDay(i, 'shiftStart', e.target.value, sIndex)}
                                  className="bg-transparent border-none focus:ring-0 text-label-md text-on-surface p-0 w-24 outline-none"
                                />
                                <span className="text-on-surface-variant">-</span>
                                <input
                                  type="time"
                                  value={shift.end}
                                  onChange={(e) => updateDay(i, 'shiftEnd', e.target.value, sIndex)}
                                  className="bg-transparent border-none focus:ring-0 text-label-md text-on-surface p-0 w-24 outline-none"
                                />
                              </div>
                              {config.shifts.length > 1 && (
                                <button
                                  onClick={() => removeShift(i, sIndex)}
                                  className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                                  title="Remove shift"
                                >
                                  <span className="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            onClick={() => addShift(i)}
                            className="self-start flex items-center gap-1 text-primary hover:text-primary/80 font-label-sm mt-1 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">add_circle</span>
                            إضافة فترة | Add Shift
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center text-on-surface-variant font-label-sm italic">
                          مغلق | Closed
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
