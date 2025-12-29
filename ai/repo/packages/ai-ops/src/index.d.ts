/**
 * AI Operations - Autonomous System Management
 * FAANG-grade autonomous features for InfinityX
 */
import { AICore } from '@infinityx/core';
import { EnterpriseMonitoring } from '@infinityx/monitoring';
export interface AIOpsConfig {
    autoScaling: {
        enabled: boolean;
        minReplicas: number;
        maxReplicas: number;
        targetCPUUtilization: number;
    };
    anomalyDetection: {
        enabled: boolean;
        sensitivity: number;
        trainingDataSize: number;
    };
    predictiveAnalytics: {
        enabled: boolean;
        forecastHorizon: number;
        modelUpdateInterval: number;
    };
}
export declare class AIOperations {
    private config;
    private aiCore;
    private monitoring;
    private isAutonomous;
    constructor(config: AIOpsConfig, aiCore: AICore, monitoring: EnterpriseMonitoring);
    autoScale(serviceName: string, currentMetrics: any): Promise<{
        action: string;
        replicas: number;
    }>;
    detectAnomalies(metrics: any[]): Promise<{
        anomalies: any[];
        severity: string;
    }>;
    predictResourceNeeds(timeframe: number): Promise<any>;
    selfHeal(issue: any): Promise<{
        action: string;
        success: boolean;
    }>;
    enableAutonomy(): void;
    disableAutonomy(): void;
    private startAutonomousLoop;
    private predictLoad;
    private isAnomalous;
    private getHistoricalMetrics;
    private restartService;
    private rollbackDeployment;
}
export default AIOperations;
//# sourceMappingURL=index.d.ts.map