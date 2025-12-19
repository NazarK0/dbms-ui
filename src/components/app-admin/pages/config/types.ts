/**
 * TypeScript type definitions for PostgreSQL Configuration components
 */

export interface ConfigParam {
  name: string;
  value: string;
  defaultValue: string;
  unit?: string;
  description: string;
  requiresRestart: boolean;
  category: string;
}

export interface ConfigProfile {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  parametersCount: number;
}

export interface ConfigStatistics {
  totalParams: number;
  changed: number;
  requiresRestart: number;
}

export type ConfigCategory = 'memory' | 'connections' | 'wal' | 'autovacuum' | 'logging' | 'performance';

export interface QuickPreset {
  id: string;
  name: string;
  description: string;
  icon: 'development' | 'production' | 'highload';
  color: string;
}
