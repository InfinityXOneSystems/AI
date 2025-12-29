"use strict";
/**
 * Enterprise Monitoring & Observability
 * FAANG-grade monitoring for InfinityX
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseMonitoring = void 0;
const winston_1 = __importDefault(require("winston"));
const prometheus_api_metrics_1 = require("prometheus-api-metrics");
const api_1 = require("@opentelemetry/api");
class EnterpriseMonitoring {
    config;
    logger;
    tracer;
    constructor(config) {
        this.config = config;
        this.initializeLogger();
        this.initializeMetrics();
        this.initializeTracing();
    }
    initializeLogger() {
        this.logger = winston_1.default.createLogger({
            level: this.config.logLevel,
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json()),
            defaultMeta: { service: 'infinityx' },
            transports: [
                new winston_1.default.transports.Console({
                    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
                }),
                new winston_1.default.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new winston_1.default.transports.File({ filename: 'logs/combined.log' })
            ]
        });
    }
    initializeMetrics() {
        // Collect default Node.js metrics
        (0, prometheus_api_metrics_1.collectDefaultMetrics)({ prefix: this.config.metricsPrefix });
        // Custom metrics
        const httpRequestDuration = new api_1.metrics.Histogram({
            name: `${this.config.metricsPrefix}http_request_duration_seconds`,
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['method', 'route', 'status_code']
        });
        prometheus_api_metrics_1.register.registerMetric(httpRequestDuration);
    }
    initializeTracing() {
        this.tracer = api_1.trace.getTracer(this.config.tracing.serviceName, this.config.tracing.serviceVersion);
    }
    // Logging methods
    info(message, meta) {
        this.logger.info(message, meta);
    }
    error(message, error, meta) {
        this.logger.error(message, { error: error?.message, stack: error?.stack, ...meta });
    }
    warn(message, meta) {
        this.logger.warn(message, meta);
    }
    debug(message, meta) {
        this.logger.debug(message, meta);
    }
    // Tracing
    startSpan(name, options) {
        return this.tracer.startSpan(name, options);
    }
    // Metrics
    recordHttpRequest(method, route, statusCode, duration) {
        const histogram = prometheus_api_metrics_1.register.getSingleMetric(`${this.config.metricsPrefix}http_request_duration_seconds`);
        histogram.observe({ method, route, status_code: statusCode.toString() }, duration);
    }
    // Health check
    async healthCheck() {
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
exports.EnterpriseMonitoring = EnterpriseMonitoring;
exports.default = EnterpriseMonitoring;
//# sourceMappingURL=index.js.map