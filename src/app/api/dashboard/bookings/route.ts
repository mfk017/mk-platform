import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getAuth();
  if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const dateFrom = searchParams.get('from');
  const dateTo = searchParams.get('to');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 20;

  const where: any = { center_id: session.user.centerId };
  if (status) where.status = status;
  if (dateFrom || dateTo) {
    where.created_at = {};
    if (dateFrom) where.created_at.gte = new Date(dateFrom);
    if (dateTo) where.created_at.lte = new Date(dateTo);
  }

  const [bookings, total] = await Promise.all([
    db.booking.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        service: { select: { name_en: true, category: true } },
        slot: { select: { start_time: true, end_time: true } },
      },
    }),
    db.booking.count({ where }),
  ]);

  return NextResponse.json({ bookings, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuth();
    if (!session?.user?.centerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const center_id = session.user.centerId;
    const body = await req.json();
    const {
      service_id,
      customer_name,
      customer_phone,
      customer_email,
      booking_price,
      horse_id,
      trainer_id,
      start_time,
      end_time,
    } = body;

    if (!service_id || !start_time || !end_time || !customer_name || !customer_phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // JIT Slot Generation
    let slot = await db.scheduleSlot.findFirst({
      where: {
        center_id,
        service_id,
        start_time: new Date(start_time),
      }
    });
    
    if (!slot) {
      slot = await db.scheduleSlot.create({
        data: {
          center_id,
          service_id,
          start_time: new Date(start_time),
          end_time: new Date(end_time),
          capacity: 10,
          booked_count: 0,
        }
      });
    }

    if (slot.booked_count >= slot.capacity) {
      return NextResponse.json({ error: 'This time is already fully booked' }, { status: 400 });
    }

    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceCode = `WLKN-${new Date().getFullYear()}-${randomCode}`;

    // Admin walk-in fee logic (Half price: 3 SAR platform fee, 0 gateway fee)
    const platformFee = 3.00;
    const gatewayFee = 0.00;
    const netToCenter = parseFloat(booking_price) - gatewayFee - platformFee;

    const [booking] = await db.$transaction([
      db.booking.create({
        data: {
          center_id,
          service_id,
          slot_id: slot.id,
          horse_id: horse_id || null,
          trainer_id: trainer_id || null,
          reference_code: referenceCode,
          customer_name,
          customer_phone,
          customer_email: customer_email || 'guest@canter.sa',
          booking_price: parseFloat(booking_price),
          platform_fee: platformFee,
          gateway_fee: gatewayFee,
          net_amount_to_center: netToCenter,
          payment_method: 'cash',
          payment_status: 'completed',
          status: 'confirmed',
        },
      }),
      db.scheduleSlot.update({
        where: { id: slot.id },
        data: { booked_count: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    console.error('Error creating walk-in booking:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
