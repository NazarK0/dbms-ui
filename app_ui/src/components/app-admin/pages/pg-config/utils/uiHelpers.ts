/**
 * UI helper functions for PostgreSQL Configuration
 */

import { Settings, HardDrive, Network, Database, Zap, FileText, Cpu } from 'lucide-react';

/**
 * Get icon component for configuration category
 */
export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'memory':
      return HardDrive;
    case 'connections':
      return Network;
    case 'wal':
      return Database;
    case 'autovacuum':
      return Zap;
    case 'logging':
      return FileText;
    case 'performance':
      return Cpu;
    default:
      return Settings;
  }
};

/**
 * Get display name for configuration category
 */
export const getCategoryName = (category: string): string => {
  const names: Record<string, string> = {
    memory: 'Пам\'ять',
    connections: 'Підключення',
    wal: 'WAL',
    autovacuum: 'Autovacuum',
    logging: 'Логування',
    performance: 'Продуктивність',
  };
  return names[category] || category;
};

/**
 * Get gradient color classes for category
 */
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    memory: 'from-lime-500 to-green-600',
    connections: 'from-green-500 to-lime-600',
    wal: 'from-yellow-500 to-lime-600',
    autovacuum: 'from-lime-600 to-yellow-600',
    logging: 'from-green-600 to-lime-500',
    performance: 'from-lime-500 to-green-500',
  };
  return colors[category] || 'from-slate-500 to-slate-600';
};
