/**
 * TypeScript type definitions for Audit Log components
 */

export type ActionType = 
  | 'create' 
  | 'update' 
  | 'delete' 
  | 'select' 
  | 'grant' 
  | 'revoke' 
  | 'login' 
  | 'backup';

export type AuditStatus = 'success' | 'failed';

export type AuditCategory =
  | 'База даних'
  | 'Таблиця'
  | 'Запит'
  | 'Права доступу'
  | 'Резервна копія'
  | 'Функція'
  | 'Тригер'
  | 'Користувач'
  | 'Автентифікація';

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: ActionType;
  category: AuditCategory;
  target: string;
  details: string;
  ip: string;
  status: AuditStatus;
}

export interface AuditStatistics {
  total: number;
  today: number;
  success: number;
  failed: number;
}

export interface ActionTypeStatistics {
  create: number;
  update: number;
  delete: number;
  query: number;
}

export interface AuditFilters {
  searchQuery: string;
  filterUser: string;
  filterAction: string;
  filterCategory: string;
}

export interface AuditStatisticsCardsProps {
  statistics: AuditStatistics;
}

export interface ActionTypeStatsProps {
  statistics: ActionTypeStatistics;
}

export interface AuditFiltersProps {
  filters: AuditFilters;
  onFiltersChange: (filters: Partial<AuditFilters>) => void;
  totalEntries: number;
  filteredCount: number;
}

export interface AuditLogTableProps {
  entries: AuditEntry[];
}

export interface ActionBadgeConfig {
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  label: string;
  color: string;
}

export interface UserInfo {
  username: string;
  count: number;
}

export interface CategoryInfo {
  category: AuditCategory;
  count: number;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface AuditLogExportOptions {
  format: 'csv' | 'json' | 'excel';
  filters?: AuditFilters;
  timeRange?: TimeRange;
}
