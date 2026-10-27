import { NextResponse } from 'next/server';
import { AuthSignupSchema } from '@/schemas';
import { db } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = AuthSignupSchema.parse(body);

    const newInstId = randomUUID();
    db.institutes.set(newInstId, {
      id: newInstId,
      name: validated.instituteName,
      code: validated.instituteName.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8),
      phone: validated.phone,
      email: validated.email,
      city: validated.city,
      subscription_tier: 'starter',
      is_active: true,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Institute registered successfully',
      instituteId: newInstId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Signup failed' },
      { status: 400 }
    );
  }
}
