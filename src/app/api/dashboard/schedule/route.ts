import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const upcoming = searchParams.get('upcoming') === '1';
  const now = new Date();

  const slots = await db.scheduleSlot.findMany({
    where: {
      center_id: session.user.centerId,
      ...(upcoming ? { start_time: { gte: now } } : {}),
    },
    include: { service: { select: { name_en: true, category: true } } },
    orderBy: { start_time: 'asc' },
    take: 100,
  });

  return NextResponse.json({ slots });
}

export async function POST(req: NextRequest) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { service_id, start_time, end_time, capacity } = body;

  if (!service_id || !start_time || !end_time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Verify service belongs to this center
  const service = await db.service.findUnique({ where: { id: service_id } });
  if (!service || service.center_id !== session.user.centerId) {
    return NextResponse.json({ error: 'Invalid service' }, { status: 400 });
  }

  const slot = await db.scheduleSlot.create({
    data: {
      center_id: session.user.centerId,
      service_id,
      start_time: new Date(start_time),
      end_time: new Date(end_time),
      capacity: capacity ? parseInt(capacity) : 5,
    },
    include: { service: { select: { name_en: true } } },
  });

  return NextResponse.json({ slot }, { status: 201 });
}
