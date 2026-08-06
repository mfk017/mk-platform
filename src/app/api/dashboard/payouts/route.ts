import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const centerId = session.user.centerId;

  const [payouts, paidBookings, pendingBalance] = await Promise.all([
    db.payout.findMany({
      where: { center_id: centerId },
      orderBy: { created_at: 'desc' },
    }),
    db.booking.aggregate({
      where: { 
        center_id: centerId, 
        payment_status: { in: ['paid', 'completed'] },
        status: { in: ['completed', 'confirmed'] } 
      },
      _sum: { net_amount_to_center: true, platform_fee: true, gateway_fee: true, booking_price: true },
      _count: { id: true },
    }),
    db.booking.aggregate({
      where: { 
        center_id: centerId, 
        payment_status: { in: ['paid', 'completed'] },
        status: { in: ['completed', 'confirmed'] }, 
        payout_id: null 
      },
      _sum: { net_amount_to_center: true },
    }),
  ]);

  return NextResponse.json({
    payouts,
    summary: {
      totalEarned: paidBookings._sum.net_amount_to_center ?? 0,
      totalBookingsPaid: paidBookings._count.id,
      platformFeesCollected: paidBookings._sum.platform_fee ?? 0,
      pendingBalance: pendingBalance._sum.net_amount_to_center ?? 0,
    },
  });
}
