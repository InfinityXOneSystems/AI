/**
 * Enterprise Security Module
 * FAANG-grade security features for InfinityX
 */
export interface SecurityConfig {
    jwtSecret: string;
    bcryptRounds: number;
    rateLimit: {
        keyPrefix: string;
        points: number;
        duration: number;
    };
}
export declare class EnterpriseSecurity {
    private config;
    private rateLimiter;
    constructor(config: SecurityConfig);
    generateToken(payload: object): Promise<string>;
    verifyToken(token: string): Promise<any>;
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hash: string): Promise<boolean>;
    checkRateLimit(key: string): Promise<void>;
    getSecurityMiddleware(): (req: import("node:http").IncomingMessage, res: import("node:http").ServerResponse, next: (err?: unknown) => void) => void;
    encryptData(data: string, key: string): string;
    decryptData(encryptedData: string, key: string): string;
}
export default EnterpriseSecurity;
//# sourceMappingURL=index.d.ts.map