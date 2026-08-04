'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader2, Calendar, User, Phone, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const url = statusFilter
        ? `/api/dashboard/bookings?status=${statusFilter}`
        : '/api/dashboard/bookings';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/dashboard/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchBookings();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-container text-on-secondary-container"><CheckCircle className="w-3 h-3 mr-1"/> Completed</span>;
      case 'confirmed': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed-variant"><Clock className="w-3 h-3 mr-1"/> Confirmed</span>;
      case 'cancelled': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-container text-on-error-container"><XCircle className="w-3 h-3 mr-1"/> Cancelled</span>;
      case 'pending': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary-container text-on-tertiary-container"><Clock className="w-3 h-3 mr-1"/> Pending</span>;
      default: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-variant text-on-surface-variant">{status}</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface h-screen overflow-hidden">
      <header className="h-20 flex items-center justify-between px-6 lg:px-8 border-b border-outline-variant/30 bg-surface-container-lowest shrink-0">
        <div>
          <h2 className="font-display-lg text-title-md text-on-surface m-0 p-0">Bookings & Reservations</h2>
          <p className="font-ibm-plex-sans text-label-sm text-on-surface-variant hidden sm:block">
            Manage your customer reservations and schedules.
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F4F1DE]">
        <div className="max-w-7xl mx-auto space-y-6 pb-24 md:pb-0">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-secondary/10 shadow-sm">
            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {['', 'confirmed', 'completed', 'cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-4 py-2 rounded-lg text-label-sm font-semibold whitespace-nowrap transition-colors border ${
                    statusFilter === st 
                      ? 'bg-primary text-on-primary border-primary' 
                      : 'bg-surface-container text-on-surface-variant border-outline-variant/50 hover:bg-surface-container-high'
                  }`}
                >
                  {st ? st.charAt(0).toUpperCase() + st.slice(1) : 'All Statuses'}
                </button>
              ))}
            </div>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
              <input 
                className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-ibm-plex-sans text-body-md transition-shadow" 
                placeholder="Search by ref or name..." 
                type="text" 
              />
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-secondary/10 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-tertiary-fixed/30 border-b border-outline-variant/30">
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant">Booking Ref</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant">Customer</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant">Service Details</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant text-right">Net Revenue</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant">Status</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-ibm-plex-sans text-body-md text-on-surface">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-on-surface-variant">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                        <span className="block mt-4 font-label-sm">Loading bookings...</span>
                      </td>
                    </tr>
                  ) : bookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-on-surface-variant font-label-sm">
                        {statusFilter ? `No ${statusFilter} bookings found.` : 'No bookings found.'}
                      </td>
                    </tr>
                  ) : (
                    bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-6 py-4 font-mono font-bold text-primary text-sm">{b.reference_code}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center mb-1">
                            <User className="w-3 h-3 text-on-surface-variant mr-1" />
                            <span className="font-semibold text-on-surface text-sm">{b.customer_name}</span>
                          </div>
                          <div className="flex items-center text-xs text-on-surface-variant">
                            <Phone className="w-3 h-3 mr-1" />
                            {b.customer_phone}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-on-surface">{b.service?.name_en || 'Unknown Service'}</div>
                          {b.slot && (
                            <div className="text-xs text-on-surface-variant flex items-center mt-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(b.slot.start_time).toLocaleString()}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="font-mono font-bold text-secondary text-sm">SAR {b.net_amount_to_center}</div>
                          <div className="text-[10px] text-on-surface-variant">Gross: SAR {b.booking_price}</div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(b.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <select
                            value={b.status}
                            onChange={(e) => updateStatus(b.id, e.target.value)}
                            className="px-3 py-1.5 rounded-lg border border-outline-variant/50 text-label-sm bg-surface-container focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
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
    </div>
  );
}
