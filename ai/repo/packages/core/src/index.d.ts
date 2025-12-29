/**
 * Core AI functionality for InfinityX
 */
export interface AICoreConfig {
    model: string;
    temperature: number;
    maxTokens: number;
}
export declare class AICore {
    private config;
    constructor(config: AICoreConfig);
    process(input: string): Promise<string>;
    getConfig(): AICoreConfig;
}
export default AICore;
//# sourceMappingURL=index.d.ts.map