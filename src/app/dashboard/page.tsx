'use client';

import React from 'react';
import Link from 'next/link';

export default function DashboardOverview() {
  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-end mb-8">
        <div>
          <p className="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">
            Today's Overview | نظرة عامة اليوم
          </p>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
            Good Morning, Manager
          </h1>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="bg-surface border border-outline-variant text-primary font-label-sm text-label-sm px-4 py-2 rounded-lg hover:bg-surface-container-low transition-colors shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Date Range
          </button>
          <button className="bg-[#1B4332] text-white font-label-sm text-label-sm px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors shadow-xl shadow-primary/10 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Booking
          </button>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="bento-grid">
        {/* Quick Stats (Revenue & Bookings) - Span 8 on Desktop */}
        <div className="col-span-4 md:col-span-8 lg:col-span-8 bg-surface rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-title-md text-title-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">payments</span>
              Financial Overview
            </h2>
            <span className="bg-primary-container text-on-primary-container font-label-xs text-label-xs px-2 py-1 rounded">
              Last 30 Days
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Revenue */}
            <div className="border-l-4 border-[#1B4332] pl-4">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Total Revenue</p>
              <p className="font-display-lg text-display-lg text-primary">SAR 124.5K</p>
              <p className="font-label-xs text-label-xs text-[#3f6653] mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +12% vs last month
              </p>
            </div>
            {/* Platform Fees */}
            <div className="border-l-4 border-secondary pl-4">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Platform Fees (5%)</p>
              <p className="font-title-md text-title-md text-on-surface">SAR 6,225</p>
              <p className="font-label-xs text-label-xs text-on-surface-variant mt-2">Deducted automatically</p>
            </div>
            {/* Active Bookings */}
            <div className="border-l-4 border-inverse-primary pl-4">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Active Bookings</p>
              <p className="font-display-lg text-display-lg text-primary">342</p>
              <p className="font-label-xs text-label-xs text-[#3f6653] mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                98% Fulfillment
              </p>
            </div>
          </div>
        </div>

        {/* Horse Status - Span 4 on Desktop */}
        <div className="col-span-4 md:col-span-8 lg:col-span-4 bg-surface rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 p-6 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-title-md text-title-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">bedroom_baby</span>
              Stable Status
            </h2>
            <button className="text-primary hover:text-secondary transition-colors">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 rounded bg-[#3f6653]"></div>
                <div>
                  <p className="font-label-sm text-label-sm text-primary">In Training</p>
                  <p className="font-label-xs text-label-xs text-on-surface-variant">Active sessions</p>
                </div>
              </div>
              <span className="font-title-md text-title-md text-primary">24</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 rounded bg-secondary"></div>
                <div>
                  <p className="font-label-sm text-label-sm text-primary">Medical Check</p>
                  <p className="font-label-xs text-label-xs text-on-surface-variant">Pending vet</p>
                </div>
              </div>
              <span className="font-title-md text-title-md text-primary">3</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 rounded bg-surface-variant"></div>
                <div>
                  <p className="font-label-sm text-label-sm text-primary">Resting</p>
                  <p className="font-label-xs text-label-xs text-on-surface-variant">Stabled</p>
                </div>
              </div>
              <span className="font-title-md text-title-md text-primary">15</span>
            </div>
          </div>
        </div>

        {/* Today's Schedule - Span 8 on Desktop */}
        <div className="col-span-4 md:col-span-8 lg:col-span-8 bg-surface rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 p-6 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-title-md text-title-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">schedule</span>
              Today's Schedule
            </h2>
            <Link className="font-label-sm text-label-sm text-primary hover:underline" href="/dashboard/bookings">
              View All
            </Link>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary-fixed/30 border-b border-surface-variant">
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">Time</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">Activity</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">Trainer/Client</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">Horse</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md text-on-surface">
                <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-4 font-label-sm text-label-sm">08:00 AM</td>
                  <td className="py-3 px-4">Show Jumping</td>
                  <td className="py-3 px-4">Ahmed R. / Sarah K.</td>
                  <td className="py-3 px-4">Thunder</td>
                  <td className="py-3 px-4">
                    <span className="bg-[#e6f4ea] text-[#137333] px-2 py-1 rounded text-xs font-medium">Ongoing</span>
                  </td>
                </tr>
                <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-4 font-label-sm text-label-sm">09:30 AM</td>
                  <td className="py-3 px-4">Dressage Basics</td>
                  <td className="py-3 px-4">Fatima A. / John D.</td>
                  <td className="py-3 px-4">Desert Rose</td>
                  <td className="py-3 px-4">
                    <span className="bg-secondary-fixed/50 text-secondary px-2 py-1 rounded text-xs font-medium">Upcoming</span>
                  </td>
                </tr>
                <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-4 font-label-sm text-label-sm">11:00 AM</td>
                  <td className="py-3 px-4">Beginner Ride</td>
                  <td className="py-3 px-4">Khalid M. / Guest</td>
                  <td className="py-3 px-4">Spirit</td>
                  <td className="py-3 px-4">
                    <span className="bg-secondary-fixed/50 text-secondary px-2 py-1 rounded text-xs font-medium">Upcoming</span>
                  </td>
                </tr>
                <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-4 font-label-sm text-label-sm">02:00 PM</td>
                  <td className="py-3 px-4">Vet Inspection</td>
                  <td className="py-3 px-4">Dr. Youssef</td>
                  <td className="py-3 px-4">Shadow</td>
                  <td className="py-3 px-4">
                    <span className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded text-xs font-medium">Scheduled</span>
                  </td>
                </tr>
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
              <h3 className="font-title-md text-title-md mb-2">Trainer Availability</h3>
              <p className="font-body-md text-body-md text-inverse-primary mb-6">
                Update schedules for the upcoming busy season.
              </p>
              <button className="bg-white text-primary font-label-sm text-label-sm px-4 py-2 rounded-lg hover:bg-surface-container-low transition-colors shadow-sm flex items-center gap-2 w-max">
                Manage Trainers
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Weather / Environment Card */}
          <div className="bg-surface rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 p-6 flex items-center justify-between">
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Current Conditions</p>
              <div className="flex items-end gap-2">
                <span className="font-display-lg text-display-lg text-primary">28°C</span>
                <span className="font-body-md text-body-md text-on-surface-variant mb-2">Riyadh</span>
              </div>
              <p className="font-label-xs text-label-xs text-[#3f6653]">Perfect riding weather</p>
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
