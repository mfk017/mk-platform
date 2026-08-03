import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getAuth();
  if (session?.user?.role !== 'platform_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const centers = await db.center.findMany({
    orderBy: { created_at: 'desc' },
  });

  return NextResponse.json({ centers });
}

export async function PUT(req: NextRequest) {
  const session = await getAuth();
  if (session?.user?.role !== 'platform_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id, status, commission_rate } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const updateData: any = {};
  
  if (status) {
    const validStatuses = ['active', 'inactive', 'pending_approval'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    updateData.status = status;
  }

  if (typeof commission_rate === 'number') {
    updateData.commission_rate = commission_rate;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: 'No data to update' }, { status: 400 });
  }

  const center = await db.center.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json({ center });
}
