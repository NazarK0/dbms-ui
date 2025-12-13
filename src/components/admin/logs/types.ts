/**
 * Types for Logs component
 */

import { LucideIcon } from 'lucide-react';

export type LogLevel = 'ERROR' | 'WARNING' | 'INFO';

export interface LogEntry {
  id: number;
  timestamp: string;
  level: LogLevel;
  source: string;
  database: string;
  user: string;
  message: string;
  details: string;
}

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
