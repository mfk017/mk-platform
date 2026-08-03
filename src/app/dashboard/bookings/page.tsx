'use client';

import React, { useEffect, useState } from 'react';
import { TopBar } from '@/components/dashboard/TopBar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { BookOpen } from 'lucide-react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const url = statusFilter
        ? `/api/dashboard/bookings?status=${statusFilter}`
        : '/api/dashboard/bookings';
      const res = await fetch(url);
      const data = await res.json();
      setBookings(data.bookings || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/dashboard/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchBookings();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge variant="success">Completed</Badge>;
      case 'confirmed': return <Badge variant="info">Confirmed</Badge>;
      case 'cancelled': return <Badge variant="error">Cancelled</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <TopBar title="Bookings" subtitle="View and manage customer reservations" />

      <div className="p-4 md:p-8 flex-1">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['', 'confirmed', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border ${
                statusFilter === st 
                  ? 'bg-violet-600 text-white border-violet-600' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st ? st.charAt(0).toUpperCase() + st.slice(1) : 'All Statuses'}
            </button>
          ))}
        </div>

        {loading ? (
          <Spinner center size="lg" />
        ) : bookings.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title={statusFilter ? `No ${statusFilter} bookings` : 'No bookings yet'}
            description={statusFilter ? `There are no bookings matching the status "${statusFilter}".` : 'You have no bookings recorded. Once a customer books a service, it will appear here.'}
          />
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Ref', 'Customer', 'Service', 'Price', 'Net to Center', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-semibold text-slate-900 text-sm">{b.reference_code}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 text-sm">{b.customer_name}</div>
                        <div className="text-xs text-slate-500">{b.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{b.service?.name_en}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">SAR {b.booking_price}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600 whitespace-nowrap">SAR {b.net_amount_to_center}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(b.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
