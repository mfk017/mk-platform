import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const center = await db.center.findUnique({
      where: { slug, status: 'active' },
      include: {
        services: true,
        horses: true,
        trainers: true,
        schedule_slots: {
          orderBy: { start_time: 'asc' },
        },
      },
    });

    if (!center) {
      return NextResponse.json(
        { error: 'Equestrian center not found or pending approval' },
        { status: 404 }
      );
    }

    return NextResponse.json({ center });
  } catch (error: any) {
    console.error('Error fetching center:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
