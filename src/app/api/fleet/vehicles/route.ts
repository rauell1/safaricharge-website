import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - List vehicles for a fleet
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fleetId = searchParams.get('fleetId');
    const userId = searchParams.get('userId');
    const role = searchParams.get('role');
    
    if (!fleetId) {
      return NextResponse.json({ error: 'Fleet ID is required' }, { status: 400 });
    }
    
    // Verify access
    if (role !== 'ADMIN' && role !== 'EMPLOYEE') {
      // Fleet manager can only see their own fleet's vehicles
      const fleet = await db.fleet.findFirst({
        where: { id: fleetId, ownerId: userId || undefined }
      });
      if (!fleet) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
    
    const vehicles = await db.fleetVehicle.findMany({
      where: { fleetId },
      include: {
        _count: {
          select: { chargingSessions: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({ vehicles });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}

// POST - Add a vehicle to fleet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fleetId, plateNumber, make, model, year, vin, color, batteryCapacity, maxRange, assignedDriver } = body;
    
    if (!fleetId || !plateNumber) {
      return NextResponse.json({ error: 'Fleet ID and plate number are required' }, { status: 400 });
    }
    
    // Check if plate number already exists
    const existing = await db.fleetVehicle.findUnique({
      where: { fleetId_plateNumber: { fleetId, plateNumber } }
    });
    
    if (existing) {
      return NextResponse.json({ error: 'Vehicle with this plate number already exists in fleet' }, { status: 400 });
    }
    
    const vehicle = await db.fleetVehicle.create({
      data: {
        fleetId,
        plateNumber: plateNumber.toUpperCase(),
        make,
        model,
        year,
        vin,
        color,
        batteryCapacity,
        maxRange,
        assignedDriver,
        status: 'ACTIVE'
      }
    });
    
    // Update fleet total vehicles count
    await db.fleet.update({
      where: { id: fleetId },
      data: { totalVehicles: { increment: 1 } }
    });
    
    console.log(`🚗 Vehicle added: ${plateNumber} to fleet ${fleetId}`);
    
    return NextResponse.json({ success: true, vehicle });
  } catch (error) {
    console.error('Error adding vehicle:', error);
    return NextResponse.json({ error: 'Failed to add vehicle' }, { status: 500 });
  }
}

// PUT - Update vehicle
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { vehicleId, make, model, year, vin, color, batteryCapacity, maxRange, status, assignedDriver, currentBatteryLevel } = body;
    
    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }
    
    const vehicle = await db.fleetVehicle.update({
      where: { id: vehicleId },
      data: {
        make,
        model,
        year,
        vin,
        color,
        batteryCapacity,
        maxRange,
        status,
        assignedDriver,
        currentBatteryLevel
      }
    });
    
    return NextResponse.json({ success: true, vehicle });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
  }
}

// DELETE - Remove vehicle from fleet
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vehicleId = searchParams.get('vehicleId');
    
    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }
    
    // Get the fleet ID before deleting
    const vehicle = await db.fleetVehicle.findUnique({
      where: { id: vehicleId },
      select: { fleetId: true }
    });
    
    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }
    
    await db.fleetVehicle.delete({
      where: { id: vehicleId }
    });
    
    // Update fleet total vehicles count
    await db.fleet.update({
      where: { id: vehicle.fleetId },
      data: { totalVehicles: { decrement: 1 } }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 });
  }
}
