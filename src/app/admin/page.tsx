'use client';

import React, { useEffect, useState } from 'react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Building2, CreditCard, Banknote, CalendarCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

function StatCard({ label, value, icon: Icon, colorClass }: { label: string; value: string | number; icon: any; colorClass: string }) {
  return (
    <Card className="p-6 flex items-start justify-between">
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {label}
        </div>
        <div className="text-3xl font-black text-slate-900 mt-2">
          {value}
        </div>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </Card>
  );
}

export default function AdminOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/overview')
      .then((r) => r.json())
      .then((d) => setStats(d.stats))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopBar title="Platform Overview" subtitle="System-wide metrics and performance" />

      <div className="p-4 md:p-8 flex-1">
        {loading ? (
          <Spinner center size="lg" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <StatCard label="Total Revenue (GMV)" value={`SAR ${(stats?.totalRevenue || 0).toLocaleString()}`} icon={Banknote} colorClass="bg-emerald-500" />
            <StatCard label="Platform Fees Earned" value={`SAR ${(stats?.totalPlatformFees || 0).toLocaleString()}`} icon={CreditCard} colorClass="bg-blue-500" />
            <StatCard label="Pending Payouts" value={`SAR ${(stats?.globalPendingPayouts || 0).toLocaleString()}`} icon={Banknote} colorClass="bg-amber-500" />
            <StatCard label="Total Bookings" value={(stats?.totalBookings || 0).toLocaleString()} icon={CalendarCheck} colorClass="bg-violet-500" />
            <StatCard label="Active Centers" value={stats?.activeCenters || 0} icon={Building2} colorClass="bg-slate-900" />
          </div>
        )}
      </div>
    </div>
  );
}
