export interface AuditFilters {
  searchQuery: string;
  filterUser: string;
  filterAction: string;
  filterCategory: string;
}

export interface AuditFiltersProps {
  filters: AuditFilters;
  onFiltersChange: (filters: Partial<AuditFilters>) => void;
  totalEntries: number;
  filteredCount: number;
}
