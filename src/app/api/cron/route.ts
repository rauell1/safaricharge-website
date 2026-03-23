import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Verify the request is authorized
  const authHeader = req.headers.get('Authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expectedAuth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Your cron job logic here
  // This runs daily at 10:00 AM UTC
  console.log('Cron job executed at:', new Date().toISOString());

  return NextResponse.json({ ok: true });
}
