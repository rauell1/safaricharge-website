import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { formatUserResponse } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Require userId only — do not allow email-based lookup to prevent
    // unauthenticated user enumeration via the /api/auth/me endpoint.
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await db.user.findUnique({
      where: { id: userId },
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
