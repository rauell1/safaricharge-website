import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET - List all users (Admin only)
 * This route should only be accessible by ADMIN role
 */
export async function GET(request: NextRequest) {
  try {
    // Get requester info from query params (should be validated via session in production)
    const { searchParams } = new URL(request.url);
    const requesterId = searchParams.get('requesterId');
    const requesterRole = searchParams.get('requesterRole');

    // Validate admin access
    if (requesterRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    // Verify the requester exists and is actually an admin
    if (requesterId) {
      const requester = await db.user.findUnique({
        where: { id: requesterId },
        select: { role: true, isBlocked: true },
      });

      if (!requester || requester.role !== 'ADMIN' || requester.isBlocked) {
        return NextResponse.json(
          { error: 'Unauthorized. Admin access required.' },
          { status: 403 }
        );
      }
    }

    // Fetch users with sensitive data excluded
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatar: true,
        isEmailVerified: true,
        isApproved: true,
        isBlocked: true,
        securityLevel: true,
        subscriptionPlan: true,
        subscriptionExpiry: true,
        hasPaidAccess: true,
        accessPermissions: true,
        createdAt: true,
        blockedAt: true,
        blockReason: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Get statistics
    const [
      total,
      drivers,
      admins,
      fleetManagers,
      employees,
      blocked,
    ] = await Promise.all([
      db.user.count(),
      db.user.count({ where: { role: 'DRIVER' } }),
      db.user.count({ where: { role: 'ADMIN' } }),
      db.user.count({ where: { role: 'FLEET_MANAGER' } }),
      db.user.count({ where: { role: 'EMPLOYEE' } }),
      db.user.count({ where: { isBlocked: true } }),
    ]);

    return NextResponse.json({
      users,
      stats: {
        total,
        drivers,
        admins,
        fleetManagers,
        employees,
        blocked,
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
