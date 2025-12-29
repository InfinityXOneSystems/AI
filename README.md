# AI Agent Ecosystem - Module System

This repository contains the unified module system for the AI Agent Ecosystem, providing a centralized registry and management system for all agents across the organization.

## Features

- **Modular Architecture**: Pluggable modules for different agent categories
- **Central Registry**: Unified management of all agent modules
- **Cross-Repo Integration**: References agents from all repositories
- **TypeScript Support**: Modern TypeScript implementation

## Modules

- **Core**: Base interfaces and registry
- **Agents**: Comprehensive list of all agents across repos

## Usage

```typescript
import { moduleRegistry } from './src/modules/core/registry';

// List all agents
const agents = await moduleRegistry.executeTask('agents', 'list');

// Get agents by category
const syncAgents = await moduleRegistry.executeTask('agents', 'getByCategory', { category: 'sync' });
```

## Repositories

This module system integrates agents from:
- agents
- auto_builder
- credentials
- infinity-xos
- industries
- vision_cortex

See [src/modules/agents/index.ts](src/modules/agents/index.ts) for the full list.

## Development

1. Clone the repo
2. `npm install`
3. `npm run build`
4. `npm start`

## License

MIT