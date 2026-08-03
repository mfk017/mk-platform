import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const dateFrom = searchParams.get('from');
  const dateTo = searchParams.get('to');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 20;

  const where: any = { center_id: session.user.centerId };
  if (status) where.status = status;
  if (dateFrom || dateTo) {
    where.created_at = {};
    if (dateFrom) where.created_at.gte = new Date(dateFrom);
    if (dateTo) where.created_at.lte = new Date(dateTo);
  }

  const [bookings, total] = await Promise.all([
    db.booking.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        service: { select: { name_en: true, category: true } },
        slot: { select: { start_time: true, end_time: true } },
      },
    }),
    db.booking.count({ where }),
  ]);

  return NextResponse.json({ bookings, total, page, pages: Math.ceil(total / limit) });
}
