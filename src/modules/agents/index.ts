/**
 * Agents Module
 * Central registry of all agents across the ecosystem
 */

import { BaseModule } from '../core';

export interface AgentInfo {
  name: string;
  repo: string;
  type: 'python' | 'typescript' | 'other';
  category: string;
  description: string;
}

export const ALL_AGENTS: AgentInfo[] = [
  // Python agents from credentials (now in agents/python/)
  { name: 'BackgroundTester', repo: 'agents', type: 'python', category: 'testing', description: 'Tests credential system integrity' },
  { name: 'CredentialDaemon', repo: 'agents', type: 'python', category: 'management', description: 'Persistent background service for credentials' },
  { name: 'CredentialManager', repo: 'agents', type: 'python', category: 'management', description: 'Secure JSON credential handling' },
  { name: 'DashboardGuardian', repo: 'agents', type: 'python', category: 'monitoring', description: 'Monitors repos for problems' },
  { name: 'ImplementSystem', repo: 'agents', type: 'python', category: 'management', description: 'Deploys credential system' },
  { name: 'LaunchAllAgents', repo: 'agents', type: 'python', category: 'orchestration', description: 'Launches multiple agents' },
  { name: 'MasterIntegrator', repo: 'agents', type: 'python', category: 'integration', description: 'Integrates platforms' },
  { name: 'PerfectSyncAgent', repo: 'agents', type: 'python', category: 'sync', description: 'Ensures perfect Git sync' },
  { name: 'ProblemFixer', repo: 'agents', type: 'python', category: 'maintenance', description: 'Auto-fixes linting issues' },
  { name: 'RepoOptimizer', repo: 'agents', type: 'python', category: 'maintenance', description: 'Optimizes repos' },
  { name: 'RepoSyncAgent', repo: 'agents', type: 'python', category: 'sync', description: 'Syncs repos to cloud' },
  { name: 'SimulationTest', repo: 'agents', type: 'python', category: 'testing', description: 'Runs mock tests' },
  { name: 'SystemFixer', repo: 'agents', type: 'python', category: 'maintenance', description: 'Fixes Docker/system issues' },
  { name: 'ValidationAgent', repo: 'agents', type: 'python', category: 'validation', description: 'Validates code quality' },

  // TypeScript agents from agents repo
  { name: 'RepoSyncAgent', repo: 'agents', type: 'typescript', category: 'sync', description: 'Syncs repos, handles PRs' },
  { name: 'MaintenanceAgent', repo: 'agents', type: 'typescript', category: 'maintenance', description: '24/7 auto-maintenance' },
  { name: 'AutoSyncService', repo: 'agents', type: 'typescript', category: 'sync', description: 'Discovers/syncs/builds repos' },
  { name: 'UnifiedAgentOrchestrator', repo: 'agents', type: 'typescript', category: 'orchestration', description: 'Coordinates agents via API' },
  { name: 'BaseModule', repo: 'agents', type: 'typescript', category: 'core', description: 'Base class for modules' },
  { name: 'AgentModuleRegistry', repo: 'agents', type: 'typescript', category: 'core', description: 'Manages module lifecycle' },

  // Python agents from auto_builder (now in agents/python/auto_builder/)
  { name: 'BaseAgent', repo: 'agents', type: 'python', category: 'core', description: 'Base agent class' },
  { name: 'HeadlessCrawlerAgent', repo: 'agents', type: 'python', category: 'scraping', description: 'Fetches web pages' },
  { name: 'HeadlessAgentDesc', repo: 'agents', type: 'python', category: 'core', description: 'Descriptor for headless agents' },
  { name: 'HybridOrchestrator', repo: 'agents', type: 'python', category: 'orchestration', description: 'Enqueues agent tasks' },

  // Python agents from infinity-xos quarantine (now in agents/python/quarantine/)
  { name: 'VSCodeCopilotAgent', repo: 'agents', type: 'python', category: 'integration', description: 'VS Code Copilot integration' },
  { name: 'GitHubCopilotRemoteAgent', repo: 'agents', type: 'python', category: 'integration', description: 'Remote GitHub Copilot' },
  { name: 'SendGridAgent', repo: 'agents', type: 'python', category: 'communication', description: 'Email sending' },
  { name: 'GuardianAgent', repo: 'agents', type: 'python', category: 'security', description: 'Security monitoring' },
  { name: 'KeepAgent', repo: 'agents', type: 'python', category: 'persistence', description: 'Data persistence' },
  { name: 'AgentSpawner', repo: 'agents', type: 'python', category: 'orchestration', description: 'Spawns new agents' },
  { name: 'DriveAgent', repo: 'agents', type: 'python', category: 'integration', description: 'Google Drive integration' },
  { name: 'DocsAgent', repo: 'agents', type: 'python', category: 'integration', description: 'Google Docs handling' },
  { name: 'SheetsAgent', repo: 'agents', type: 'python', category: 'integration', description: 'Google Sheets management' },
  { name: 'TwilioVoiceAgent', repo: 'agents', type: 'python', category: 'communication', description: 'Voice calls' },
  { name: 'TwilioSMSAgent', repo: 'agents', type: 'python', category: 'communication', description: 'SMS sending' },

  // Python agents from industries (now in agents/python/industries/)
  { name: 'AutoValidatePushAgent', repo: 'agents', type: 'python', category: 'validation', description: 'Validates and pushes changes' },

  // TypeScript agents from industries (now in agents/src/agents/)
  { name: 'ShadowAgentPersonality', repo: 'agents', type: 'typescript', category: 'personality', description: 'Shadow operations agent' },
  { name: 'MaintenanceAgentPersonality', repo: 'agents', type: 'typescript', category: 'maintenance', description: 'Maintenance personality agent' },

  // TypeScript agents from vision_cortex (now in agents/src/agents/)
  { name: 'AgentMemory', repo: 'agents', type: 'typescript', category: 'memory', description: 'Tracks agent conversations' },

  // Python agents from crawler_scraper (now in agents/python/crawler_scraper/)
  { name: 'AIDocAgent', repo: 'agents', type: 'python', category: 'documentation', description: 'AI-powered document processing agent' },

  // TypeScript agents from automation (now in agents/src/agents/automation/)
  { name: 'WorkflowDisabler', repo: 'agents', type: 'typescript', category: 'automation', description: 'Disables GitHub workflows' },
  { name: 'GitHubClient', repo: 'agents', type: 'typescript', category: 'integration', description: 'GitHub API client' },
  { name: 'ReportGenerator', repo: 'agents', type: 'typescript', category: 'reporting', description: 'Generates analysis reports' },
  { name: 'Analyzer', repo: 'agents', type: 'typescript', category: 'analysis', description: 'Analyzes repositories' },
  { name: 'Config', repo: 'agents', type: 'typescript', category: 'configuration', description: 'Configuration management' },
  { name: 'Types', repo: 'agents', type: 'typescript', category: 'core', description: 'Type definitions' },
];

export class AgentsModule extends BaseModule {
  constructor() {
    super('agents', '1.0.0');
  }

  async executeTask(taskName: string, params?: unknown): Promise<unknown> {
    switch (taskName) {
      case 'list':
        return ALL_AGENTS;
      case 'getByCategory':
        return ALL_AGENTS.filter(agent => agent.category === params.category);
      case 'getByRepo':
        return ALL_AGENTS.filter(agent => agent.repo === params.repo);
      default:
        return ALL_AGENTS;
    }
  }
}