'use client';

import React from 'react';

export default function HorsesPage() {
  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary">Stable Directory</h1>
          <p className="font-body-md text-on-surface-variant mt-1">Manage and track your equine assets.</p>
        </div>
        <button className="bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary px-6 py-3 rounded-lg font-label-sm flex items-center gap-2 transition-all shadow-xl shadow-primary/5 active:scale-95">
          <span className="material-symbols-outlined text-[20px]">add</span> Add Horse
        </button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter mt-4">
        {/* Card 1 */}
        <div className="bg-surface rounded-xl border border-secondary/10 shadow-xl shadow-primary/5 hover:-translate-y-1 transition-transform duration-300 overflow-hidden flex flex-col">
          <div className="h-48 relative">
            <img
              className="w-full h-full object-cover"
              alt="Arabian Stallion"
              src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=600&q=80"
            />
            <div className="absolute top-3 left-3 bg-primary-container/90 backdrop-blur-sm text-on-primary-container px-3 py-1 rounded-full font-label-xs border border-primary/10">
              In Training
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start border-b border-outline-variant/30 pb-4">
              <div className="flex flex-col gap-1">
                <span className="font-title-md text-primary">Al-Sadiq</span>
                <span className="font-label-sm text-on-surface-variant font-arabic" dir="rtl">الصادق</span>
              </div>
              <span className="bg-surface-container-high text-on-surface-variant px-2 py-1 rounded font-label-xs">M</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-label-xs text-outline block mb-1">Breed</span>
                <span className="font-body-md text-on-surface">Arabian</span>
              </div>
              <div>
                <span className="font-label-xs text-outline block mb-1">Age</span>
                <span className="font-body-md text-on-surface">5 Years</span>
              </div>
              <div>
                <span className="font-label-xs text-outline block mb-1">Barn</span>
                <span className="font-body-md text-on-surface">North Wing</span>
              </div>
              <div>
                <span className="font-label-xs text-outline block mb-1">Next Check</span>
                <span className="font-body-md text-primary font-medium">Oct 12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface rounded-xl border border-secondary/10 shadow-xl shadow-primary/5 hover:-translate-y-1 transition-transform duration-300 overflow-hidden flex flex-col">
          <div className="h-48 relative">
            <img
              className="w-full h-full object-cover"
              alt="Andalusian Mare"
              src="https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=600&q=80"
            />
            <div className="absolute top-3 left-3 bg-secondary-fixed-dim/90 backdrop-blur-sm text-on-secondary-fixed-variant px-3 py-1 rounded-full font-label-xs border border-secondary/10">
              Resting
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start border-b border-outline-variant/30 pb-4">
              <div className="flex flex-col gap-1">
                <span className="font-title-md text-primary">Najma</span>
                <span className="font-label-sm text-on-surface-variant font-arabic" dir="rtl">نجمة</span>
              </div>
              <span className="bg-surface-container-high text-on-surface-variant px-2 py-1 rounded font-label-xs">F</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-label-xs text-outline block mb-1">Breed</span>
                <span className="font-body-md text-on-surface">Andalusian</span>
              </div>
              <div>
                <span className="font-label-xs text-outline block mb-1">Age</span>
                <span className="font-body-md text-on-surface">7 Years</span>
              </div>
              <div>
                <span className="font-label-xs text-outline block mb-1">Barn</span>
                <span className="font-body-md text-on-surface">Main Pavilion</span>
              </div>
              <div>
                <span className="font-label-xs text-outline block mb-1">Next Check</span>
                <span className="font-body-md text-on-surface">Oct 20</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface rounded-xl border border-secondary/10 shadow-xl shadow-primary/5 hover:-translate-y-1 transition-transform duration-300 overflow-hidden flex flex-col">
          <div className="h-48 relative">
            <img
              className="w-full h-full object-cover"
              alt="Thoroughbred"
              src="https://images.unsplash.com/photo-1553531589-914101e18fb0?auto=format&fit=crop&w=600&q=80"
            />
            <div className="absolute top-3 left-3 bg-primary-container/90 backdrop-blur-sm text-on-primary-container px-3 py-1 rounded-full font-label-xs border border-primary/10">
              In Training
            </div>
            <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm text-error px-2 py-1 rounded-full font-label-xs flex items-center gap-1 border border-error/20">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              Vet Note
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start border-b border-outline-variant/30 pb-4">
              <div className="flex flex-col gap-1">
                <span className="font-title-md text-primary">Ghazal</span>
                <span className="font-label-sm text-on-surface-variant font-arabic" dir="rtl">غزال</span>
              </div>
              <span className="bg-surface-container-high text-on-surface-variant px-2 py-1 rounded font-label-xs">M</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-label-xs text-outline block mb-1">Breed</span>
                <span className="font-body-md text-on-surface">Thoroughbred</span>
              </div>
              <div>
                <span className="font-label-xs text-outline block mb-1">Age</span>
                <span className="font-body-md text-on-surface">3 Years</span>
              </div>
              <div>
                <span className="font-label-xs text-outline block mb-1">Barn</span>
                <span className="font-body-md text-on-surface">South Wing</span>
              </div>
              <div>
                <span className="font-label-xs text-outline block mb-1">Next Check</span>
                <span className="font-body-md text-error font-medium">Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 (Add New - Visual Placeholder) */}
        <div className="bg-surface-container-low rounded-xl border-2 border-dashed border-outline-variant/50 hover:border-primary/50 transition-colors duration-300 flex flex-col items-center justify-center p-6 min-h-[350px] cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-surface shadow-xl shadow-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-3xl">add</span>
          </div>
          <span className="font-title-md text-primary">Register New Horse</span>
          <span className="font-body-md text-on-surface-variant text-center mt-2 max-w-[200px]">
            Add details, upload records, and assign stalls.
          </span>
        </div>
      </div>
    </>
  );
}
