import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const center = await prisma.center.findFirst();
    const service = await prisma.service.findFirst({ where: { center_id: center.id } });
    
    // simulate the body
    const body = {
      service_id: service.id,
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 30 * 60000).toISOString(),
      customer_name: "Test Offline",
      customer_phone: "+966 500000000",
      booking_price: service.price,
    };
    
    console.log("Simulating API route POST...");
    const center_id = center.id;
    const {
      service_id, customer_name, customer_phone, customer_email,
      booking_price, horse_id, trainer_id, start_time, end_time
    } = body;
    
    let slot = await prisma.scheduleSlot.findFirst({
      where: { center_id, service_id, start_time: new Date(start_time) }
    });
    
    if (!slot) {
      slot = await prisma.scheduleSlot.create({
        data: {
          center_id, service_id, start_time: new Date(start_time), end_time: new Date(end_time),
          capacity: 10, booked_count: 0
        }
      });
    }
    
    const referenceCode = `WLKN-${new Date().getFullYear()}-TEST`;
    
    const [booking] = await prisma.$transaction([
      prisma.booking.create({
        data: {
          center_id, service_id, slot_id: slot.id,
          horse_id: horse_id || null, trainer_id: trainer_id || null,
          reference_code: referenceCode, customer_name, customer_phone,
          customer_email: customer_email || 'guest@canter.sa',
          booking_price: parseFloat(booking_price),
          platform_fee: 3.00, gateway_fee: 0.00, net_amount_to_center: parseFloat(booking_price) - 3.00,
          payment_method: 'cash', payment_status: 'completed', status: 'confirmed'
        }
      }),
      prisma.scheduleSlot.update({
        where: { id: slot.id }, data: { booked_count: { increment: 1 } }
      })
    ]);
    
    console.log("Success!", booking.id);
  } catch (e) {
    console.error("Error!", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
