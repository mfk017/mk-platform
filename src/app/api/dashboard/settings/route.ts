import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const center = await db.center.findUnique({
    where: { id: session.user.centerId },
    select: {
      id: true, name_en: true, name_ar: true, slug: true,
      logo_url: true, hero_image_url: true,
      description_en: true, description_ar: true,
      phone: true, email: true, whatsapp_number: true,
      location_url: true, city: true, vat_enabled: true,
      instagram_url: true, snapchat_url: true, tiktok_url: true, twitter_url: true,
      working_hours: true,
      work_start_hour: true, work_end_hour: true,
    },
  });

  return NextResponse.json({ center });
}

export async function PUT(req: NextRequest) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const {
    name_en, name_ar, description_en, description_ar,
    phone, email, whatsapp_number, location_url, city,
    logo_url, hero_image_url, vat_enabled,
    instagram_url, snapchat_url, tiktok_url, twitter_url,
    working_hours,
    work_start_hour, work_end_hour,
  } = body;

  const center = await db.center.update({
    where: { id: session.user.centerId },
    data: {
      ...(name_en && { name_en }),
      ...(name_ar && { name_ar }),
      ...(description_en !== undefined && { description_en }),
      ...(description_ar !== undefined && { description_ar }),
      ...(phone && { phone }),
      ...(email && { email }),
      ...(whatsapp_number !== undefined && { whatsapp_number }),
      ...(location_url !== undefined && { location_url }),
      ...(city && { city }),
      ...(logo_url !== undefined && { logo_url }),
      ...(hero_image_url !== undefined && { hero_image_url }),
      ...(vat_enabled !== undefined && { vat_enabled }),
      ...(instagram_url !== undefined && { instagram_url }),
      ...(snapchat_url !== undefined && { snapchat_url }),
      ...(tiktok_url !== undefined && { tiktok_url }),
      ...(twitter_url !== undefined && { twitter_url }),
      ...(working_hours !== undefined && { working_hours }),
      ...(work_start_hour !== undefined && { work_start_hour: parseInt(work_start_hour) }),
      ...(work_end_hour !== undefined && { work_end_hour: parseInt(work_end_hour) }),
    },
  });

  return NextResponse.json({ center });
}
