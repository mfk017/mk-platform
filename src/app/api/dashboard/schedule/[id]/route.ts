import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await db.scheduleSlot.findUnique({ where: { id: params.id } });
  if (!existing || existing.center_id !== session.user.centerId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await db.scheduleSlot.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await db.scheduleSlot.findUnique({ where: { id: params.id } });
  if (!existing || existing.center_id !== session.user.centerId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await req.json();
  const slot = await db.scheduleSlot.update({
    where: { id: params.id },
    data: {
      capacity: body.capacity ? parseInt(body.capacity) : existing.capacity,
      start_time: body.start_time ? new Date(body.start_time) : existing.start_time,
      end_time: body.end_time ? new Date(body.end_time) : existing.end_time,
    },
  });

  return NextResponse.json({ slot });
}
