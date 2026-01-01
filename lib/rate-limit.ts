/**
 * Simple in-memory rate limiter
 * For production, use Redis or a dedicated service like Upstash
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000"); // 1 minute
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "5"); // 5 requests per minute

/**
 * Check if request should be rate limited
 * @param identifier - Unique identifier (IP address, email, etc.)
 * @returns true if rate limit exceeded, false otherwise
 */
export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Clean up expired entries periodically
  if (Math.random() < 0.1) {
    cleanupExpiredEntries();
  }

  if (!entry || now > entry.resetTime) {
    // First request or window expired
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  // Increment count
  entry.count++;
  return false;
}

/**
 * Get remaining requests for identifier
 */
export function getRateLimitInfo(identifier: string): {
  limit: number;
  remaining: number;
  resetTime: number;
} {
  const entry = rateLimitStore.get(identifier);
  const now = Date.now();

  if (!entry || now > entry.resetTime) {
    return {
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS,
      resetTime: now + WINDOW_MS,
    };
  }

  return {
    limit: MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - entry.count),
    resetTime: entry.resetTime,
  };
}

/**
 * Clean up expired entries from memory
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Reset rate limit for identifier (use carefully)
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}
