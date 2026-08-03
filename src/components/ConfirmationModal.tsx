'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Printer, Sparkles } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';

interface BookingConfirmationData {
  id: string;
  reference_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  booking_price: number;
  platform_fee: number;
  payment_status: string;
  status: string;
  service_name: string;
  center_name: string;
  slot_date: string;
  slot_time: string;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingConfirmationData | null;
  lang: Language;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen, onClose, booking, lang,
}) => {
  const t = translations[lang];
  const isAr = lang === 'ar';

  if (!isOpen || !booking) return null;

  const rows = [
    { label: t.centerName, value: booking.center_name },
    { label: t.reservedService, value: booking.service_name },
    { label: t.dateTime, value: `${booking.slot_date} (${booking.slot_time})` },
    { label: t.customer, value: `${booking.customer_name} (${booking.customer_phone})` },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: 480, textAlign: 'center' }}
        onClick={(e) => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Success Icon */}
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#DCFCE7', border: '2px solid #86EFAC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <CheckCircle2 size={36} style={{ color: '#16A34A' }} />
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>{t.confirmTitle}</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 24 }}>{t.confirmSubtitle}</p>

        {/* Reference Code */}
        <div style={{ background: 'var(--bg-page)', border: '1px solid var(--border-card)', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{t.bookingReference}</div>
          <div style={{ fontSize: '1.8rem', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '0.15em', color: 'var(--text-primary)' }}>
            {booking.reference_code}
          </div>
        </div>

        {/* Details */}
        <div style={{ background: 'var(--bg-page)', border: '1px solid var(--border-card)', borderRadius: 12, padding: '16px 20px', marginBottom: 20, textAlign: isAr ? 'right' : 'left' }}>
          {rows.map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < rows.length - 1 ? '1px solid var(--border-card)' : 'none', fontSize: '0.85rem', gap: 12 }}>
              <span style={{ color: 'var(--text-muted)' }}>{row.label}:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', textAlign: isAr ? 'left' : 'right' }}>{row.value}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0', fontSize: '0.95rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.amountPaid}:</span>
            <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
              {booking.booking_price} {t.sar}
            </span>
          </div>
        </div>

        {/* Phase 1 Notice */}
        <div style={{ background: '#FEF9C3', border: '1px solid #FDE047', borderRadius: 10, padding: '10px 14px', fontSize: '0.8rem', color: '#854D0E', display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 20 }}>
          <Sparkles size={14} style={{ flexShrink: 0, marginTop: 1, color: '#CA8A04' }} />
          <span>{t.simulatedPaymentNotice}</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', border: '1px solid var(--border-light)', borderRadius: 10, background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <Printer size={14} />
            {t.printReceipt}
          </button>
          <button onClick={onClose} className="btn-primary" style={{ fontSize: '0.875rem', padding: '10px 24px' }}>
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
