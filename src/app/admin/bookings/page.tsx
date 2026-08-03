'use client';

import React, { useEffect, useState } from 'react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { CalendarDays } from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      setBookings(data.bookings || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    if (!confirm(`Are you sure you want to mark this booking as ${status.toUpperCase()}? This will affect payout calculations.`)) return;

    await fetch('/api/admin/bookings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchBookings();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge variant="success">Completed</Badge>;
      case 'confirmed': return <Badge variant="info">Confirmed</Badge>;
      case 'cancelled': 
      case 'refunded': return <Badge variant="default">{status}</Badge>;
      case 'disputed': return <Badge variant="error">Disputed</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopBar title="All Platform Bookings" subtitle="Global view of all reservations across all centers" />

      <div className="p-4 md:p-8 flex-1">
        {loading ? (
          <Spinner center size="lg" />
        ) : bookings.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="No bookings yet"
            description="There are currently no bookings across any centers on the platform."
          />
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Ref', 'Center', 'Customer', 'Service', 'Total Price', 'Platform Fee', 'Status', 'Date', 'Actions'].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-semibold text-slate-900 text-sm">{b.reference_code}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{b.center?.name_en}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 text-sm">{b.customer_name}</div>
                        <div className="text-xs text-slate-500">{b.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{b.service?.name_en}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">SAR {b.booking_price}</td>
                      <td className="px-6 py-4 font-bold text-blue-600 whitespace-nowrap">SAR {b.platform_fee}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(b.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                        {new Date(b.created_at).toLocaleDateString()}
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
                          <option value="refunded">Refunded</option>
                          <option value="disputed">Disputed</option>
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
