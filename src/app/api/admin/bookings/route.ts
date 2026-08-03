import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getAuth();
  if (session?.user?.role !== 'platform_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const centerId = searchParams.get('center_id');
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 20;

  const where: any = {};
  if (centerId) where.center_id = centerId;
  if (status) where.status = status;

  const [bookings, total] = await Promise.all([
    db.booking.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        center: { select: { name_en: true, slug: true } },
        service: { select: { name_en: true, category: true } },
      },
    }),
    db.booking.count({ where }),
  ]);

  return NextResponse.json({ bookings, total, page, pages: Math.ceil(total / limit) });
}

export async function PUT(req: NextRequest) {
  const session = await getAuth();
  if (session?.user?.role !== 'platform_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const validStatuses = ['confirmed', 'completed', 'cancelled', 'refunded', 'disputed'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const booking = await db.booking.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ success: true, booking });
}
