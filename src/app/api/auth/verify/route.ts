import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { formatUserResponse } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code, userId } = body;

    // Validate required fields
    if (!code || (!email && !userId)) {
      return NextResponse.json(
        { error: 'Verification code and email/user ID are required' },
        { status: 400 }
      );
    }

    // Validate code format (6 digits)
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: 'Invalid verification code format' },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: email?.toLowerCase() },
          { id: userId },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if account is blocked
    if (user.isBlocked) {
      return NextResponse.json(
        { error: 'Your account has been blocked. Contact support for assistance.' },
        { status: 403 }
      );
    }

    // Check if verification code is valid
    if (user.verificationCode !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Check if verification code has expired
    if (!user.verificationCodeExpiry || user.verificationCodeExpiry < new Date()) {
      return NextResponse.json(
        { error: 'Verification code has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Update user - mark email as verified and clear verification code
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationCode: null,
        verificationCodeExpiry: null,
      },
    });

    // If ADMIN, ensure premium rights
    if (updatedUser.role === 'ADMIN') {
      await db.user.update({
        where: { id: updatedUser.id },
        data: {
          subscriptionPlan: 'ENTERPRISE',
          hasPaidAccess: true,
          accessPermissions: 'charging_map,battery_toolkit,analytics,user_management,fleet_management',
        },
      });
    }

    console.log(`✅ Email verified for: ${updatedUser.email}`);

    return NextResponse.json({
      success: true,
      message: 'Verification successful!',
      user: formatUserResponse(updatedUser),
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify code. Please try again.' },
      { status: 500 }
    );
  }
}
