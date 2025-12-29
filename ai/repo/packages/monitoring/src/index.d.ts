/**
 * Enterprise Monitoring & Observability
 * FAANG-grade monitoring for InfinityX
 */
export interface MonitoringConfig {
    logLevel: string;
    metricsPrefix: string;
    tracing: {
        serviceName: string;
        serviceVersion: string;
    };
}
export declare class EnterpriseMonitoring {
    private config;
    private logger;
    private tracer;
    constructor(config: MonitoringConfig);
    private initializeLogger;
    private initializeMetrics;
    private initializeTracing;
    info(message: string, meta?: any): void;
    error(message: string, error?: Error, meta?: any): void;
    warn(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
    startSpan(name: string, options?: any): any;
    recordHttpRequest(method: string, route: string, statusCode: number, duration: number): void;
    healthCheck(): Promise<{
        status: string;
        timestamp: string;
        uptime: number;
    }>;
    startPerformanceMonitoring(): void;
}
export default EnterpriseMonitoring;
//# sourceMappingURL=index.d.ts.map