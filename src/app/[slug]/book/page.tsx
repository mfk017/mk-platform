'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Language } from '@/lib/i18n';
import { addDays, format, startOfToday, eachDayOfInterval, addMinutes, isSameDay } from 'date-fns';
import { arSA, enUS } from 'date-fns/locale';

// ── Types ──────────────────────────────────────────
interface CenterData {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  services: any[];
  horses: any[];
  trainers: any[];
  schedule_slots: any[];
  working_hours?: any;
  work_start_hour: number;
  work_end_hour: number;
  whatsapp_number?: string;
}

const STEPS = [
  { en: 'Service', ar: 'الخدمة' },
  { en: 'Date & Time', ar: 'التاريخ والوقت' },
  { en: 'Options', ar: 'خيارات' },
  { en: 'Details', ar: 'التفاصيل' },
  { en: 'Confirm', ar: 'تأكيد' },
];

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const preselectedServiceId = searchParams?.get('serviceId');

  const [lang, setLang] = useState<Language>('en');
  const [center, setCenter] = useState<CenterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

  // Form state
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedLiveryMonth, setSelectedLiveryMonth] = useState('');
  const [selectedHorseId, setSelectedHorseId] = useState('');
  const [selectedTrainerId, setSelectedTrainerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+966 ');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash'>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const isAr = lang === 'ar';

  useEffect(() => {
    fetch(`/api/centers/${slug}`)
      .then(r => r.json())
      .then(d => {
        if (d.center) {
          setCenter(d.center);
          if (preselectedServiceId) {
            setSelectedServiceId(preselectedServiceId);
            setStep(2);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [slug, preselectedServiceId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!center) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant">
        Center not found
      </div>
    );
  }

  const centerName = isAr ? center.name_ar : center.name_en;
  const activeServices = (center.services || []).filter((s: any) => s.is_active !== false);
  const trainingServices = activeServices.filter((s: any) => s.category !== 'package');
  const selectedService = activeServices.find((s: any) => s.id === selectedServiceId);
  const isLivery = selectedService?.category === 'livery';
  const activeHorses = (center.horses || []).filter((h: any) => h.is_active !== false);
  const activeTrainers = (center.trainers || []).filter((t: any) => t.is_active !== false);

  // Dynamic Working Hours Logic
  const workingHours = center?.working_hours;
  const SLOT_DURATION_MINUTES = selectedService?.duration_minutes || 30;

  const generateTimeSlots = (date: Date) => {
    const slots: Date[] = [];
    
    // date.getDay() returns 0 for Sunday, 6 for Saturday.
    const dayIndex = date.getDay(); 
    
    // Fallback to legacy integers if JSON isn't available
    const dayConfig = workingHours?.[dayIndex] || {
      isOpen: true,
      shifts: [{
        start: `${String(center?.work_start_hour ?? 9).padStart(2, '0')}:00`,
        end: `${String(center?.work_end_hour ?? 21).padStart(2, '0')}:00`
      }]
    };

    if (!dayConfig.isOpen) return [];

    for (const shift of dayConfig.shifts) {
      const [startHour, startMin] = shift.start.split(':').map(Number);
      const [endHour, endMin] = shift.end.split(':').map(Number);

      const current = new Date(date);
      current.setHours(startHour, startMin, 0, 0);
      
      const end = new Date(date);
      end.setHours(endHour, endMin, 0, 0);

      while (current < end) {
        slots.push(new Date(current));
        current.setMinutes(current.getMinutes() + SLOT_DURATION_MINUTES);
      }
    }
    
    return slots;
  };

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];
  const serviceSlots = (center.schedule_slots || []).filter((s: any) => s.service_id === selectedServiceId);

  const formatTime = (date: Date) => format(date, 'hh:mm a', { locale: isAr ? arSA : enUS });
  const formatDate = (date: Date) => format(date, 'EEEE, d MMMM yyyy', { locale: isAr ? arSA : enUS });
  const formatMonth = (m: string) => new Date(m + '-01').toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { month: 'long', year: 'numeric' });

  const progressWidth = `${((step - 1) / (STEPS.length - 1)) * 100}%`;

  const canProceed = () => {
    switch (step) {
      case 1: return !!selectedServiceId;
      case 2: return isLivery ? !!selectedLiveryMonth : !!selectedTime;
      case 3: return true; // optional
      case 4: return customerName.trim().length > 0 && customerPhone.trim().length > 8;
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else handleSubmitBooking();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.push(`/${slug}`);
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const startTimeISO = selectedTime ? new Date(selectedTime).toISOString() : undefined;
      const endTimeISO = selectedTime ? addMinutes(new Date(selectedTime), SLOT_DURATION_MINUTES).toISOString() : undefined;

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          center_id: center.id,
          service_id: selectedServiceId,
          horse_id: selectedHorseId || undefined,
          trainer_id: selectedTrainerId || undefined,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail || undefined,
          payment_method: paymentMethod,
          start_time: startTimeISO,
          end_time: endTimeISO,
          livery_month: isLivery ? selectedLiveryMonth : undefined,
          booking_price: selectedService?.price,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');
      setBookingResult(data);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };



  // SERVICE IMAGES FALLBACK
  const SERVICE_IMAGES = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA_gqCp9kOZBoCtkUICH2EM_XgPznYe8UbxtkOLcVQXitgwoGUELdP77mvRCcATc2nkH1a2pHfwfUbY95a-MrEKVNsbQnEr8q57O44iXKvpaaEHeu_YmXMYhZ1ED3ijoluwdJN5MlB1kU0yXOyp5GxrlzOCCRO0z3xJ02L1mnfdTjvQ3fsuyydrY7Kb4So9zSWJc-o-n4_61v67Uwn41Wk2XX18N_6m1BVvSpQLCmHa0YOKHblKoI8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD9qdtJkkFau8wgsx1otA4_03vztYM3ZAHQs-JOcnd7p_c9cHB9TdwcdA1xq3d6t7W7L1zRjenLakO4ZhjgZBKGb9wDB7ufsXd6yKNczp1G0qMPII3sO2U8RZoLd7bqsmVGmDWzf4D1kfkrmQGkrAsOhxS8sAXO9UqJSoHImr3yVMNHby_zHCoKtuusk9CJ_AB8YxYIwtvmR0hPoyqnPj6ereWYVkthzda42wZnzPE5vaE1Jv3AhEE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAfgCKY-L8DkpKuVpVv6V9JFWYJqPLCnUpJoRadBfUoLQl7-rI_sWM7oCUvqwgic1-BfJ2qXjAzVARgUSPGm5GQiHiXTRBmqWmRq6VAEeIAPSliCGHhGz3bs2zOuVTJD_9lZh2Wf_c4bKPfZAtRu5l4m09wTqBK33hvjhW_KqA300SEoLp-IHHqG7X6Fz3BhFTQ0z3I0L1y0Dwr-VMN-XpaK1zKSzA4saBzDwl4A-ABDH3JIzGvQbY',
  ];

  // ── CONFIRMATION SCREEN ─────────────────────────
  if (bookingResult) {
    return (
      <div className="min-h-screen bg-background" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-[40px]">check_circle</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary mb-4">
            {isAr ? 'تم الحجز بنجاح!' : 'Booking Confirmed!'}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md mx-auto">
            {isAr
              ? 'شكراً لك! تم تأكيد حجزك. سيتواصل معك المركز قريباً.'
              : 'Thank you! Your booking has been confirmed. The center will contact you shortly.'}
          </p>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-6 text-left mb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-on-surface-variant">{isAr ? 'الخدمة' : 'Service'}</span><br /><strong>{isAr ? selectedService?.name_ar : selectedService?.name_en}</strong></div>
              <div><span className="text-on-surface-variant">{isAr ? 'السعر' : 'Price'}</span><br /><strong>{selectedService?.price} SAR</strong></div>
              {selectedTime && <div><span className="text-on-surface-variant">{isAr ? 'الوقت' : 'Time'}</span><br /><strong>{format(new Date(selectedTime), 'hh:mm a', { locale: isAr ? arSA : enUS })}</strong></div>}
              {selectedLiveryMonth && <div><span className="text-on-surface-variant">{isAr ? 'الشهر' : 'Month'}</span><br /><strong>{formatMonth(selectedLiveryMonth)}</strong></div>}
            </div>
          </div>
          <button
            onClick={() => router.push(`/${slug}`)}
            className="bg-primary text-on-primary font-label-sm px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {isAr ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  // ── MAIN BOOKING FLOW ───────────────────────────
  return (
    <div className="min-h-screen bg-background" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-surface border-b border-outline-variant py-4 px-4 md:px-12 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex justify-between items-center h-12">
          <div className="flex items-center gap-4">
            <button onClick={handleBack} className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">{isAr ? 'arrow_forward' : 'arrow_back'}</span>
            </button>
            <div>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                {isAr ? 'حجز جديد' : 'New Booking'}
              </h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{centerName}</p>
            </div>
          </div>
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="font-label-sm font-medium text-primary hover:text-secondary transition-colors uppercase tracking-wider"
          >
            {isAr ? 'English' : 'العربية'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 md:px-0 py-8 pb-32">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative z-10">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-container-high -z-10" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500"
              style={{ width: progressWidth }}
            />
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step > i + 1
                      ? 'bg-primary text-on-primary'
                      : step === i + 1
                      ? 'bg-primary text-on-primary shadow-xl shadow-primary/20'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {step > i + 1 ? <span className="material-symbols-outlined text-[18px]">check</span> : i + 1}
                </div>
                <span className="font-label-xs text-label-xs hidden md:block text-on-surface-variant">
                  {isAr ? s.ar : s.en}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-title-md text-title-md text-primary mb-6">
              {isAr ? 'اختر خدمة' : 'Select a Service'}
            </h2>
            {trainingServices.map((service: any, idx: number) => {
              const name = isAr ? service.name_ar : service.name_en;
              const desc = isAr ? service.description_ar : service.description_en;
              const isSelected = selectedServiceId === service.id;
              const imgUrl = service.image_url || SERVICE_IMAGES[idx % SERVICE_IMAGES.length];

              return (
                <label
                  key={service.id}
                  className={`block bg-surface-container-lowest border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 relative overflow-hidden group ${
                    isSelected ? 'border-primary shadow-lg shadow-primary/10' : 'border-outline-variant/30 hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="service"
                    value={service.id}
                    checked={isSelected}
                    onChange={() => {
                      setSelectedServiceId(service.id);
                      setSelectedTime('');
                      setSelectedDate(null);
                      setSelectedLiveryMonth('');
                    }}
                    className="absolute opacity-0 w-0 h-0"
                  />
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-10 h-10 bg-primary rounded-bl-2xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-primary text-[18px]">check</span>
                    </div>
                  )}
                  <div className="flex gap-5 items-start">
                    <img
                      src={imgUrl}
                      alt={name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md shrink-0"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-title-md text-title-md text-on-background">{name}</h3>
                          <div className="flex items-center gap-4 mt-1 text-on-surface-variant font-label-sm text-label-sm">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[18px]">schedule</span>
                              {service.category === 'livery' ? (isAr ? 'شهري' : 'Monthly') : `${service.duration_minutes} ${isAr ? 'دقيقة' : 'min'}`}
                            </span>
                            <span className="capitalize bg-surface-container-high px-2 py-0.5 rounded text-label-xs">
                              {service.category}
                            </span>
                          </div>
                        </div>
                        <span className="font-title-md text-title-md text-primary whitespace-nowrap">
                          {service.price} SAR
                        </span>
                      </div>
                      {desc && <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mt-1">{desc}</p>}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {/* Step 2: Date & Time (or Month for Livery) */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-title-md text-title-md text-primary mb-6">
              {isLivery
                ? (isAr ? 'اختر الشهر' : 'Select Month')
                : (isAr ? 'اختر التاريخ والوقت' : 'Select Date & Time')}
            </h2>

            {isLivery ? (
              // ── LIVERY: Month selector dropdown ──
              <div className="space-y-4">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {isAr ? 'اختر شهر الإيواء المطلوب:' : 'Choose your preferred boarding month:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Array.isArray(selectedService?.livery_months) ? selectedService.livery_months : []).map((m: string) => (
                    <button
                      key={m}
                      onClick={() => setSelectedLiveryMonth(m)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        selectedLiveryMonth === m
                          ? 'border-primary bg-primary text-on-primary shadow-lg'
                          : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/50'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px] mb-1">calendar_month</span>
                      <div className="font-title-md text-title-md">{formatMonth(m)}</div>
                    </button>
                  ))}
                </div>
                {(!selectedService?.livery_months || selectedService.livery_months.length === 0) && (
                  <div className="text-center py-8 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[40px] mb-2 block opacity-50">event_busy</span>
                    <p>{isAr ? 'لا توجد أشهر متاحة حالياً' : 'No months available yet'}</p>
                  </div>
                )}
              </div>
            ) : (
              // ── TRAINING: Date + Slot picker ──
              <>
                {/* Date pills */}
                <div className="space-y-3">
                  <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    {isAr ? 'التاريخ' : 'Date'}
                  </h3>
                  <div className="flex overflow-x-auto pb-4 gap-2 snap-x hide-scrollbar">
                    {eachDayOfInterval({ start: startOfToday(), end: addDays(startOfToday(), 30) }).map(d => {
                      const isSelected = selectedDate && isSameDay(selectedDate, d);
                      return (
                        <button
                          key={d.toISOString()}
                          onClick={() => { setSelectedDate(d); setSelectedTime(''); }}
                          className={`snap-start shrink-0 flex flex-col items-center justify-center w-20 h-24 rounded-2xl border-2 transition-all ${
                            isSelected
                              ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20'
                              : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface hover:border-primary/50'
                          }`}
                        >
                          <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                            {format(d, 'EEE', { locale: isAr ? arSA : enUS })}
                          </span>
                          <span className="text-2xl font-black mb-1">{format(d, 'd')}</span>
                          <span className={`text-xs ${isSelected ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                            {format(d, 'MMM', { locale: isAr ? arSA : enUS })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <div className="space-y-3 mt-6">
                    <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      {isAr ? 'الوقت' : 'Time'}
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {timeSlots.map((slotTime: Date) => {
                        const isoString = slotTime.toISOString();
                        
                        // Check if it exists in db slots to see capacity
                        const existingDbSlot = serviceSlots.find((s: any) => new Date(s.start_time).getTime() === slotTime.getTime());
                        const capacity = existingDbSlot ? existingDbSlot.capacity : 10;
                        const booked = existingDbSlot ? existingDbSlot.booked_count : 0;
                        const remaining = capacity - booked;
                        const isFull = remaining <= 0;
                        
                        // Also check if time is in the past (for today)
                        const isPast = slotTime < new Date();
                        const disabled = isFull || isPast;

                        const isSelected = selectedTime === isoString;

                        return (
                          <button
                            key={isoString}
                            disabled={disabled}
                            onClick={() => setSelectedTime(isoString)}
                            className={`py-3 px-2 rounded-xl border-2 text-center transition-all duration-200 ${
                              disabled
                                ? 'border-outline-variant/10 bg-surface-container-low text-on-surface-variant/30 cursor-not-allowed'
                                : isSelected
                                ? 'border-primary bg-primary text-on-primary shadow-lg shadow-primary/20'
                                : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/50'
                            }`}
                          >
                            <div className={`font-bold text-sm md:text-base tracking-tight ${isSelected ? '' : disabled ? '' : 'text-primary'}`}>
                              {format(slotTime, 'HH:mm')}
                            </div>
                            {!isPast && (
                              <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                                {isFull ? (isAr ? 'ممتلئ' : 'Full') : `${remaining} ${isAr ? 'متبقي' : 'left'}`}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Step 3: Options (Horse & Trainer) */}
        {step === 3 && (
          <div className="space-y-8">
            <h2 className="font-title-md text-title-md text-primary mb-2">
              {isAr ? 'اختر خياراتك' : 'Choose Your Options'}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {isAr ? 'هذه الخيارات اختيارية — يمكنك تخطيها.' : 'These are optional — you can skip ahead.'}
            </p>

            {/* Horse selection */}
            {activeHorses.length > 0 && !isLivery && (
              <div className="space-y-3">
                <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">pets</span>
                  {isAr ? 'اختر الحصان' : 'Preferred Horse'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeHorses.map((horse: any) => {
                    const name = isAr ? horse.name_ar : horse.name_en;
                    const breed = isAr ? horse.breed_ar : horse.breed_en;
                    const isSelected = selectedHorseId === horse.id;
                    return (
                      <button
                        key={horse.id}
                        onClick={() => setSelectedHorseId(isSelected ? '' : horse.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-outline-variant/30 hover:border-primary/50'
                        }`}
                      >
                        {horse.image_url ? (
                          <img src={horse.image_url} alt={name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center text-2xl shrink-0">🐴</div>
                        )}
                        <div>
                          <div className="font-title-md text-title-md text-on-background">{name}</div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant">{breed}</div>
                        </div>
                        {isSelected && <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Trainer selection */}
            {activeTrainers.length > 0 && !isLivery && (
              <div className="space-y-3">
                <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                  {isAr ? 'اختر المدرب' : 'Preferred Instructor'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTrainers.map((trainer: any) => {
                    const name = isAr ? trainer.name_ar : trainer.name_en;
                    const isSelected = selectedTrainerId === trainer.id;
                    return (
                      <button
                        key={trainer.id}
                        onClick={() => setSelectedTrainerId(isSelected ? '' : trainer.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-outline-variant/30 hover:border-primary/50'
                        }`}
                      >
                        {trainer.image_url ? (
                          <img src={trainer.image_url} alt={name} className="w-14 h-14 rounded-lg object-cover object-top shrink-0" />
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center text-2xl shrink-0">👤</div>
                        )}
                        <div>
                          <div className="font-title-md text-title-md text-on-background">{name}</div>
                          {trainer.specialty_en && (
                            <div className="font-label-sm text-label-sm text-on-surface-variant">{isAr ? trainer.specialty_ar : trainer.specialty_en}</div>
                          )}
                        </div>
                        {isSelected && <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeHorses.length === 0 && activeTrainers.length === 0 && (
              <div className="text-center py-8 text-on-surface-variant">
                <p>{isAr ? 'لا توجد خيارات إضافية — يمكنك المتابعة.' : 'No additional options — you can continue.'}</p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Customer Details */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="font-title-md text-title-md text-primary mb-6">
              {isAr ? 'بياناتك' : 'Your Details'}
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                </label>
                <input
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  className="w-full px-4 py-3 bg-surface-container-lowest rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow font-body-md text-body-md"
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">phone</span>
                  {isAr ? 'رقم الجوال *' : 'Phone Number *'}
                </label>
                <input
                  required
                  type="tel"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="+966 5X XXX XXXX"
                  className="w-full px-4 py-3 bg-surface-container-lowest rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow font-body-md text-body-md"
                  dir="ltr"
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)'}
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  placeholder={isAr ? 'example@email.com' : 'example@email.com'}
                  className="w-full px-4 py-3 bg-surface-container-lowest rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow font-body-md text-body-md"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Confirm */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="font-title-md text-title-md text-primary mb-6">
              {isAr ? 'مراجعة وتأكيد' : 'Review & Confirm'}
            </h2>

            {errorMsg && (
              <div className="p-4 bg-error-container text-on-error-container rounded-xl font-label-sm text-label-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {errorMsg}
              </div>
            )}

            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 divide-y divide-outline-variant/20">
              {/* Service */}
              <div className="p-5 flex justify-between items-center">
                <div>
                  <div className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider mb-1">{isAr ? 'الخدمة' : 'Service'}</div>
                  <div className="font-title-md text-title-md text-on-surface">{isAr ? selectedService?.name_ar : selectedService?.name_en}</div>
                </div>
                <div className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">
                  {selectedService?.price} SAR
                </div>
              </div>
              {/* Date/Time or Month */}
              <div className="p-5">
                <div className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider mb-1">
                  {isLivery ? (isAr ? 'الشهر' : 'Month') : (isAr ? 'التاريخ والوقت' : 'Date & Time')}
                </div>
                <div className="font-body-md text-body-md text-on-surface">
                  {isLivery
                    ? formatMonth(selectedLiveryMonth)
                    : selectedTime
                    ? `${formatDate(new Date(selectedDate!))} • ${format(new Date(selectedTime), 'hh:mm a', { locale: isAr ? arSA : enUS })}`
                    : '-'}
                </div>
              </div>
              {/* Horse & Trainer */}
              {(selectedHorseId || selectedTrainerId) && (
                <div className="p-5 grid grid-cols-2 gap-4">
                  {selectedHorseId && (
                    <div>
                      <div className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider mb-1">{isAr ? 'الحصان' : 'Horse'}</div>
                      <div className="font-body-md text-body-md text-on-surface">
                        {isAr
                          ? activeHorses.find((h: any) => h.id === selectedHorseId)?.name_ar
                          : activeHorses.find((h: any) => h.id === selectedHorseId)?.name_en}
                      </div>
                    </div>
                  )}
                  {selectedTrainerId && (
                    <div>
                      <div className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider mb-1">{isAr ? 'المدرب' : 'Instructor'}</div>
                      <div className="font-body-md text-body-md text-on-surface">
                        {isAr
                          ? activeTrainers.find((t: any) => t.id === selectedTrainerId)?.name_ar
                          : activeTrainers.find((t: any) => t.id === selectedTrainerId)?.name_en}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Customer */}
              <div className="p-5">
                <div className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider mb-1">{isAr ? 'بيانات العميل' : 'Customer'}</div>
                <div className="font-body-md text-body-md text-on-surface">{customerName}</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant" dir="ltr">{customerPhone}</div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3 mt-6">
              <h3 className="font-title-md text-title-md text-primary">
                {isAr ? 'طريقة الدفع' : 'Payment Method'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:border-primary/50'}`}>
                  <input type="radio" name="paymentMethod" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="sr-only" />
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">credit_card</span>
                  </div>
                  <div>
                    <div className="font-title-md text-title-md">{isAr ? 'الدفع الإلكتروني' : 'Pay Online'}</div>
                    <div className="font-label-xs text-on-surface-variant">{isAr ? 'مدى، فيزا، ماستركارد، أبل باي' : 'Mada, Visa, Mastercard, Apple Pay'}</div>
                  </div>
                  {paymentMethod === 'online' && <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>}
                </label>
                
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:border-primary/50'}`}>
                  <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="sr-only" />
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">storefront</span>
                  </div>
                  <div>
                    <div className="font-title-md text-title-md">{isAr ? 'الدفع في المركز' : 'Pay at Center'}</div>
                    <div className="font-label-xs text-on-surface-variant">{isAr ? 'الدفع نقداً أو بالشبكة عند الوصول' : 'Cash or POS on arrival'}</div>
                  </div>
                  {paymentMethod === 'cash' && <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>}
                </label>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant shadow-xl shadow-primary/10 p-4 md:p-6 z-40">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="font-label-sm text-on-surface-variant hidden md:block">
            {selectedService && (
              <>
                {isAr ? 'المجموع:' : 'Total:'}{' '}
                <span className="font-title-md text-title-md text-primary ml-2">{selectedService.price} SAR</span>
              </>
            )}
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 md:flex-none px-6 py-3 border border-secondary text-secondary font-label-sm text-label-sm rounded-lg hover:bg-secondary/5 transition-colors"
              >
                {isAr ? 'رجوع' : 'Back'}
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="flex-1 md:flex-none px-8 py-3 bg-primary text-on-primary font-label-sm text-label-sm rounded-lg hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-on-primary border-t-transparent" />
              ) : step === 5 ? (
                <>{isAr ? 'تأكيد الحجز' : 'Confirm Booking'}</>
              ) : (
                <>
                  {isAr ? 'التالي' : 'Continue'}
                  <span className="material-symbols-outlined text-[18px]">{isAr ? 'arrow_back' : 'arrow_forward'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
