import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST - Reject/delete an employee application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeId } = body;

    if (!employeeId) {
      return NextResponse.json(
        { error: 'Employee ID is required' },
        { status: 400 }
      );
    }

    // Check if employee exists and is pending
    const employee = await db.user.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    if (employee.role !== 'EMPLOYEE') {
      return NextResponse.json(
        { error: 'User is not an employee' },
        { status: 400 }
      );
    }

    // Delete the employee (reject their application)
    await db.user.delete({
      where: { id: employeeId },
    });

    console.log(`\n❌ Employee application rejected: ${employee.email}\n`);

    return NextResponse.json({
      success: true,
      message: 'Employee application rejected',
    });
  } catch (error) {
    console.error('Error rejecting employee:', error);
    return NextResponse.json(
      { error: 'Failed to reject employee' },
      { status: 500 }
    );
  }
}
