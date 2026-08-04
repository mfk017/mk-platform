import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  
  const where: any = { center_id: session.user.centerId, is_active: true };
  if (category) {
    where.category = category;
  }

  const services = await db.service.findMany({
    where,
    orderBy: { created_at: 'asc' },
    include: {
      target_service: { select: { name_en: true, name_ar: true } }
    }
  });

  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { name_en, name_ar, price, original_price, discount_percent, session_count, duration_minutes, category, description_en, description_ar, target_service_id } = body;

  if (!name_en || !name_ar || !price || !duration_minutes || !category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  if (category === 'package' && !target_service_id) {
    return NextResponse.json({ error: 'target_service_id is required for packages' }, { status: 400 });
  }

  const service = await db.service.create({
    data: {
      center_id: session.user.centerId,
      name_en, name_ar,
      price: parseFloat(price),
      original_price: original_price ? parseFloat(original_price) : null,
      discount_percent: discount_percent ? parseFloat(discount_percent) : null,
      session_count: session_count ? parseInt(session_count) : null,
      duration_minutes: parseInt(duration_minutes),
      category,
      description_en: description_en || null,
      description_ar: description_ar || null,
      target_service_id: category === 'package' ? target_service_id : null,
    },
  });

  return NextResponse.json({ service }, { status: 201 });
}
