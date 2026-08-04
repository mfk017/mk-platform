'use client';

import React from 'react';
import { Edit, PlusSquare, HeartPulse, Search, Filter, MoreHorizontal, CheckCircle2, TrendingUp } from 'lucide-react';

export default function StableMapPage() {
  return (
    <div className="flex-1 lg:ml-0 w-full max-w-container-max mx-auto px-4 md:px-8 py-8 min-h-screen relative pb-24 lg:pb-8 bg-[#F4F1DE]">
      {/* Header */}
      <header className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline-lg text-primary tracking-tight">Stable Map & Livery</h2>
          <p className="font-body-md text-on-surface-variant mt-1">Manage boarding, stall assignments, and health notes.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface text-primary border border-secondary/20 hover:bg-secondary/10 px-6 py-2.5 rounded-lg font-label-sm transition-colors flex items-center gap-2">
            <HeartPulse className="w-4 h-4" /> Log Health Note
          </button>
          <button className="bg-primary text-on-primary hover:bg-primary/90 px-6 py-2.5 rounded-lg font-label-sm transition-colors flex items-center gap-2">
            <PlusSquare className="w-4 h-4" /> Assign Stall
          </button>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stall Occupancy */}
        <div className="bg-surface p-6 rounded-xl border border-secondary/10 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Stall Occupancy</p>
              <h3 className="font-headline-lg-mobile text-primary font-bold">85% <span className="text-label-sm font-normal text-outline">(34/40)</span></h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[20px]">door_front</span>
            </div>
          </div>
          <div className="w-full bg-surface-container h-2 mt-4 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* Upcoming Vet Visits */}
        <div className="bg-surface p-6 rounded-xl border border-secondary/10 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Upcoming Vet Visits</p>
              <h3 className="font-headline-lg-mobile text-primary font-bold">4 <span className="text-label-sm font-normal text-outline">this week</span></h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-error-container/50 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[20px]">vaccines</span>
            </div>
          </div>
          <ul className="mt-3 space-y-1 text-label-xs text-on-surface-variant">
            <li className="flex justify-between border-b border-surface-container pb-1"><span>Al-Sadiq (A1)</span> <span className="text-primary-container">Tomorrow</span></li>
            <li className="flex justify-between pt-1"><span>Desert Wind (B4)</span> <span>Thursday</span></li>
          </ul>
        </div>

        {/* Active Boarding Rev */}
        <div className="bg-surface p-6 rounded-xl border border-secondary/10 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Active Boarding Rev.</p>
              <h3 className="font-headline-lg-mobile text-primary font-mono text-2xl font-bold">SAR 142k</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary-container">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
          <p className="text-label-xs text-outline mt-4 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-primary" /> +5% from last month
          </p>
        </div>
      </div>

      {/* Stable Map & Roster Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visual Stable Map (7 columns) */}
        <div className="lg:col-span-7 bg-surface p-6 rounded-xl border border-secondary/10 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-title-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">view_cozy</span> Stable Layout
            </h3>
            <div className="flex gap-3 text-label-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-primary-fixed block border border-primary/20"></span> Occupied</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-surface-container block border border-outline/20"></span> Empty</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-error-container block border border-error/20"></span> Medical</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/30 flex-1 grid gap-6">
            {/* Barn A */}
            <div>
              <h4 className="font-label-sm text-outline mb-3 border-b border-outline-variant/30 pb-1">Barn A - Premium Livery</h4>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-primary-fixed/40 border border-primary-fixed-dim rounded-md p-3 cursor-pointer transition-transform hover:-translate-y-0.5">
                  <div className="text-label-xs text-on-primary-fixed-variant font-bold mb-1">A1</div>
                  <div className="font-label-sm text-on-primary-fixed truncate">Al-Sadiq</div>
                  <div className="text-[10px] text-primary mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Stable</div>
                </div>
                <div className="bg-primary-fixed/40 border border-primary-fixed-dim rounded-md p-3 cursor-pointer transition-transform hover:-translate-y-0.5">
                  <div className="text-label-xs text-on-primary-fixed-variant font-bold mb-1">A2</div>
                  <div className="font-label-sm text-on-primary-fixed truncate">Majestic</div>
                  <div className="text-[10px] text-primary mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Stable</div>
                </div>
                <div className="bg-surface-container border border-outline/20 rounded-md p-3 cursor-pointer hover:bg-surface-container-high transition-colors border-dashed">
                  <div className="text-label-xs text-outline font-bold mb-1">A3</div>
                  <div className="font-label-sm text-outline italic">Empty</div>
                </div>
                <div className="bg-error-container/30 border border-error/20 rounded-md p-3 cursor-pointer transition-transform hover:-translate-y-0.5">
                  <div className="text-label-xs text-on-error-container font-bold mb-1">A4</div>
                  <div className="font-label-sm text-on-error-container truncate">Desert Wind</div>
                  <div className="text-[10px] text-error mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">medical_services</span> Rest</div>
                </div>
              </div>
            </div>

            {/* Barn B */}
            <div>
              <h4 className="font-label-sm text-outline mb-3 border-b border-outline-variant/30 pb-1">Barn B - Standard</h4>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-primary-fixed/40 border border-primary-fixed-dim rounded-md p-3 cursor-pointer transition-transform hover:-translate-y-0.5">
                  <div className="text-label-xs text-on-primary-fixed-variant font-bold mb-1">B1</div>
                  <div className="font-label-sm text-on-primary-fixed truncate">Sahara</div>
                </div>
                <div className="bg-primary-fixed/40 border border-primary-fixed-dim rounded-md p-3 cursor-pointer transition-transform hover:-translate-y-0.5">
                  <div className="text-label-xs text-on-primary-fixed-variant font-bold mb-1">B2</div>
                  <div className="font-label-sm text-on-primary-fixed truncate">Oasis</div>
                </div>
                <div className="bg-primary-fixed/40 border border-primary-fixed-dim rounded-md p-3 cursor-pointer transition-transform hover:-translate-y-0.5">
                  <div className="text-label-xs text-on-primary-fixed-variant font-bold mb-1">B3</div>
                  <div className="font-label-sm text-on-primary-fixed truncate">Dune</div>
                </div>
                <div className="bg-primary-fixed/40 border border-primary-fixed-dim rounded-md p-3 cursor-pointer transition-transform hover:-translate-y-0.5">
                  <div className="text-label-xs text-on-primary-fixed-variant font-bold mb-1">B4</div>
                  <div className="font-label-sm text-on-primary-fixed truncate">Falcon</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Livery Roster Table (5 columns) */}
        <div className="lg:col-span-5 bg-surface p-6 rounded-xl border border-secondary/10 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-title-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">list_alt</span> Livery Roster
            </h3>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input 
                className="pl-8 pr-3 py-1.5 bg-surface-container rounded-md border border-outline/20 text-label-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none w-40 transition-all" 
                placeholder="Search horse..." 
                type="text" 
              />
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary-fixed/20 border-b border-outline-variant/30">
                  <th className="font-label-xs text-on-surface-variant p-3 font-semibold">Stall</th>
                  <th className="font-label-xs text-on-surface-variant p-3 font-semibold">Horse</th>
                  <th className="font-label-xs text-on-surface-variant p-3 font-semibold">Feed Req.</th>
                  <th className="font-label-xs text-on-surface-variant p-3 text-right font-semibold">Next Vet</th>
                </tr>
              </thead>
              <tbody className="text-body-sm divide-y divide-surface-container">
                <tr className="hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                  <td className="p-3 font-label-sm text-primary font-bold">A1</td>
                  <td className="p-3">
                    <div className="font-label-sm text-on-surface">Al-Sadiq</div>
                    <div className="text-[10px] text-outline">Premium Plan</div>
                  </td>
                  <td className="p-3 text-label-xs text-on-surface-variant">2x Grain, 1x Alfalfa</td>
                  <td className="p-3 text-right text-label-sm text-primary-container font-mono">12 Oct</td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                  <td className="p-3 font-label-sm text-primary font-bold">A2</td>
                  <td className="p-3">
                    <div className="font-label-sm text-on-surface">Majestic</div>
                    <div className="text-[10px] text-outline">Standard Plan</div>
                  </td>
                  <td className="p-3 text-label-xs text-on-surface-variant">1x Grain, 2x Hay</td>
                  <td className="p-3 text-right text-label-sm text-outline font-mono">25 Oct</td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors cursor-pointer group bg-error-container/10">
                  <td className="p-3 font-label-sm text-error font-bold">A4</td>
                  <td className="p-3">
                    <div className="font-label-sm text-on-surface flex items-center gap-1">
                      Desert Wind <span className="w-2 h-2 rounded-full bg-error inline-block"></span>
                    </div>
                    <div className="text-[10px] text-error">Medical Check</div>
                  </td>
                  <td className="p-3 text-label-xs text-on-surface-variant">Special Diet (Mash)</td>
                  <td className="p-3 text-right text-label-sm text-error font-mono font-bold">Today</td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                  <td className="p-3 font-label-sm text-primary font-bold">B1</td>
                  <td className="p-3">
                    <div className="font-label-sm text-on-surface">Sahara</div>
                    <div className="text-[10px] text-outline">Standard Plan</div>
                  </td>
                  <td className="p-3 text-label-xs text-on-surface-variant">2x Grain, 2x Hay</td>
                  <td className="p-3 text-right text-label-sm text-outline font-mono">05 Nov</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 pt-4 border-t border-outline-variant/30 text-center">
            <button className="text-primary font-label-sm hover:underline">View Full Roster (34 Horses)</button>
          </div>
        </div>

      </div>
    </div>
  );
}
