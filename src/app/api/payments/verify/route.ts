import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const payment_id = searchParams.get('id');
  const status = searchParams.get('status');
  const message = searchParams.get('message');

  if (!payment_id) {
    return NextResponse.json({ error: 'Missing payment ID' }, { status: 400 });
  }

  try {
    // 1. Fetch payment details from Moyasar to verify status and get metadata
    const moyasarRes = await fetch(`https://api.moyasar.com/v1/payments/${payment_id}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.MOYASAR_SECRET_KEY + ':').toString('base64')}`,
      },
    });

    if (!moyasarRes.ok) {
      throw new Error('Failed to fetch payment from Moyasar');
    }

    const paymentData = await moyasarRes.json();

    if (paymentData.status !== 'paid') {
      // Redirect back with error
      const centerSlug = paymentData.metadata?.center_slug || '';
      return NextResponse.redirect(new URL(`/${centerSlug}?error=payment_failed`, request.url));
    }

    // Check if we already processed this payment
    const existingBooking = await db.booking.findUnique({
      where: { moyasar_payment_id: payment_id },
    });

    const centerSlug = paymentData.metadata?.center_slug;

    if (existingBooking) {
      // Already processed
      return NextResponse.redirect(new URL(`/${centerSlug}?success=true&ref=${existingBooking.reference_code}`, request.url));
    }

    // 2. Extract metadata
    const {
      center_id,
      service_id,
      slot_id,
      customer_name,
      customer_phone,
      customer_email,
      booking_price,
    } = paymentData.metadata;

    // Verify slot capacity
    const slot = await db.scheduleSlot.findUnique({
      where: { id: slot_id },
    });

    if (!slot || slot.booked_count >= slot.capacity) {
      // Edge case: slot filled while payment was processing. In real world, we'd refund.
      // For MVP, just redirect with error.
      return NextResponse.redirect(new URL(`/${centerSlug}?error=slot_filled`, request.url));
    }

    // Generate reference code
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceCode = `CNTR-${new Date().getFullYear()}-${randomCode}`;

    const center = await db.center.findUnique({
      where: { id: center_id },
    });

    const platformFee = center?.commission_rate || 6.0;
    
    // Payment method can be extracted from source.type in Moyasar (creditcard, stcpay, applepay)
    const paymentMethod = paymentData.source?.type || 'creditcard';
    const amount = paymentData.amount / 100; // Moyasar amount is in halalas
    
    // Gateway fee math
    let gatewayFee = 0;
    if (paymentMethod === 'mada') {
      gatewayFee = amount * 0.01 + 1.0;
    } else {
      gatewayFee = amount * 0.0275 + 1.0; // Visa/Mastercard/ApplePay
    }
    
    const netToCenter = amount - gatewayFee - platformFee;

    // 3. Create booking transaction
    const [booking] = await db.$transaction([
      db.booking.create({
        data: {
          center_id,
          service_id,
          slot_id,
          reference_code: referenceCode,
          customer_name,
          customer_phone,
          customer_email: customer_email || 'guest@canter.sa',
          booking_price: amount,
          platform_fee: platformFee,
          gateway_fee: gatewayFee,
          net_amount_to_center: netToCenter,
          payment_method: paymentMethod,
          payment_status: 'paid',
          status: 'confirmed',
          moyasar_payment_id: payment_id,
        },
      }),
      db.scheduleSlot.update({
        where: { id: slot_id },
        data: {
          booked_count: { increment: 1 },
        },
      }),
    ]);

    // Redirect to success page on the center's frontend
    return NextResponse.redirect(new URL(`/${centerSlug}?success=true&ref=${booking.reference_code}`, request.url));

  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.redirect(new URL(`/?error=verification_failed`, request.url));
  }
}
