import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getAuth();
  if (session?.user?.role !== 'platform_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const [
    centersCount,
    totalBookings,
    paidBookingsData,
    pendingPayoutsData,
  ] = await Promise.all([
    db.center.count(),
    db.booking.count(),
    db.booking.aggregate({
      where: { payment_status: { in: ['paid', 'completed'] } },
      _sum: { booking_price: true, platform_fee: true },
    }),
    db.payout.aggregate({
      where: { status: 'pending' },
      _sum: { net_amount: true },
    }),
  ]);

  return NextResponse.json({
    stats: {
      activeCenters: centersCount,
      totalBookings,
      totalRevenue: paidBookingsData._sum.booking_price ?? 0,
      totalPlatformFees: paidBookingsData._sum.platform_fee ?? 0,
      globalPendingPayouts: pendingPayoutsData._sum.net_amount ?? 0,
    },
  });
}
