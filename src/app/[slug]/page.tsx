'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Language, translations } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { HorsesSection } from '@/components/HorsesSection';
import { TrainersSection } from '@/components/TrainersSection';

import { Footer } from '@/components/Footer';
import { ScheduleView, SlotData, ServiceData } from '@/components/ScheduleView';
import { BookingModal } from '@/components/BookingModal';
import { ConfirmationModal } from '@/components/ConfirmationModal';

export default function PublicCenterPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [lang, setLang] = useState<Language>('ar');
  const [centerData, setCenterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotData | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const t = translations[lang];
  const isAr = lang === 'ar';

  const fetchCenter = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/centers/${slug}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Center not found');
      }
      setCenterData(data.center);
      if (data.center.services && data.center.services.length > 0) {
        setSelectedService(data.center.services[0]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load center page');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchCenter();
    }
  }, [slug]);

  const handleSelectService = (service: any) => {
    setSelectedService(service);
    setSelectedSlot(null);

    // Scroll to schedule section smoothly
    const elem = document.getElementById('schedule-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNowClick = () => {
    const elem = document.getElementById('services-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenMyBookings = () => {
    const elem = document.getElementById('schedule-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSlot = (slot: SlotData) => {
    setSelectedSlot(slot);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (bookingDetails: any) => {
    setIsBookingModalOpen(false);
    setConfirmedBooking(bookingDetails);
    setIsConfirmationOpen(true);
    fetchCenter();
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading...</p>
      </div>
    );
  }

  if (error || !centerData) {
    return (
      <div className="loading-screen">
        <div style={{ background: 'white', border: '1px solid var(--border-card)', borderRadius: 16, padding: '40px 48px', maxWidth: 400, textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>404</div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>{error || 'Center not found'}</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 24 }}>The center link is invalid or has been removed.</p>
          <a href="/" className="btn-primary" style={{ display: 'inline-flex' }}>Go Home</a>
        </div>
      </div>
    );
  }

  const centerName = isAr ? centerData.name_ar : centerData.name_en;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }} dir={isAr ? 'rtl' : 'ltr'}>
      <Header
        lang={lang}
        onLanguageChange={setLang}
        centerName={centerName}
        centerLogo={centerData.logo_url}
        onOpenMyBookings={handleOpenMyBookings}
        onBookNowClick={handleBookNowClick}
      />

      {/* Hero - full width */}
      <HeroSection
        center={centerData}
        lang={lang}
        onBookSessionClick={handleBookNowClick}
      />

      {/* Sections in page container */}
      <div className="page-main">
        <ServicesSection
          services={centerData.services || []}
          lang={lang}
          onSelectService={handleSelectService}
        />

        {selectedService && (centerData.schedule_slots?.length > 0) && (
          <section id="schedule-section" style={{ paddingBottom: 64 }}>
            <ScheduleView
              slots={centerData.schedule_slots || []}
              selectedService={selectedService}
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              lang={lang}
            />
          </section>
        )}

        <HorsesSection horses={centerData.horses || []} lang={lang} />
        <TrainersSection trainers={centerData.trainers || []} lang={lang} />
      </div>

      <Footer centerName={centerName} lang={lang} center={centerData} />

      {selectedService && selectedSlot && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          service={selectedService}
          slot={selectedSlot}
          centerId={centerData.id}
          centerName={centerName}
          lang={lang}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        booking={confirmedBooking}
        lang={lang}
      />
    </div>
  );
}
