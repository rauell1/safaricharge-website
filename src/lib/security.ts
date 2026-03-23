/**
 * Security Configuration and Utilities
 * This file contains security-related constants, types, and utility functions
 */

import { randomBytes } from 'crypto';

// Main admin email - set via MAIN_ADMIN_EMAIL environment variable.
// If not configured, no account will receive ADMIN role on registration
// and admin notification emails will be silently skipped.
export const MAIN_ADMIN_EMAIL = process.env.MAIN_ADMIN_EMAIL || '';

// Session configuration
export const SESSION_CONFIG = {
  // Verification code expiry in minutes
  VERIFICATION_CODE_EXPIRY_MINUTES: 10,
  // Max login attempts before rate limiting
  MAX_LOGIN_ATTEMPTS: 5,
  // Rate limit window in minutes
  RATE_LIMIT_WINDOW_MINUTES: 15,
  // Password minimum length
  MIN_PASSWORD_LENGTH: 8,
  // Password maximum length (prevent DoS)
  MAX_PASSWORD_LENGTH: 128,
  // Verification code length
  VERIFICATION_CODE_LENGTH: 6,
} as const;

// Rate limiting store (in-memory, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Check if an IP is rate limited
 */
export function isRateLimited(identifier: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxAttempts) {
    return true;
  }

  record.count++;
  return false;
}

/**
 * Clear rate limit for an identifier
 */
export function clearRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < SESSION_CONFIG.MIN_PASSWORD_LENGTH) {
    errors.push(`Password must be at least ${SESSION_CONFIG.MIN_PASSWORD_LENGTH} characters`);
  }

  if (password.length > SESSION_CONFIG.MAX_PASSWORD_LENGTH) {
    errors.push(`Password must be less than ${SESSION_CONFIG.MAX_PASSWORD_LENGTH} characters`);
  }

  // Check for at least one uppercase, one lowercase, one number
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate password with simple boolean return
 */
export function isValidPassword(password: string): boolean {
  return validatePassword(password).valid;
}

/**
 * Sanitize string input to prevent XSS
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') return '';
  
  return input
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim();
}

/**
 * Sanitize email
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().slice(0, 254);
}

/**
 * Sanitize phone number (Kenyan format)
 */
export function sanitizePhone(phone: string): string {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  // Ensure it starts with +254 or 0
  if (cleaned.startsWith('+254') && cleaned.length === 13) {
    return cleaned;
  }
  if (cleaned.startsWith('254') && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return `+254${cleaned.slice(1)}`;
  }
  return phone.trim().slice(0, 20);
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Check if user can access admin features
 */
export function canAccessAdmin(userRole: string): boolean {
  return userRole === 'ADMIN';
}

/**
 * Check if user can access employee features
 */
export function canAccessEmployeeFeatures(userRole: string): boolean {
  return userRole === 'ADMIN' || userRole === 'EMPLOYEE';
}

/**
 * Check if user can access fleet features
 */
export function canAccessFleet(userRole: string): boolean {
  return ['ADMIN', 'EMPLOYEE', 'FLEET_MANAGER'].includes(userRole);
}

/**
 * Generate a cryptographically secure random token using Node.js crypto
 */
export function generateSecureToken(length: number = 32): string {
  // Each byte yields 2 hex characters; generate exactly enough bytes then trim.
  // This guarantees `length` hex chars with 4 bits of entropy per character.
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

/**
 * Mask sensitive data for logging
 */
export function maskSensitiveData(data: string, visibleChars: number = 4): string {
  if (data.length <= visibleChars * 2) {
    return '*'.repeat(data.length);
  }
  return `${data.slice(0, visibleChars)}${'*'.repeat(data.length - visibleChars * 2)}${data.slice(-visibleChars)}`;
}

/**
 * Security headers for API responses
 */
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
} as const;

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(response: Response): Response {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}
