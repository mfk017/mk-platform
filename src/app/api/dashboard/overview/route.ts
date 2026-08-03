import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getAuth();
  if (!session?.user?.centerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const centerId = session.user.centerId;
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

  const [
    todayBookings,
    totalBookings,
    pendingPayouts,
    upcomingSlots,
    recentBookings,
  ] = await Promise.all([
    db.booking.count({
      where: { center_id: centerId, created_at: { gte: todayStart, lt: todayEnd } },
    }),
    db.booking.count({ where: { center_id: centerId } }),
    db.payout.aggregate({
      where: { center_id: centerId, status: 'pending' },
      _sum: { net_amount: true },
    }),
    db.scheduleSlot.count({
      where: { center_id: centerId, start_time: { gte: now } },
    }),
    db.booking.findMany({
      where: { center_id: centerId },
      orderBy: { created_at: 'desc' },
      take: 10,
      include: { service: { select: { name_en: true } } },
    }),
  ]);

  // Revenue: sum of net_amount_to_center for paid bookings
  const revenueData = await db.booking.aggregate({
    where: { center_id: centerId, payment_status: 'paid' },
    _sum: { net_amount_to_center: true },
  });

  return NextResponse.json({
    stats: {
      todayBookings,
      totalBookings,
      pendingBalance: pendingPayouts._sum.net_amount ?? 0,
      upcomingSlots,
      totalRevenue: revenueData._sum.net_amount_to_center ?? 0,
    },
    recentBookings,
  });
}
