import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await db.trainer.findUnique({ where: { id: params.id } });
  if (!existing || existing.center_id !== session.user.centerId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await req.json();
  const { name_en, name_ar, bio_en, bio_ar, specialty_en, specialty_ar, image_url, is_active } = body;

  const trainer = await db.trainer.update({
    where: { id: params.id },
    data: {
      name_en,
      name_ar,
      bio_en,
      bio_ar,
      specialty_en: specialty_en || null,
      specialty_ar: specialty_ar || null,
      image_url: image_url || null,
      is_active: is_active ?? existing.is_active,
    },
  });

  return NextResponse.json({ trainer });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await db.trainer.findUnique({ where: { id: params.id } });
  if (!existing || existing.center_id !== session.user.centerId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await db.trainer.update({
    where: { id: params.id },
    data: { is_active: false }
  });
  return NextResponse.json({ success: true });
}
