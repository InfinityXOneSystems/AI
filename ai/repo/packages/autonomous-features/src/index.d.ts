/**
 * Autonomous Features - Self-Healing, AI Decisions, Auto-Optimization
 * FAANG-grade autonomous capabilities for InfinityX
 */
import { AICore } from '@infinityx/core';
import { EnterpriseMonitoring } from '@infinityx/monitoring';
import { AIOperations } from '@infinityx/ai-ops';
export interface AutonomousConfig {
    selfHealing: {
        enabled: boolean;
        maxRetries: number;
        healingStrategies: string[];
    };
    aiDecisions: {
        enabled: boolean;
        confidenceThreshold: number;
        decisionHistorySize: number;
    };
    autoOptimization: {
        enabled: boolean;
        optimizationInterval: string;
        metricsWindow: number;
    };
}
export interface HealingStrategy {
    name: string;
    condition: (issue: any) => boolean;
    action: (issue: any) => Promise<void>;
    priority: number;
}
export declare class AutonomousFeatures {
    private config;
    private aiCore;
    private monitoring;
    private aiOps;
    private decisionModel;
    private healingStrategies;
    private decisionHistory;
    private isActive;
    constructor(config: AutonomousConfig, aiCore: AICore, monitoring: EnterpriseMonitoring, aiOps: AIOperations);
    selfHeal(issue: any): Promise<{
        success: boolean;
        strategy: string;
        actions: string[];
    }>;
    makeAutonomousDecision(context: any, options: any[]): Promise<{
        decision: any;
        confidence: number;
        reasoning: string;
    }>;
    optimizeSystem(): Promise<{
        optimizations: any[];
        impact: any;
    }>;
    activate(): void;
    deactivate(): void;
    learnFromFeedback(feedback: {
        decision: any;
        outcome: 'positive' | 'negative';
        context: any;
    }): Promise<void>;
    private initializeDecisionModel;
    private initializeHealingStrategies;
    private startAutonomousLoop;
    private scheduleOptimizations;
    private prepareDecisionInput;
    private generateDecisionReasoning;
    private gatherOptimizationMetrics;
    private identifyOptimizations;
    private predictOptimizationImpact;
    private applyOptimization;
    private prepareTrainingData;
    private updateDecisionModel;
    private restartService;
    private rollbackDeployment;
    private clearCache;
    private performMaintenance;
    private getAverageMetric;
    private optimizeMemoryUsage;
    private optimizeDatabaseQueries;
}
export default AutonomousFeatures;
//# sourceMappingURL=index.d.ts.map