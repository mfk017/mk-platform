'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Loader2, Package, Tag, Layers, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    price: '',
    original_price: '',
    duration_minutes: '60',
    category: 'package',
    session_count: '10',
    description_en: '',
    description_ar: '',
    target_service_id: '',
  });

  const [baseServices, setBaseServices] = useState<any[]>([]);

  const fetchPackagesAndServices = async () => {
    try {
      const [pkgRes, srvRes] = await Promise.all([
        fetch('/api/dashboard/services?category=package'),
        fetch('/api/dashboard/services')
      ]);
      
      if (pkgRes.ok) {
        const data = await pkgRes.json();
        setPackages(data.services || []);
      }
      
      if (srvRes.ok) {
        const data = await srvRes.json();
        // Filter out packages to get only base services (training, livery, etc)
        setBaseServices((data.services || []).filter((s: any) => s.category !== 'package'));
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackagesAndServices();
  }, []);

  const openCreateModal = () => {
    setEditingPackageId(null);
    setFormData({
      name_en: '',
      name_ar: '',
      price: '',
      original_price: '',
      duration_minutes: '60',
      category: 'package',
      session_count: '10',
      description_en: '',
      description_ar: '',
      target_service_id: baseServices.length > 0 ? baseServices[0].id : '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: any) => {
    setEditingPackageId(pkg.id);
    setFormData({
      name_en: pkg.name_en,
      name_ar: pkg.name_ar,
      price: pkg.price.toString(),
      original_price: pkg.original_price ? pkg.original_price.toString() : '',
      duration_minutes: pkg.duration_minutes.toString(),
      category: 'package',
      session_count: pkg.session_count ? pkg.session_count.toString() : '10',
      description_en: pkg.description_en || '',
      description_ar: pkg.description_ar || '',
      target_service_id: pkg.target_service_id || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      const res = await fetch(`/api/dashboard/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPackagesAndServices();
      } else {
        alert('Failed to delete package');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingPackageId 
        ? `/api/dashboard/services/${editingPackageId}` 
        : '/api/dashboard/services';
      
      const payload = {
        ...formData,
        category: 'package',
        session_count: parseInt(formData.session_count),
      };
        
      const res = await fetch(url, {
        method: editingPackageId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchPackagesAndServices();
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
          <h2 className="font-display-lg text-title-md text-on-surface m-0 p-0">Service Packages</h2>
          <p className="font-ibm-plex-sans text-label-sm text-on-surface-variant hidden sm:block">
            Bundle multiple sessions together and offer discounts to your riders.
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F4F1DE]">
        <div className="max-w-7xl mx-auto space-y-6 pb-24 md:pb-0">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-secondary/10 shadow-sm">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
              <input 
                className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-ibm-plex-sans text-body-md transition-shadow" 
                placeholder="Search packages..." 
                type="text" 
              />
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button onClick={openCreateModal} className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                <span>Create Package</span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-on-surface-variant">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <span className="block mt-4 font-label-sm">Loading packages...</span>
            </div>
          ) : packages.length === 0 ? (
            <div className="p-12 bg-surface-container-lowest rounded-xl border border-secondary/10 text-center text-on-surface-variant font-label-sm shadow-sm">
              No packages found. Create a bundle to offer your riders.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map(pkg => {
                const discount = pkg.original_price && pkg.original_price > pkg.price 
                  ? Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100) 
                  : 0;

                return (
                  <div key={pkg.id} className="bg-surface-container-lowest rounded-xl border border-secondary/10 shadow-sm overflow-hidden flex flex-col group relative">
                    {discount > 0 && (
                      <div className="absolute top-4 right-4 bg-error-container text-on-error-container text-[10px] font-bold px-2 py-1 rounded-full shadow-sm z-10">
                        {discount}% OFF
                      </div>
                    )}
                    
                    <div className="h-2 bg-tertiary"></div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center">
                          <Package className="w-6 h-6" />
                        </div>
                        <div className="flex space-x-2 z-10">
                          <button onClick={() => openEditModal(pkg)} className="p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-primary rounded-md transition-colors opacity-0 group-hover:opacity-100">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(pkg.id)} className="p-1.5 text-on-surface-variant hover:bg-error-container hover:text-error rounded-md transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <h3 className="font-title-md text-on-surface">{pkg.name_en}</h3>
                      <p className="text-label-sm text-on-surface-variant mb-2">{pkg.name_ar}</p>
                      
                      {pkg.target_service && (
                        <div className="mb-4 inline-flex items-center px-2 py-1 bg-surface-container rounded-md border border-outline-variant/30 text-xs text-on-surface-variant">
                          <Tag className="w-3 h-3 mr-1" /> Valid for: {pkg.target_service.name_en}
                        </div>
                      )}
                      
                      <div className="flex items-end gap-2 mb-4">
                        <span className="font-display-lg text-title-lg font-bold text-primary">SAR {pkg.price}</span>
                        {pkg.original_price && (
                          <span className="text-on-surface-variant text-sm line-through mb-1">SAR {pkg.original_price}</span>
                        )}
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-outline-variant/30 flex justify-between items-center text-label-xs text-on-surface-variant">
                        <span className="flex items-center text-tertiary font-bold"><Layers className="w-3 h-3 mr-1" /> {pkg.session_count} Sessions</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {pkg.duration_minutes}m/ea</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-surface rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden z-10">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center">
              <div>
                <h3 className="font-display-lg text-title-md text-on-surface">{editingPackageId ? 'Edit Package' : 'Create Package'}</h3>
              </div>
              <button 
                className="text-on-surface-variant hover:bg-surface-container-high p-1 rounded-full transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="packageForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-label-sm">Package Name (EN) *</label>
                    <input required value={formData.name_en} onChange={e => setFormData({...formData, name_en: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm" dir="rtl">الاسم (AR) *</label>
                    <input required value={formData.name_ar} onChange={e => setFormData({...formData, name_ar: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none text-right" dir="rtl" type="text" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-label-sm text-primary font-bold">Package Price (SAR) *</label>
                    <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" step="0.01" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm text-on-surface-variant">Original Price (SAR) - for strike-through</label>
                    <input value={formData.original_price} onChange={e => setFormData({...formData, original_price: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" step="0.01" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-label-sm font-bold text-secondary">Target Service *</label>
                  <p className="text-[10px] text-on-surface-variant mb-1">Select the service that this package will be valid for.</p>
                  <select 
                    required 
                    value={formData.target_service_id} 
                    onChange={e => setFormData({...formData, target_service_id: e.target.value})} 
                    className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none"
                  >
                    <option value="" disabled>Select a service...</option>
                    {baseServices.map(s => (
                      <option key={s.id} value={s.id}>{s.name_en} (SAR {s.price})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-label-sm">Total Sessions *</label>
                    <input required value={formData.session_count} onChange={e => setFormData({...formData, session_count: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" min="2" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm">Duration per Session (Minutes) *</label>
                    <input required value={formData.duration_minutes} onChange={e => setFormData({...formData, duration_minutes: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-label-sm">Description (EN)</label>
                  <textarea value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" rows={2}></textarea>
                </div>
                <div className="space-y-1">
                  <label className="block text-label-sm" dir="rtl">الوصف (AR)</label>
                  <textarea value={formData.description_ar} onChange={e => setFormData({...formData, description_ar: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none text-right" dir="rtl" rows={2}></textarea>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant/30 flex justify-end space-x-3">
              <button 
                type="button"
                className="px-4 py-2 font-label-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="packageForm"
                className="px-6 py-2 bg-primary text-on-primary font-label-sm rounded-lg hover:bg-primary/90 shadow-sm"
              >
                {editingPackageId ? 'Save Changes' : 'Create Package'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
