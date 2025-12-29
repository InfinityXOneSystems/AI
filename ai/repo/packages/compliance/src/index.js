"use strict";
/**
 * Enterprise Compliance & Audit Logging
 * GDPR, HIPAA, SOC2 compliance for InfinityX
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseCompliance = void 0;
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs-extra"));
const moment = __importStar(require("moment"));
const uuid_1 = require("uuid");
class EnterpriseCompliance {
    config;
    monitoring;
    auditLogPath;
    constructor(config, monitoring, auditLogPath = './logs/audit') {
        this.config = config;
        this.monitoring = monitoring;
        this.auditLogPath = auditLogPath;
        this.initializeAuditSystem();
    }
    // GDPR Compliance
    async handleDataSubjectRequest(userId, requestType) {
        if (!this.config.gdpr.enabled) {
            throw new Error('GDPR compliance not enabled');
        }
        await this.logAuditEvent({
            id: (0, uuid_1.v4)(),
            timestamp: new Date().toISOString(),
            userId,
            action: `GDPR_${requestType.toUpperCase()}`,
            resource: 'user_data',
            details: { requestType },
            complianceFlags: ['gdpr']
        });
        switch (requestType) {
            case 'access':
                return await this.getUserData(userId);
            case 'delete':
                return await this.deleteUserData(userId);
            case 'rectify':
                return await this.rectifyUserData(userId);
            default:
                throw new Error('Invalid GDPR request type');
        }
    }
    // HIPAA Compliance
    async handlePHI(phiData, action, userId) {
        if (!this.config.hipaa.enabled) {
            throw new Error('HIPAA compliance not enabled');
        }
        const encryptedData = this.config.hipaa.phiEncryption ? this.encryptPHI(phiData) : phiData;
        await this.logAuditEvent({
            id: (0, uuid_1.v4)(),
            timestamp: new Date().toISOString(),
            userId,
            action: `PHI_${action.toUpperCase()}`,
            resource: 'protected_health_information',
            details: { action, dataHash: crypto.createHash('sha256').update(JSON.stringify(phiData)).digest('hex') },
            complianceFlags: ['hipaa', 'phi']
        });
        // Store encrypted PHI data
        await this.storePHI(encryptedData, userId);
    }
    // Audit Logging
    async logAuditEvent(event) {
        if (!this.config.audit.enabled)
            return;
        try {
            const logEntry = {
                ...event,
                hash: this.generateEventHash(event)
            };
            const encryptedEntry = this.config.audit.encryptLogs ? this.encryptAuditLog(logEntry) : logEntry;
            const logFile = `${this.auditLogPath}/${moment().format('YYYY-MM-DD')}.log`;
            await fs.ensureDir(this.auditLogPath);
            await fs.appendFile(logFile, JSON.stringify(encryptedEntry) + '\n');
            this.monitoring.info('Audit event logged', { eventId: event.id, action: event.action });
        }
        catch (error) {
            this.monitoring.error('Failed to log audit event', error, { event });
        }
    }
    // Data Governance
    async enforceDataRetention() {
        const retentionDays = Math.max(this.config.gdpr.dataRetentionDays, this.config.audit.logRetentionDays);
        const cutoffDate = moment().subtract(retentionDays, 'days');
        // Clean up old audit logs
        const logFiles = await fs.readdir(this.auditLogPath);
        for (const file of logFiles) {
            const fileDate = moment(file.replace('.log', ''));
            if (fileDate.isBefore(cutoffDate)) {
                await fs.remove(`${this.auditLogPath}/${file}`);
                this.monitoring.info('Old audit log cleaned up', { file });
            }
        }
        // Clean up old user data
        if (this.config.gdpr.enabled) {
            await this.cleanupExpiredUserData(cutoffDate);
        }
    }
    // Compliance Reporting
    async generateComplianceReport() {
        const report = {
            timestamp: new Date().toISOString(),
            gdpr: {
                enabled: this.config.gdpr.enabled,
                dataRetentionDays: this.config.gdpr.dataRetentionDays,
                consentRequired: this.config.gdpr.consentRequired
            },
            hipaa: {
                enabled: this.config.hipaa.enabled,
                phiEncryption: this.config.hipaa.phiEncryption,
                auditLogRetention: this.config.hipaa.auditLogRetention
            },
            audit: {
                enabled: this.config.audit.enabled,
                logRetentionDays: this.config.audit.logRetentionDays,
                encryptLogs: this.config.audit.encryptLogs
            },
            metrics: await this.getComplianceMetrics()
        };
        return report;
    }
    // Privacy by Design
    async anonymizeData(data, fields) {
        const anonymized = { ...data };
        for (const field of fields) {
            if (anonymized[field]) {
                anonymized[field] = this.hashValue(anonymized[field]);
            }
        }
        await this.logAuditEvent({
            id: (0, uuid_1.v4)(),
            timestamp: new Date().toISOString(),
            action: 'DATA_ANONYMIZED',
            resource: 'user_data',
            details: { fields },
            complianceFlags: ['gdpr', 'privacy']
        });
        return anonymized;
    }
    // Helper methods
    async initializeAuditSystem() {
        await fs.ensureDir(this.auditLogPath);
        this.monitoring.info('Audit system initialized', { logPath: this.auditLogPath });
    }
    encryptPHI(data) {
        const algorithm = 'aes-256-cbc';
        const key = crypto.scryptSync(process.env.PHI_ENCRYPTION_KEY || 'default-key', 'salt', 32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipher(algorithm, key);
        let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }
    decryptPHI(encryptedData) {
        const [ivHex, encrypted] = encryptedData.split(':');
        const algorithm = 'aes-256-cbc';
        const key = crypto.scryptSync(process.env.PHI_ENCRYPTION_KEY || 'default-key', 'salt', 32);
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipher(algorithm, key);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    }
    generateEventHash(event) {
        const eventString = JSON.stringify(event);
        return crypto.createHash('sha256').update(eventString).digest('hex');
    }
    encryptAuditLog(logEntry) {
        // Simplified encryption for audit logs
        const key = process.env.AUDIT_ENCRYPTION_KEY || 'audit-key';
        const cipher = crypto.createCipher('aes-256-cbc', key);
        let encrypted = cipher.update(JSON.stringify(logEntry), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    hashValue(value) {
        return crypto.createHash('sha256').update(String(value)).digest('hex');
    }
    // Mock implementations for data operations
    async getUserData(userId) {
        // Implement actual data retrieval
        return { userId, data: 'mock user data' };
    }
    async deleteUserData(userId) {
        // Implement actual data deletion
        this.monitoring.info('User data deleted', { userId });
    }
    async rectifyUserData(userId) {
        // Implement data rectification
        this.monitoring.info('User data rectified', { userId });
    }
    async storePHI(data, userId) {
        // Implement PHI storage
        this.monitoring.info('PHI data stored', { userId });
    }
    async cleanupExpiredUserData(cutoffDate) {
        // Implement data cleanup
        this.monitoring.info('Expired user data cleaned up', { cutoffDate: cutoffDate.toISOString() });
    }
    async getComplianceMetrics() {
        // Return mock compliance metrics
        return {
            auditEventsLogged: 150,
            gdprRequestsHandled: 5,
            hipaaIncidents: 0,
            dataRetentionCompliance: 'compliant'
        };
    }
}
exports.EnterpriseCompliance = EnterpriseCompliance;
exports.default = EnterpriseCompliance;
//# sourceMappingURL=index.js.map