import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await db.booking.findUnique({ where: { id: params.id } });
  if (!existing || existing.center_id !== session.user.centerId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { status } = await req.json();
  const validStatuses = ['confirmed', 'cancelled', 'completed'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const booking = await db.booking.update({ where: { id: params.id }, data: { status } });
  return NextResponse.json({ booking });
}
