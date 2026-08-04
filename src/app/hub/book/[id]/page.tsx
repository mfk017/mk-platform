'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Globe2 as Translate, Calendar as CalendarToday, User as Person, MapPin as LocationOn, Shield, ArrowRight as ArrowForward } from 'lucide-react';

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('14');
  const [selectedTime, setSelectedTime] = useState('08:00 AM');
  const [selectedTrainer, setSelectedTrainer] = useState('Ahmed');

  // Hardcode static info for now based on the design
  return (
    <div className="max-w-container-max mx-auto space-y-8 pb-24 md:pb-0">
      {/* Header & Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-on-surface-variant font-label-sm mb-4">
          <Link href="/hub/catalog" className="hover:text-primary transition-colors">Bookings</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary">Private Beginner Lesson</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-2">Private Beginner Lesson</h1>
            <p className="font-body-md text-on-surface-variant max-w-2xl">
              Master the fundamentals of riding with one-on-one instruction tailored to your pace. Perfect for first-time riders.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary text-sm">translate</span>
            <span className="font-label-sm text-on-surface font-medium">English / العربية</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Scheduling */}
        <div className="md:col-span-8 flex flex-col gap-6">
          
          {/* 1. Select Date */}
          <div className="bg-surface-container-lowest rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">1</div>
              <h2 className="font-title-md text-on-background">
                Select Date <span className="text-on-surface-variant text-sm font-normal ml-2">/ اختر التاريخ</span>
              </h2>
            </div>
            
            {/* Horizontal Calendar */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              <button onClick={() => setSelectedDate('12')} className={`min-w-[80px] flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${selectedDate === '12' ? 'border-2 border-primary bg-primary-fixed/20 shadow-sm' : 'border-outline-variant/50 hover:border-primary hover:bg-surface-container'}`}>
                <span className={`font-label-xs uppercase ${selectedDate === '12' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>Mon</span>
                <span className={`font-headline-lg-mobile font-semibold ${selectedDate === '12' ? 'text-primary' : 'text-on-surface'}`}>12</span>
                <span className={`font-label-xs ${selectedDate === '12' ? 'text-primary font-medium' : 'text-on-surface-variant'}`}>Oct</span>
              </button>
              <button onClick={() => setSelectedDate('13')} className={`min-w-[80px] flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${selectedDate === '13' ? 'border-2 border-primary bg-primary-fixed/20 shadow-sm' : 'border-outline-variant/50 hover:border-primary hover:bg-surface-container'}`}>
                <span className={`font-label-xs uppercase ${selectedDate === '13' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>Tue</span>
                <span className={`font-headline-lg-mobile font-semibold ${selectedDate === '13' ? 'text-primary' : 'text-on-surface'}`}>13</span>
                <span className={`font-label-xs ${selectedDate === '13' ? 'text-primary font-medium' : 'text-on-surface-variant'}`}>Oct</span>
              </button>
              <button onClick={() => setSelectedDate('14')} className={`min-w-[80px] flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${selectedDate === '14' ? 'border-2 border-primary bg-primary-fixed/20 shadow-sm' : 'border-outline-variant/50 hover:border-primary hover:bg-surface-container'}`}>
                <span className={`font-label-xs uppercase ${selectedDate === '14' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>Wed</span>
                <span className={`font-headline-lg-mobile font-semibold ${selectedDate === '14' ? 'text-primary' : 'text-on-surface'}`}>14</span>
                <span className={`font-label-xs ${selectedDate === '14' ? 'text-primary font-medium' : 'text-on-surface-variant'}`}>Oct</span>
              </button>
              <button onClick={() => setSelectedDate('15')} className={`min-w-[80px] flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${selectedDate === '15' ? 'border-2 border-primary bg-primary-fixed/20 shadow-sm' : 'border-outline-variant/50 hover:border-primary hover:bg-surface-container'}`}>
                <span className={`font-label-xs uppercase ${selectedDate === '15' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>Thu</span>
                <span className={`font-headline-lg-mobile font-semibold ${selectedDate === '15' ? 'text-primary' : 'text-on-surface'}`}>15</span>
                <span className={`font-label-xs ${selectedDate === '15' ? 'text-primary font-medium' : 'text-on-surface-variant'}`}>Oct</span>
              </button>
              <button disabled className="min-w-[80px] flex flex-col items-center justify-center p-3 rounded-lg border border-outline-variant/50 opacity-50 cursor-not-allowed">
                <span className="font-label-xs text-on-surface-variant uppercase">Fri</span>
                <span className="font-headline-lg-mobile font-semibold text-on-surface-variant">16</span>
                <span className="font-label-xs text-on-surface-variant">Oct</span>
              </button>
            </div>
          </div>

          {/* 2. Select Time */}
          <div className="bg-surface-container-lowest rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
              <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold">2</div>
              <h2 className="font-title-md text-on-background">
                Select Time <span className="text-on-surface-variant text-sm font-normal ml-2">/ اختر الوقت</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button onClick={() => setSelectedTime('08:00 AM')} className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${selectedTime === '08:00 AM' ? 'border-2 border-primary bg-primary-fixed/10 shadow-sm' : 'border-outline-variant/50 hover:border-primary hover:bg-surface-container'}`}>
                <span className={`font-body-md font-semibold ${selectedTime === '08:00 AM' ? 'text-primary' : 'text-primary'}`}>08:00 AM</span>
                <span className="font-label-xs text-secondary mt-1">2 spots left</span>
              </button>
              <button onClick={() => setSelectedTime('09:00 AM')} className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${selectedTime === '09:00 AM' ? 'border-2 border-primary bg-primary-fixed/10 shadow-sm' : 'border-outline-variant/50 hover:border-primary hover:bg-surface-container'}`}>
                <span className={`font-body-md font-semibold ${selectedTime === '09:00 AM' ? 'text-primary' : 'text-on-surface'}`}>09:00 AM</span>
                <span className={`font-label-xs mt-1 ${selectedTime === '09:00 AM' ? 'text-primary font-medium' : 'text-on-surface-variant'}`}>Available</span>
              </button>
              <button disabled className="flex flex-col items-center justify-center p-3 rounded-lg border border-outline-variant/50 bg-surface-container-high/30 opacity-60 cursor-not-allowed">
                <span className="font-body-md font-semibold text-on-surface-variant line-through">10:00 AM</span>
                <span className="font-label-xs text-error mt-1">Full</span>
              </button>
              <button onClick={() => setSelectedTime('11:00 AM')} className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${selectedTime === '11:00 AM' ? 'border-2 border-primary bg-primary-fixed/10 shadow-sm' : 'border-outline-variant/50 hover:border-primary hover:bg-surface-container'}`}>
                <span className={`font-body-md font-semibold ${selectedTime === '11:00 AM' ? 'text-primary' : 'text-on-surface'}`}>11:00 AM</span>
                <span className="font-label-xs text-secondary mt-1">1 spot left</span>
              </button>
            </div>
          </div>

          {/* 3. Select Trainer */}
          <div className="bg-surface-container-lowest rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
              <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold">3</div>
              <h2 className="font-title-md text-on-background">
                Select Trainer <span className="text-on-surface-variant text-sm font-normal ml-2">/ اختر المدرب</span>
              </h2>
            </div>
            
            <div className="space-y-4">
              {/* Trainer Card 1 */}
              <div 
                onClick={() => setSelectedTrainer('Ahmed')}
                className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedTrainer === 'Ahmed' ? 'border-primary bg-surface-bright shadow-sm relative overflow-hidden' : 'border-outline-variant/50 hover:border-primary/50 hover:bg-surface-container-low'}`}
              >
                {selectedTrainer === 'Ahmed' && <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary"></div>}
                <div className="w-16 h-16 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="Ahmed" />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-title-md text-primary">Ahmed Al-Farsi</h3>
                  <p className="font-label-sm text-secondary mb-2">Senior Instructor • 15 Yrs Exp</p>
                  <p className="font-label-xs text-on-surface-variant max-w-md">Specializes in building confidence in adult beginners. Fluent in Arabic and English.</p>
                </div>
                <div className="flex-shrink-0 mt-2 sm:mt-0">
                  {selectedTrainer === 'Ahmed' ? (
                    <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-outline-variant text-2xl">radio_button_unchecked</span>
                  )}
                </div>
              </div>

              {/* Trainer Card 2 */}
              <div 
                onClick={() => setSelectedTrainer('Sarah')}
                className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedTrainer === 'Sarah' ? 'border-primary bg-surface-bright shadow-sm relative overflow-hidden' : 'border-outline-variant/50 hover:border-primary/50 hover:bg-surface-container-low'}`}
              >
                {selectedTrainer === 'Sarah' && <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary"></div>}
                <div className="w-16 h-16 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="Sarah" />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-title-md text-on-surface">Sarah Mitchell</h3>
                  <p className="font-label-sm text-secondary mb-2">Dressage Specialist • 8 Yrs Exp</p>
                  <p className="font-label-xs text-on-surface-variant max-w-md">Focuses on technical posture and gentle communication with the horse. English only.</p>
                </div>
                <div className="flex-shrink-0 mt-2 sm:mt-0">
                  {selectedTrainer === 'Sarah' ? (
                    <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-outline-variant text-2xl hidden sm:block">radio_button_unchecked</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Summary Sticky Card */}
        <div className="md:col-span-4 sticky top-28">
          <div className="bg-surface-container-lowest rounded-xl shadow-xl shadow-primary/10 border border-secondary/10 overflow-hidden">
            {/* Header */}
            <div className="bg-surface-container-low p-6 border-b border-outline-variant/20">
              <h2 className="font-title-md text-primary mb-1">Booking Summary</h2>
              <p className="font-label-xs text-on-surface-variant">ملخص الحجز</p>
            </div>
            
            {/* Details */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-xs text-on-surface-variant uppercase tracking-wider mb-1">Service</p>
                  <p className="font-body-md font-medium text-on-background">Private Beginner Lesson</p>
                </div>
              </div>
              <div className="h-px w-full bg-outline-variant/20"></div>
              <div className="flex items-center gap-3 text-on-background">
                <span className="material-symbols-outlined text-secondary">calendar_today</span>
                <div>
                  <p className="font-body-md">Tuesday, 13 Oct 2023</p>
                  <p className="font-label-xs text-on-surface-variant">09:00 AM - 10:00 AM (60 min)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-on-background">
                <span className="material-symbols-outlined text-secondary">person</span>
                <p className="font-body-md">Trainer: Ahmed Al-Farsi</p>
              </div>
              <div className="flex items-center gap-3 text-on-background">
                <span className="material-symbols-outlined text-secondary">location_on</span>
                <p className="font-body-md">Riyadh Equestrian Center, Main Arena</p>
              </div>
            </div>

            {/* Pricing Footer */}
            <div className="bg-surface-bright p-6 border-t border-outline-variant/20">
              <div className="flex justify-between items-end mb-6">
                <p className="font-body-lg text-on-background">Total <span className="font-label-xs text-on-surface-variant font-normal block">Includes VAT</span></p>
                <p className="font-headline-lg text-primary font-bold">450 <span className="text-title-md font-normal text-on-surface-variant">SAR</span></p>
              </div>
              <button 
                onClick={() => router.push('/checkout')}
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-title-md py-4 px-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                Confirm Booking & Pay
              </button>
              <p className="text-center font-label-xs text-on-tertiary-fixed-variant mt-4 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                Payments are securely processed by Moyasar
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
