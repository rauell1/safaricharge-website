import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - List all fleets (for admin/employee view) or own fleet (for fleet manager)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const role = searchParams.get('role');
    
    let fleets;
    
    if (role === 'ADMIN' || role === 'EMPLOYEE') {
      // Admin and Employee can see all fleets
      fleets = await db.fleet.findMany({
        include: {
          owner: {
            select: {
              id: true,
              email: true,
              name: true,
              phone: true,
            }
          },
          _count: {
            select: { vehicles: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else if (role === 'FLEET_MANAGER' && userId) {
      // Fleet Manager can only see their own fleet
      fleets = await db.fleet.findMany({
        where: { ownerId: userId },
        include: {
          owner: {
            select: {
              id: true,
              email: true,
              name: true,
              phone: true,
            }
          },
          _count: {
            select: { vehicles: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get fleet stats
    const stats = await db.fleet.aggregate({
      _count: { id: true },
      _sum: { totalVehicles: true, totalEnergy: true, totalDistance: true }
    });
    
    // Count by category
    const categoryCounts = await db.fleet.groupBy({
      by: ['category'],
      _count: { id: true }
    });
    
    return NextResponse.json({
      fleets,
      stats: {
        totalFleets: stats._count.id,
        totalVehicles: stats._sum.totalVehicles || 0,
        totalEnergy: stats._sum.totalEnergy || 0,
        totalDistance: stats._sum.totalDistance || 0,
        categoryCounts
      }
    });
  } catch (error) {
    console.error('Error fetching fleets:', error);
    return NextResponse.json({ error: 'Failed to fetch fleets' }, { status: 500 });
  }
}

// POST - Create a new fleet (for fleet manager onboarding)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, category, ownerId, contactEmail, contactPhone, address, city } = body;
    
    if (!name || !ownerId) {
      return NextResponse.json({ error: 'Fleet name and owner ID are required' }, { status: 400 });
    }
    
    // Check if user already has a fleet
    const existingFleet = await db.fleet.findFirst({
      where: { ownerId }
    });
    
    if (existingFleet) {
      return NextResponse.json({ error: 'User already has a fleet', fleet: existingFleet }, { status: 400 });
    }
    
    // Check if user exists in database
    let user = await db.user.findUnique({
      where: { id: ownerId }
    });
    
    // For demo users, create a user record if they don't exist
    if (!user && ownerId.startsWith('demo-')) {
      const demoEmail = ownerId === 'demo-fleet' ? 'fleet@safaricharge.co.ke' : `demo-${ownerId}@demo.com`;
      const demoName = ownerId === 'demo-fleet' ? 'Fleet Manager' : 'Demo User';
      
      try {
        user = await db.user.create({
          data: {
            id: ownerId,
            email: demoEmail,
            name: demoName,
            password: 'demo-password',
            role: 'FLEET_MANAGER',
            subscriptionPlan: 'ENTERPRISE',
            hasPaidAccess: true,
            accessPermissions: 'charging_map,fleet_management',
            isEmailVerified: true,
            isApproved: true,
          }
        });
        console.log(`🆕 Created demo user: ${demoEmail}`);
      } catch (createError) {
        console.error('Error creating demo user:', createError);
        return NextResponse.json({ error: 'Failed to create demo user' }, { status: 500 });
      }
    }
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    if (user.role !== 'FLEET_MANAGER') {
      return NextResponse.json({ error: 'Only fleet managers can create fleets' }, { status: 400 });
    }
    
    const fleet = await db.fleet.create({
      data: {
        name,
        description,
        category: category || 'PERSONAL',
        ownerId,
        contactEmail,
        contactPhone,
        address,
        city
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true
          }
        }
      }
    });
    
    console.log(`🚗 Fleet created: ${name} by ${user.email}`);
    
    return NextResponse.json({ success: true, fleet });
  } catch (error) {
    console.error('Error creating fleet:', error);
    return NextResponse.json({ error: 'Failed to create fleet' }, { status: 500 });
  }
}

// PUT - Update fleet
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { fleetId, name, description, category, contactEmail, contactPhone, address, city } = body;
    
    if (!fleetId) {
      return NextResponse.json({ error: 'Fleet ID is required' }, { status: 400 });
    }
    
    const fleet = await db.fleet.update({
      where: { id: fleetId },
      data: {
        name,
        description,
        category,
        contactEmail,
        contactPhone,
        address,
        city
      }
    });
    
    return NextResponse.json({ success: true, fleet });
  } catch (error) {
    console.error('Error updating fleet:', error);
    return NextResponse.json({ error: 'Failed to update fleet' }, { status: 500 });
  }
}

// DELETE - Delete fleet
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fleetId = searchParams.get('fleetId');
    
    if (!fleetId) {
      return NextResponse.json({ error: 'Fleet ID is required' }, { status: 400 });
    }
    
    // Delete all vehicles and charging sessions first (cascade)
    await db.fleet.delete({
      where: { id: fleetId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting fleet:', error);
    return NextResponse.json({ error: 'Failed to delete fleet' }, { status: 500 });
  }
}
