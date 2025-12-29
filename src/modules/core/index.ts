/**
 * Core Module Interfaces and Types
 * Defines the base contracts for all agent modules
 */

export interface ModuleConfig {
  enabled: boolean;
  name: string;
  version: string;
  dependencies?: string[];
  [key: string]: any;
}

export interface AgentModule {
  name: string;
  version: string;
  config: ModuleConfig;

  /**
   * Initialize the module
   */
  init(config?: Partial<ModuleConfig>): Promise<void>;

  /**
   * Start the module
   */
  start(): Promise<void>;

  /**
   * Stop the module
   */
  stop(): Promise<void>;

  /**
   * Get module status
   */
  getStatus(): Promise<ModuleStatus>;

  /**
   * Execute a specific task
   */
  executeTask(taskName: string, params?: any): Promise<any>;
}

export interface ModuleStatus {
  name: string;
  status: 'stopped' | 'starting' | 'running' | 'stopping' | 'error';
  uptime?: number;
  lastError?: string;
  tasksCompleted?: number;
  [key: string]: any;
}

export interface ModuleRegistry {
  register(module: AgentModule): void;
  unregister(moduleName: string): void;
  get(moduleName: string): AgentModule | undefined;
  list(): AgentModule[];
  startAll(): Promise<void>;
  stopAll(): Promise<void>;
}

export class BaseModule implements AgentModule {
  public name: string;
  public version: string;
  public config: ModuleConfig;
  protected isRunning: boolean = false;
  protected startTime?: number;
  protected errorCount: number = 0;
  protected tasksCompleted: number = 0;

  constructor(name: string, version: string, config: Partial<ModuleConfig> = {}) {
    this.name = name;
    this.version = version;
    this.config = {
      enabled: true,
      name,
      version,
      ...config
    };
  }

  async init(config?: Partial<ModuleConfig>): Promise<void> {
    if (config) {
      this.config = { ...this.config, ...config };
    }
    console.log(`🔧 Initializing ${this.name} v${this.version}`);
  }

  async start(): Promise<void> {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = Date.now();
    console.log(`🚀 Starting ${this.name}`);
  }

  async stop(): Promise<void> {
    if (!this.isRunning) return;

    this.isRunning = false;
    console.log(`🛑 Stopping ${this.name}`);
  }

  async getStatus(): Promise<ModuleStatus> {
    return {
      name: this.name,
      status: this.isRunning ? 'running' : 'stopped',
      uptime: this.startTime ? Date.now() - this.startTime : 0,
      tasksCompleted: this.tasksCompleted
    };
  }

  async executeTask(taskName: string, params?: any): Promise<any> {
    throw new Error(`Task ${taskName} not implemented in ${this.name}`);
  }
}