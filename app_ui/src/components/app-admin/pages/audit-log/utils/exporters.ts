/**
 * Export functions for Audit Log entries
 */

import type { AuditEntry } from '../types';

/**
 * Export entries to CSV
 */
export const exportToCSV = (entries: AuditEntry[]): string => {
  const headers = ['Timestamp', 'User', 'Action', 'Category', 'Target', 'Details', 'IP', 'Status'];
  const rows = entries.map(entry => [
    entry.timestamp,
    entry.user,
    entry.action,
    entry.category,
    entry.target,
    entry.details,
    entry.ip,
    entry.status,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
};

/**
 * Export entries to JSON
 */
export const exportToJSON = (entries: AuditEntry[]): string => {
  return JSON.stringify(entries, null, 2);
};

/**
 * Download file
 */
export const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
