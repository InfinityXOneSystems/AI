/**
 * Enterprise Compliance & Audit Logging
 * GDPR, HIPAA, SOC2 compliance for InfinityX
 */
import { EnterpriseMonitoring } from '@infinityx/monitoring';
export interface ComplianceConfig {
    gdpr: {
        enabled: boolean;
        dataRetentionDays: number;
        consentRequired: boolean;
    };
    hipaa: {
        enabled: boolean;
        phiEncryption: boolean;
        auditLogRetention: number;
    };
    audit: {
        enabled: boolean;
        logRetentionDays: number;
        encryptLogs: boolean;
    };
}
export interface AuditEvent {
    id: string;
    timestamp: string;
    userId?: string;
    action: string;
    resource: string;
    details: any;
    ipAddress?: string;
    userAgent?: string;
    complianceFlags: string[];
}
export declare class EnterpriseCompliance {
    private config;
    private monitoring;
    private auditLogPath;
    constructor(config: ComplianceConfig, monitoring: EnterpriseMonitoring, auditLogPath?: string);
    handleDataSubjectRequest(userId: string, requestType: 'access' | 'delete' | 'rectify'): Promise<any>;
    handlePHI(phiData: any, action: 'create' | 'access' | 'update' | 'delete', userId: string): Promise<void>;
    logAuditEvent(event: AuditEvent): Promise<void>;
    enforceDataRetention(): Promise<void>;
    generateComplianceReport(): Promise<any>;
    anonymizeData(data: any, fields: string[]): Promise<any>;
    private initializeAuditSystem;
    private encryptPHI;
    private decryptPHI;
    private generateEventHash;
    private encryptAuditLog;
    private hashValue;
    private getUserData;
    private deleteUserData;
    private rectifyUserData;
    private storePHI;
    private cleanupExpiredUserData;
    private getComplianceMetrics;
}
export default EnterpriseCompliance;
//# sourceMappingURL=index.d.ts.map