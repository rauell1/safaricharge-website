import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { MAIN_ADMIN_EMAIL } from '@/lib/security';

// Helper function to send email
async function sendEmail(type: string, to: string | string[], data: Record<string, unknown>) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, to, data }),
    });
    
    const result = await response.json();
    if (!response.ok) {
      console.error('Email send failed:', result);
    }
    return result;
  } catch (error) {
    console.error('Email send error:', error);
    return { error: 'Failed to send email' };
  }
}

// POST - Approve an employee
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeId, securityLevel, approvedBy } = body;

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

    if (employee.isApproved) {
      return NextResponse.json(
        { error: 'Employee is already approved' },
        { status: 400 }
      );
    }

    const assignedSecurityLevel = securityLevel || 'BASIC';

    // Update employee with approval
    const updatedEmployee = await db.user.update({
      where: { id: employeeId },
      data: {
        isApproved: true,
        securityLevel: assignedSecurityLevel,
        approvedBy: approvedBy,
        approvedAt: new Date(),
      },
    });

    // Send approval email to employee
    await sendEmail('employee_approved', employee.email, {
      name: employee.name,
      securityLevel: assignedSecurityLevel,
    });

    console.log(`\n✅ Employee approved: ${employee.email} (Security Level: ${assignedSecurityLevel})\n`);

    return NextResponse.json({
      success: true,
      message: 'Employee approved successfully. Approval email sent.',
      employee: {
        id: updatedEmployee.id,
        email: updatedEmployee.email,
        name: updatedEmployee.name,
        securityLevel: updatedEmployee.securityLevel,
        approvedAt: updatedEmployee.approvedAt,
      },
    });
  } catch (error) {
    console.error('Error approving employee:', error);
    return NextResponse.json(
      { error: 'Failed to approve employee' },
      { status: 500 }
    );
  }
}
