/**
 * DevOps - Infrastructure as Code & Configuration Management
 * Enterprise-grade IaC and config management for InfinityX
 */
import { EnterpriseMonitoring } from '@infinityx/monitoring';
export interface DevOpsConfig {
    infrastructure: {
        provider: 'aws' | 'azure' | 'gcp';
        region: string;
        environment: string;
    };
    kubernetes: {
        enabled: boolean;
        namespace: string;
        clusterName: string;
    };
    terraform: {
        enabled: boolean;
        stateBucket: string;
        lockTable: string;
    };
}
export interface InfrastructureResource {
    type: string;
    name: string;
    config: any;
    dependencies?: string[];
}
export declare class DevOpsManager {
    private config;
    private monitoring;
    private k8sClient;
    private awsClient;
    constructor(config: DevOpsConfig, monitoring: EnterpriseMonitoring);
    deployInfrastructure(resources: InfrastructureResource[]): Promise<void>;
    deployToKubernetes(manifests: any[]): Promise<void>;
    updateConfiguration(serviceName: string, config: any): Promise<void>;
    createEnvironment(name: string, baseConfig: any): Promise<void>;
    healthCheck(): Promise<any>;
    createBackup(resourceType: string, resourceName: string): Promise<string>;
    restoreFromBackup(backupId: string): Promise<void>;
    private initializeClients;
    private generateTerraformConfig;
    private saveTerraformConfig;
    private validateTerraform;
    private planTerraform;
    private applyTerraform;
    private updateKubernetesConfigMap;
    private reloadServiceConfiguration;
    private storeConfiguration;
    private generateEnvironmentResources;
    private createKubernetesNamespace;
    private checkInfrastructureHealth;
    private checkKubernetesHealth;
    private checkConfigurationHealth;
    private backupDatabase;
    private backupKubernetesResource;
    private backupConfiguration;
    private performRestore;
}
export default DevOpsManager;
//# sourceMappingURL=index.d.ts.map