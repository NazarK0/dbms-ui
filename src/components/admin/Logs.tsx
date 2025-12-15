import { useState, useEffect } from 'react';
import { mockLogs, type LogEntry } from '@/mockData/admin/logs';
import { mockApiCall } from '../../utils/mockApi';
import { SkeletonCardGrid, SkeletonTable } from '../ui/skeletons';
import { filterLogs, calculateLogStats, calculatePagination } from './logs/utils';
import { LogsHeader, LogStats, LogFilters, LogsTable, LogDetailsModal } from './logs';
import type { LogStats as LogStatsType } from './logs/types';

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
    mockApiCall('logs/statistics', {}, 700).then((data) => {
      setStats(calculateLogStats(mockLogs));
      setIsLoadingStats(false);
    });

    // Load logs
    mockApiCall('logs/list', {}, 1000).then((data) => {
      setLogs(mockLogs);
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
        <LogsTable
          logs={currentLogs}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalLogs={filteredLogs.length}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          onLogClick={setSelectedLog}
        />
      )}

      {selectedLog && (
        <LogDetailsModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </div>
  );
}