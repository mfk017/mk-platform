import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getAuth();
  if (session?.user?.role !== 'platform_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Get all payouts, including the center details
  const payouts = await db.payout.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      center: { select: { name_en: true, bank_account_details: true } },
    },
  });

  // Calculate pending balances per center dynamically from unlinked bookings
  const centers = await db.center.findMany({
    select: { id: true, name_en: true },
  });

  const pendingBalances = await Promise.all(
    centers.map(async (center) => {
      const pendingBookings = await db.booking.aggregate({
        where: { 
          center_id: center.id, 
          status: { in: ['completed', 'confirmed'] }, // Only completed bookings are paid out
          payment_status: { in: ['paid', 'completed'] }, // Include cash completed bookings
          payout_id: null 
        },
        _sum: { net_amount_to_center: true, booking_price: true, platform_fee: true, gateway_fee: true },
        _count: { id: true },
      });
      return {
        centerId: center.id,
        centerName: center.name_en,
        pendingAmount: pendingBookings._sum.net_amount_to_center ?? 0,
        pendingGross: pendingBookings._sum.booking_price ?? 0,
        pendingPlatformFees: pendingBookings._sum.platform_fee ?? 0,
        pendingGatewayFees: pendingBookings._sum.gateway_fee ?? 0,
        pendingPayoutsCount: pendingBookings._count.id,
      };
    })
  );

  return NextResponse.json({
    payouts,
    pendingBalances: pendingBalances.filter(b => b.pendingAmount > 0),
  });
}

export async function PUT(req: NextRequest) {
  const session = await getAuth();
  if (session?.user?.role !== 'platform_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { centerId } = await req.json();
  if (!centerId) return NextResponse.json({ error: 'centerId is required' }, { status: 400 });

  // 1. Get all pending bookings
  const pendingBookings = await db.booking.findMany({
    where: { center_id: centerId, status: { in: ['completed', 'confirmed'] }, payment_status: { in: ['paid', 'completed'] }, payout_id: null },
    select: { id: true, net_amount_to_center: true, booking_price: true, platform_fee: true, gateway_fee: true }
  });

  if (pendingBookings.length === 0) {
    return NextResponse.json({ error: 'No pending amount to pay' }, { status: 400 });
  }

  const grossAmount = pendingBookings.reduce((sum, b) => sum + b.booking_price, 0);
  const totalFees = pendingBookings.reduce((sum, b) => sum + b.platform_fee + b.gateway_fee, 0);
  const netAmount = pendingBookings.reduce((sum, b) => sum + b.net_amount_to_center, 0);

  // 2. Create Payout record and link bookings in a transaction
  const result = await db.$transaction(async (tx) => {
    const payout = await tx.payout.create({
      data: {
        center_id: centerId,
        period_start: new Date(new Date().setDate(new Date().getDate() - 30)), // Approx
        period_end: new Date(),
        gross_amount: grossAmount,
        total_fees: totalFees,
        net_amount: netAmount,
        status: 'paid',
        paid_at: new Date(),
      }
    });

    await tx.booking.updateMany({
      where: { id: { in: pendingBookings.map(b => b.id) } },
      data: { payout_id: payout.id }
    });

    return payout;
  });

  return NextResponse.json({ success: true, payout: result });
}
