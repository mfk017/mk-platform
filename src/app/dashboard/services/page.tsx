'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, MoreHorizontal, CheckCircle2, TrendingUp, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ServicesManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface h-screen overflow-hidden">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-6 lg:px-8 border-b border-outline-variant/30 bg-surface-container-lowest shrink-0">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="font-display-lg text-title-md text-on-surface m-0 p-0">Service Management</h2>
            <p className="font-ibm-plex-sans text-label-sm text-on-surface-variant hidden sm:block">
              Manage your catalog of equestrian services, pricing, and availability.
            </p>
          </div>
        </div>
      </header>

      {/* Content Canvas */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6 pb-24 md:pb-0">
          
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-secondary/10 shadow-sm">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
              <input 
                className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-ibm-plex-sans text-body-md transition-shadow" 
                placeholder="Search services..." 
                type="text" 
              />
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-secondary text-secondary rounded-lg font-label-sm hover:bg-secondary/10 transition-colors w-full sm:w-auto bg-surface-container-lowest">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create Service</span>
              </button>
            </div>
          </div>

          {/* Stats Overview Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-secondary/10 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed/20 rounded-full blur-2xl"></div>
              <span className="text-on-surface-variant font-label-sm mb-1">Active Services</span>
              <span className="font-display-lg text-headline-lg text-on-surface">24</span>
              <div className="flex items-center mt-2 text-primary text-label-xs">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+3 this month</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-xl border border-secondary/10 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-container/20 rounded-full blur-2xl"></div>
              <span className="text-on-surface-variant font-label-sm mb-1">Total Bookings (30d)</span>
              <span className="font-display-lg text-headline-lg text-on-surface">342</span>
              <div className="flex items-center mt-2 text-primary text-label-xs">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12% vs last month</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-xl border border-secondary/10 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-error-container/20 rounded-full blur-2xl"></div>
              <span className="text-on-surface-variant font-label-sm mb-1">Services near capacity</span>
              <span className="font-display-lg text-headline-lg text-on-surface">2</span>
              <div className="flex items-center mt-2 text-on-surface-variant text-label-xs">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>Review scheduling</span>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-surface-container-lowest rounded-xl border border-secondary/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-tertiary-fixed/30 border-b border-outline-variant/30">
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant w-1/3">Service Name</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant">Category</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant text-right">Price (SAR)</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant text-center">Capacity</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant">Status</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-ibm-plex-sans text-body-md text-on-surface">
                  
                  {/* Row 1 */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-10 bg-primary rounded-full"></div>
                        <div>
                          <p className="font-semibold text-on-surface">Premium Livery</p>
                          <p className="text-label-xs text-on-surface-variant">Full board care & grooming</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">Boarding</td>
                    <td className="px-6 py-4 text-right font-mono">4,500 <span className="text-on-surface-variant text-label-xs">/mo</span></td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center">
                        <span className="text-sm">45 / 50</span>
                        <div className="w-full bg-surface-variant h-1.5 rounded-full mt-1 overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed-variant">Active</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors p-1">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-on-surface-variant hover:text-error transition-colors p-1 ml-2">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-10 bg-secondary rounded-full"></div>
                        <div>
                          <p className="font-semibold text-on-surface">Show Jumping Lesson</p>
                          <p className="text-label-xs text-on-surface-variant">Advanced group session (60m)</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">Training</td>
                    <td className="px-6 py-4 text-right font-mono">350 <span className="text-on-surface-variant text-label-xs">/hr</span></td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center">
                        <span className="text-sm">4 / 6</span>
                        <div className="w-full bg-surface-variant h-1.5 rounded-full mt-1 overflow-hidden">
                          <div className="bg-secondary h-full rounded-full" style={{ width: '66%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed-variant">Active</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors p-1">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-on-surface-variant hover:text-error transition-colors p-1 ml-2">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-10 bg-tertiary-container rounded-full"></div>
                        <div>
                          <p className="font-semibold text-on-surface">Desert Trail Ride</p>
                          <p className="text-label-xs text-on-surface-variant">Guided tour (120m)</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">Experience</td>
                    <td className="px-6 py-4 text-right font-mono">500 <span className="text-on-surface-variant text-label-xs">/ride</span></td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center">
                        <span className="text-sm">8 / 8</span>
                        <div className="w-full bg-surface-variant h-1.5 rounded-full mt-1 overflow-hidden">
                          <div className="bg-error h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-container text-on-error-container">Full</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors p-1">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-on-surface-variant hover:text-error transition-colors p-1 ml-2">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface flex items-center justify-between">
              <span className="font-label-sm text-on-surface-variant">Showing 1 to 3 of 24 services</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-outline-variant rounded-md text-sm text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50" disabled>Prev</button>
                <button className="px-3 py-1 border border-outline-variant rounded-md text-sm text-on-surface-variant hover:bg-surface-container-low">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all border border-secondary/10 z-10">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface">
              <div>
                <h3 className="font-display-lg text-title-md text-on-surface">Create New Service</h3>
                <p className="font-ibm-plex-sans text-label-xs text-on-surface-variant">Add details for the new offering.</p>
              </div>
              <button 
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container-high transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto font-ibm-plex-sans flex-1">
              <form className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-on-surface text-sm uppercase tracking-wider text-on-surface-variant">Basic Details</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-label-sm text-on-surface">Service Name (EN) *</label>
                      <input className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow" placeholder="e.g. Show Jumping" type="text" />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-label-sm text-on-surface" dir="rtl">اسم الخدمة (AR) *</label>
                      <input className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow text-right" dir="rtl" placeholder="مثال: قفز الحواجز" type="text" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-label-sm text-on-surface">Category</label>
                    <select className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow appearance-none">
                      <option>Select a category</option>
                      <option>Boarding / Livery</option>
                      <option>Training & Lessons</option>
                      <option>Experiences & Tours</option>
                      <option>Medical & Farrier</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-label-sm text-on-surface">Description (EN)</label>
                    <textarea className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow" rows={3}></textarea>
                  </div>
                </div>

                <hr className="border-outline-variant/30" />

                {/* Pricing & Capacity */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-on-surface text-sm uppercase tracking-wider text-on-surface-variant">Pricing & Capacity</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-label-sm text-on-surface">Price (SAR) *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-mono">SAR</span>
                        <input className="w-full pl-12 pr-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow font-mono" placeholder="0.00" type="number" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-label-sm text-on-surface">Billing Cycle</label>
                      <select className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow appearance-none">
                        <option>Per Session</option>
                        <option>Per Hour</option>
                        <option>Monthly</option>
                        <option>Annual</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-label-sm text-on-surface">Max Capacity</label>
                      <input className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow font-mono" placeholder="e.g. 10" type="number" />
                    </div>
                    
                    <div className="space-y-1 flex items-center mt-6">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <div className="relative">
                          <input defaultChecked className="sr-only peer" type="checkbox" />
                          <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </div>
                        <span className="text-label-sm text-on-surface">Service is Active</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface flex justify-end space-x-3 shrink-0">
              <button 
                className="px-4 py-2 font-label-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-6 py-2 bg-primary text-on-primary font-label-sm rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                onClick={() => setIsModalOpen(false)}
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
