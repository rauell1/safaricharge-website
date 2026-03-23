import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST - Block a user
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { reason, blockedBy } = body;

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

    if (user.isBlocked) {
      return NextResponse.json(
        { error: 'User is already blocked' },
        { status: 400 }
      );
    }

    // Block the user
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        isBlocked: true,
        blockedAt: new Date(),
        blockedBy: blockedBy || null,
        blockReason: reason || 'No reason provided',
      },
    });

    console.log(`\n🚫 User blocked: ${user.email} - Reason: ${reason || 'No reason provided'}\n`);

    return NextResponse.json({
      success: true,
      message: 'User blocked successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        isBlocked: updatedUser.isBlocked,
        blockedAt: updatedUser.blockedAt,
        blockReason: updatedUser.blockReason,
      },
    });
  } catch (error) {
    console.error('Error blocking user:', error);
    return NextResponse.json(
      { error: 'Failed to block user' },
      { status: 500 }
    );
  }
}
