import { moduleRegistry } from './modules/core/registry';
import { AgentsModule } from './modules/agents';

async function main() {
  // Register modules
  moduleRegistry.register(new AgentsModule());

  // Start all modules
  await moduleRegistry.startAll();

  console.log('🚀 AI Agent Ecosystem Module System Started');
  console.log('📦 Available modules:', moduleRegistry.list().map(m => m.name));
  console.log('🤖 Total agents registered:', (await moduleRegistry.executeTask('agents', 'list')).length);
}

export { moduleRegistry };
export default main;

if (require.main === module) {
  main().catch(console.error);
}