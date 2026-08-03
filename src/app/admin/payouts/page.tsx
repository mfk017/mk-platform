'use client';

import React, { useEffect, useState } from 'react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Banknote, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { EmptyState } from '@/components/ui/EmptyState';

export default function AdminPayoutsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchPayouts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/payouts');
      const d = await res.json();
      setData(d);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  const markPaid = async (centerId: string) => {
    if (!confirm('Are you sure you have transferred the funds to this center? This will mark all their pending balance as PAID.')) return;
    
    await fetch('/api/admin/payouts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ centerId }),
    });
    fetchPayouts();
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopBar title="Payouts Engine" subtitle="Process and manage center settlements" />

      <div className="p-4 md:p-8 flex-1">
        {loading ? (
          <Spinner center size="lg" />
        ) : (
          <>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-amber-500" />
              Pending Settlements (Action Required)
            </h3>
            
            <Card className="mb-10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Center</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Unpaid Bookings</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount Owed</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data?.pendingBalances?.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                          No pending payouts across the platform. All centers are settled.
                        </td>
                      </tr>
                    ) : (
                      data?.pendingBalances?.map((b: any) => (
                        <tr key={b.centerId} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900">{b.centerName}</td>
                          <td className="px-6 py-4 text-slate-600">{b.pendingPayoutsCount} completed bookings</td>
                          <td className="px-6 py-4 font-black text-amber-500 text-lg whitespace-nowrap">SAR {b.pendingAmount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button 
                              size="sm" 
                              className="bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500" 
                              onClick={() => markPaid(b.centerId)} 
                              leftIcon={<CheckCircle className="w-4 h-4" />}
                            >
                              Mark as Paid
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            <h3 className="text-lg font-bold text-slate-900 mb-4">Payout History Log</h3>
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {['Center', 'Period', 'Gross', 'Platform Fees', 'Net Payout', 'Status', 'Paid At'].map((h) => (
                        <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data?.payouts?.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                          No historical payouts recorded yet.
                        </td>
                      </tr>
                    ) : (
                      data?.payouts?.map((p: any) => (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900">{p.center?.name_en}</td>
                          <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                            {new Date(p.period_start).toLocaleDateString()} - {new Date(p.period_end).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-medium whitespace-nowrap">SAR {p.gross_amount}</td>
                          <td className="px-6 py-4 font-bold text-blue-600 whitespace-nowrap">SAR {p.total_fees}</td>
                          <td className="px-6 py-4 font-black text-emerald-600 whitespace-nowrap">SAR {p.net_amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={p.status === 'paid' ? 'success' : 'warning'}>
                              {p.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                            {p.paid_at ? new Date(p.paid_at).toLocaleDateString() : '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
