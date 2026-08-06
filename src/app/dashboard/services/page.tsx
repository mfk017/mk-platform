'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, AlertCircle, Edit, Trash2, Loader2, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ServicesManagementPage() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Form State
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    price: '',
    duration_minutes: '60',
    category: 'training',
    description_en: '',
    description_ar: '',
    image_url: '',
    livery_months: [] as string[],
    capacity: '1',
    skill_level: 'beginner',
    requires_instructor: true,
    allow_multiple_seats: false,
    allow_customer_cancellation: true,
    allow_rescheduling: true,
    cancellation_compensation: 'credit',
    is_active: true,
  });
  const [newMonth, setNewMonth] = useState('');

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
      image_url: '',
      livery_months: [],
      capacity: '1',
      skill_level: 'beginner',
      requires_instructor: true,
      allow_multiple_seats: false,
      allow_customer_cancellation: true,
      allow_rescheduling: true,
      cancellation_compensation: 'credit',
      is_active: true,
    });
    setNewMonth('');
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
      image_url: service.image_url || '',
      livery_months: Array.isArray(service.livery_months) ? service.livery_months : [],
      capacity: '1',
      skill_level: 'beginner',
      requires_instructor: true,
      allow_multiple_seats: false,
      allow_customer_cancellation: true,
      allow_rescheduling: true,
      cancellation_compensation: 'credit',
      is_active: service.is_active ?? true,
    });
    setNewMonth('');
    setIsModalOpen(true);
  };

  const addLiveryMonth = () => {
    if (newMonth && !formData.livery_months.includes(newMonth)) {
      setFormData({ ...formData, livery_months: [...formData.livery_months, newMonth].sort() });
      setNewMonth('');
    }
  };

  const removeLiveryMonth = (m: string) => {
    setFormData({ ...formData, livery_months: formData.livery_months.filter(x => x !== m) });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
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
    setIsSaving(true);
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
    } finally {
      setIsSaving(false);
    }
  };

  const filteredServices = services.filter(s => categoryFilter === 'all' ? true : s.category === categoryFilter);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface h-screen overflow-hidden">
      <header className="h-20 flex items-center justify-between px-6 lg:px-8 border-b border-outline-variant/30 bg-surface-container-lowest shrink-0">
        <div>
          <h2 className="font-display-lg text-title-md text-on-surface m-0 p-0">الخدمات | Services</h2>
          <p className="font-ibm-plex-sans text-label-sm text-on-surface-variant hidden sm:block">
            إدارة خدمات الركوب والإيواء | Manage your riding and livery services
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6 pb-24 md:pb-0">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-secondary/10 shadow-sm">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button onClick={() => setCategoryFilter('all')} className={`whitespace-nowrap px-4 py-2 rounded-lg font-label-sm transition-colors ${categoryFilter === 'all' ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}>الكل | All</button>
              <button onClick={() => setCategoryFilter('training')} className={`whitespace-nowrap px-4 py-2 rounded-lg font-label-sm transition-colors ${categoryFilter === 'training' ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}>تدريب | Training</button>
              <button onClick={() => setCategoryFilter('livery')} className={`whitespace-nowrap px-4 py-2 rounded-lg font-label-sm transition-colors ${categoryFilter === 'livery' ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}>إيواء | Livery</button>
            </div>
            
            <button 
              onClick={openCreateModal}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة خدمة | Add Service</span>
            </button>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-secondary/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-tertiary-fixed/30 border-b border-outline-variant/30">
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant w-1/3">الخدمة | Service Name</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant">الفئة | Category</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant text-right">السعر | Price (SAR)</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant text-center">المدة | Duration</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant text-right">إجراءات | Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-ibm-plex-sans text-body-md text-on-surface">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        <span className="block mt-4 font-label-sm">جاري تحميل الخدمات... | Loading services...</span>
                      </td>
                    </tr>
                  ) : filteredServices.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant font-label-sm">
                        لا توجد خدمات | No services found.
                      </td>
                    </tr>
                  ) : (
                    filteredServices.map(service => (
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
          
          <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden z-10 font-sans" dir="rtl">
            <div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center">
              <h3 className="text-title-md text-on-surface">{editingServiceId ? 'تعديل خدمة | Edit Service' : 'إضافة خدمة جديدة | Add New Service'}</h3>
              <button className="text-on-surface-variant hover:text-on-surface p-1" onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="px-6 pb-6 overflow-y-auto">
              <form id="serviceForm" onSubmit={handleSubmit} className="space-y-6 mt-6">
                
                <div className="space-y-1">
                  <label className="block text-label-sm font-bold text-secondary">الفئة | Category *</label>
                  <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none">
                    <option value="training">تدريب | Training</option>
                    <option value="livery">إيواء | Livery</option>
                    <option value="experience">تجارب | Experience</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-label-sm font-bold text-secondary">الاسم | Name (EN) *</label>
                    <input required value={formData.name_en} onChange={e => setFormData({...formData, name_en: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm font-bold text-secondary" dir="rtl">الاسم | Name (AR) *</label>
                    <input required value={formData.name_ar} onChange={e => setFormData({...formData, name_ar: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none text-right" dir="rtl" type="text" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-label-sm font-bold text-secondary">الوصف | Description (EN)</label>
                    <textarea value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" rows={2}></textarea>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm font-bold text-secondary" dir="rtl">الوصف | Description (AR)</label>
                    <textarea value={formData.description_ar} onChange={e => setFormData({...formData, description_ar: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none text-right" dir="rtl" rows={2}></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-label-sm font-bold text-secondary">السعر | Price (SAR) *</label>
                    <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" step="0.01" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm font-bold text-secondary">المدة | Duration (Mins) *</label>
                    <input required value={formData.duration_minutes} onChange={e => setFormData({...formData, duration_minutes: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm font-bold text-secondary">السعة | Capacity *</label>
                    <input required value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" />
                  </div>
                </div>

                {formData.category === 'livery' && (
                  <div className="space-y-2 p-4 bg-surface-container rounded-xl border border-outline-variant/20">
                    <label className="block text-label-sm font-bold text-secondary">الأشهر المتاحة | Livery Months</label>
                    <div className="flex gap-2">
                      <input type="month" value={newMonth} onChange={e => setNewMonth(e.target.value)} className="flex-1 px-3 py-2 bg-surface rounded-lg border border-outline-variant/50" />
                      <button type="button" onClick={addLiveryMonth} className="px-4 py-2 bg-secondary text-on-secondary rounded-lg font-label-sm">إضافة | Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.livery_months.map((m: string) => (
                        <span key={m} className="inline-flex items-center gap-1 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium">
                          {m}
                          <button type="button" onClick={() => removeLiveryMonth(m)}>&times;</button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>
            <div className="px-6 py-4 border-t border-outline-variant/30 flex justify-end space-x-3">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 text-on-surface-variant font-label-md hover:bg-surface-container rounded-lg transition-colors"
              >
                إلغاء | Cancel
              </button>
              <button 
                type="submit"
                form="serviceForm"
                disabled={isSaving}
                className="px-5 py-2 bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
              >
                {isSaving ? 'جاري الحفظ... | Saving...' : (editingServiceId ? 'حفظ التعديلات | Save Changes' : 'إضافة | Create')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
