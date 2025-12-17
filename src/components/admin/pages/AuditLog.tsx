import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import {
  AuditStatisticsCards,
  ActionTypeStats,
  AuditFilters,
  AuditLogTable,
} from './audit-log';
import { auditEntries } from '@/mockData/admin/auditLog';
import {
  calculateStatistics,
  calculateActionTypeStats,
  filterAuditEntries,
} from './audit-log/utils';
import type { AuditFilters as AuditFiltersType } from './audit-log/types';
import { API, api } from '../../../utils/api';
import { SkeletonCardGrid, SkeletonTable, SkeletonChart } from '../../ui/skeletons';

export default function AuditLog() {
  const [filters, setFilters] = useState<AuditFiltersType>({
    searchQuery: '',
    filterUser: 'all',
    filterAction: 'all',
    filterCategory: 'all',
  });

  // Loading states
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingChart, setIsLoadingChart] = useState(true);
  const [isLoadingLogs, setIsLoadingLogs] = useState(true);
  const [statistics, setStatistics] = useState<any>(null);
  const [actionTypeStats, setActionTypeStats] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // Load statistics
    api.get(API.admin.auditLog.statistics())
      .then((data) => {
        setStatistics(data);
        setIsLoadingStats(false);
      })
      .catch((error) => {
        console.error('Error loading statistics:', error);
        setIsLoadingStats(false);
      });

    // Load action type stats
    api.get(API.admin.auditLog.actionStats())
      .then((data) => {
        setActionTypeStats(data);
        setIsLoadingChart(false);
      })
      .catch((error) => {
        console.error('Error loading action stats:', error);
        setIsLoadingChart(false);
      });

    // Load audit logs
    api.get(API.admin.auditLog.list())
      .then((data) => {
        setLogs(data);
        setIsLoadingLogs(false);
      })
      .catch((error) => {
        console.error('Error loading audit logs:', error);
        setIsLoadingLogs(false);
      });
  }, []);

  const handleFiltersChange = (newFilters: Partial<AuditFiltersType>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const filteredEntries = filterAuditEntries(
    logs,
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
      {isLoadingStats ? (
        <SkeletonCardGrid count={4} columns={4} cardType="stat" />
      ) : (
        statistics && <AuditStatisticsCards statistics={statistics} />
      )}

      {/* Action Type Statistics */}
      {isLoadingChart ? (
        <SkeletonChart />
      ) : (
        actionTypeStats && <ActionTypeStats statistics={actionTypeStats} />
      )}

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

            {isLoadingLogs ? (
              <SkeletonTable />
            ) : (
              <AuditLogTable entries={filteredEntries} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}