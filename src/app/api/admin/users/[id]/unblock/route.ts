import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST - Unblock a user (rollback block)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.isBlocked) {
      return NextResponse.json(
        { error: 'User is not blocked' },
        { status: 400 }
      );
    }

    // Unblock the user
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        isBlocked: false,
        blockedAt: null,
        blockedBy: null,
        blockReason: null,
      },
    });

    console.log(`\n✅ User unblocked: ${user.email}\n`);

    return NextResponse.json({
      success: true,
      message: 'User unblocked successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        isBlocked: updatedUser.isBlocked,
      },
    });
  } catch (error) {
    console.error('Error unblocking user:', error);
    return NextResponse.json(
      { error: 'Failed to unblock user' },
      { status: 500 }
    );
  }
}
