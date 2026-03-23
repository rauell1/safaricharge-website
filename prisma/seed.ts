import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@safaricharge.com' },
    update: {},
    create: {
      email: 'admin@safaricharge.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      phone: '+254 720 000 000',
    },
  });

  // Create driver user
  const driverPassword = await bcrypt.hash('driver123', 10);
  const driver = await prisma.user.upsert({
    where: { email: 'driver@example.com' },
    update: {},
    create: {
      email: 'driver@example.com',
      name: 'John Doe',
      password: driverPassword,
      role: 'DRIVER',
      phone: '+254 712 345 678',
    },
  });

  // Create fleet manager
  const fleetPassword = await bcrypt.hash('fleet123', 10);
  const fleetManager = await prisma.user.upsert({
    where: { email: 'fleet@logistics.com' },
    update: {},
    create: {
      email: 'fleet@logistics.com',
      name: 'Fleet Manager',
      password: fleetPassword,
      role: 'FLEET_MANAGER',
      phone: '+254 733 222 111',
    },
  });

  // Create charging stations
  await Promise.all([
    prisma.chargingStation.upsert({
      where: { id: 'station-1' },
      update: {},
      create: {
        id: 'station-1',
        name: 'SafariCharge Central Hub',
        description: 'Our flagship charging station with premium amenities including a lounge, cafe, and restrooms.',
        address: '123 Electric Avenue',
        city: 'Nairobi',
        latitude: -1.2921,
        longitude: 36.8219,
        status: 'AVAILABLE',
        rating: 4.8,
        reviewCount: 234,
        isOpen24h: true,
        amenities: JSON.stringify(['Cafe', 'Restrooms', 'Lounge', 'WiFi', 'Shopping']),
      },
    }),
    prisma.chargingStation.upsert({
      where: { id: 'station-2' },
      update: {},
      create: {
        id: 'station-2',
        name: 'Westlands Express Charge',
        description: 'Quick charging for busy professionals. Located near major shopping centers.',
        address: '45 Westlands Road',
        city: 'Nairobi',
        latitude: -1.2634,
        longitude: 36.8030,
        status: 'AVAILABLE',
        rating: 4.5,
        reviewCount: 156,
        isOpen24h: false,
        amenities: JSON.stringify(['Restrooms', 'WiFi', 'Convenience Store']),
      },
    }),
    prisma.chargingStation.upsert({
      where: { id: 'station-3' },
      update: {},
      create: {
        id: 'station-3',
        name: 'Airport Gateway Station',
        description: 'Convenient charging while you travel. Long-term parking available.',
        address: 'Jomo Kenyatta International Airport',
        city: 'Nairobi',
        latitude: -1.3192,
        longitude: 36.9278,
        status: 'OCCUPIED',
        rating: 4.6,
        reviewCount: 89,
        isOpen24h: true,
        amenities: JSON.stringify(['Parking', 'Restrooms', 'WiFi', 'Shuttle Service']),
      },
    }),
    prisma.chargingStation.upsert({
      where: { id: 'station-4' },
      update: {},
      create: {
        id: 'station-4',
        name: 'Mombasa Road Service Center',
        description: 'Full service station with vehicle maintenance and charging capabilities.',
        address: 'Mombasa Road Highway',
        city: 'Nairobi',
        latitude: -1.3310,
        longitude: 36.8940,
        status: 'AVAILABLE',
        rating: 4.3,
        reviewCount: 67,
        isOpen24h: true,
        amenities: JSON.stringify(['Vehicle Service', 'Restrooms', 'Restaurant', 'Parking']),
      },
    }),
    prisma.chargingStation.upsert({
      where: { id: 'station-5' },
      update: {},
      create: {
        id: 'station-5',
        name: 'Karen Green Station',
        description: 'Eco-friendly station powered by solar energy. Beautiful garden setting.',
        address: 'Karen Shopping Centre',
        city: 'Nairobi',
        latitude: -1.3187,
        longitude: 36.7104,
        status: 'AVAILABLE',
        rating: 4.9,
        reviewCount: 178,
        isOpen24h: false,
        amenities: JSON.stringify(['Garden', 'Organic Cafe', 'WiFi', 'Bike Charging']),
      },
    }),
    prisma.chargingStation.upsert({
      where: { id: 'station-6' },
      update: {},
      create: {
        id: 'station-6',
        name: 'Industrial Area Power Hub',
        description: 'High-capacity charging for fleet vehicles and heavy-duty equipment.',
        address: 'Industrial Area Zone A',
        city: 'Nairobi',
        latitude: -1.3050,
        longitude: 36.8550,
        status: 'AVAILABLE',
        rating: 4.2,
        reviewCount: 45,
        isOpen24h: true,
        amenities: JSON.stringify(['Fleet Parking', 'Restrooms', '24/7 Security']),
      },
    }),
  ]);

  // Create connectors for each station
  const connectorData = [
    // Station 1
    { id: 'conn-1', stationId: 'station-1', type: 'CCS2' as const, powerOutput: 150, currentPrice: 0.35, status: 'AVAILABLE' as const },
    { id: 'conn-2', stationId: 'station-1', type: 'CCS2' as const, powerOutput: 150, currentPrice: 0.35, status: 'OCCUPIED' as const },
    { id: 'conn-3', stationId: 'station-1', type: 'CHADEMO' as const, powerOutput: 100, currentPrice: 0.30, status: 'AVAILABLE' as const },
    { id: 'conn-4', stationId: 'station-1', type: 'TYPE2' as const, powerOutput: 22, currentPrice: 0.25, status: 'AVAILABLE' as const },
    // Station 2
    { id: 'conn-5', stationId: 'station-2', type: 'CCS2' as const, powerOutput: 50, currentPrice: 0.32, status: 'AVAILABLE' as const },
    { id: 'conn-6', stationId: 'station-2', type: 'TYPE2' as const, powerOutput: 22, currentPrice: 0.25, status: 'AVAILABLE' as const },
    // Station 3
    { id: 'conn-7', stationId: 'station-3', type: 'CCS2' as const, powerOutput: 150, currentPrice: 0.38, status: 'OCCUPIED' as const },
    { id: 'conn-8', stationId: 'station-3', type: 'CCS2' as const, powerOutput: 150, currentPrice: 0.38, status: 'OCCUPIED' as const },
    { id: 'conn-9', stationId: 'station-3', type: 'TESLA' as const, powerOutput: 250, currentPrice: 0.42, status: 'AVAILABLE' as const },
    // Station 4
    { id: 'conn-10', stationId: 'station-4', type: 'CCS2' as const, powerOutput: 100, currentPrice: 0.33, status: 'AVAILABLE' as const },
    { id: 'conn-11', stationId: 'station-4', type: 'CHADEMO' as const, powerOutput: 100, currentPrice: 0.30, status: 'MAINTENANCE' as const },
    { id: 'conn-12', stationId: 'station-4', type: 'TYPE2' as const, powerOutput: 22, currentPrice: 0.25, status: 'AVAILABLE' as const },
    // Station 5
    { id: 'conn-13', stationId: 'station-5', type: 'TYPE2' as const, powerOutput: 22, currentPrice: 0.22, status: 'AVAILABLE' as const },
    { id: 'conn-14', stationId: 'station-5', type: 'TYPE2' as const, powerOutput: 11, currentPrice: 0.20, status: 'AVAILABLE' as const },
    // Station 6
    { id: 'conn-15', stationId: 'station-6', type: 'CCS2' as const, powerOutput: 350, currentPrice: 0.40, status: 'AVAILABLE' as const },
    { id: 'conn-16', stationId: 'station-6', type: 'CCS2' as const, powerOutput: 350, currentPrice: 0.40, status: 'AVAILABLE' as const },
    { id: 'conn-17', stationId: 'station-6', type: 'CHADEMO' as const, powerOutput: 200, currentPrice: 0.35, status: 'OFFLINE' as const },
  ];

  for (const connector of connectorData) {
    await prisma.connector.upsert({
      where: { id: connector.id },
      update: {},
      create: connector,
    });
  }

  // Create some charging sessions
  const sessions = [
    {
      id: 'session-1',
      userId: driver.id,
      stationId: 'station-1',
      connectorId: 'conn-2',
      status: 'COMPLETED' as const,
      startTime: new Date('2024-12-01T10:30:00'),
      endTime: new Date('2024-12-01T11:45:00'),
      energyDelivered: 45.5,
      cost: 15.93,
    },
    {
      id: 'session-2',
      userId: driver.id,
      stationId: 'station-2',
      connectorId: 'conn-5',
      status: 'COMPLETED' as const,
      startTime: new Date('2024-11-28T14:00:00'),
      endTime: new Date('2024-11-28T15:30:00'),
      energyDelivered: 38.2,
      cost: 12.22,
    },
    {
      id: 'session-3',
      userId: driver.id,
      stationId: 'station-5',
      connectorId: 'conn-13',
      status: 'COMPLETED' as const,
      startTime: new Date('2024-11-20T09:00:00'),
      endTime: new Date('2024-11-20T10:15:00'),
      energyDelivered: 22.8,
      cost: 5.02,
    },
  ];

  for (const session of sessions) {
    await prisma.chargingSession.upsert({
      where: { id: session.id },
      update: {},
      create: session,
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('\n📋 Test Accounts:');
  console.log('  Admin: admin@safaricharge.com / admin123');
  console.log('  Driver: driver@example.com / driver123');
  console.log('  Fleet Manager: fleet@logistics.com / fleet123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
