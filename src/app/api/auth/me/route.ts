import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { formatUserResponse } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get email from query params (for demo purposes)
    // In production, you would use a session token/JWT
    const email = request.nextUrl.searchParams.get('email');
    const userId = request.nextUrl.searchParams.get('userId');

    if (!email && !userId) {
      return NextResponse.json(
        { error: 'Email or userId is required' },
        { status: 400 }
      );
    }

    // Build the where clause properly
    const whereClause = email 
      ? { email: email.toLowerCase() }
      : { id: userId as string };

    // Find user
    const user = await db.user.findUnique({
      where: whereClause,
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return NextResponse.json(
        { error: 'Account has been blocked', isBlocked: true },
        { status: 403 }
      );
    }

    return NextResponse.json({
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}
