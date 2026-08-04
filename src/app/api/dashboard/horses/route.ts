import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const horses = await db.horse.findMany({
    where: { center_id: session.user.centerId, is_active: true },
    orderBy: { created_at: 'asc' },
  });

  return NextResponse.json({ horses });
}

export async function POST(req: NextRequest) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { name_en, name_ar, breed_en, breed_ar, age, image_url } = body;

  if (!name_en || !name_ar || !breed_en || !breed_ar || !age) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const horse = await db.horse.create({
    data: {
      center_id: session.user.centerId,
      name_en,
      name_ar,
      breed_en,
      breed_ar,
      age: parseInt(age),
      image_url: image_url || null,
    },
  });

  return NextResponse.json({ horse }, { status: 201 });
}
