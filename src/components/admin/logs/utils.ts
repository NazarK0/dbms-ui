/**
 * Utility functions for Logs component
 */

import { XCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import type { LogEntry, LogLevelConfig, LogStats } from './types';

/**
 * Get badge configuration for log level
 */
export function getLevelBadge(level: string): LogLevelConfig {
  switch (level) {
    case 'ERROR':
      return {
        variant: 'destructive' as const,
        icon: XCircle,
        className: 'bg-red-100 text-red-700 border-red-300',
      };
    case 'WARNING':
      return {
        variant: 'default' as const,
        icon: AlertTriangle,
        className: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      };
    case 'INFO':
      return {
        variant: 'secondary' as const,
        icon: Info,
        className: 'bg-blue-100 text-blue-700 border-blue-300',
      };
    default:
      return {
        variant: 'outline' as const,
        icon: AlertCircle,
        className: '',
      };
  }
}

/**
 * Filter logs by search term and filters
 */
export function filterLogs(
  logs: LogEntry[],
  searchTerm: string,
  selectedLevel: string,
  selectedSource: string
): LogEntry[] {
  return logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.database.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
    const matchesSource = selectedSource === 'all' || log.source === selectedSource;

    return matchesSearch && matchesLevel && matchesSource;
  });
}

/**
 * Calculate log statistics
 */
export function calculateLogStats(logs: LogEntry[]): LogStats {
  return {
    total: logs.length,
    errors: logs.filter((l) => l.level === 'ERROR').length,
    warnings: logs.filter((l) => l.level === 'WARNING').length,
    info: logs.filter((l) => l.level === 'INFO').length,
  };
}

/**
 * Calculate pagination values
 */
export function calculatePagination(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    totalPages,
    startIndex,
    endIndex,
  };
}

/**
 * Get visible page numbers for pagination
 */
export function getVisiblePages(
  currentPage: number,
  totalPages: number
): number[] {
  return Array.from({ length: totalPages }, (_, i) => i + 1).filter((page) => {
    // Show first page, last page, current page, and pages around current
    return (
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1)
    );
  });
}

/**
 * Check if ellipsis should be shown before page number
 */
export function shouldShowEllipsis(
  currentPageIndex: number,
  visiblePages: number[]
): boolean {
  if (currentPageIndex === 0) return false;
  const currentPage = visiblePages[currentPageIndex];
  const prevPage = visiblePages[currentPageIndex - 1];
  return prevPage && currentPage - prevPage > 1;
}
