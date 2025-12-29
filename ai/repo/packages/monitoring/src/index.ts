/**
 * Enterprise Monitoring & Observability
 * FAANG-grade monitoring for InfinityX
 */

import winston from 'winston';
import { collectDefaultMetrics, register } from 'prometheus-api-metrics';
import { trace, metrics } from '@opentelemetry/api';

export interface MonitoringConfig {
  logLevel: string;
  metricsPrefix: string;
  tracing: {
    serviceName: string;
    serviceVersion: string;
  };
}

export class EnterpriseMonitoring {
  private config: MonitoringConfig;
  private logger: winston.Logger;
  private tracer: any;

  constructor(config: MonitoringConfig) {
    this.config = config;
    this.initializeLogger();
    this.initializeMetrics();
    this.initializeTracing();
  }

  private initializeLogger() {
    this.logger = winston.createLogger({
      level: this.config.logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: { service: 'infinityx' },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
      ]
    });
  }

  private initializeMetrics() {
    // Collect default Node.js metrics
    collectDefaultMetrics({ prefix: this.config.metricsPrefix });

    // Custom metrics
    const httpRequestDuration = new metrics.Histogram({
      name: `${this.config.metricsPrefix}http_request_duration_seconds`,
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code']
    });

    register.registerMetric(httpRequestDuration);
  }

  private initializeTracing() {
    this.tracer = trace.getTracer(
      this.config.tracing.serviceName,
      this.config.tracing.serviceVersion
    );
  }

  // Logging methods
  info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  error(message: string, error?: Error, meta?: any) {
    this.logger.error(message, { error: error?.message, stack: error?.stack, ...meta });
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }

  // Tracing
  startSpan(name: string, options?: any) {
    return this.tracer.startSpan(name, options);
  }

  // Metrics
  recordHttpRequest(method: string, route: string, statusCode: number, duration: number) {
    const histogram = register.getSingleMetric(`${this.config.metricsPrefix}http_request_duration_seconds`) as any;
    histogram.observe({ method, route, status_code: statusCode.toString() }, duration);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; uptime: number }> {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  }

  // Performance monitoring
  startPerformanceMonitoring() {
    // Monitor memory usage
    setInterval(() => {
      const memUsage = process.memoryUsage();
      this.logger.info('Memory usage', {
        rss: memUsage.rss,
        heapTotal: memUsage.heapTotal,
        heapUsed: memUsage.heapUsed,
        external: memUsage.external
      });
    }, 30000); // Every 30 seconds
  }
}

export default EnterpriseMonitoring;