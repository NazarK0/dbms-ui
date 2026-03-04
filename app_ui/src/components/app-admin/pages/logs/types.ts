/**
 * Types for Logs component
 */

import { LucideIcon } from 'lucide-react';


export interface LogLevelConfig {
  variant: 'destructive' | 'default' | 'secondary' | 'outline';
  icon: LucideIcon;
  className: string;
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