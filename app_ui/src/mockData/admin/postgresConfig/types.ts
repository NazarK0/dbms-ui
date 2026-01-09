/**
 * TypeScript types for PostgreSQL configuration
 */

export interface ConfigParam {
  name: string;
  value: string;
  defaultValue: string;
  unit?: string;
  description: string;
  requiresRestart: boolean;
  category: 'memory' | 'connections' | 'wal' | 'autovacuum' | 'logging' | 'performance';
}

export interface ConfigProfile {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  parametersCount: number;
}

export interface QuickPreset {
  id: 'development' | 'production' | 'highload';
  name: string;
  description: string;
  icon: string; // Icon name from lucide-react
  color: string; // Tailwind gradient classes
}
