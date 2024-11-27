import { z } from 'zod';
import { SignJWT, jwtVerify } from 'jose';
import { auth } from '../../config/firebase';
import type { User } from './types';

// Rate limiting configuration
const RATE_LIMIT = {
  MAX_ATTEMPTS: 5,
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  LOCKOUT_MS: 60 * 60 * 1000, // 1 hour
};

// In-memory store for rate limiting (should use Redis in production)
const loginAttempts = new Map<string, { count: number; timestamp: number }>();

export async function checkRateLimit(identifier: string): Promise<boolean> {
  const now = Date.now();
  const attempt = loginAttempts.get(identifier);

  if (!attempt) {
    loginAttempts.set(identifier, { count: 1, timestamp: now });
    return true;
  }

  if (now - attempt.timestamp > RATE_LIMIT.WINDOW_MS) {
    loginAttempts.set(identifier, { count: 1, timestamp: now });
    return true;
  }

  if (attempt.count >= RATE_LIMIT.MAX_ATTEMPTS) {
    if (now - attempt.timestamp < RATE_LIMIT.LOCKOUT_MS) {
      throw new Error('Too many login attempts. Please try again later.');
    }
    loginAttempts.delete(identifier);
    return true;
  }

  attempt.count += 1;
  return true;
}

// JWT token generation and verification
const JWT_SECRET = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);

export async function generateToken(user: User): Promise<string> {
  return new SignJWT({ sub: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// Password validation schema with strong requirements
export const passwordValidation = z.object({
  password: z.string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
});

// CSRF token generation and validation
const CSRF_TOKENS = new Set<string>();

export function generateCSRFToken(): string {
  const token = crypto.randomUUID();
  CSRF_TOKENS.add(token);
  return token;
}

export function validateCSRFToken(token: string): boolean {
  const isValid = CSRF_TOKENS.has(token);
  if (isValid) {
    CSRF_TOKENS.delete(token);
  }
  return isValid;
}

// Session management
export async function validateSession(token: string): Promise<boolean> {
  try {
    const isValid = await verifyToken(token);
    if (!isValid) return false;

    // Check if user's token is revoked or invalidated
    const user = auth.currentUser;
    if (!user) return false;

    // Verify email if required
    if (!user.emailVerified) {
      throw new Error('Email not verified');
    }

    return true;
  } catch {
    return false;
  }
}

// Security headers configuration
export const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' https: data:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://api.openai.com https://*.firebaseio.com;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};