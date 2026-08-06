'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopBar } from '@/components/dashboard/TopBar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { addDays, format, startOfToday, eachDayOfInterval, addMinutes, isSameDay } from 'date-fns';
import { Calendar, Clock, User, Phone, Save, ArrowLeft } from 'lucide-react';

export default function NewBookingPage() {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [center, setCenter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+966 ');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/dashboard/services').then(res => res.json()),
      fetch('/api/dashboard/settings').then(res => res.json())
    ])
      .then(([servicesJson, settingsJson]) => {
        setServices(servicesJson.services || []);
        if (settingsJson.center) setCenter(settingsJson.center);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const activeServices = services.filter((s: any) => s.is_active !== false);
  const selectedService = activeServices.find((s: any) => s.id === selectedServiceId);

  // Time Slot Generation
  const workingHours = center?.working_hours;
  const SLOT_DURATION_MINUTES = selectedService?.duration_minutes || 30;

  const timeSlots = selectedDate ? (() => {
    const slots: Date[] = [];
    const dayIndex = selectedDate.getDay();
    
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

      const current = new Date(selectedDate);
      current.setHours(startHour, startMin, 0, 0);
      
      const end = new Date(selectedDate);
      end.setHours(endHour, endMin, 0, 0);

      while (current < end) {
        slots.push(new Date(current));
        current.setMinutes(current.getMinutes() + SLOT_DURATION_MINUTES);
      }
    }
    
    return slots;
  })() : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceId || !selectedTime || !customerName || !customerPhone) {
      setErrorMsg('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const startTimeISO = new Date(selectedTime).toISOString();
      const endTimeISO = addMinutes(new Date(selectedTime), SLOT_DURATION_MINUTES).toISOString();

      const res = await fetch('/api/dashboard/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: selectedServiceId,
          start_time: startTimeISO,
          end_time: endTimeISO,
          customer_name: customerName,
          customer_phone: customerPhone,
          booking_price: selectedService.price,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to create booking');
      
      router.push('/dashboard/bookings');
    } catch (err: any) {
      setErrorMsg(err.message);
      setIsSubmitting(false);
    }
  };

  const inputClassName = "w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all text-sm";

  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-surface">
      <TopBar title="New Walk-in Booking" subtitle="Log an offline booking for a customer in the center" />

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => router.push('/dashboard/bookings')}>
            Back to Bookings
          </Button>

          {loading ? (
            <Spinner center size="lg" />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 pb-20">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Service Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Select Service</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeServices.map((service: any) => (
                    <label
                      key={service.id}
                      className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedServiceId === service.id
                          ? 'border-violet-600 bg-violet-50'
                          : 'border-slate-200 hover:border-violet-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        className="sr-only"
                        value={service.id}
                        checked={selectedServiceId === service.id}
                        onChange={() => {
                          setSelectedServiceId(service.id);
                          setSelectedTime('');
                          setSelectedDate(null);
                        }}
                      />
                      <div className="font-bold text-slate-900">{service.name_en}</div>
                      <div className="text-sm text-slate-500 flex justify-between mt-1">
                        <span>{service.duration_minutes} min</span>
                        <span className="font-semibold text-violet-700">{service.price} SAR</span>
                      </div>
                    </label>
                  ))}
                </CardContent>
              </Card>

              {/* Date & Time */}
              {selectedServiceId && (
                <Card>
                  <CardHeader>
                    <CardTitle>2. التاريخ والوقت | Date & Time</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> اختيار التاريخ | Select Date
                      </label>
                      <div className="flex overflow-x-auto pb-2 gap-2 snap-x hide-scrollbar">
                        {eachDayOfInterval({ start: startOfToday(), end: addDays(startOfToday(), 30) }).map(d => {
                          const isSelected = selectedDate && isSameDay(selectedDate, d);
                          return (
                            <button
                              key={d.toISOString()}
                              type="button"
                              onClick={() => { setSelectedDate(d); setSelectedTime(''); }}
                              className={`snap-start shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl border-2 transition-all ${
                                isSelected
                                  ? 'bg-violet-600 text-white border-violet-600'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-violet-300'
                              }`}
                            >
                              <span className="text-[10px] font-bold uppercase">{format(d, 'EEE')}</span>
                              <span className="text-xl font-black">{format(d, 'd')}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selectedDate && (
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4" /> اختيار الوقت | Select Time
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                          {timeSlots.map((slotTime: Date) => {
                            const isoString = slotTime.toISOString();
                            const isPast = slotTime < new Date();
                            const isSelected = selectedTime === isoString;
                            
                            return (
                              <button
                                key={isoString}
                                type="button"
                                disabled={isPast}
                                onClick={() => setSelectedTime(isoString)}
                                className={`py-2 px-1 rounded-lg border-2 text-center text-sm transition-all ${
                                  isPast
                                    ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                                    : isSelected
                                    ? 'border-violet-600 bg-violet-600 text-white'
                                    : 'border-slate-200 bg-white hover:border-violet-300'
                                }`}
                              >
                                <span className="font-bold">{format(slotTime, 'HH:mm')}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Customer Details */}
              {selectedTime && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-title-md text-primary mb-6 flex items-center gap-2">
                      <User className="w-5 h-5 text-secondary" />
                      بيانات العميل | Customer Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-label-sm font-bold text-secondary">اسم العميل | Full Name *</label>
                        <input 
                          required 
                          value={customerName} 
                          onChange={e => setCustomerName(e.target.value)} 
                          className={inputClassName} 
                          type="text" 
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-label-sm font-bold text-secondary">رقم الجوال | Phone Number *</label>
                        <input 
                          required 
                          value={customerPhone} 
                          onChange={e => setCustomerPhone(e.target.value)} 
                          className={inputClassName} 
                          type="tel" 
                          placeholder="+966 5X XXX XXXX"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50 border-t border-slate-100 flex justify-between items-center rounded-b-2xl">
                    <div className="text-sm font-medium text-slate-600">
                      Walk-in Platform Fee: <strong className="text-slate-900">3.00 SAR</strong>
                    </div>
                    <Button type="submit" isLoading={isSubmitting} leftIcon={<Save className="w-4 h-4" />}>
                      تأكيد الحجز | Create Walk-in Booking
                    </Button>
                  </CardFooter>
                </Card>
              )}

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
