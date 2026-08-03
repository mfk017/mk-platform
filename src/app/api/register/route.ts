import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { centerNameEn, centerNameAr, ownerName, phone, email, city, services, password, termsAccepted } = body;

    if (!termsAccepted) {
      return NextResponse.json({ error: 'Terms must be accepted' }, { status: 400 });
    }
    
    if (!centerNameEn || !centerNameAr || !ownerName || !phone || !email || !city || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if email exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email is already registered' }, { status: 400 });
    }

    // Generate slug from English name
    const slug = centerNameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Check if slug exists
    const existingCenter = await db.center.findUnique({ where: { slug } });
    if (existingCenter) {
      return NextResponse.json({ error: 'Center name is already taken, please try a different English name' }, { status: 400 });
    }

    // Fetch global platform settings to lock in the commission rate
    const settings = await db.platformSettings.findUnique({ where: { id: 'global' } });
    const commissionRate = settings?.default_commission_rate ?? 6.0;

    const passwordHash = await bcrypt.hash(password, 10);

    // Create center and admin user
    const result = await db.$transaction(async (tx) => {
      const center = await tx.center.create({
        data: {
          name_en: centerNameEn,
          name_ar: centerNameAr,
          slug,
          city,
          phone,
          email,
          description_en: services,
          description_ar: services,
          status: 'pending_approval', // Enforce approval workflow
          vat_enabled: true, // Default
          terms_accepted_at: new Date(),
          commission_rate: commissionRate,
        },
      });

      const user = await tx.user.create({
        data: {
          center_id: center.id,
          role: 'center_admin',
          email,
          password_hash: passwordHash,
          name: ownerName,
        },
      });

      return { center, user };
    });

    return NextResponse.json({ success: true, centerId: result.center.id });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
