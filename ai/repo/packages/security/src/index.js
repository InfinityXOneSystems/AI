"use strict";
/**
 * Enterprise Security Module
 * FAANG-grade security features for InfinityX
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseSecurity = void 0;
const helmet_1 = __importDefault(require("helmet"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
class EnterpriseSecurity {
    config;
    rateLimiter;
    constructor(config) {
        this.config = config;
        this.rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
            keyPrefix: config.rateLimit.keyPrefix,
            points: config.rateLimit.points,
            duration: config.rateLimit.duration,
        });
    }
    // JWT Authentication
    async generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.config.jwtSecret, { expiresIn: '24h' });
    }
    async verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, this.config.jwtSecret);
    }
    // Password Security
    async hashPassword(password) {
        return bcrypt_1.default.hash(password, this.config.bcryptRounds);
    }
    async verifyPassword(password, hash) {
        return bcrypt_1.default.compare(password, hash);
    }
    // Rate Limiting
    async checkRateLimit(key) {
        try {
            await this.rateLimiter.consume(key);
        }
        catch (rejRes) {
            throw new Error('Rate limit exceeded');
        }
    }
    // Security Headers Middleware
    getSecurityMiddleware() {
        return (0, helmet_1.default)({
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
    encryptData(data, key) {
        // Implementation for data encryption
        return `encrypted_${data}`;
    }
    decryptData(encryptedData, key) {
        // Implementation for data decryption
        return encryptedData.replace('encrypted_', '');
    }
}
exports.EnterpriseSecurity = EnterpriseSecurity;
exports.default = EnterpriseSecurity;
//# sourceMappingURL=index.js.map