import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPasswordForStorage, generateVerificationCode, formatUserResponse } from '@/lib/auth';
import { 
  isValidEmail, 
  sanitizeEmail, 
  sanitizeString, 
  sanitizePhone,
  validatePassword,
  MAIN_ADMIN_EMAIL 
} from '@/lib/security';

// Types matching Prisma schema
type UserRole = 'DRIVER' | 'ADMIN' | 'FLEET_MANAGER' | 'EMPLOYEE';
type SecurityLevel = 'BASIC' | 'STANDARD' | 'ELEVATED' | 'MANAGER' | 'SUPERVISOR';

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
    const { name, email, phone, password, accountType = 'PUBLIC' } = body;

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Sanitize and validate inputs
    const sanitizedName = sanitizeString(name, 100);
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedPhone = phone ? sanitizePhone(phone) : null;

    if (!sanitizedName || sanitizedName.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.errors.join('. ') },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: sanitizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = hashPasswordForStorage(password);

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Determine if this is the main admin
    const isMainAdmin = sanitizedEmail.toLowerCase() === MAIN_ADMIN_EMAIL.toLowerCase();

    // Determine role and approval status
    let role: UserRole = 'DRIVER';
    let isApproved = true;
    let securityLevel: SecurityLevel | null = null;
    let subscriptionPlan = 'FREE';
    let hasPaidAccess = false;
    let accessPermissions = 'charging_map';

    const allPermissions = 'charging_map,battery_toolkit,analytics,user_management,fleet_management';
    const fleetPermissions = 'charging_map,fleet_management';

    if (isMainAdmin) {
      // Main admin ALWAYS gets full privileges
      role = 'ADMIN';
      isApproved = true;
      securityLevel = 'SUPERVISOR';
      subscriptionPlan = 'ENTERPRISE';
      hasPaidAccess = true;
      accessPermissions = allPermissions;
      console.log(`👑 Main admin registration: ${sanitizedEmail}`);
    } else if (accountType === 'EMPLOYEE') {
      role = 'EMPLOYEE';
      isApproved = false;
      securityLevel = 'BASIC';
    } else if (accountType === 'FLEET') {
      role = 'FLEET_MANAGER';
      isApproved = true;
      subscriptionPlan = 'ENTERPRISE';
      hasPaidAccess = true;
      accessPermissions = fleetPermissions;
    } else {
      // Public users get DRIVER role
      role = 'DRIVER';
      isApproved = true;
    }

    // Create user in transaction
    const user = await db.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: sanitizedEmail,
          name: sanitizedName,
          phone: sanitizedPhone,
          password: hashedPassword,
          role,
          verificationCode,
          verificationCodeExpiry,
          isEmailVerified: false,
          isApproved,
          securityLevel,
          requestedRole: accountType === 'EMPLOYEE' ? 'EMPLOYEE' : null,
          subscriptionPlan,
          hasPaidAccess,
          accessPermissions,
        },
      });

      // Create fleet record for FLEET_MANAGER
      if (role === 'FLEET_MANAGER') {
        await tx.fleet.create({
          data: {
            name: `${sanitizedName}'s Fleet`,
            description: `Fleet managed by ${sanitizedName}`,
            category: 'PERSONAL',
            ownerId: newUser.id,
            contactEmail: sanitizedEmail,
            contactPhone: sanitizedPhone,
          },
        });
        console.log(`🚗 Fleet created for: ${sanitizedEmail}`);
      }

      return newUser;
    });

    // Send appropriate emails
    if (isMainAdmin) {
      await sendEmail('verification', user.email, {
        code: verificationCode,
        name: user.name || 'User',
      });
      console.log(`👑 Main admin registered: ${sanitizedEmail}`);
    } else if (accountType === 'EMPLOYEE') {
      // Notify employee of pending status
      await sendEmail('employee_pending', user.email, { name: user.name || 'User' });
      
      // Notify admin of new employee registration
      await sendEmail('new_employee_notification', MAIN_ADMIN_EMAIL, {
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
      console.log(`📋 Employee pending approval: ${sanitizedEmail}`);
    } else {
      // Send verification email to regular users
      await sendEmail('verification', user.email, {
        code: verificationCode,
        name: user.name || 'User',
      });
    }

    return NextResponse.json({
      success: true,
      message: accountType === 'EMPLOYEE'
        ? 'Account created! Your employee account is pending admin approval.'
        : 'Account created! Please check your email for the verification code.',
      userId: user.id,
      email: user.email,
      isApproved: user.isApproved,
      role: user.role,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}
