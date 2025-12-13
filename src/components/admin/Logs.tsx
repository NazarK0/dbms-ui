import { useState } from 'react';
import {
  LogsHeader,
  LogStats,
  LogFilters,
  LogsTable,
  LogDetailsModal,
  mockLogs,
  filterLogs,
  calculateLogStats,
  calculatePagination,
} from './logs';
import type { LogEntry } from './logs';

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  // Filter logs
  const filteredLogs = filterLogs(
    mockLogs,
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

  // Calculate statistics
  const logStats = calculateLogStats(mockLogs);

  return (
    <div className="space-y-6">
      <LogsHeader />

      <LogStats stats={logStats} />

      <LogFilters
        searchTerm={searchTerm}
        selectedLevel={selectedLevel}
        selectedSource={selectedSource}
        onSearchChange={setSearchTerm}
        onLevelChange={setSelectedLevel}
        onSourceChange={setSelectedSource}
      />

      <LogsTable
        logs={currentLogs}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        totalFilteredLogs={filteredLogs.length}
        onViewDetails={setSelectedLog}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      <LogDetailsModal log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
}
