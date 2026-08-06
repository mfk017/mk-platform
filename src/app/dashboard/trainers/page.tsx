'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Loader2, Star, Clock, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrainerId, setEditingTrainerId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    bio_en: '',
    bio_ar: '',
    specialty_en: '',
    specialty_ar: '',
    image_url: '',
    email: '',
    phone: '',
    is_active: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchTrainers = async () => {
    try {
      const res = await fetch('/api/dashboard/trainers');
      if (res.ok) {
        const data = await res.json();
        setTrainers(data.trainers || []);
      }
    } catch (error) {
      console.error('Failed to fetch trainers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const openCreateModal = () => {
    setEditingTrainerId(null);
    setFormData({
      name_en: '',
      name_ar: '',
      bio_en: '',
      bio_ar: '',
      specialty_en: '',
      specialty_ar: '',
      image_url: '',
      email: '',
      phone: '',
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (trainer: any) => {
    setEditingTrainerId(trainer.id);
    setFormData({
      name_en: trainer.name_en,
      name_ar: trainer.name_ar,
      bio_en: trainer.bio_en,
      bio_ar: trainer.bio_ar,
      specialty_en: trainer.specialty_en || '',
      specialty_ar: trainer.specialty_ar || '',
      image_url: trainer.image_url || '',
      email: trainer.email || '',
      phone: trainer.phone || '',
      is_active: trainer.is_active ?? true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this instructor?')) return;
    try {
      const res = await fetch(`/api/dashboard/trainers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTrainers();
      } else {
        alert('Failed to remove instructor');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert('File is too large. Please select an image under 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, image_url: event.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const url = editingTrainerId 
        ? `/api/dashboard/trainers/${editingTrainerId}` 
        : '/api/dashboard/trainers';
      
      const res = await fetch(url, {
        method: editingTrainerId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchTrainers();
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
          <h2 className="font-display-lg text-title-md text-on-surface m-0 p-0">المدربين | Trainers</h2>
          <p className="font-ibm-plex-sans text-label-sm text-on-surface-variant hidden sm:block">
            إدارة المدربين ومواعيدهم | Manage your training staff and their schedules
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
                placeholder="ابحث في المدربين... | Search instructors..." 
                type="text" 
              />
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button onClick={openCreateModal} className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                <span>إضافة مدرب | Add Trainer</span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-on-surface-variant">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <span className="block mt-4 font-label-sm">جاري التحميل... | Loading trainers...</span>
            </div>
          ) : trainers.length === 0 ? (
            <div className="p-12 bg-surface-container-lowest rounded-xl border border-secondary/10 text-center text-on-surface-variant font-label-sm shadow-sm">
              لا يوجد مدربين | No trainers found. Add one to get started.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainers.map(trainer => (
                <div key={trainer.id} className="bg-surface-container-lowest rounded-xl border border-secondary/10 shadow-sm overflow-hidden flex flex-col group">
                  <div className="h-2 bg-primary"></div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant font-headline-lg font-bold">
                        {trainer.name_en.charAt(0)}
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => openEditModal(trainer)} className="p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-primary rounded-md transition-colors opacity-0 group-hover:opacity-100">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(trainer.id)} className="p-1.5 text-on-surface-variant hover:bg-error-container hover:text-error rounded-md transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-title-md text-on-surface">{trainer.name_en}</h3>
                    <p className="text-label-sm text-primary mb-3">{trainer.specialty_en || 'مدرب عام | General Instructor'}</p>
                    
                    <p className="text-body-sm text-on-surface-variant flex-1 line-clamp-3 mb-4">
                      {trainer.bio_en}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-outline-variant/30 flex justify-between items-center text-label-xs text-on-surface-variant">
                      <span className="flex items-center"><Star className="w-3 h-3 text-secondary mr-1" /> 4.9 (120)</span>
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 14 ساعة/أسبوع | hrs/wk</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-[#f8f9fa] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden z-10 font-sans" dir="rtl">
            <div className="px-6 py-5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{editingTrainerId ? 'تعديل المدرب | Edit Trainer' : 'إضافة مدرب | Add Trainer'}</h3>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <div className="px-6 pb-6 overflow-y-auto">
              <form id="trainerForm" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Names */}
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

                {/* Row 2: Bio EN */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">السيرة الذاتية | Bio (EN)</label>
                  <textarea required value={formData.bio_en} onChange={e => setFormData({...formData, bio_en: e.target.value})} className="w-full px-4 py-3 bg-[#f8f9fa] rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none" rows={4} dir="ltr"></textarea>
                </div>

                {/* Row 3: Bio AR */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">السيرة الذاتية | Bio (AR)</label>
                  <textarea required value={formData.bio_ar} onChange={e => setFormData({...formData, bio_ar: e.target.value})} className="w-full px-4 py-3 bg-[#f8f9fa] rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none" rows={4}></textarea>
                </div>

                {/* Row 4: Specialties */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">التخصصات | Specialties</label>
                  <div className="flex flex-wrap gap-2">
                    {['دروس المبتدئين', 'تدريب متقدم', 'القفز', 'الترويض', 'ركوب الطرقات', 'فصول الأطفال'].map(sp => {
                      const isSelected = formData.specialty_ar?.includes(sp);
                      return (
                        <button
                          key={sp}
                          type="button"
                          onClick={() => {
                            const current = formData.specialty_ar ? formData.specialty_ar.split(',').map(s=>s.trim()).filter(Boolean) : [];
                            if (current.includes(sp)) {
                              setFormData({ ...formData, specialty_ar: current.filter(s => s !== sp).join(', ') });
                            } else {
                              setFormData({ ...formData, specialty_ar: [...current, sp].join(', ') });
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${isSelected ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'}`}
                        >
                          {sp}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 5: Photo */}
                <div className="space-y-3">
                  <label className="block text-label-sm font-bold text-secondary">صورة المدرب | Trainer Photo</label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <button type="button" className="flex items-center gap-2 px-4 py-2.5 bg-surface-container border border-outline-variant/50 rounded-lg text-sm font-medium hover:bg-surface-container-high flex-1 justify-center relative">
                      <span className="material-symbols-outlined text-[20px]">upload</span>
                      رفع صورة | Upload from Device
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
                    />
                  </div>
                </div>

                {/* Row 6: Active Toggle */}
                <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl mt-2">
                  <span className="text-sm font-medium text-gray-900">نشط | Active</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.is_active} 
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})} 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#965b2d]"></div>
                  </label>
                </div>

              </form>
            </div>

            <div className="px-6 py-4 flex justify-end gap-3 border-t border-outline-variant/30">
              <button 
                type="button"
                className="px-5 py-2 text-on-surface-variant font-label-md hover:bg-surface-container rounded-lg transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                إلغاء | Cancel
              </button>
              <button 
                type="submit"
                form="trainerForm"
                disabled={isSaving}
                className="px-5 py-2 bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
              >
                {isSaving ? 'جاري الحفظ... | Saving...' : (editingTrainerId ? 'حفظ التعديلات | Save Changes' : 'إضافة | Add Trainer')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
