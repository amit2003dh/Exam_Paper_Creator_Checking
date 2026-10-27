import { NextResponse } from 'next/server';
import { AuthLoginSchema } from '@/schemas';
import { authService } from '@/services/auth/auth.service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = AuthLoginSchema.parse(body);

    // Verify user credentials
    const user = await authService.getAuthenticatedUser();

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: validated.email,
        fullName: user.fullName,
        instituteId: user.instituteId,
        role: user.role,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Invalid credentials' },
      { status: 400 }
    );
  }
}
