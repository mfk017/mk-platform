'use client';

import React from 'react';
import { Download, ChevronDown, TrendingUp, Wallet, CreditCard, Info, Edit } from 'lucide-react';

export default function FinancialOverviewPage() {
  return (
    <div className="flex-1 lg:ml-0 w-full max-w-container-max mx-auto px-4 md:px-8 py-8 min-h-screen relative pb-24 lg:pb-8 bg-surface">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary">Financial Overview</h2>
          <p className="font-body-md text-on-surface-variant mt-1">Manage revenue, platform commissions, and payouts.</p>
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
              <span className="font-display-lg text-on-surface text-3xl font-bold">SAR 42,500</span>
            </div>
            <p className="font-label-xs text-primary mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.5% from last month
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
              <span className="font-display-lg text-on-surface text-3xl font-bold">SAR 46,200</span>
            </div>
            <p className="font-label-xs text-on-surface-variant mt-2">Total payments processed</p>
          </div>
        </div>

        {/* Platform Fees */}
        <div className="bg-surface rounded-xl p-6 shadow-md border border-secondary/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-sm text-on-surface-variant uppercase tracking-wider">Platform Fees (6%)</h3>
            <div className="bg-error-container p-1.5 rounded-full text-error">
              <span className="font-bold text-sm">%</span>
            </div>
          </div>
          <div>
            <div className="flex items-end gap-2">
              <span className="font-display-lg text-on-surface text-3xl font-bold">SAR 2,772</span>
            </div>
            <p className="font-label-xs text-on-surface-variant mt-2">Deducted before payout</p>
          </div>
        </div>

        {/* Gateway Fees */}
        <div className="bg-surface rounded-xl p-6 shadow-md border border-secondary/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-sm text-on-surface-variant uppercase tracking-wider">Gateway Fees (2%)</h3>
            <div className="bg-secondary-fixed p-1.5 rounded-full text-on-secondary-fixed">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-end gap-2">
              <span className="font-display-lg text-on-surface text-3xl font-bold">SAR 924</span>
            </div>
            <p className="font-label-xs text-on-surface-variant mt-2">Payment processing costs</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-surface rounded-xl shadow-md border border-secondary/10 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-surface-variant flex justify-between items-center bg-tertiary-fixed/30">
            <h3 className="font-title-md text-on-surface font-semibold">Recent Bookings</h3>
            <a className="font-label-sm text-primary hover:underline cursor-pointer">View All</a>
          </div>
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
                {/* Row 1 */}
                <tr className="border-b border-surface-variant hover:bg-surface-container-lowest transition-colors group">
                  <td className="p-4"><span className="font-label-sm text-primary group-hover:underline cursor-pointer">#BK-9921</span></td>
                  <td className="p-4 text-on-surface-variant text-sm">Oct 24, 10:00 AM</td>
                  <td className="p-4 text-right font-mono text-sm">SAR 450.00</td>
                  <td className="p-4 text-right font-mono text-sm text-error/80">-SAR 36.00</td>
                  <td className="p-4 text-right font-mono text-sm font-medium">SAR 414.00</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed-variant">
                      Cleared
                    </span>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="border-b border-surface-variant hover:bg-surface-container-lowest transition-colors group">
                  <td className="p-4"><span className="font-label-sm text-primary group-hover:underline cursor-pointer">#BK-9920</span></td>
                  <td className="p-4 text-on-surface-variant text-sm">Oct 24, 09:00 AM</td>
                  <td className="p-4 text-right font-mono text-sm">SAR 300.00</td>
                  <td className="p-4 text-right font-mono text-sm text-error/80">-SAR 24.00</td>
                  <td className="p-4 text-right font-mono text-sm font-medium">SAR 276.00</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed-variant">
                      Cleared
                    </span>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="border-b border-surface-variant hover:bg-surface-container-lowest transition-colors group">
                  <td className="p-4"><span className="font-label-sm text-primary group-hover:underline cursor-pointer">#BK-9919</span></td>
                  <td className="p-4 text-on-surface-variant text-sm">Oct 23, 04:00 PM</td>
                  <td className="p-4 text-right font-mono text-sm">SAR 800.00</td>
                  <td className="p-4 text-right font-mono text-sm text-error/80">-SAR 64.00</td>
                  <td className="p-4 text-right font-mono text-sm font-medium">SAR 736.00</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-fixed text-on-secondary-fixed-variant">
                      Processing
                    </span>
                  </td>
                </tr>
                {/* Row 4 */}
                <tr className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="p-4"><span className="font-label-sm text-primary group-hover:underline cursor-pointer">#BK-9918</span></td>
                  <td className="p-4 text-on-surface-variant text-sm">Oct 23, 02:30 PM</td>
                  <td className="p-4 text-right font-mono text-sm">SAR 450.00</td>
                  <td className="p-4 text-right font-mono text-sm text-error/80">-SAR 36.00</td>
                  <td className="p-4 text-right font-mono text-sm font-medium">SAR 414.00</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface-variant text-on-surface-variant">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
                <span className="font-mono text-sm font-medium">SAR 18,400.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-on-surface-variant">Processing</span>
                <span className="font-mono text-sm text-on-surface-variant">SAR 4,100.00</span>
              </div>
            </div>

            <button className="w-full bg-primary-container text-on-primary-container font-label-sm py-3 rounded-lg hover:bg-primary-container/90 transition-colors flex justify-center items-center gap-2 font-medium">
              <Wallet className="w-4 h-4" />
              Request Early Payout
            </button>
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
