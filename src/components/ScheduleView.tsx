'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';

export interface SlotData {
  id: string;
  service_id: string;
  start_time: string;
  end_time: string;
  capacity: number;
  booked_count: number;
}

export interface ServiceData {
  id: string;
  name_ar: string;
  name_en: string;
  price: number;
  price_per_session?: number;
  duration_minutes?: number;
  description_ar?: string;
  description_en?: string;
  service_type?: string;
  packages?: any[];
}

interface ScheduleViewProps {
  slots: SlotData[];
  selectedService: ServiceData | null;
  selectedSlot: SlotData | null;
  onSelectSlot: (slot: SlotData) => void;
  lang: Language;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  slots,
  selectedService,
  selectedSlot,
  onSelectSlot,
  lang,
}) => {
  const t = translations[lang];
  const isAr = lang === 'ar';

  if (!selectedService) return null;

  const filteredSlots = slots.filter((s) => s.service_id === selectedService.id);

  const formatSlotTime = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', {
      hour: '2-digit', minute: '2-digit', hour12: true,
    });
  };

  const formatSlotDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
    });
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-xl shadow-primary/5 border border-secondary/10 p-6 md:p-8" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-outline-variant/30">
        <div className="w-12 h-12 rounded-xl bg-primary-container/20 border border-primary/10 flex items-center justify-center text-primary shrink-0">
          <CalendarIcon size={24} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-title-md text-title-md text-primary mb-1">
            {t.scheduleTitle}: {isAr ? selectedService.name_ar : selectedService.name_en}
          </h3>
          <p className="font-label-sm text-label-sm text-on-surface-variant">{t.availableSlots}</p>
        </div>
      </div>

      {filteredSlots.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant gap-3">
          <AlertCircle size={32} className="text-on-surface-variant/50" />
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
            {t.noSlots}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSlots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            const remaining = slot.capacity - slot.booked_count;
            const isFull = remaining <= 0;

            let buttonClass = 'relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 flex flex-col gap-2 ';
            if (isFull) {
              buttonClass += 'bg-surface-container text-on-surface-variant opacity-70 cursor-not-allowed border-outline-variant/30';
            } else if (isSelected) {
              buttonClass += 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20 scale-[1.02] transform';
            } else {
              buttonClass += 'bg-surface-container-lowest text-primary border-outline-variant/50 hover:border-primary hover:shadow-md cursor-pointer hover:-translate-y-1';
            }

            return (
              <button
                key={slot.id}
                disabled={isFull}
                onClick={() => onSelectSlot(slot)}
                className={buttonClass}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-8 h-8 bg-on-primary/20 rounded-bl-xl flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-on-primary" />
                  </div>
                )}
                
                <div className={`font-label-sm text-label-sm uppercase tracking-wider ${isSelected ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                  {formatSlotDate(slot.start_time)}
                </div>
                
                <div className={`font-headline-lg-mobile text-headline-lg-mobile font-bold flex items-center gap-2 ${isSelected ? 'text-on-primary' : 'text-primary'}`}>
                  <Clock size={20} className={isSelected ? 'text-on-primary' : 'text-primary'} />
                  {formatSlotTime(slot.start_time)}
                </div>
                
                <div className={`mt-2 font-label-xs text-label-xs flex items-center gap-1.5 ${isSelected ? 'text-on-primary/90' : 'text-on-surface-variant'}`}>
                  <Users size={14} />
                  {isFull ? (
                    <span className="text-error font-bold">{t.fullyBooked}</span>
                  ) : (
                    <span>{remaining} {t.capacityRemaining}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
