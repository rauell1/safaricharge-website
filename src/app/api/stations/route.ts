import { NextRequest } from 'next/server';
import { requireRole } from '@/lib/access-control';
import { stationMutationSchema } from '@/lib/validation';
import { db } from '@/lib/db';
import { createPaginationMeta, handleRouteError, jsonError, jsonSuccess, parsePagination } from '@/lib/api';

const validStationStatuses = new Set(['AVAILABLE', 'OCCUPIED', 'OFFLINE', 'MAINTENANCE'] as const);
const validConnectorTypes = new Set(['CCS2', 'CHADEMO', 'TYPE2', 'TESLA'] as const);
type StationStatusFilter = 'AVAILABLE' | 'OCCUPIED' | 'OFFLINE' | 'MAINTENANCE';
type ConnectorTypeFilter = 'CCS2' | 'CHADEMO' | 'TYPE2' | 'TESLA';

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const earthRadiusKm = 6371;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  return earthRadiusKm * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedStatus = searchParams.get('status');
    const status: StationStatusFilter | null =
      requestedStatus && requestedStatus !== 'all' && validStationStatuses.has(requestedStatus as never)
        ? (requestedStatus as StationStatusFilter)
        : null;
    const requestedConnectorType = searchParams.get('connectorType');
    const connectorType: ConnectorTypeFilter | null =
      requestedConnectorType &&
      requestedConnectorType !== 'all' &&
      validConnectorTypes.has(requestedConnectorType as never)
        ? (requestedConnectorType as ConnectorTypeFilter)
        : null;
    const search = searchParams.get('search')?.trim();
    const lat = searchParams.get('lat') ? Number(searchParams.get('lat')) : null;
    const lng = searchParams.get('lng') ? Number(searchParams.get('lng')) : null;
    const radius = searchParams.get('radius') ? Number(searchParams.get('radius')) : 50;
    const { page, pageSize } = parsePagination(searchParams);

    const stations = await db.chargingStation.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { city: { contains: search } },
                { address: { contains: search } },
              ],
            }
          : {}),
        ...(connectorType
          ? {
              connectors: {
                some: {
                  type: connectorType,
                },
              },
            }
          : {}),
      },
      include: {
        connectors: true,
      },
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    });

    const withDistance =
      lat !== null && lng !== null
        ? stations
            .map((station) => ({
              ...station,
              distance: calculateDistance(lat, lng, station.latitude, station.longitude),
            }))
            .filter((station) => station.distance <= radius)
            .sort((left, right) => left.distance - right.distance)
        : stations;

    const start = (page - 1) * pageSize;
    const paginatedStations = withDistance.slice(start, start + pageSize);

    return jsonSuccess(request, {
      success: true,
      stations: paginatedStations,
      pagination: createPaginationMeta(withDistance.length, page, pageSize),
    });
  } catch (error) {
    return handleRouteError(request, error, { route: '/api/stations' });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireRole(request, ['ADMIN', 'EMPLOYEE']);
    const parsedBody = stationMutationSchema.safeParse(await request.json());

    if (!parsedBody.success) {
      return jsonError(request, 'Invalid station payload.', 400, {
        issues: parsedBody.error.flatten(),
      });
    }

    const station = await db.chargingStation.create({
      data: {
        name: parsedBody.data.name,
        description: parsedBody.data.description,
        address: parsedBody.data.address,
        city: parsedBody.data.city,
        latitude: parsedBody.data.latitude,
        longitude: parsedBody.data.longitude,
        amenities: parsedBody.data.amenities ? JSON.stringify(parsedBody.data.amenities) : null,
        connectors: {
          create: parsedBody.data.connectors.map((connector) => ({
            type: connector.type,
            powerOutput: connector.powerOutput,
            currentPrice: connector.currentPrice,
            status: connector.status || 'AVAILABLE',
          })),
        },
      },
      include: {
        connectors: true,
      },
    });

    return jsonSuccess(
      request,
      {
        success: true,
        station,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleRouteError(request, error, { route: '/api/stations' });
  }
}
