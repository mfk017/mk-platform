import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await db.$executeRawUnsafe(`
      ALTER TABLE "centers" 
      ADD COLUMN "working_hours" JSONB
    `);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
