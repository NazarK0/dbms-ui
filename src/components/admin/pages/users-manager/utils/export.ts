/**
 * Export Utilities
 * 
 * Functions for exporting user data to various formats (CSV, JSON).
 * 
 * @module utils/export
 */

import type { User } from '../types';

/**
 * Export users to CSV
 * 
 * Converts user data to CSV format with headers.
 * Fields are properly escaped with quotes.
 * 
 * @param users - Array of users to export
 * @returns CSV string
 * 
 * @example
 * ```tsx
 * const csv = exportUsersToCSV(users);
 * 
 * // Download as file
 * const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
 * const url = URL.createObjectURL(blob);
 * const link = document.createElement('a');
 * link.href = url;
 * link.download = 'users.csv';
 * link.click();
 * URL.revokeObjectURL(url);
 * 
 * // CSV output example:
 * // ID,Name,Email,Role,Status,Timezone,Last Active,Registered
 * // "1","John Doe","john@example.com","Developer","active","Europe/Kyiv","2024-12-15T10:00:00Z","2024-01-15T09:00:00Z"
 * // "2","Jane Smith","jane@example.com","Data Analyst","active","America/New_York","2024-12-15T09:30:00Z","2024-02-20T14:00:00Z"
 * ```
 */
export const exportUsersToCSV = (users: User[]): string => {
  const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Timezone', 'Last Active', 'Registered'];
  const rows = users.map((user) => [
    user.id,
    user.name,
    user.email,
    user.role,
    user.status,
    user.timezone,
    user.lastActive || '',
    user.registered || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
};

/**
 * Export users to JSON
 * 
 * Converts user data to formatted JSON string.
 * 
 * @param users - Array of users to export
 * @returns Formatted JSON string
 * 
 * @example
 * ```tsx
 * const json = exportUsersToJSON(users);
 * 
 * // Download as file
 * const blob = new Blob([json], { type: 'application/json' });
 * const url = URL.createObjectURL(blob);
 * const link = document.createElement('a');
 * link.href = url;
 * link.download = 'users.json';
 * link.click();
 * URL.revokeObjectURL(url);
 * 
 * // Parse JSON
 * const parsedUsers = JSON.parse(json);
 * 
 * // JSON output example:
 * // [
 * //   {
 * //     "id": "1",
 * //     "name": "John Doe",
 * //     "email": "john@example.com",
 * //     "role": "Developer",
 * //     "status": "active",
 * //     "timezone": "Europe/Kyiv",
 * //     "lastActive": "2024-12-15T10:00:00Z",
 * //     "registered": "2024-01-15T09:00:00Z",
 * //     "roleColor": "from-violet-400 to-violet-500"
 * //   },
 * //   ...
 * // ]
 * ```
 */
export const exportUsersToJSON = (users: User[]): string => {
  return JSON.stringify(users, null, 2);
};
