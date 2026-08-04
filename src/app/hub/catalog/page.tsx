'use client';

import React from 'react';
import Link from 'next/link';
import { Filter, Clock as Schedule, Users as People, Map, ArrowRight as ArrowForward, CheckCircle2 } from 'lucide-react';

export default function CatalogPage() {
  return (
    <div className="max-w-container-max mx-auto space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant pb-6">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-2">Service Catalog</h2>
          <p className="font-body-lg text-on-surface-variant">Discover premium equestrian experiences tailored to every skill level.</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select className="bg-surface-container-lowest border border-outline-variant text-on-surface font-label-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none shadow-sm">
            <option>All Skill Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <select className="bg-surface-container-lowest border border-outline-variant text-on-surface font-label-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none shadow-sm">
            <option>Any Duration</option>
            <option>30 Mins</option>
            <option>45 Mins</option>
            <option>60+ Mins</option>
          </select>
          <button disabled className="flex items-center gap-2 bg-surface-container-low border border-outline-variant text-on-surface font-label-sm rounded-lg px-4 py-2 opacity-50 cursor-not-allowed" title="Coming soon">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            More Filters
          </button>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
        
        {/* Featured Service */}
        <article className="col-span-1 md:col-span-8 bg-surface-container-lowest rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 overflow-hidden flex flex-col md:flex-row hover:-translate-y-1 transition-transform duration-300">
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80')" }}
            ></div>
            <div className="absolute top-4 left-4 bg-tertiary-container/90 backdrop-blur text-on-tertiary-container font-label-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Featured
            </div>
          </div>
          <div className="p-8 flex flex-col justify-between w-full md:w-1/2 border-l-4 border-primary">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-title-md text-primary">Private Dressage Lesson<br/><span className="text-on-surface-variant text-sm font-normal">درس ترويض خاص</span></h3>
                <span className="bg-primary-fixed text-on-primary-fixed font-label-sm px-2 py-1 rounded">Advanced</span>
              </div>
              <p className="font-body-md text-on-surface-variant mb-6 line-clamp-3">
                One-on-one intensive training focusing on advanced collection, lateral movements, and rider precision with our senior instructors.
              </p>
              <div className="flex gap-4 mb-6 text-on-surface-variant font-label-sm">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 45 mins</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">person</span> 1-on-1</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
              <span className="font-title-md text-on-background">450 SAR</span>
              <Link href="/hub/book/dressage" className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-sm hover:bg-primary-container transition-colors shadow-sm">
                Book Now
              </Link>
            </div>
          </div>
        </article>

        {/* Standard Service 1 */}
        <article className="col-span-1 md:col-span-4 bg-surface-container-lowest rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <div className="h-48 relative">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=600&q=80')" }}
            ></div>
          </div>
          <div className="p-6 flex flex-col flex-grow justify-between border-l-4 border-secondary">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-title-md text-primary leading-tight">Group Foundations<br/><span className="text-on-surface-variant text-sm font-normal">أساسيات المجموعة</span></h3>
                <span className="bg-surface-variant text-on-surface-variant font-label-sm px-2 py-1 rounded">Beginner</span>
              </div>
              <p className="font-body-md text-on-surface-variant mb-4 text-sm">
                Perfect for new riders to learn basic control, balance, and horse care in a supportive group setting.
              </p>
              <div className="flex gap-4 mb-4 text-on-surface-variant font-label-sm">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 60 mins</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">group</span> Max 4</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30 mt-auto">
              <span className="font-title-md text-on-background">200 SAR</span>
              <Link href="/hub/book/group" className="border border-secondary text-secondary px-4 py-2 rounded-lg font-label-sm hover:bg-secondary/10 transition-colors">
                Book
              </Link>
            </div>
          </div>
        </article>

        {/* Standard Service 2 */}
        <article className="col-span-1 md:col-span-4 bg-surface-container-lowest rounded-xl shadow-xl shadow-primary/5 border border-secondary/10 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <div className="h-48 relative">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80')" }}
            ></div>
          </div>
          <div className="p-6 flex flex-col flex-grow justify-between border-l-4 border-surface-tint">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-title-md text-primary leading-tight">Oasis Trail Ride<br/><span className="text-on-surface-variant text-sm font-normal">ركوب درب الواحة</span></h3>
                <span className="bg-surface-variant text-on-surface-variant font-label-sm px-2 py-1 rounded">All Levels</span>
              </div>
              <p className="font-body-md text-on-surface-variant mb-4 text-sm">
                A guided, relaxing ride through our private scenic trails, suitable for all experience levels.
              </p>
              <div className="flex gap-4 mb-4 text-on-surface-variant font-label-sm">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 90 mins</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">nature</span> Outdoor</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30 mt-auto">
              <span className="font-title-md text-on-background">350 SAR</span>
              <Link href="/hub/book/trail" className="border border-secondary text-secondary px-4 py-2 rounded-lg font-label-sm hover:bg-secondary/10 transition-colors">
                Book
              </Link>
            </div>
          </div>
        </article>

        {/* Premium Package Card */}
        <article className="col-span-1 md:col-span-8 bg-tertiary-fixed rounded-xl shadow-xl shadow-primary/5 border border-tertiary-fixed-dim overflow-hidden flex flex-col md:flex-row items-center relative hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#805533 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
          <div className="p-8 w-full md:w-3/5 z-10 flex flex-col justify-center h-full">
            <div className="inline-block bg-on-tertiary-fixed text-tertiary-fixed font-label-xs px-3 py-1 rounded-full uppercase tracking-wider w-max mb-4">
              Livery Package
            </div>
            <h3 className="font-headline-lg-mobile md:font-headline-lg text-on-tertiary-fixed mb-2 leading-tight">
              Full Board & Training<br/>
              <span className="font-title-md opacity-80">إقامة كاملة وتدريب</span>
            </h3>
            <p className="font-body-md text-on-tertiary-fixed-variant mb-6">
              Comprehensive care for your horse including premium feed, daily turnout, grooming, and a customized weekly training schedule.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-on-tertiary-fixed-variant font-label-sm">
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">check_circle</span> Premium Feed</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">check_circle</span> 5x Training/Wk</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">check_circle</span> Tack Service</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-title-md text-on-tertiary-fixed">5,500 SAR</span>
                <span className="text-sm text-on-tertiary-fixed-variant"> / month</span>
              </div>
              <button disabled className="bg-on-tertiary-fixed text-tertiary-fixed px-6 py-2 rounded-lg font-label-sm opacity-50 cursor-not-allowed shadow-md" title="Coming soon">
                Inquire Now
              </button>
            </div>
          </div>
          <div className="hidden md:block w-2/5 h-full relative z-10 p-4">
            <div 
              className="w-full h-full object-cover rounded-lg shadow-md border border-outline/20 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=600&q=80')" }}
            ></div>
          </div>
        </article>

      </div>
    </div>
  );
}
