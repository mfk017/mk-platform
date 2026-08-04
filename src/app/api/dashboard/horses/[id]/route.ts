import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await db.horse.findUnique({ where: { id: params.id } });
  if (!existing || existing.center_id !== session.user.centerId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await req.json();
  const { name_en, name_ar, breed_en, breed_ar, age, image_url } = body;

  const horse = await db.horse.update({
    where: { id: params.id },
    data: {
      name_en,
      name_ar,
      breed_en,
      breed_ar,
      age: parseInt(age),
      image_url: image_url || null,
    },
  });

  return NextResponse.json({ horse });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await db.horse.findUnique({ where: { id: params.id } });
  if (!existing || existing.center_id !== session.user.centerId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await db.horse.update({
    where: { id: params.id },
    data: { is_active: false }
  });
  return NextResponse.json({ success: true });
}
