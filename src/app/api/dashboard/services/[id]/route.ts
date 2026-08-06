import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await db.service.findUnique({ where: { id: params.id } });
  if (!existing || existing.center_id !== session.user.centerId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await req.json();
  const { name_en, name_ar, price, original_price, discount_percent, session_count, duration_minutes, category, description_en, description_ar, target_service_id, image_url, livery_months, is_active } = body;

  const service = await db.service.update({
    where: { id: params.id },
    data: {
      name_en, name_ar,
      price: parseFloat(price),
      original_price: original_price ? parseFloat(original_price) : null,
      discount_percent: discount_percent ? parseFloat(discount_percent) : null,
      session_count: session_count ? parseInt(session_count) : null,
      duration_minutes: parseInt(duration_minutes),
      category,
      description_en: description_en || null,
      description_ar: description_ar || null,
      image_url: image_url || null,
      livery_months: category === 'livery' && Array.isArray(livery_months) ? livery_months : undefined,
      target_service_id: category === 'package' ? target_service_id : null,
      is_active: typeof is_active === 'boolean' ? is_active : true,
    },
  });

  return NextResponse.json({ service });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await db.service.findUnique({ where: { id: params.id } });
  if (!existing || existing.center_id !== session.user.centerId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await db.service.update({
    where: { id: params.id },
    data: { is_active: false }
  });
  return NextResponse.json({ success: true });
}
