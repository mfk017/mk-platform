'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, User, Phone, Mail } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';
import { SlotData, ServiceData } from './ScheduleView';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceData;
  slot: SlotData;
  centerId: string;
  centerName: string;
  lang: Language;
  onBookingSuccess: (bookingData: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen, onClose, service, slot, centerId, centerName, lang, onBookingSuccess,
}) => {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+966 ');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  if (!isOpen) return null;

  const serviceName = isAr ? service.name_ar : service.name_en;

  const formatSlotTime = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatSlotDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg(isAr ? 'يرجى إدخال الاسم الكامل' : 'Please enter full name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 8) {
      setErrorMsg(isAr ? 'يرجى إدخال رقم الجوال الصحيح' : 'Please enter valid phone number');
      return;
    }

    setShowPaymentForm(true);
    setErrorMsg('');

    setTimeout(() => {
      // @ts-ignore
      if (window.Moyasar) {
        // @ts-ignore
        window.Moyasar.init({
          element: '.mysr-form',
          amount: (service.price ?? service.price_per_session) * 100, // Halalas
          currency: 'SAR',
          description: `Booking: ${serviceName}`,
          publishable_api_key: process.env.NEXT_PUBLIC_MOYASAR_PUBLISHABLE_KEY,
          callback_url: `${window.location.origin}/api/payments/verify`,
          methods: ['creditcard', 'stcpay', 'applepay'],
          metadata: {
            center_id: centerId,
            center_slug: window.location.pathname.replace('/', ''),
            service_id: service.id,
            slot_id: slot.id,
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_email: customerEmail || 'guest@canter.sa',
            booking_price: service.price ?? service.price_per_session,
          }
        });
      } else {
        setErrorMsg('Payment gateway is still loading, please wait.');
      }
    }, 150);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} dir={isAr ? 'rtl' : 'ltr'}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, [isAr ? 'left' : 'right']: 16, width: 32, height: 32, border: '1px solid var(--border-light)', borderRadius: '50%', background: 'var(--bg-page)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{t.modalTitle}</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{centerName}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Service Summary */}
          <div style={{ background: 'var(--bg-page)', border: '1px solid var(--border-card)', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{t.step1}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{serviceName}</span>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {(service.price ?? service.price_per_session)?.toLocaleString()} {t.sar}
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span>📅 {formatSlotDate(slot.start_time)}</span>
              <span>⏰ {formatSlotTime(slot.start_time)}</span>
            </div>
          </div>

          {/* Contact Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.step2}</div>

            {[
              { icon: <User size={14} />, label: `${t.fullName} *`, value: customerName, setter: setCustomerName, type: 'text', placeholder: t.namePlaceholder, required: true },
              { icon: <Phone size={14} />, label: `${t.phoneLabel} *`, value: customerPhone, setter: setCustomerPhone, type: 'tel', placeholder: t.phonePlaceholder, required: true },
              { icon: <Mail size={14} />, label: t.emailLabel, value: customerEmail, setter: setCustomerEmail, type: 'email', placeholder: t.emailPlaceholder, required: false },
            ].map((field, i) => (
              <div key={i}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  {field.icon} {field.label}
                </label>
                <input
                  type={field.type}
                  required={field.required}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  className="form-input"
                />
              </div>
            ))}
          </div>

          {/* Notice */}
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8rem', color: '#166534' }}>
            <ShieldCheck size={15} style={{ flexShrink: 0, marginTop: 1, color: '#16A34A' }} />
            <span>{t.platformFeeNotice}</span>
          </div>

          {errorMsg && (
            <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, fontSize: '0.82rem', color: '#DC2626', fontWeight: 500 }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Actions */}
          {showPaymentForm ? (
            <div style={{ marginTop: 10 }}>
              <div className="mysr-form"></div>
              <button type="button" onClick={() => setShowPaymentForm(false)} style={{ marginTop: 20, padding: '10px 20px', border: '1px solid var(--border-light)', borderRadius: 10, background: 'transparent', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', width: '100%' }}>
                {t.cancel}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
              <button type="button" onClick={onClose} style={{ padding: '10px 20px', border: '1px solid var(--border-light)', borderRadius: 10, background: 'transparent', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'inherit' }}>
                {t.cancel}
              </button>
              <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ fontSize: '0.875rem' }}>
                {isSubmitting ? 'Processing...' : (
                  <>
                    <CreditCard size={15} />
                    {t.proceedToConfirm}
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
