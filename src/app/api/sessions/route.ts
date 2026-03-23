import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch charging sessions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const stationId = searchParams.get('stationId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};
    
    if (userId) {
      where.userId = userId;
    }
    
    if (stationId) {
      where.stationId = stationId;
    }
    
    if (status) {
      where.status = status;
    }

    const sessions = await db.chargingSession.findMany({
      where,
      include: {
        station: {
          include: {
            connectors: true,
          },
        },
        connector: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        startTime: 'desc',
      },
      take: limit,
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}

// POST - Create a new charging session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, stationId, connectorId } = body;

    // Check if connector is available
    const connector = await db.connector.findUnique({
      where: { id: connectorId },
    });

    if (!connector || connector.status !== 'AVAILABLE') {
      return NextResponse.json(
        { error: 'Connector not available' },
        { status: 400 }
      );
    }

    // Start session and update connector status in a transaction
    const session = await db.$transaction(async (tx) => {
      // Update connector status
      await tx.connector.update({
        where: { id: connectorId },
        data: { status: 'OCCUPIED' },
      });

      // Create session
      return tx.chargingSession.create({
        data: {
          userId,
          stationId,
          connectorId,
          status: 'ACTIVE',
        },
        include: {
          station: true,
          connector: true,
        },
      });
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

// PATCH - Update a charging session (end session)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, energyDelivered, cost } = body;

    const session = await db.chargingSession.findUnique({
      where: { id: sessionId },
      include: { connector: true },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // End session and update connector status in a transaction
    const updatedSession = await db.$transaction(async (tx) => {
      // Update connector status back to available
      await tx.connector.update({
        where: { id: session.connectorId },
        data: { status: 'AVAILABLE' },
      });

      // End session
      return tx.chargingSession.update({
        where: { id: sessionId },
        data: {
          status: 'COMPLETED',
          endTime: new Date(),
          energyDelivered,
          cost,
        },
        include: {
          station: true,
          connector: true,
        },
      });
    });

    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    );
  }
}
