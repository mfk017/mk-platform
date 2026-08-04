const fs = require('fs');

let content = fs.readFileSync('src/app/admin/approvals/page.tsx', 'utf8');

// The file currently has hardcoded rows. Let's rewrite it to use React state and fetch.
const newContent = `'use client';

import React, { useEffect, useState } from 'react';
import { Search, ClipboardList, CheckCircle2, AlertCircle, Building, BadgeCheck, X, Check } from 'lucide-react';

export default function ApprovalsPage() {
  const [centers, setCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const pendingCenters = centers.filter(c => c.status === 'pending_approval');
  const approvedTodayCount = centers.filter(c => c.status === 'active' && new Date(c.updated_at).toDateString() === new Date().toDateString()).length;

  return (
    <div className="flex-1 lg:ml-0 relative overflow-y-auto h-screen bg-[#F4F1DE]">
      <div className="px-6 lg:px-8 py-8 max-w-[1200px] mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="font-headline-lg text-primary tracking-tight text-3xl font-bold">Center Applications Queue</h1>
            <p className="font-body-md text-on-surface-variant mt-2 max-w-2xl">
              Review and manage pending registrations for new equestrian centers seeking platform access.
            </p>
          </div>
        </div>

        {/* Stats/Summary Bento Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface p-6 rounded-xl shadow-md border border-secondary/10 flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-2 text-on-surface-variant mb-2">
              <ClipboardList className="w-5 h-5" />
              <span className="font-label-sm font-medium">Pending Review</span>
            </div>
            <div className="font-display-lg text-primary text-4xl font-bold">{pendingCenters.length}</div>
          </div>
          
          <div className="bg-surface p-6 rounded-xl shadow-md border border-secondary/10 flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-2 text-on-surface-variant mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-label-sm font-medium">Approved Today</span>
            </div>
            <div className="font-display-lg text-surface-tint text-4xl font-bold">{approvedTodayCount}</div>
          </div>

          <div className="bg-surface p-6 rounded-xl shadow-md border border-secondary/10 flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-2 text-on-surface-variant mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-label-sm font-medium">Incomplete Docs</span>
            </div>
            <div className="font-display-lg text-secondary text-4xl font-bold">0</div>
          </div>
        </div>

        {/* Data Table Card */}
        <div className="bg-surface rounded-xl shadow-md border border-secondary/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/5 border-b border-outline-variant/30 font-label-sm text-on-surface-variant">
                  <th className="p-6 font-semibold">Center Details</th>
                  <th className="p-6 font-semibold">Date Submitted</th>
                  <th className="p-6 font-semibold">Status</th>
                  <th className="p-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-sm divide-y divide-outline-variant/10">
                {pendingCenters.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                      No pending applications at this time.
                    </td>
                  </tr>
                )}
                {pendingCenters.map((c) => (
                  <tr key={c.id} className="hover:bg-primary-fixed/5 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container flex-shrink-0">
                          <Building className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-title-md text-base text-primary font-semibold">{c.name_en}</div>
                          <div className="text-on-surface-variant text-xs mt-1">Owner: {c.owner_name} • {c.city || 'Unknown City'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-on-surface-variant">
                      <div className="font-label-sm">{new Date(c.created_at).toLocaleDateString()}</div>
                      <div className="text-xs mt-1">{new Date(c.created_at).toLocaleTimeString()}</div>
                    </td>
                    <td className="p-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-xs text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Pending Review
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity">
                        <button onClick={() => updateStatus(c.id, "inactive")} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors" title="Reject">
                          <X className="w-5 h-5" />
                        </button>
                        <button onClick={() => updateStatus(c.id, "active")} className="p-2 text-surface-tint hover:bg-surface-tint/10 rounded-lg transition-colors" title="Approve">
                          <Check className="w-5 h-5" />
                        </button>
                        <button disabled className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-lg font-label-sm shadow-sm opacity-50 cursor-not-allowed">
                          Review (Soon)
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/app/admin/approvals/page.tsx', newContent);
