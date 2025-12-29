#!/usr/bin/env node

/**
 * AI Agent Ecosystem - Unified Platform
 * Main entry point for the comprehensive AI agent ecosystem
 */

import 'dotenv/config';
import { loadAllModules, getModuleRegistry } from './modules';

async function main() {
  console.log('🤖 AI Agent Ecosystem - Unified Platform Starting...');
  console.log('🌟 InfinityX One Systems - AI Agent Ecosystem v1.0.0');
  console.log('================================================');

  try {
    // Load and register all modules
    loadAllModules();

    // Get the module registry
    const registry = getModuleRegistry();

    // Start all modules
    await registry.startAll();

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down gracefully...');
      await registry.stopAll();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n🛑 Shutting down gracefully...');
      await registry.stopAll();
      process.exit(0);
    });

    console.log('✅ AI Agent Ecosystem running successfully');
    console.log('🔄 All modules active and operational');
    console.log('🌐 API available at http://localhost:' + (process.env.PORT || 8080));
    console.log('📊 Monitoring dashboard available');
    console.log('================================================');

  } catch (error) {
    console.error('❌ Failed to start AI Agent Ecosystem:', error);
    process.exit(1);
  }
}

// Start if run directly
if (require.main === module) {
  main();
}

export { loadAllModules, getModuleRegistry };