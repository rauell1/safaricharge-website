import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PATCH - Update employee security level
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { securityLevel } = body;

    if (!securityLevel) {
      return NextResponse.json(
        { error: 'Security level is required' },
        { status: 400 }
      );
    }

    const validLevels = ['BASIC', 'STANDARD', 'ELEVATED', 'MANAGER', 'SUPERVISOR'];
    if (!validLevels.includes(securityLevel)) {
      return NextResponse.json(
        { error: 'Invalid security level' },
        { status: 400 }
      );
    }

    // Check if employee exists
    const employee = await db.user.findUnique({
      where: { id },
    });

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    // Update security level
    const updatedEmployee = await db.user.update({
      where: { id },
      data: { securityLevel },
    });

    console.log(`\n🔒 Security level updated for ${employee.email}: ${securityLevel}\n`);

    return NextResponse.json({
      success: true,
      message: 'Security level updated',
      employee: {
        id: updatedEmployee.id,
        email: updatedEmployee.email,
        securityLevel: updatedEmployee.securityLevel,
      },
    });
  } catch (error) {
    console.error('Error updating security level:', error);
    return NextResponse.json(
      { error: 'Failed to update security level' },
      { status: 500 }
    );
  }
}
