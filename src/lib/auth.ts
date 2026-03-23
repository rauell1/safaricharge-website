/**
 * Authentication Utilities
 * Handles password hashing, verification, and session management
 */

import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { db } from '@/lib/db';

/**
 * Hash a password using scrypt with a new salt
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

/**
 * Create stored password string from hash and salt
 */
export function createStoredPassword(hash: string, salt: string): string {
  return `${hash}:${salt}`;
}

/**
 * Hash a password and return the full stored format
 */
export function hashPasswordForStorage(password: string): string {
  const { hash, salt } = hashPassword(password);
  return createStoredPassword(hash, salt);
}

/**
 * Verify a password against a stored hash
 * Uses timing-safe comparison to prevent timing attacks
 */
export function verifyPassword(password: string, storedPassword: string): boolean {
  try {
    const [hash, salt] = storedPassword.split(':');
    if (!salt || !hash) return false;
    
    const computedHash = scryptSync(password, salt, 64);
    const storedHashBuffer = Buffer.from(hash, 'hex');
    
    // Use timing-safe comparison
    if (computedHash.length !== storedHashBuffer.length) {
      return false;
    }
    
    return timingSafeEqual(computedHash, storedHashBuffer);
  } catch {
    return false;
  }
}

/**
 * Generate a verification code for 2FA
 */
export function generateVerificationCode(): string {
  // Generate a cryptographically secure 6-digit code
  const buffer = randomBytes(3);
  const code = (buffer.readUIntBE(0, 3) % 900000) + 100000;
  return code.toString();
}

/**
 * Verify user session and get user data
 */
export async function verifyUserSession(userId: string): Promise<{
  valid: boolean;
  user?: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    phone: string | null;
    avatar: string | null;
    subscriptionPlan: string;
    subscriptionExpiry: Date | null;
    hasPaidAccess: boolean;
    accessPermissions: string;
    securityLevel: string | null;
    isBlocked: boolean;
    isApproved: boolean;
  };
}> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        avatar: true,
        subscriptionPlan: true,
        subscriptionExpiry: true,
        hasPaidAccess: true,
        accessPermissions: true,
        securityLevel: true,
        isBlocked: true,
        isApproved: true,
      },
    });

    if (!user) {
      return { valid: false };
    }

    if (user.isBlocked) {
      return { valid: false };
    }

    if (user.role === 'EMPLOYEE' && !user.isApproved) {
      return { valid: false };
    }

    return { valid: true, user };
  } catch (error) {
    console.error('Session verification error:', error);
    return { valid: false };
  }
}

/**
 * Format user data for client response
 */
export function formatUserResponse(user: {
  id: string;
  email: string;
  name: string | null;
  role: string;
  phone: string | null;
  avatar: string | null;
  subscriptionPlan: string;
  subscriptionExpiry: Date | null;
  hasPaidAccess: boolean;
  accessPermissions: string;
  securityLevel: string | null;
}): Record<string, unknown> {
  // Ensure ADMIN always has premium rights
  const isAdmin = user.role === 'ADMIN';
  const allPermissions = ['charging_map', 'battery_toolkit', 'analytics', 'user_management', 'fleet_management'];

  let subscriptionPlan = user.subscriptionPlan;
  let hasPaidAccess = user.hasPaidAccess;
  let accessPermissions = user.accessPermissions;

  if (isAdmin) {
    subscriptionPlan = 'ENTERPRISE';
    hasPaidAccess = true;
    accessPermissions = allPermissions.join(',');
  }

  // Parse permissions string to array
  const permissionsArray = accessPermissions
    ? accessPermissions.split(',').filter(Boolean)
    : ['charging_map'];

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone,
    avatar: user.avatar,
    subscriptionPlan,
    subscriptionExpiry: user.subscriptionExpiry?.toISOString() || null,
    hasPaidAccess,
    accessPermissions: permissionsArray,
    securityLevel: user.securityLevel,
  };
}

/**
 * Check if user has specific permission
 */
export function hasPermission(user: { accessPermissions: string }, permission: string): boolean {
  return user.accessPermissions.includes(permission);
}
