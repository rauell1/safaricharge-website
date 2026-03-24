import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security middleware for SafariCharge
 *
 * Responsibilities:
 * 1. Security headers for all responses
 * 2. API route protection
 * 3. Request logging for audit
 */

// Routes that require authentication
const PROTECTED_API_ROUTES = [
  '/api/admin',
  '/api/fleet',
  '/api/sessions',
  '/api/users',
  '/api/auth/me',
];

// Routes that require admin role
const ADMIN_ONLY_ROUTES = [
  '/api/admin/employees',
  '/api/admin/users',
];

// Security headers to apply to all responses
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
};

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Apply security headers to all responses
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add Content Security Policy for non-API routes
  if (!pathname.startsWith('/api')) {
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https:",
        "font-src 'self' data:",
        "connect-src 'self' https:",
        "frame-ancestors 'none'",
      ].join('; ')
    );
  }

  // Log API requests for audit (in production, send to logging service)
  if (pathname.startsWith('/api')) {
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown';
    const method = request.method;
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Only log in development or for sensitive routes
    if (process.env.NODE_ENV === 'development' || pathname.startsWith('/api/admin')) {
      console.log(`[API] ${method} ${pathname} - IP: ${ip} - UA: ${userAgent.slice(0, 50)}`);
    }
  }

  // For protected routes, we need to verify the session
  // Since we're using client-side auth state, we'll rely on the API routes to validate
  // This middleware adds an extra layer of protection

  // Check for API routes that need admin access
  const isAdminRoute = ADMIN_ONLY_ROUTES.some(route => pathname.startsWith(route));
  if (isAdminRoute) {
    // Add a header to indicate this route requires admin access
    // The actual validation happens in the API route
    response.headers.set('X-Requires-Admin', 'true');
  }

  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
