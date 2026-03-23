import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, generateVerificationCode, formatUserResponse } from '@/lib/auth';
import { isValidEmail, sanitizeEmail, MAIN_ADMIN_EMAIL } from '@/lib/security';

// Helper function to send email
async function sendEmail(type: string, to: string | string[], data: Record<string, unknown>) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
      
    const response = await fetch(`${baseUrl}/api/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, to, data }),
    });
    
    const result = await response.json();
    if (!response.ok) {
      console.error('Email send failed:', result);
    }
    return result;
  } catch (error) {
    console.error('Email send error:', error);
    return { error: 'Failed to send email' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate and sanitize email
    const sanitizedEmail = sanitizeEmail(email);
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email: sanitizedEmail },
    });

    // Use generic error message to prevent email enumeration
    const invalidCredentialsError = { error: 'Invalid email or password', status: 401 };

    if (!user) {
      return NextResponse.json(
        { error: invalidCredentialsError.error },
        { status: invalidCredentialsError.status }
      );
    }

    // Verify password
    if (!user.password || !verifyPassword(password, user.password)) {
      return NextResponse.json(
        { error: invalidCredentialsError.error },
        { status: invalidCredentialsError.status }
      );
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return NextResponse.json(
        { 
          error: `Your account has been blocked. ${user.blockReason ? `Reason: ${user.blockReason}` : ''} Contact support for assistance.`,
          isBlocked: true 
        },
        { status: 403 }
      );
    }

    // Check if employee account is approved
    if (user.role === 'EMPLOYEE' && !user.isApproved) {
      return NextResponse.json(
        { 
          error: 'Your employee account is pending approval. You will be notified once approved.',
          pendingApproval: true 
        },
        { status: 403 }
      );
    }

    // If user has verified email, skip 2FA
    if (user.isEmailVerified) {
      console.log(`✅ User logged in: ${sanitizedEmail}`);
      
      // Ensure ADMIN always has premium rights
      if (user.role === 'ADMIN') {
        await db.user.update({
          where: { id: user.id },
          data: {
            subscriptionPlan: 'ENTERPRISE',
            hasPaidAccess: true,
            accessPermissions: 'charging_map,battery_toolkit,analytics,user_management,fleet_management',
          },
        });
      }
      
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        skipVerification: true,
        user: formatUserResponse(user),
      });
    }

    // Generate verification code for 2FA
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with verification code
    await db.user.update({
      where: { id: user.id },
      data: {
        verificationCode,
        verificationCodeExpiry,
      },
    });

    // Send verification email
    await sendEmail('verification', user.email, {
      code: verificationCode,
      name: user.name || 'User',
    });

    console.log(`📧 2FA code sent to: ${sanitizedEmail}`);

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to your email',
      userId: user.id,
      email: user.email,
      requiresVerification: true,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
