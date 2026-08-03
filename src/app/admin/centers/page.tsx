'use client';

import React, { useEffect, useState } from 'react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { ExternalLink, Check, X, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { EmptyState } from '@/components/ui/EmptyState';

export default function CentersPage() {
  const [centers, setCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>('all');

  const fetchCenters = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/centers');
      const data = await res.json();
      setCenters(data.centers || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/centers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchCenters();
  };

  const updateRate = async (id: string, commission_rate: number) => {
    await fetch('/api/admin/centers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, commission_rate }),
    });
    fetchCenters();
  };

  const pendingCount = centers.filter(c => c.status === 'pending_approval').length;
  const filteredCenters = activeTab === 'all' 
    ? centers 
    : centers.filter(c => c.status === 'pending_approval');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="success">Active</Badge>;
      case 'pending_approval': return <Badge variant="warning">Pending Approval</Badge>;
      case 'inactive': return <Badge variant="default">Inactive</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopBar title="Centers Management" subtitle="View and manage all equestrian centers on Canter" />

      <div className="p-4 md:p-8 flex-1">
        
        <div className="flex gap-6 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'all' ? 'border-violet-600 text-violet-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            All Centers ({centers.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 font-semibold text-sm transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'pending' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Awaiting Approval
            {pendingCount > 0 && (
              <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs">
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {loading ? (
          <Spinner center size="lg" />
        ) : filteredCenters.length === 0 ? (
          <EmptyState
            icon={Building2}
            title={activeTab === 'pending' ? 'No pending approvals' : 'No centers found'}
            description={activeTab === 'pending' ? 'All centers have been reviewed.' : 'There are currently no registered equestrian centers.'}
          />
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Center Name', 'Slug / URL', 'City', 'Rate / VAT', 'Status', 'Registered', 'Actions'].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCenters.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{c.name_en}</div>
                        <div className="text-sm text-slate-500">{c.email || 'No email'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <a href={`/${c.slug}`} target="_blank" rel="noreferrer" className="text-violet-600 hover:text-violet-700 font-medium text-sm flex items-center gap-1">
                          /{c.slug} <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {c.city || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.5"
                            defaultValue={c.commission_rate}
                            onBlur={(e) => updateRate(c.id, parseFloat(e.target.value))}
                            className="w-20 px-2 py-1 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
                            title="Press Enter or click away to save"
                          />
                          <span className="text-xs text-slate-500 font-medium">SAR</span>
                        </div>
                        <div className={`text-xs font-semibold mt-1 ${c.vat_enabled ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {c.vat_enabled ? '+15% VAT' : 'No VAT'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(c.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                        {new Date(c.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {activeTab === 'pending' ? (
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="primary" className="bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500" onClick={() => updateStatus(c.id, 'active')} leftIcon={<Check className="w-4 h-4" />}>
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => updateStatus(c.id, 'inactive')} leftIcon={<X className="w-4 h-4" />}>
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <select
                            value={c.status}
                            onChange={(e) => updateStatus(c.id, e.target.value)}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending_approval">Pending Approval</option>
                          </select>
                        )}
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
