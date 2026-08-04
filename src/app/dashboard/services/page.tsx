'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, AlertCircle, Edit, Trash2, Loader2, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ServicesManagementPage() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    price: '',
    duration_minutes: '60',
    category: 'training',
    description_en: '',
    description_ar: '',
  });

  const router = useRouter();

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/dashboard/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingServiceId(null);
    setFormData({
      name_en: '',
      name_ar: '',
      price: '',
      duration_minutes: '60',
      category: 'training',
      description_en: '',
      description_ar: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: any) => {
    setEditingServiceId(service.id);
    setFormData({
      name_en: service.name_en,
      name_ar: service.name_ar,
      price: service.price.toString(),
      duration_minutes: service.duration_minutes.toString(),
      category: service.category,
      description_en: service.description_en || '',
      description_ar: service.description_ar || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/dashboard/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchServices();
      } else {
        alert('Failed to delete service');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingServiceId 
        ? `/api/dashboard/services/${editingServiceId}` 
        : '/api/dashboard/services';
      
      const res = await fetch(url, {
        method: editingServiceId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchServices();
      } else {
        const err = await res.json();
        alert(err.error || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface h-screen overflow-hidden">
      <header className="h-20 flex items-center justify-between px-6 lg:px-8 border-b border-outline-variant/30 bg-surface-container-lowest shrink-0">
        <div>
          <h2 className="font-display-lg text-title-md text-on-surface m-0 p-0">Service Management</h2>
          <p className="font-ibm-plex-sans text-label-sm text-on-surface-variant hidden sm:block">
            Manage your catalog of equestrian services, pricing, and availability.
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6 pb-24 md:pb-0">
          
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
                onClick={openCreateModal}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create Service</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-secondary/10 shadow-sm flex flex-col relative overflow-hidden">
              <span className="text-on-surface-variant font-label-sm mb-1">Active Services</span>
              <span className="font-display-lg text-headline-lg text-on-surface">{services.length}</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-secondary/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-tertiary-fixed/30 border-b border-outline-variant/30">
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant w-1/3">Service Name</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant">Category</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant text-right">Price (SAR)</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant text-center">Duration</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-ibm-plex-sans text-body-md text-on-surface">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        <span className="block mt-2 font-label-sm">Loading...</span>
                      </td>
                    </tr>
                  ) : services.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant font-label-sm">
                        No services found. Create one to get started.
                      </td>
                    </tr>
                  ) : (
                    services.map(service => (
                      <tr key={service.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-10 rounded-full ${service.category === 'training' ? 'bg-secondary' : service.category === 'livery' ? 'bg-primary' : 'bg-tertiary-container'}`}></div>
                            <div>
                              <p className="font-semibold text-on-surface">{service.name_en}</p>
                              <p className="text-label-xs text-on-surface-variant">{service.name_ar}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant text-sm capitalize">{service.category}</td>
                        <td className="px-6 py-4 text-right font-mono">{service.price}</td>
                        <td className="px-6 py-4 text-center text-sm">{service.duration_minutes}m</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => openEditModal(service)} className="text-on-surface-variant hover:text-primary transition-colors p-1">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDelete(service.id)} className="text-on-surface-variant hover:text-error transition-colors p-1 ml-2">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all border border-secondary/10 z-10">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface">
              <div>
                <h3 className="font-display-lg text-title-md text-on-surface">{editingServiceId ? 'Edit Service' : 'Create New Service'}</h3>
                <p className="font-ibm-plex-sans text-label-xs text-on-surface-variant">{editingServiceId ? 'Update service details.' : 'Add details for the new offering.'}</p>
              </div>
              <button 
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container-high transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto font-ibm-plex-sans flex-1">
              <form id="serviceForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-label-sm text-on-surface">Service Name (EN) *</label>
                    <input required value={formData.name_en} onChange={e => setFormData({...formData, name_en: e.target.value})} className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm text-on-surface" dir="rtl">اسم الخدمة (AR) *</label>
                    <input required value={formData.name_ar} onChange={e => setFormData({...formData, name_ar: e.target.value})} className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow text-right" dir="rtl" type="text" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-label-sm text-on-surface">Category *</label>
                  <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow">
                    <option value="training">Training & Lessons</option>
                    <option value="livery">Boarding / Livery</option>
                    <option value="experience">Experiences & Tours</option>
                    <option value="package">Package</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-label-sm text-on-surface">Price (SAR) *</label>
                    <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow" type="number" step="0.01" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm text-on-surface">Duration (Minutes) *</label>
                    <input required value={formData.duration_minutes} onChange={e => setFormData({...formData, duration_minutes: e.target.value})} className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow" type="number" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-label-sm text-on-surface">Description (EN)</label>
                  <textarea value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow" rows={2}></textarea>
                </div>
                <div className="space-y-1">
                  <label className="block text-label-sm text-on-surface" dir="rtl">الوصف (AR)</label>
                  <textarea value={formData.description_ar} onChange={e => setFormData({...formData, description_ar: e.target.value})} className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow text-right" dir="rtl" rows={2}></textarea>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface flex justify-end space-x-3 shrink-0">
              <button 
                type="button"
                className="px-4 py-2 font-label-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="serviceForm"
                className="px-6 py-2 bg-primary text-on-primary font-label-sm rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                {editingServiceId ? 'Save Changes' : 'Create Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
