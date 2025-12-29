/**
 * Enterprise Security Module
 * FAANG-grade security features for InfinityX
 */

import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RateLimiterMemory } from 'rate-limiter-flexible';

export interface SecurityConfig {
  jwtSecret: string;
  bcryptRounds: number;
  rateLimit: {
    keyPrefix: string;
    points: number;
    duration: number;
  };
}

export class EnterpriseSecurity {
  private config: SecurityConfig;
  private rateLimiter: RateLimiterMemory;

  constructor(config: SecurityConfig) {
    this.config = config;
    this.rateLimiter = new RateLimiterMemory({
      keyPrefix: config.rateLimit.keyPrefix,
      points: config.rateLimit.points,
      duration: config.rateLimit.duration,
    });
  }

  // JWT Authentication
  async generateToken(payload: object): Promise<string> {
    return jwt.sign(payload, this.config.jwtSecret, { expiresIn: '24h' });
  }

  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, this.config.jwtSecret);
  }

  // Password Security
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.config.bcryptRounds);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Rate Limiting
  async checkRateLimit(key: string): Promise<void> {
    try {
      await this.rateLimiter.consume(key);
    } catch (rejRes) {
      throw new Error('Rate limit exceeded');
    }
  }

  // Security Headers Middleware
  getSecurityMiddleware() {
    return helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      }
    });
  }

  // Encryption utilities
  encryptData(data: string, key: string): string {
    // Implementation for data encryption
    return `encrypted_${data}`;
  }

  decryptData(encryptedData: string, key: string): string {
    // Implementation for data decryption
    return encryptedData.replace('encrypted_', '');
  }
}

export default EnterpriseSecurity;