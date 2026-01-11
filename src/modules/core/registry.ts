/**
 * Module Registry
 * Manages all agent modules and their lifecycle
 */

import { AgentModule, ModuleRegistry, ModuleStatus } from './index';

export class AgentModuleRegistry implements ModuleRegistry {
  private modules: Map<string, AgentModule> = new Map();

  register(module: AgentModule): void {
    if (this.modules.has(module.name)) {
      throw new Error(`Module ${module.name} is already registered`);
    }
    this.modules.set(module.name, module);
    console.log(`📦 Registered module: ${module.name} v${module.version}`);
  }

  unregister(moduleName: string): void {
    if (this.modules.has(moduleName)) {
      this.modules.delete(moduleName);
      console.log(`📦 Unregistered module: ${moduleName}`);
    }
  }

  get(moduleName: string): AgentModule | undefined {
    return this.modules.get(moduleName);
  }

  list(): AgentModule[] {
    return Array.from(this.modules.values());
  }

  async startAll(): Promise<void> {
    console.log('🚀 Starting all modules...');

    for (const module of this.modules.values()) {
      if (module.config.enabled) {
        try {
          await module.init();
          await module.start();
        } catch (error) {
          console.error(`❌ Failed to start module ${module.name}:`, error);
        }
      }
    }

    console.log('✅ All modules started');
  }

  async stopAll(): Promise<void> {
    console.log('🛑 Stopping all modules...');

    for (const module of this.modules.values()) {
      try {
        await module.stop();
      } catch (error) {
        console.error(`❌ Failed to stop module ${module.name}:`, error);
      }
    }

    console.log('✅ All modules stopped');
  }

  async getAllStatuses(): Promise<ModuleStatus[]> {
    const statuses: ModuleStatus[] = [];

    for (const module of this.modules.values()) {
      try {
        const status = await module.getStatus();
        statuses.push(status);
      } catch (error) {
        statuses.push({
          name: module.name,
          status: 'error',
          lastError: error instanceof Error ? error.message : String(error)
        });
      }
    }

    return statuses;
  }

  async executeTask(moduleName: string, taskName: string, params?: unknown): Promise<unknown> {
    const module = this.get(moduleName);
    if (!module) {
      throw new Error(`Module ${moduleName} not found`);
    }

    return await module.executeTask(taskName, params);
  }
}

// Singleton instance
export const moduleRegistry = new AgentModuleRegistry();