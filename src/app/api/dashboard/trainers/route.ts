import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const trainers = await db.trainer.findMany({
    where: { center_id: session.user.centerId, is_active: true },
    orderBy: { created_at: 'asc' },
  });

  return NextResponse.json({ trainers });
}

export async function POST(req: NextRequest) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { name_en, name_ar, bio_en, bio_ar, specialty_en, specialty_ar, image_url } = body;

  if (!name_en || !name_ar || !bio_en || !bio_ar) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const trainer = await db.trainer.create({
    data: {
      center_id: session.user.centerId,
      name_en,
      name_ar,
      bio_en,
      bio_ar,
      specialty_en: specialty_en || null,
      specialty_ar: specialty_ar || null,
      image_url: image_url || null,
    },
  });

  return NextResponse.json({ trainer }, { status: 201 });
}
