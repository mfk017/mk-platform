'use client';

import React from 'react';

export default function TrainersPage() {
  return (
    <>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-2">Trainer Directory</h1>
          <p className="text-on-surface-variant font-body-md">Manage coaching staff, specialties, and schedules.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 bg-primary-container text-on-primary-container font-label-sm px-5 py-2.5 rounded-lg hover:bg-surface-tint hover:text-on-primary transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">add</span> Add Trainer
        </button>
      </div>

      {/* Bento Grid Layout for Trainers */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
        {/* Trainer Card 1 */}
        <div className="bg-surface rounded-xl border border-secondary/10 shadow-xl shadow-primary/5 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <div className="h-32 bg-primary/10 relative">
            <img
              className="w-24 h-24 rounded-full border-4 border-surface absolute -bottom-12 left-6 object-cover shadow-sm"
              alt="Trainer portrait"
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
            />
            <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-label-xs font-bold border border-primary/20">
              Senior Coach
            </div>
          </div>
          <div className="pt-16 p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-title-md text-primary">Tariq Al-Rashid</h3>
                <p className="text-on-surface-variant font-label-sm">طريق الراشد</p>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-secondary-container text-on-secondary-container font-label-xs px-2.5 py-1 rounded-md">Show Jumping</span>
              <span className="bg-primary-fixed text-on-primary-fixed font-label-xs px-2.5 py-1 rounded-md">Advanced</span>
            </div>
            <p className="text-on-surface-variant font-body-md text-sm mb-6 flex-1">
              Former national champion with 15+ years experience. Specializes in refining technique for competitive show jumping and mental preparation for high-stakes events.
            </p>
            <div className="border-t border-outline-variant pt-4 mt-auto">
              <h4 className="font-label-sm text-primary mb-3">Today's Schedule</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-surface-container-low p-2 rounded border-l-4 border-primary">
                  <span className="font-label-sm text-on-surface">09:00 - 10:30</span>
                  <span className="font-label-xs text-on-surface-variant">Group A (Advanced)</span>
                </div>
                <div className="flex justify-between items-center bg-surface-container-low p-2 rounded border-l-4 border-secondary">
                  <span className="font-label-sm text-on-surface">11:00 - 12:00</span>
                  <span className="font-label-xs text-on-surface-variant">Private (S. Al-Faisal)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trainer Card 2 */}
        <div className="bg-surface rounded-xl border border-secondary/10 shadow-xl shadow-primary/5 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <div className="h-32 bg-secondary/10 relative">
            <img
              className="w-24 h-24 rounded-full border-4 border-surface absolute -bottom-12 left-6 object-cover shadow-sm"
              alt="Trainer portrait"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
            />
            <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-sm px-3 py-1 rounded-full text-secondary font-label-xs font-bold border border-secondary/20">
              Instructor
            </div>
          </div>
          <div className="pt-16 p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-title-md text-primary">Noura Al-Saud</h3>
                <p className="text-on-surface-variant font-label-sm">نورة السعود</p>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-xs px-2.5 py-1 rounded-md">Beginners</span>
              <span className="bg-surface-variant text-on-surface-variant font-label-xs px-2.5 py-1 rounded-md">Dressage Basics</span>
            </div>
            <p className="text-on-surface-variant font-body-md text-sm mb-6 flex-1">
              Passionate about introducing new riders to the sport. Focuses on foundational skills, safety protocols, and building confidence in young and novice equestrians.
            </p>
            <div className="border-t border-outline-variant pt-4 mt-auto">
              <h4 className="font-label-sm text-primary mb-3">Today's Schedule</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-surface-container-low p-2 rounded border-l-4 border-tertiary">
                  <span className="font-label-sm text-on-surface">15:00 - 16:00</span>
                  <span className="font-label-xs text-on-surface-variant">Youth Intro Class</span>
                </div>
                <div className="flex justify-between items-center bg-surface-container-low p-2 rounded border-l-4 border-tertiary">
                  <span className="font-label-sm text-on-surface">16:30 - 17:30</span>
                  <span className="font-label-xs text-on-surface-variant">Adult Beginners</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Card Slot (Glassmorphism hint) */}
        <div className="bg-surface/50 rounded-xl border border-dashed border-outline-variant shadow-sm flex flex-col items-center justify-center p-8 hover:bg-surface transition-colors cursor-pointer group min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-[32px]">person_add</span>
          </div>
          <h3 className="font-title-md text-primary mb-1">Onboard Trainer</h3>
          <p className="text-on-surface-variant font-label-sm text-center">Add a new coach to the roster</p>
        </div>
      </div>
    </>
  );
}
