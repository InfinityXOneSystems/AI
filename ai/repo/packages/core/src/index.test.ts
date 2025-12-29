import { AICore } from '../src';

describe('AICore', () => {
  const config = {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000
  };

  let aiCore: AICore;

  beforeEach(() => {
    aiCore = new AICore(config);
  });

  it('should initialize with config', () => {
    expect(aiCore.getConfig()).toEqual(config);
  });

  it('should process input', async () => {
    const result = await aiCore.process('test input');
    expect(result).toContain('Processed: test input');
  });

  it('should handle empty input', async () => {
    const result = await aiCore.process('');
    expect(result).toBe('Processed: ');
  });
});