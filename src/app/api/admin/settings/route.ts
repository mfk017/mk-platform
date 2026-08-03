import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getAuth();
  if (session?.user?.role !== 'platform_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const settings = await db.platformSettings.findUnique({
    where: { id: 'global' },
  });

  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  const session = await getAuth();
  if (session?.user?.role !== 'platform_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { default_commission_rate } = await req.json();

  if (typeof default_commission_rate !== 'number') {
    return NextResponse.json({ error: 'Invalid commission rate' }, { status: 400 });
  }

  const settings = await db.platformSettings.upsert({
    where: { id: 'global' },
    update: { default_commission_rate },
    create: {
      id: 'global',
      default_commission_rate,
    },
  });

  return NextResponse.json({ settings });
}
