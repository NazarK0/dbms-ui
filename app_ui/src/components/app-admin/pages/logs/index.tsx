// Logs components
import LogsHeader from './LogsHeader';
import LogStats from './LogStats';
import LogFilters from './LogFilters';
import LogDetailsModal from './LogDetailsModal';
import LogTable from './table';

// Utils and types
export * from './utils';
export * from './types';
export * from './data';



import { useState, useEffect } from 'react';
import { type LogEntry } from '../../../../mockData/admin/logs';
import { API, api } from '../../../../utils/api';
import { SkeletonCardGrid, SkeletonTable } from '../../../ui/skeletons';
import { filterLogs, calculatePagination } from './utils';

import type { LogStats as LogStatsType } from './types';


export default function Logs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  // Loading states
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingLogs, setIsLoadingLogs] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<LogStatsType | null>(null);

  useEffect(() => {
    // Load statistics
    api.get(API.admin.logs.stats())
      .then((data) => {
        setStats(data);
        setIsLoadingStats(false);
      })
      .catch((error) => {
        console.error('Error loading log statistics:', error);
        setIsLoadingStats(false);
      });

    // Load logs
    api.get(API.admin.logs.list())
      .then((data) => {
        setLogs(data);
        setIsLoadingLogs(false);
      })
      .catch((error) => {
        console.error('Error loading logs:', error);
        setIsLoadingLogs(false);
      });
  }, []);

  // Filter logs
  const filteredLogs = filterLogs(
    logs,
    searchTerm,
    selectedLevel,
    selectedSource
  );

  // Calculate pagination
  const { totalPages, startIndex, endIndex } = calculatePagination(
    filteredLogs.length,
    currentPage,
    itemsPerPage
  );
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <LogsHeader />

      {isLoadingStats ? (
        <SkeletonCardGrid count={4} columns={4} cardType="stat" />
      ) : stats ? (
        <LogStats stats={stats} />
      ) : null}

      <LogFilters
        searchTerm={searchTerm}
        selectedLevel={selectedLevel}
        selectedSource={selectedSource}
        onSearchChange={setSearchTerm}
        onLevelChange={setSelectedLevel}
        onSourceChange={setSelectedSource}
      />

      {isLoadingLogs ? (
        <SkeletonTable rows={10} columns={6} showActions />
      ) : (
          <LogTable />
      )}

      {selectedLog && (
        <LogDetailsModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </div>
  );
}
