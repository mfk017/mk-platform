'use client';

import React, { useEffect, useState } from 'react';
import { TopBar } from '@/components/dashboard/TopBar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Plus, Trash2, Calendar, Clock, Users } from 'lucide-react';

interface ScheduleSlot {
  id: string;
  service_id: string;
  start_time: string;
  end_time: string;
  capacity: number;
  booked_count: number;
  service?: {
    name_en: string;
  };
}

interface Service {
  id: string;
  name_en: string;
}

export default function SchedulePage() {
  const [slots, setSlots] = useState<ScheduleSlot[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    service_id: '',
    date: new Date().toISOString().split('T')[0],
    start_time: '09:00',
    end_time: '10:00',
    capacity: '5',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resSlots, resServices] = await Promise.all([
        fetch('/api/dashboard/schedule'),
        fetch('/api/dashboard/services'),
      ]);
      const dataSlots = await resSlots.json();
      const dataServices = await resServices.json();
      setSlots(dataSlots.slots || []);
      setServices(dataServices.services || []);
      if (dataServices.services?.length > 0) {
        setFormData((prev) => ({ ...prev, service_id: dataServices.services[0].id }));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this schedule slot?')) return;
    await fetch(`/api/dashboard/schedule/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const startIso = new Date(`${formData.date}T${formData.start_time}:00`).toISOString();
    const endIso = new Date(`${formData.date}T${formData.end_time}:00`).toISOString();

    const res = await fetch('/api/dashboard/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: formData.service_id,
        start_time: startIso,
        end_time: endIso,
        capacity: formData.capacity,
      }),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchData();
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <TopBar
        title="Schedule Management"
        subtitle="Manage available time slots for customer bookings"
        action={
          <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add Time Slot
          </Button>
        }
      />

      <div className="p-4 md:p-8 flex-1">
        <div className="sm:hidden mb-6">
          <Button className="w-full" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add Time Slot
          </Button>
        </div>

        {loading ? (
          <Spinner center size="lg" />
        ) : slots.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No schedule slots"
            description="You haven't added any available time slots. Customers cannot book until you open your schedule."
            actionLabel="Add Time Slot"
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Service', 'Date & Time', 'Capacity / Booked', 'Actions'].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {slots.map((s) => {
                    const startDate = new Date(s.start_time);
                    const endDate = new Date(s.end_time);
                    return (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {s.service?.name_en || 'General Service'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-900 mb-1">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={s.booked_count >= s.capacity ? 'error' : 'success'} className="flex items-center gap-1.5 w-fit">
                            <Users className="w-3 h-3" />
                            {s.booked_count} / {s.capacity} booked
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200" onClick={() => handleDelete(s.id)}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md bg-white shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Add Schedule Slot</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1.5">Select Service</label>
                  <select 
                    value={formData.service_id} 
                    onChange={(e) => setFormData({ ...formData, service_id: e.target.value })} 
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none bg-white"
                  >
                    {services.length === 0 && <option value="" disabled>No services available</option>}
                    {services.map((srv) => (
                      <option key={srv.id} value={srv.id}>{srv.name_en}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1.5">Date</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.date} 
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1.5">Capacity</label>
                    <input 
                      type="number" 
                      required 
                      min="1"
                      value={formData.capacity} 
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1.5">Start Time</label>
                    <input 
                      type="time" 
                      required 
                      value={formData.start_time} 
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1.5">End Time</label>
                    <input 
                      type="time" 
                      required 
                      value={formData.end_time} 
                      onChange={(e) => setFormData({ ...formData, end_time: e.target.value })} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Create Slot</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
