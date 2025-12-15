/**
 * Filtering and searching functions for CLI history
 */

import type { CommandHistory, CommandStatus } from '../types';

/**
 * Filter history entries
 */
export const filterHistory = (
  history: CommandHistory[],
  status?: CommandStatus,
  searchTerm?: string
): CommandHistory[] => {
  let filtered = [...history];

  if (status) {
    filtered = filtered.filter((h) => h.status === status);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (h) =>
        h.command.toLowerCase().includes(term) ||
        h.output.toLowerCase().includes(term)
    );
  }

  return filtered;
};

/**
 * Search history
 */
export const searchHistory = (
  history: CommandHistory[],
  searchTerm: string
): CommandHistory[] => {
  const term = searchTerm.toLowerCase();
  return history.filter(
    (h) =>
      h.command.toLowerCase().includes(term) ||
      h.output.toLowerCase().includes(term)
  );
};

/**
 * Sort history by timestamp
 */
export const sortHistoryByTimestamp = (
  history: CommandHistory[],
  ascending: boolean = true
): CommandHistory[] => {
  return [...history].sort((a, b) => {
    const comparison = a.timestamp.localeCompare(b.timestamp);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Get recent history
 */
export const getRecentHistory = (
  history: CommandHistory[],
  count: number = 10
): CommandHistory[] => {
  return history.slice(-count);
};
