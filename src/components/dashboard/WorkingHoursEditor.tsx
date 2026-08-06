'use client';

import React from 'react';
import { WorkingHoursConfig, DEFAULT_WORKING_HOURS, DaySchedule } from '@/types/workingHours';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  value: WorkingHoursConfig;
  onChange: (value: WorkingHoursConfig) => void;
}

const DAYS_AR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export function WorkingHoursEditor({ value, onChange }: Props) {
  const config = value?.length === 7 ? value : DEFAULT_WORKING_HOURS;

  const updateDay = (dayIndex: number, updates: Partial<DaySchedule>) => {
    const newConfig = [...config];
    newConfig[dayIndex] = { ...newConfig[dayIndex], ...updates };
    onChange(newConfig);
  };

  const addShift = (dayIndex: number) => {
    const day = config[dayIndex];
    if (day.shifts.length >= 2) return; // limit to 2 shifts for now
    updateDay(dayIndex, { shifts: [...day.shifts, { start: '16:00', end: '21:00' }] });
  };

  const removeShift = (dayIndex: number, shiftIndex: number) => {
    const day = config[dayIndex];
    const newShifts = [...day.shifts];
    newShifts.splice(shiftIndex, 1);
    updateDay(dayIndex, { shifts: newShifts });
  };

  const updateShift = (dayIndex: number, shiftIndex: number, field: 'start' | 'end', time: string) => {
    const day = config[dayIndex];
    const newShifts = [...day.shifts];
    newShifts[shiftIndex] = { ...newShifts[shiftIndex], [field]: time };
    updateDay(dayIndex, { shifts: newShifts });
  };

  const timeOptions = Array.from({ length: 24 * 2 }).map((_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  return (
    <div className="space-y-4 dir-rtl" dir="rtl">
      {config.map((day, dayIndex) => (
        <div key={dayIndex} className="p-4 border border-slate-100 rounded-xl bg-slate-50 flex flex-col md:flex-row md:items-start justify-between gap-4">
          
          <div className="flex items-center gap-4 min-w-[120px]">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={day.isOpen} 
                onChange={(e) => updateDay(dayIndex, { isOpen: e.target.checked })} 
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
            <span className="font-bold text-sm text-slate-700">{DAYS_AR[dayIndex]}</span>
          </div>

          <div className="flex-1 space-y-3">
            {day.isOpen ? (
              <>
                {day.shifts.map((shift, shiftIndex) => (
                  <div key={shiftIndex} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 min-w-[30px]">من</span>
                    <select 
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                      value={shift.start}
                      onChange={(e) => updateShift(dayIndex, shiftIndex, 'start', e.target.value)}
                    >
                      {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <span className="text-xs text-slate-500 min-w-[30px]">إلى</span>
                    <select 
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                      value={shift.end}
                      onChange={(e) => updateShift(dayIndex, shiftIndex, 'end', e.target.value)}
                    >
                      {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>

                    {day.shifts.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeShift(dayIndex, shiftIndex)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                {day.shifts.length < 2 && (
                  <button 
                    type="button"
                    onClick={() => addShift(dayIndex)}
                    className="flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-700 hover:bg-violet-50 px-3 py-1.5 rounded-lg transition-colors border border-violet-100"
                  >
                    <Plus className="w-3 h-3" />
                    إضافة فترة ثانية
                  </button>
                )}
              </>
            ) : (
              <div className="h-full flex items-center">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg">مغلق</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
