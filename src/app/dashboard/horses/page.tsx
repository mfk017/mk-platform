'use client';

import React, { useState, useEffect } from 'react';
import { Edit, PlusSquare, HeartPulse, Search, Filter, MoreHorizontal, CheckCircle2, TrendingUp, Loader2, Trash2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StableMapPage() {
  const [horses, setHorses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHorseId, setEditingHorseId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    breed: '',
    year_of_birth: '',
    image_url: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchHorses = async () => {
    try {
      const res = await fetch('/api/dashboard/horses');
      if (res.ok) {
        const data = await res.json();
        setHorses(data.horses || []);
      }
    } catch (error) {
      console.error('Failed to fetch horses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHorses();
  }, []);

  const openCreateModal = () => {
    setEditingHorseId(null);
    setFormData({
      name_en: '',
      name_ar: '',
      breed: '',
      year_of_birth: '',
      image_url: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (horse: any) => {
    setEditingHorseId(horse.id);
    setFormData({
      name_en: horse.name_en || '',
      name_ar: horse.name_ar || '',
      breed: horse.breed || '',
      year_of_birth: horse.year_of_birth ? horse.year_of_birth.toString() : '',
      image_url: horse.image_url || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this horse?')) return;
    try {
      const res = await fetch(`/api/dashboard/horses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchHorses();
      } else {
        alert('Failed to delete horse');
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
      const url = editingHorseId 
        ? `/api/dashboard/horses/${editingHorseId}` 
        : '/api/dashboard/horses';
      
      const res = await fetch(url, {
        method: editingHorseId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchHorses();
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
    <div className="flex-1 lg:ml-0 w-full max-w-container-max mx-auto px-4 md:px-8 py-8 min-h-screen relative pb-24 lg:pb-8 bg-[#F4F1DE]">
      {/* Header */}
      <header className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display-lg text-title-md text-on-surface m-0 p-0">الخيل | Horses</h2>
          <p className="font-ibm-plex-sans text-label-sm text-on-surface-variant hidden sm:block">
            إدارة ملفات الخيل وحالتها الصحية | Manage your horses' profiles and health status
          </p>
        </div>
        <div className="flex gap-4">
          <button onClick={openCreateModal} className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            <span>إضافة خيل | Add Horse</span>
          </button>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl border border-secondary/10 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Total Horses</p>
              <h3 className="font-headline-lg-mobile text-primary font-bold">{horses.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-surface p-6 rounded-xl border border-secondary/10 shadow-lg flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-title-md text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">list_alt</span> Livery Roster
          </h3>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary-fixed/20 border-b border-outline-variant/30">
                <th className="font-label-xs text-on-surface-variant p-3 font-semibold">Horse</th>
                <th className="font-label-xs text-on-surface-variant p-3 font-semibold">Breed</th>
                <th className="font-label-xs text-on-surface-variant p-3 font-semibold">Age</th>
                <th className="font-label-xs text-on-surface-variant p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-body-sm divide-y divide-surface-container">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    <span className="block mt-4 font-label-sm">جاري التحميل... | Loading horses...</span>
                  </td>
                </tr>
              ) : horses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8">
                    <div className="p-12 bg-surface-container-lowest rounded-xl border border-secondary/10 text-center text-on-surface-variant font-label-sm shadow-sm">
                      لا توجد خيل مضافة | No horses found. Add a horse to get started.
                    </div>
                  </td>
                </tr>
              ) : (
                horses.map(horse => (
                  <tr key={horse.id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="p-3">
                      <div className="font-label-sm text-on-surface">{horse.name_en}</div>
                      <div className="text-[10px] text-outline">{horse.name_ar}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-label-sm text-on-surface">{horse.breed}</div>
                    </td>
                    <td className="p-3 text-label-xs text-on-surface-variant">{horse.year_of_birth}</td>
                    <td className="p-3 text-right">
                      <button onClick={() => openEditModal(horse)} className="text-on-surface-variant hover:text-primary transition-colors p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(horse.id)} className="text-on-surface-variant hover:text-error transition-colors p-1 ml-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-surface rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden z-10">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center">
              <div>
                <h3 className="font-display-lg text-title-md text-on-surface">{editingHorseId ? 'تعديل الخيل | Edit Horse' : 'إضافة خيل | Add Horse'}</h3>
              </div>
              <button 
                className="text-on-surface-variant hover:bg-surface-container-high p-1 rounded-full transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="horseForm" onSubmit={handleSubmit} className="space-y-6">
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
                    <label className="block text-label-sm font-bold text-secondary">السلالة | Breed</label>
                    <input value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-sm font-bold text-secondary">سنة الميلاد | Year of Birth</label>
                    <input value={formData.year_of_birth} onChange={e => setFormData({...formData, year_of_birth: e.target.value})} className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:outline-none" type="number" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="block text-label-sm">Horse Photo</label>
                    <div className="flex items-center gap-3">
                      {(formData as any).image_url && (
                        <img src={(formData as any).image_url} alt="Preview" className="w-10 h-10 rounded object-cover border border-outline-variant/50" />
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="w-full text-xs text-on-surface-variant file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" 
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant/30 flex justify-end space-x-3">
              <button 
                type="button"
                className="px-4 py-2 font-label-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                إلغاء | Cancel
              </button>
              <button 
                type="submit"
                form="horseForm"
                disabled={isSaving}
                className="px-6 py-2 bg-primary text-on-primary font-label-sm rounded-lg hover:bg-primary/90 shadow-sm disabled:opacity-50"
              >
                {isSaving ? 'جاري الحفظ... | Saving...' : (editingHorseId ? 'حفظ التعديلات | Save Changes' : 'إضافة | Add Horse')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
