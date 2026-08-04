import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      center_id,
      service_id,
      slot_id,
      customer_name,
      customer_phone,
      customer_email,
      booking_price,
      payment_method = 'mada',
      horse_id,
      trainer_id,
    } = body;

    if (!center_id || !service_id || !slot_id || !customer_name || !customer_phone) {
      return NextResponse.json(
        { error: 'Missing required booking fields' },
        { status: 400 }
      );
    }

    // Verify slot capacity
    const slot = await db.scheduleSlot.findUnique({
      where: { id: slot_id },
    });

    if (!slot) {
      return NextResponse.json({ error: 'Selected time slot not found' }, { status: 404 });
    }

    if (slot.booked_count >= slot.capacity) {
      return NextResponse.json({ error: 'This slot is already fully booked' }, { status: 400 });
    }

    // Conflict Check for Horse and Trainer
    if (horse_id || trainer_id) {
      const orConditions = [];
      if (horse_id) orConditions.push({ horse_id });
      if (trainer_id) orConditions.push({ trainer_id });

      const conflict = await db.booking.findFirst({
        where: {
          status: { in: ['confirmed', 'completed'] },
          slot: {
            AND: [
              { start_time: { lt: slot.end_time } },
              { end_time: { gt: slot.start_time } },
            ]
          },
          OR: orConditions,
        }
      });

      if (conflict) {
        return NextResponse.json({ error: 'This horse or instructor is already booked during this time.' }, { status: 409 });
      }
    }

    // Generate unique reference code: CNTR-2026-XXXX
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceCode = `CNTR-${new Date().getFullYear()}-${randomCode}`;

    const center = await db.center.findUnique({
      where: { id: center_id },
    });

    if (!center) {
      return NextResponse.json({ error: 'Center not found' }, { status: 404 });
    }

    // Fee calculation logic from spec:
    // platform_fee = center.commission_rate (locked in at registration)
    // net_amount_to_center = gross - gateway - platform_fee
    const platformFee = center.commission_rate;
    const gatewayFee = payment_method === 'mada' ? booking_price * 0.01 + 1.0 : booking_price * 0.0275 + 1.0;
    const netToCenter = booking_price - gatewayFee - platformFee;

    // Transaction: Create booking & increment slot booked_count
    const [booking] = await db.$transaction([
      db.booking.create({
        data: {
          center_id,
          service_id,
          slot_id,
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
          payment_method,
          payment_status: 'pending', // Phase 1 MVP simulated
          status: 'confirmed',
        },
      }),
      db.scheduleSlot.update({
        where: { id: slot_id },
        data: {
          booked_count: { increment: 1 },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
