import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch all stations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const connectorType = searchParams.get('connectorType');
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');
    const radius = parseFloat(searchParams.get('radius') || '50'); // km

    const stations = await db.chargingStation.findMany({
      include: {
        connectors: true,
      },
    });

    // Filter by status if provided
    let filteredStations = stations;
    if (status && status !== 'all') {
      filteredStations = filteredStations.filter(s => s.status === status);
    }

    // Filter by connector type if provided
    if (connectorType && connectorType !== 'all') {
      filteredStations = filteredStations.filter(s => 
        s.connectors.some(c => c.type === connectorType)
      );
    }

    // Calculate distance if lat/lng provided
    if (lat && lng) {
      filteredStations = filteredStations.map(station => {
        const distance = calculateDistance(lat, lng, station.latitude, station.longitude);
        return { ...station, distance };
      });

      // Filter by radius
      filteredStations = filteredStations.filter(s => 
        (s as any).distance <= radius
      );

      // Sort by distance
      filteredStations.sort((a, b) => 
        ((a as any).distance || 0) - ((b as any).distance || 0)
      );
    }

    return NextResponse.json(filteredStations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stations' },
      { status: 500 }
    );
  }
}

// POST - Create a new station
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, address, city, latitude, longitude, connectors, amenities } = body;

    const station = await db.chargingStation.create({
      data: {
        name,
        description,
        address,
        city,
        latitude,
        longitude,
        amenities: amenities ? JSON.stringify(amenities) : null,
        connectors: {
          create: connectors?.map((c: any) => ({
            type: c.type,
            powerOutput: c.powerOutput,
            currentPrice: c.currentPrice,
            status: c.status || 'AVAILABLE',
          })) || [],
        },
      },
      include: {
        connectors: true,
      },
    });

    return NextResponse.json(station, { status: 201 });
  } catch (error) {
    console.error('Error creating station:', error);
    return NextResponse.json(
      { error: 'Failed to create station' },
      { status: 500 }
    );
  }
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
