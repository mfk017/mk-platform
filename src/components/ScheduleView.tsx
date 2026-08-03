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
    <div className="schedule-card" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border-card)' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-page)', border: '1px solid var(--border-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
          <CalendarIcon size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {t.scheduleTitle}: {isAr ? selectedService.name_ar : selectedService.name_en}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.availableSlots}</p>
        </div>
      </div>

      {filteredSlots.length === 0 ? (
        <div style={{ padding: '32px', textAlign: 'center', background: 'var(--bg-page)', borderRadius: 12, border: '1px solid var(--border-card)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <AlertCircle size={28} style={{ color: 'var(--text-muted)' }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{t.noSlots}</p>
        </div>
      ) : (
        <div className="time-slot-grid">
          {filteredSlots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            const remaining = slot.capacity - slot.booked_count;
            const isFull = remaining <= 0;

            return (
              <button
                key={slot.id}
                disabled={isFull}
                onClick={() => onSelectSlot(slot)}
                className={`time-slot-btn${isSelected ? ' selected' : ''}${isFull ? ' booked' : ''}`}
              >
                <div style={{ fontSize: '0.72rem', color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginBottom: 4 }}>
                  {formatSlotDate(slot.start_time)}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <Clock size={12} />
                  {formatSlotTime(slot.start_time)}
                </div>
                <div style={{ fontSize: '0.72rem', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, color: isSelected ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)' }}>
                  <Users size={10} />
                  {isFull ? (
                    <span style={{ color: '#EF4444' }}>{t.fullyBooked}</span>
                  ) : (
                    <span>{remaining} {t.capacityRemaining}</span>
                  )}
                </div>
                {isSelected && (
                  <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)' }}>
                    <CheckCircle2 size={10} />
                    {t.selected}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
