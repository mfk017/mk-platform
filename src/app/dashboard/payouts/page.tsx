'use client';

import React, { useEffect, useState } from 'react';
import { Download, ChevronDown, TrendingUp, Wallet, CreditCard, Info, Edit, Calendar, CheckCircle2 } from 'lucide-react';

export default function FinancialOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [overviewRes, bookingsRes] = await Promise.all([
          fetch('/api/dashboard/overview'),
          fetch('/api/dashboard/bookings')
        ]);
        
        if (overviewRes.ok) setData(await overviewRes.json());
        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          setRecentBookings((bookingsData.bookings || []).slice(0, 5));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-surface">
        <p className="text-on-surface-variant font-medium">Loading Financial Data...</p>
      </div>
    );
  }

  const { stats = {} } = data || {};
  return (
    <div className="flex-1 lg:ml-0 w-full max-w-container-max mx-auto px-4 md:px-8 py-8 min-h-screen relative pb-24 lg:pb-8 bg-surface">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-display-lg text-title-md text-on-surface m-0 p-0">المالية | Revenue</h2>
          <p className="font-ibm-plex-sans text-label-sm text-on-surface-variant hidden sm:block">
            تتبع أرباحك وإدارة حسابك البنكي | Track your earnings and manage your bank account
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors text-on-surface font-label-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <div className="relative w-full md:w-auto hidden md:block">
            <select className="appearance-none w-full bg-surface border border-outline-variant text-on-surface py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-label-sm">
              <option>This Month (Oct 2023)</option>
              <option>Last Month</option>
              <option>Q3 2023</option>
              <option>Year to Date</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Net Revenue */}
        <div className="bg-surface rounded-xl p-6 shadow-md border border-secondary/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-sm text-on-surface-variant uppercase tracking-wider">Net Revenue</h3>
            <div className="bg-primary-fixed p-1.5 rounded-full text-primary-container">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-end gap-2">
              <span className="font-display-lg text-on-surface text-3xl font-bold">SAR {stats.totalRevenue?.toLocaleString() ?? 0}</span>
            </div>
            <p className="font-label-xs text-primary mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Real data from bookings
            </p>
          </div>
        </div>

        {/* Gross Volume */}
        <div className="bg-surface rounded-xl p-6 shadow-md border border-secondary/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-sm text-on-surface-variant uppercase tracking-wider">Gross Volume</h3>
            <div className="bg-tertiary-fixed p-1.5 rounded-full text-tertiary-container">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-end gap-2">
              <span className="font-display-lg text-on-surface text-3xl font-bold">SAR {(stats.totalRevenue + stats.totalPlatformFees)?.toLocaleString() ?? 0}</span>
            </div>
            <p className="font-label-xs text-on-surface-variant mt-2">Total payments processed</p>
          </div>
        </div>

        {/* Platform Fees */}
        <div className="bg-surface rounded-xl p-6 shadow-md border border-secondary/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-sm text-on-surface-variant uppercase tracking-wider">Platform Fees</h3>
            <div className="bg-error-container p-1.5 rounded-full text-error">
              <span className="font-bold text-sm">%</span>
            </div>
          </div>
          <div>
            <div className="flex items-end gap-2">
              <span className="font-display-lg text-on-surface text-3xl font-bold">SAR {stats.totalPlatformFees?.toLocaleString() ?? 0}</span>
            </div>
            <p className="font-label-xs text-on-surface-variant mt-2">Deducted before payout</p>
          </div>
        </div>

        {/* Pending Balance */}
        <div className="bg-surface rounded-xl p-6 shadow-md border border-secondary/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <p className="font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">الرصيد المتاح | Available Balance</p>
            <div className="bg-secondary-fixed p-1.5 rounded-full text-on-secondary-fixed">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-end gap-2">
              <span className="font-display-lg text-on-surface text-3xl font-bold">SAR {stats.pendingBalance?.toLocaleString() ?? 0}</span>
            </div>
            <p className="font-label-xs text-on-surface-variant mt-2">Awaiting next payout</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-xl border border-secondary/10 shadow-sm mt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-title-md text-primary">المعاملات الأخيرة | Recent Transactions</h3>
            <button className="text-primary hover:text-primary/80 font-label-sm transition-colors">
              عرض الكل | View All
            </button>
          </div>
          {recentBookings.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant">
            <Calendar className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p className="font-label-sm">لا توجد معاملات بعد | No recent transactions</p>
          </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-variant bg-surface-container-low font-label-sm text-on-surface-variant">
                  <th className="p-4 font-medium">Booking ID</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Gross</th>
                  <th className="p-4 font-medium text-right">Fees (8%)</th>
                  <th className="p-4 font-medium text-right">Net</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-on-surface">
                {recentBookings.map((b: any) => (
                  <tr key={b.id} className="border-b border-surface-variant hover:bg-surface-container-lowest transition-colors group">
                    <td className="p-4"><span className="font-label-sm text-primary group-hover:underline cursor-pointer">{b.reference_code}</span></td>
                    <td className="p-4 text-on-surface-variant text-sm">
                      {b.slot ? new Date(b.slot.start_time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Walk-in'}
                    </td>
                    <td className="p-4 text-right font-mono text-sm">SAR {(b.booking_price || 0).toFixed(2)}</td>
                    <td className="p-4 text-right font-mono text-sm text-error/80">-SAR {((b.platform_fee || 0) + (b.gateway_fee || 0)).toFixed(2)}</td>
                    <td className="p-4 text-right font-mono text-sm font-medium">SAR {(b.net_amount_to_center || 0).toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        b.status === 'completed' ? 'bg-primary-fixed text-on-primary-fixed-variant' :
                        b.status === 'confirmed' ? 'bg-secondary-fixed text-on-secondary-fixed-variant' :
                        'bg-surface-variant text-on-surface-variant'
                      }`}>
                        {b.status === 'completed' ? 'Cleared' : b.status === 'confirmed' ? 'Processing' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>

        {/* Payout & Bank Info Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Next Payout Card */}
          <div className="bg-surface rounded-xl p-6 shadow-md border border-secondary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-fixed/20 rounded-bl-full -z-10"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-primary bg-primary-container/10 p-2 rounded-lg">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="font-title-md text-on-surface font-semibold">Next Payout</h3>
            </div>
            
            <div className="mb-6">
              <p className="font-label-sm text-on-surface-variant mb-1">Scheduled for</p>
              <p className="font-headline-lg-mobile text-primary font-bold text-xl">Nov 1, 2023</p>
            </div>

            <div className="space-y-3 border-t border-surface-variant pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-on-surface-variant">Available to payout</span>
                <span className="font-mono text-sm font-medium">SAR {stats.pendingBalance?.toLocaleString() ?? 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-on-surface-variant">Processing</span>
                <span className="font-mono text-sm text-on-surface-variant">SAR 0.00</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-primary-container text-on-primary-container font-label-sm py-3 rounded-lg hover:bg-primary-container/90 transition-colors flex justify-center items-center gap-2 font-medium">
              <Wallet className="w-4 h-4" />
              Request Early Payout
            </button>
          </div>

          {/* Connected Account Card */}
          <div className="bg-surface rounded-xl p-6 shadow-md border border-secondary/10">
            <h3 className="font-title-md text-primary mb-6">الحساب البنكي | Connected Account</h3>
            <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-secondary/10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-label-sm text-on-surface">Stripe Account</p>
                  <p className="text-body-sm text-on-surface-variant flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-600" /> نشط وجاهز لاستقبال المدفوعات | Active and receiving payouts
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 border border-outline-variant rounded-lg font-label-sm text-on-surface hover:bg-surface-container-low transition-colors">
                عرض في سترايب | View Dashboard
              </button>
            </div>
          </div>

          {/* Bank Details Card */}
          <div className="bg-surface rounded-xl p-6 shadow-md border border-secondary/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="text-on-surface-variant bg-surface-variant p-2 rounded-lg">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="font-title-md text-on-surface font-semibold">Bank Details</h3>
              </div>
              <button className="text-primary hover:bg-primary-fixed/30 p-1.5 rounded-md transition-colors" title="Edit Bank Details">
                <Edit className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-label-xs text-on-surface-variant uppercase tracking-wide mb-1">Bank Name</p>
                <p className="font-body-md font-medium text-on-surface flex items-center gap-2">
                  Al Rajhi Bank
                  <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                </p>
              </div>
              <div>
                <p className="font-label-xs text-on-surface-variant uppercase tracking-wide mb-1">Account Holder</p>
                <p className="font-body-md text-on-surface">Al-Fursan Stable LLC</p>
              </div>
              <div>
                <p className="font-label-xs text-on-surface-variant uppercase tracking-wide mb-1">IBAN</p>
                <p className="font-mono text-sm text-on-surface bg-surface-container-low p-2 rounded border border-surface-variant">
                  SA12 3456 7890 1234 5678 90
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
