/**
 * Types for Logs component
 */

import { LucideIcon } from 'lucide-react';

// Re-export types from mockData to avoid duplication
export type { LogLevel, LogSource, LogEntry } from '@/mockData/admin/logs';

export interface LogLevelConfig {
  variant: 'destructive' | 'default' | 'secondary' | 'outline';
  icon: LucideIcon;
  className: string;
}

export interface LogStats {
  total: number;
  errors: number;
  warnings: number;
  info: number;
}

export interface LogFilters {
  searchTerm: string;
  selectedLevel: string;
  selectedSource: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}