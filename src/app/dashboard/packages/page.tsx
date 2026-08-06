'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Loader2, Package, Tag, Layers, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
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
    image_url: '',
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
      image_url: '',
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
      image_url: pkg.image_url || '',
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File is too large. Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
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
    setIsSaving(true);
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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface h-screen overflow-hidden">
      <header className="h-20 flex items-center justify-between px-6 lg:px-8 border-b border-outline-variant/30 bg-surface-container-lowest shrink-0">
        <div>
          <h2 className="font-display-lg text-title-md text-on-surface m-0 p-0">باقات الخدمات | Service Packages</h2>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl">
            أدر باقات الاشتراك المجمعة التي توفر خصومات على الخدمات. قم بربط كل باقة بخدمة أساسية مثل ركوب الخيل. | Manage bundled subscription packages that offer discounts on services. Link each package to a target service like riding lessons.
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
                placeholder="ابحث في الباقات... | Search packages..." 
                type="text" 
              />
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <h1 className="font-title-lg text-title-lg text-primary font-bold">الباقات | Packages</h1>
              <button onClick={openCreateModal} className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                <span>إضافة باقة | Add Package</span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-on-surface-variant">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <span className="block mt-4 font-label-sm">جاري تحميل الباقات... | Loading packages...</span>
            </div>
          ) : packages.length === 0 ? (
            <div className="col-span-12 text-center py-12 text-on-surface-variant bg-surface-container-low rounded-2xl border border-outline-variant/30">
              <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="font-label-md text-label-md">لا توجد باقات حالياً | No packages found.</p>
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
                          <Tag className="w-3 h-3 mr-1" /> <span className="mr-1">الخدمة المستهدفة | Target:</span> {pkg.target_service.name_en}
                        </div>
                      )}
                      
                      <div className="flex items-end gap-2 mb-4">
                        <span className="font-display-lg text-title-lg font-bold text-primary">SAR {pkg.price}</span>
                        {pkg.original_price && (
                          <span className="text-on-surface-variant text-sm line-through mb-1">SAR {pkg.original_price}</span>
                        )}
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-outline-variant/30 flex justify-between items-center text-label-xs text-on-surface-variant">
                        <span className="flex items-center text-tertiary font-bold"><Layers className="w-3 h-3 mr-1" /> {pkg.session_count} جلسات | Sessions</span>
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
                <h2 className="font-title-md text-title-md text-primary font-bold">
                  {editingPackageId ? 'تعديل الباقة | Edit Package' : 'باقة جديدة | New Package'}
                </h2>
              </div>
              <button 
                className="text-on-surface-variant hover:bg-surface-container-high p-1 rounded-full transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="packageForm" onSubmit={handleSubmit} className="space-y-6" dir="ltr">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-label-sm font-bold text-secondary">اسم الباقة | Package Name (EN) *</label>
                    <input required value={formData.name_en} onChange={e => setFormData({...formData, name_en: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm font-bold text-secondary" dir="rtl">اسم الباقة (AR) *</label>
                    <input required value={formData.name_ar} onChange={e => setFormData({...formData, name_ar: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none text-right" dir="rtl" type="text" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-label-sm text-primary font-bold">سعر الباقة (SAR) | Package Price *</label>
                    <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" step="0.01" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm text-on-surface-variant">السعر قبل الخصم | Original Price (Optional)</label>
                    <input value={formData.original_price} onChange={e => setFormData({...formData, original_price: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" step="0.01" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-label-sm font-bold text-secondary">الخدمة المستهدفة | Target Service *</label>
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
                    <label className="block text-label-sm font-bold text-secondary">إجمالي الجلسات | Total Sessions *</label>
                    <input required value={formData.session_count} onChange={e => setFormData({...formData, session_count: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" min="2" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm font-bold text-secondary">مدة الجلسة (دقيقة) | Duration per Session *</label>
                    <input required value={formData.duration_minutes} onChange={e => setFormData({...formData, duration_minutes: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-label-sm">وصف الباقة | Description (EN)</label>
                  <textarea value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" rows={2}></textarea>
                </div>
                <div className="space-y-1">
                  <label className="block text-label-sm" dir="rtl">الوصف (AR)</label>
                  <textarea value={formData.description_ar} onChange={e => setFormData({...formData, description_ar: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none text-right" dir="rtl" rows={2}></textarea>
                </div>

                <div className="space-y-3">
                  <label className="block text-label-sm font-bold text-secondary">صورة الباقة | Package Image</label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    {formData.image_url && (
                      <img src={formData.image_url} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-outline-variant/30 shrink-0" />
                    )}
                    <button type="button" className="flex items-center gap-2 px-4 py-2.5 bg-surface-container border border-outline-variant/50 rounded-lg text-sm font-medium hover:bg-surface-container-high flex-1 justify-center relative">
                      <span className="material-symbols-outlined text-[20px]">upload</span>
                      رفع صورة | Upload from Device (Max 2MB)
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </button>
                  </div>
                  
                  <div className="relative mt-3">
                    <label className="block text-[10px] text-on-surface-variant mb-1">أو أدخل الرابط مباشرة | Or enter image URL directly</label>
                    <input 
                      type="text" 
                      value={formData.image_url} 
                      onChange={e => setFormData({...formData, image_url: e.target.value})}
                      className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" 
                      dir="ltr"
                      placeholder="https://..."
                    />
                  </div>
                </div>
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
                form="packageForm"
                disabled={isSaving}
                className="px-5 py-2 bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
              >
                {isSaving ? 'جاري الحفظ... | Saving...' : (editingPackageId ? 'حفظ التعديلات | Save Changes' : 'إضافة | Create')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
