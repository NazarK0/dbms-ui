/**
 * Export functions for CLI history
 */

import type { CommandHistory } from '../types';

/**
 * Export command history to text file
 */
export const exportHistory = (history: CommandHistory[]): void => {
  const content = history
    .map((h) => `[${h.timestamp}] ${h.command}\n${h.output}\n`)
    .join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `postgresql-cli-history-${new Date().toISOString().split('T')[0]}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Export history to CSV
 */
export const exportHistoryToCSV = (history: CommandHistory[]): void => {
  const headers = ['Timestamp', 'Command', 'Status', 'Execution Time'];
  const rows = history.map((h) => [
    h.timestamp,
    h.command,
    h.status,
    h.executionTime,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `postgresql-cli-history-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Export history to JSON
 */
export const exportHistoryToJSON = (history: CommandHistory[]): void => {
  const jsonContent = JSON.stringify(history, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `postgresql-cli-history-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};
