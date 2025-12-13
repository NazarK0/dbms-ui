import { useState } from 'react';
import { Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import {
  AuditStatisticsCards,
  ActionTypeStats,
  AuditFilters,
  AuditLogTable,
} from './audit-log';
import { auditEntries } from './audit-log/data';
import {
  calculateStatistics,
  calculateActionTypeStats,
  filterAuditEntries,
} from './audit-log/utils';
import type { AuditFilters as AuditFiltersType } from './audit-log/types';

export default function AuditLog() {
  const [filters, setFilters] = useState<AuditFiltersType>({
    searchQuery: '',
    filterUser: 'all',
    filterAction: 'all',
    filterCategory: 'all',
  });

  const handleFiltersChange = (newFilters: Partial<AuditFiltersType>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const statistics = calculateStatistics(auditEntries);
  const actionTypeStats = calculateActionTypeStats(auditEntries);

  const filteredEntries = filterAuditEntries(
    auditEntries,
    filters.searchQuery,
    filters.filterUser,
    filters.filterAction,
    filters.filterCategory
  );

  const handleExport = () => {
    console.log('Export audit log');
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <AuditStatisticsCards statistics={statistics} />

      {/* Action Type Statistics */}
      <ActionTypeStats statistics={actionTypeStats} />

      {/* Filters and Search */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Історія всіх дій</CardTitle>
              <CardDescription>Повний аудит лог операцій в системі</CardDescription>
            </div>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Експорт
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AuditFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              totalEntries={auditEntries.length}
              filteredCount={filteredEntries.length}
            />

            <AuditLogTable entries={filteredEntries} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
