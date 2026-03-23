import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Lazy-initialize Resend to avoid build errors when API key is missing
let resend: Resend | null = null;

function getResendClient(): Resend | null {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Main admin email
const MAIN_ADMIN_EMAIL = 'royokola3@gmail.com';

// Email templates
function getVerificationEmailHtml(code: string, name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - SafariCharge</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #235347 0%, #163832 100%); padding: 30px; text-align: center;">
            <div style="display: inline-flex; align-items: center; gap: 10px;">
              <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #8EB69B 0%, #235347 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 24px;">⚡</span>
              </div>
              <div style="text-align: left;">
                <span style="font-size: 24px; font-weight: bold; color: #ffffff;">SafariCharge</span>
                <p style="font-size: 10px; color: #8EB69B; margin: 0;">POWERING AFRICA'S FUTURE</p>
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h1 style="color: #051F20; font-size: 24px; margin: 0 0 10px 0;">Hi ${name},</h1>
            <p style="color: #235347; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              Please verify your email address to complete your account setup. Use the verification code below:
            </p>
            
            <!-- Code Box -->
            <div style="background: linear-gradient(135deg, #DAF1DE 0%, #f0f7f5 100%); border: 2px solid #8EB69B; border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px;">
              <p style="color: #235347; font-size: 14px; margin: 0 0 10px 0;">Your verification code is:</p>
              <p style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #235347; margin: 0; font-family: 'Courier New', monospace;">${code}</p>
            </div>
            
            <p style="color: #235347; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
              This code will expire in <strong>10 minutes</strong>. If you didn't request this code, please ignore this email.
            </p>
            
            <div style="background-color: #f0f7f5; border-radius: 8px; padding: 20px; margin-top: 30px;">
              <p style="color: #235347; font-size: 13px; margin: 0;">
                <strong>Security Tip:</strong> Never share your verification code with anyone. SafariCharge will never ask for your code via phone or email.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e5e5;">
            <p style="color: #666666; font-size: 12px; margin: 0;">
              © 2025 SafariCharge Ltd. All rights reserved.<br>
              Nairobi, Kenya
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function getEmployeePendingEmailHtml(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Received - SafariCharge</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #235347 0%, #163832 100%); padding: 30px; text-align: center;">
            <div style="display: inline-flex; align-items: center; gap: 10px;">
              <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #8EB69B 0%, #235347 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 24px;">⚡</span>
              </div>
              <div style="text-align: left;">
                <span style="font-size: 24px; font-weight: bold; color: #ffffff;">SafariCharge</span>
                <p style="font-size: 10px; color: #8EB69B; margin: 0;">POWERING AFRICA'S FUTURE</p>
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h1 style="color: #051F20; font-size: 24px; margin: 0 0 10px 0;">Hello ${name},</h1>
            <p style="color: #235347; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              Thank you for registering as a SafariCharge employee. Your application has been received and is pending review by our administration team.
            </p>
            
            <!-- Status Box -->
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px;">
              <p style="color: #92400e; font-size: 14px; margin: 0 0 10px 0;">Application Status:</p>
              <p style="font-size: 24px; font-weight: bold; color: #92400e; margin: 0;">
                ⏳ Pending Approval
              </p>
            </div>
            
            <p style="color: #235347; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Once approved, you will receive an email notification with instructions to access your employee account.
            </p>
            
            <div style="background-color: #f0f7f5; border-radius: 8px; padding: 20px; margin-top: 30px;">
              <p style="color: #235347; font-size: 13px; margin: 0;">
                <strong>What happens next?</strong><br>
                1. Our admin team reviews your application<br>
                2. Your security level is assigned based on your role<br>
                3. You'll receive an approval email with login instructions
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e5e5;">
            <p style="color: #666666; font-size: 12px; margin: 0;">
              © 2025 SafariCharge Ltd. All rights reserved.<br>
              Nairobi, Kenya
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function getEmployeeApprovedEmailHtml(name: string, securityLevel: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to SafariCharge Team!</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #235347 0%, #163832 100%); padding: 30px; text-align: center;">
            <div style="display: inline-flex; align-items: center; gap: 10px;">
              <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #8EB69B 0%, #235347 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 24px;">⚡</span>
              </div>
              <div style="text-align: left;">
                <span style="font-size: 24px; font-weight: bold; color: #ffffff;">SafariCharge</span>
                <p style="font-size: 10px; color: #8EB69B; margin: 0;">POWERING AFRICA'S FUTURE</p>
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h1 style="color: #051F20; font-size: 24px; margin: 0 0 10px 0;">Welcome to the Team, ${name}! 🎉</h1>
            <p style="color: #235347; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              Congratulations! Your SafariCharge employee account has been approved. You can now log in and access the platform.
            </p>
            
            <!-- Status Box -->
            <div style="background: linear-gradient(135deg, #DAF1DE 0%, #d1fae5 100%); border: 2px solid #8EB69B; border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px;">
              <p style="color: #235347; font-size: 14px; margin: 0 0 10px 0;">Account Status:</p>
              <p style="font-size: 24px; font-weight: bold; color: #235347; margin: 0;">
                ✅ Approved
              </p>
              <p style="color: #235347; font-size: 14px; margin: 15px 0 0 0;">
                Security Level: <strong>${securityLevel}</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://safaricharge.co.ke" style="display: inline-block; background: linear-gradient(135deg, #235347 0%, #163832 100%); color: #ffffff; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                Log In Now
              </a>
            </div>
            
            <div style="background-color: #f0f7f5; border-radius: 8px; padding: 20px; margin-top: 30px;">
              <p style="color: #235347; font-size: 13px; margin: 0;">
                <strong>Your Security Level: ${securityLevel}</strong><br>
                This determines your access permissions within the platform. Contact your administrator if you need elevated access.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e5e5;">
            <p style="color: #666666; font-size: 12px; margin: 0;">
              © 2025 SafariCharge Ltd. All rights reserved.<br>
              Nairobi, Kenya
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function getNewEmployeeNotificationHtml(name: string, email: string, phone: string | null): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Employee Registration - SafariCharge Admin</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #235347 0%, #163832 100%); padding: 30px; text-align: center;">
            <div style="display: inline-flex; align-items: center; gap: 10px;">
              <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #8EB69B 0%, #235347 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 24px;">⚡</span>
              </div>
              <div style="text-align: left;">
                <span style="font-size: 24px; font-weight: bold; color: #ffffff;">SafariCharge</span>
                <p style="font-size: 10px; color: #8EB69B; margin: 0;">ADMIN NOTIFICATION</p>
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h1 style="color: #051F20; font-size: 24px; margin: 0 0 10px 0;">New Employee Registration</h1>
            <p style="color: #235347; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              A new employee has registered and is awaiting your approval.
            </p>
            
            <!-- Employee Details Box -->
            <div style="background: #f0f7f5; border: 2px solid #8EB69B; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
              <h3 style="color: #051F20; font-size: 18px; margin: 0 0 15px 0;">Applicant Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #235347; font-weight: 500;">Name:</td>
                  <td style="padding: 8px 0; color: #051F20;">${name || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #235347; font-weight: 500;">Email:</td>
                  <td style="padding: 8px 0; color: #051F20;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #235347; font-weight: 500;">Phone:</td>
                  <td style="padding: 8px 0; color: #051F20;">${phone || 'Not provided'}</td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://safaricharge.co.ke" style="display: inline-block; background: linear-gradient(135deg, #235347 0%, #163832 100%); color: #ffffff; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                Review in Admin Dashboard
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e5e5;">
            <p style="color: #666666; font-size: 12px; margin: 0;">
              © 2025 SafariCharge Ltd. All rights reserved.<br>
              This is an automated notification from SafariCharge Admin
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, to, data } = body;

    if (!type || !to) {
      return NextResponse.json(
        { error: 'Missing required fields: type, to' },
        { status: 400 }
      );
    }

    let subject: string;
    let html: string;

    switch (type) {
      case 'verification':
        subject = 'Your SafariCharge Verification Code';
        html = getVerificationEmailHtml(data.code, data.name || 'User');
        break;
      
      case 'employee_pending':
        subject = 'Registration Received - SafariCharge';
        html = getEmployeePendingEmailHtml(data.name || 'User');
        break;
      
      case 'employee_approved':
        subject = 'Welcome to SafariCharge Team!';
        html = getEmployeeApprovedEmailHtml(data.name || 'User', data.securityLevel || 'BASIC');
        break;
      
      case 'new_employee_notification':
        subject = 'New Employee Registration Pending Approval';
        html = getNewEmployeeNotificationHtml(data.name, data.email, data.phone);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    // Get Resend client (may be null if API key is not configured)
    const resendClient = getResendClient();
    
    if (!resendClient) {
      console.warn('⚠️ Resend API key not configured. Email would have been sent to:', to);
      console.log(`\n📧 [DEV MODE] Email simulation:
      Type: ${type}
      To: ${to}
      Subject: ${subject}
      \n`);
      
      // Return success in development mode
      return NextResponse.json({
        success: true,
        message: 'Email simulated (Resend API key not configured)',
        devMode: true,
      });
    }

    // Send email using Resend
    // Note: In test mode, use onboarding@resend.dev as sender
    const { data: emailData, error } = await resendClient.emails.send({
      from: 'SafariCharge <onboarding@resend.dev>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    console.log(`\n📧 Email sent successfully to ${to}: ${type} (ID: ${emailData?.id})\n`);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      emailId: emailData?.id,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// Export admin email for use in other API routes
export { MAIN_ADMIN_EMAIL };
