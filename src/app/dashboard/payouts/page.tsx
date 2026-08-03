'use client';

import React, { useEffect, useState } from 'react';
import { TopBar } from '@/components/dashboard/TopBar';

export default function PayoutsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/payouts')
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title="Payouts & Earnings" subtitle="Track pending balances and past payout settlements" />

      <div style={{ padding: '28px', flex: 1 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <div style={{ width: 32, height: 32, border: '3px solid var(--dash-border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
              <div style={{ background: 'white', border: '1px solid var(--dash-card-border)', borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--dash-muted)' }}>Net Earnings</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981', marginTop: 4 }}>
                  SAR {(data?.summary?.totalEarned || 0).toLocaleString()}
                </div>
              </div>

              <div style={{ background: 'white', border: '1px solid var(--dash-card-border)', borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--dash-muted)' }}>Pending Payout Balance</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F59E0B', marginTop: 4 }}>
                  SAR {(data?.summary?.pendingBalance || 0).toLocaleString()}
                </div>
              </div>

              <div style={{ background: 'white', border: '1px solid var(--dash-card-border)', borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--dash-muted)' }}>Platform Fees Paid</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dash-text-secondary)', marginTop: 4 }}>
                  SAR {(data?.summary?.platformFeesCollected || 0).toLocaleString()}
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12 }}>Payout History</h3>
            <div style={{ background: 'white', border: '1px solid var(--dash-card-border)', borderRadius: 14, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--dash-bg)' }}>
                    {['Period', 'Gross Amount', 'Total Fees', 'Net Payout', 'Status', 'Paid At'].map((h) => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 600, color: 'var(--dash-muted)', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.payouts?.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: 24, textAlign: 'center', color: 'var(--dash-muted)', fontSize: '0.85rem' }}>
                        No payout records found yet.
                      </td>
                    </tr>
                  ) : (
                    data?.payouts?.map((p: any) => (
                      <tr key={p.id} style={{ borderTop: '1px solid var(--dash-border)' }}>
                        <td style={{ padding: '14px 16px', fontSize: '0.85rem' }}>
                          {new Date(p.period_start).toLocaleDateString()} - {new Date(p.period_end).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '14px 16px' }}>SAR {p.gross_amount}</td>
                        <td style={{ padding: '14px 16px', color: '#EF4444' }}>SAR {p.total_fees}</td>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#10B981' }}>SAR {p.net_amount}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, background: p.status === 'paid' ? '#ECFDF5' : '#FEF3C7', color: p.status === 'paid' ? '#10B981' : '#D97706' }}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: 'var(--dash-muted)' }}>
                          {p.paid_at ? new Date(p.paid_at).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
