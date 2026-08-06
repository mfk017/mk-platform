'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/dashboard/overview');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-on-surface-variant font-medium">Loading Dashboard...</p>
      </div>
    );
  }

  const { stats = {}, todaySchedule = [], horses = {} } = data || {};
  
  return (
    <>
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-display-lg text-title-md text-on-surface m-0 p-0">الرئيسية | Overview</h2>
          <p className="font-ibm-plex-sans text-label-sm text-on-surface-variant hidden sm:block">
            نظرة عامة على أداء المركز | Dashboard overview and quick actions
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Link href="/dashboard/bookings/new" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-label-sm shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>
            حجز جديد | New Booking
          </Link>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="bento-grid">
        {/* Quick Stats (Revenue & Bookings) - Span 8 on Desktop */}
        <div className="col-span-4 md:col-span-8 lg:col-span-8 bg-surface rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-title-md text-title-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">payments</span>
              نظرة مالية | Financial Overview
            </h2>
            <span className="bg-primary-container text-on-primary-container font-label-xs text-label-xs px-2 py-1 rounded">
              آخر 30 يوم | Last 30 Days
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Revenue */}
            <div className="border-l-4 border-[#1B4332] pl-4">
              <p className="font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">أرباح اليوم | Today's Revenue</p>
              <h3 className="font-headline-lg-mobile text-primary font-bold">SAR {stats.todayRevenue?.toLocaleString() ?? 0}</h3>
              <p className="font-label-xs text-label-xs text-[#3f6653] mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                بيانات حية | Real data
              </p>
            </div>
            {/* Platform Fees */}
            <div className="border-l-4 border-secondary pl-4">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">رسوم المنصة | Platform Fees</p>
              <p className="font-title-md text-title-md text-on-surface">SAR {stats.totalPlatformFees?.toLocaleString() ?? 0}</p>
              <p className="font-label-xs text-label-xs text-on-surface-variant mt-2">تخصم تلقائياً | Deducted automatically</p>
            </div>
            {/* Active Bookings */}
            <div className="border-l-4 border-inverse-primary pl-4">
              <p className="font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">حجوزات اليوم | Today's Bookings</p>
              <h3 className="font-headline-lg-mobile text-primary font-bold">{stats.todayBookings ?? 0}</h3>
              <p className="font-label-xs text-label-xs text-[#3f6653] mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                مؤكد | Confirmed
              </p>
            </div>
          </div>
        </div>

        {/* Horse Status - Span 4 on Desktop */}
        <div className="col-span-4 md:col-span-8 lg:col-span-4 bg-surface rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 p-6 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-title-md text-title-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">bedroom_baby</span>
              حالة الخيل | Stable Status
            </h2>
            <Link href="/dashboard/horses" className="text-primary hover:text-secondary transition-colors">
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 rounded bg-[#3f6653]"></div>
                <div>
                  <p className="font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">إجمالي الخيل | Total Horses</p>
                  <h3 className="font-headline-lg-mobile text-primary font-bold">{horses.total ?? 0}</h3>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 rounded bg-secondary"></div>
                <div>
                  <p className="font-label-sm text-label-sm text-primary">نشط | Active</p>
                  <p className="font-label-xs text-label-xs text-on-surface-variant">متاح للحجز | Available for booking</p>
                </div>
              </div>
              <span className="font-title-md text-title-md text-primary">{horses.active ?? 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 rounded bg-surface-variant"></div>
                <div>
                  <p className="font-label-sm text-label-sm text-primary">غير نشط | Inactive</p>
                  <p className="font-label-xs text-label-xs text-on-surface-variant">راحة / طبي | Resting / Medical</p>
                </div>
              </div>
              <span className="font-title-md text-title-md text-primary">{(horses.total ?? 0) - (horses.active ?? 0)}</span>
            </div>
          </div>
        </div>

        {/* Today's Schedule - Span 8 on Desktop */}
        <div className="col-span-4 md:col-span-8 lg:col-span-8 bg-surface rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 p-6 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest rounded-t-xl">
            <h3 className="font-title-md text-primary font-semibold">حجوزات قادمة | Upcoming Bookings</h3>
            <Link href="/dashboard/bookings" className="font-label-sm text-primary hover:underline">عرض الكل | View All</Link>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary-fixed/30 border-b border-surface-variant">
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">الوقت | Time</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">الخدمة | Activity</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">المدرب/العميل | Trainer/Client</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">الخيل | Horse</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">الحالة | Status</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md text-on-surface">
                {todaySchedule.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl opacity-50 text-secondary mb-3">calendar_today</span>
                      <p className="font-label-sm">لا توجد حجوزات اليوم | No bookings for today</p>
                      <Link href="/dashboard/bookings/new">
                        <button className="mt-4 px-4 py-2 bg-secondary text-on-secondary rounded-lg font-label-sm transition-colors hover:bg-secondary/90">
                          إضافة حجز | Add First Booking
                        </button>
                      </Link>
                    </td>
                  </tr>
                ) : (
                  todaySchedule.map((booking: any) => (
                    <tr key={booking.id} className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                      <td className="py-3 px-4 font-label-sm text-label-sm">
                        {booking.slot ? new Date(booking.slot.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                      </td>
                      <td className="py-3 px-4">{booking.service?.name_en || 'Unknown Service'}</td>
                      <td className="py-3 px-4">
                        {booking.trainer?.name_en || 'No Trainer'} / {booking.customer_name}
                      </td>
                      <td className="py-3 px-4">{booking.horse?.name_en || 'Any Horse'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-[#e6f4ea] text-[#137333]' : 
                          booking.status === 'pending' ? 'bg-[#fff8e1] text-[#f57f17]' : 
                          'bg-surface-variant text-on-surface-variant'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Promos - Span 4 on Desktop */}
        <div className="col-span-4 md:col-span-8 lg:col-span-4 flex flex-col gap-6">
          {/* Action Card */}
          <div className="bg-[#1B4332] text-white rounded-xl shadow-xl shadow-primary/10 p-6 relative overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-20"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=600&q=80')" }}
            ></div>
            <div className="relative z-10">
              <h3 className="font-title-md text-title-md mb-2">توفر المدربين | Trainer Availability</h3>
              <p className="font-body-md text-body-md text-inverse-primary mb-6">
                تحديث الجداول للموسم القادم | Update schedules for the upcoming busy season.
              </p>
              <Link href="/dashboard/trainers" className="bg-white text-primary font-label-sm text-label-sm px-4 py-2 rounded-lg hover:bg-surface-container-low transition-colors shadow-sm flex items-center gap-2 w-max">
                إدارة المدربين | Manage Trainers
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Weather / Environment Card */}
          <div className="bg-surface rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 p-6 flex items-center justify-between">
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">حالة الطقس | Current Conditions</p>
              <div className="flex items-end gap-2">
                <span className="font-display-lg text-display-lg text-primary">28°C</span>
                <span className="font-body-md text-body-md text-on-surface-variant mb-2">الرياض | Riyadh</span>
              </div>
              <p className="font-label-xs text-label-xs text-[#3f6653]">طقس مثالي للركوب | Perfect riding weather</p>
            </div>
            <div className="text-secondary opacity-80">
              <span className="material-symbols-outlined text-[64px]">light_mode</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
