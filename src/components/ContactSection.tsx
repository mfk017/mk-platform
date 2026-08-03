'use client';

import React from 'react';
import { MessageCircle, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface ContactSectionProps {
  center: any;
  lang: Language;
}

export function ContactSection({ center, lang }: ContactSectionProps) {
  const isAr = lang === 'ar';
  const centerName = isAr ? center.name_ar : center.name_en;

  const whatsappMsg = encodeURIComponent(
    isAr
      ? `مرحباً، أود الاستفسار عن حجز جلسة في ${centerName}`
      : `Hello, I'd like to inquire about booking a session at ${centerName}`
  );

  const whatsappUrl = center.whatsapp_number
    ? `https://wa.me/${center.whatsapp_number.replace(/\D/g, '')}?text=${whatsappMsg}`
    : null;

  const emailUrl = center.email ? `mailto:${center.email}` : null;

  const mapsUrl = center.location_url || (center.location_lat && center.location_lng
    ? `https://maps.google.com/?q=${center.location_lat},${center.location_lng}`
    : null);

  const contactItems = [
    whatsappUrl && {
      id: 'whatsapp',
      href: whatsappUrl,
      icon: <MessageCircle />,
      label: isAr ? 'واتساب' : 'WhatsApp',
      value: center.whatsapp_number || '',
      external: false,
    },
    emailUrl && {
      id: 'email',
      href: emailUrl,
      icon: <Mail />,
      label: isAr ? 'البريد الإلكتروني' : 'Email',
      value: center.email || '',
      external: false,
    },
    mapsUrl && {
      id: 'location',
      href: mapsUrl,
      icon: <MapPin />,
      label: isAr ? 'الموقع' : 'Location',
      value: center.city || (isAr ? 'عرض على الخريطة' : 'View on Maps'),
      external: true,
    },
  ].filter(Boolean);

  if (contactItems.length === 0) return null;

  return (
    <section id="contact-section" className="section">
      <div className="section-header">
        <h2 className="section-title">{isAr ? 'اتصل بنا' : 'Contact Us'}</h2>
      </div>

      <div className="contact-grid">
        {contactItems.map((item: any) => (
          <a
            key={item.id}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className="contact-card"
            id={`contact-${item.id}`}
          >
            <div className="contact-icon">
              {React.cloneElement(item.icon, { size: 22 })}
            </div>
            <div>
              <div className="contact-label">{item.label}</div>
              <div className="contact-value" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {item.value}
                {item.external && <ExternalLink size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
