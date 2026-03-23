import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET - List all employees (Admin only)
 * This route should only be accessible by ADMIN role
 */
export async function GET(request: NextRequest) {
  try {
    // Get requester info from query params
    const { searchParams } = new URL(request.url);
    const requesterId = searchParams.get('requesterId');
    const requesterRole = searchParams.get('requesterRole');
    const status = searchParams.get('status') || 'all';

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

    // Build where clause
    const whereClause: Record<string, unknown> = {
      role: 'EMPLOYEE',
    };

    if (status === 'pending') {
      whereClause.isApproved = false;
    } else if (status === 'approved') {
      whereClause.isApproved = true;
    }

    // Fetch employees
    const employees = await db.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isApproved: true,
        securityLevel: true,
        requestedRole: true,
        createdAt: true,
        approvedAt: true,
        approvedBy: true,
        isBlocked: true,
        accessPermissions: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Get statistics
    const [total, pending, approved] = await Promise.all([
      db.user.count({ where: { role: 'EMPLOYEE' } }),
      db.user.count({ where: { role: 'EMPLOYEE', isApproved: false } }),
      db.user.count({ where: { role: 'EMPLOYEE', isApproved: true } }),
    ]);

    return NextResponse.json({
      employees,
      stats: {
        total,
        pending,
        approved,
      },
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}
