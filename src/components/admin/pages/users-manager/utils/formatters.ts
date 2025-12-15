/**
 * Formatting Utilities
 * 
 * Functions for formatting dates, times, and values for display.
 * 
 * @module utils/formatters
 */

import { parseLastActive } from './activity';

/**
 * Format last active time
 * 
 * Formats last active timestamp into human-readable Ukrainian text.
 * Shows relative time for recent activity, absolute date for older.
 * 
 * @param lastActive - ISO date string of last activity
 * @returns Formatted last active string
 * 
 * @example
 * ```tsx
 * formatLastActive('2024-12-15T10:59:00Z');  // "Щойно" (< 1 min ago)
 * formatLastActive('2024-12-15T10:45:00Z');  // "15 хв тому"
 * formatLastActive('2024-12-15T08:00:00Z');  // "3 год тому"
 * formatLastActive('2024-12-14T10:00:00Z');  // "Вчора"
 * formatLastActive('2024-12-10T10:00:00Z');  // "5 дн тому"
 * formatLastActive('2024-11-15T10:00:00Z');  // "15 лист. 2024"
 * formatLastActive(undefined);               // "Ніколи"
 * ```
 */
export const formatLastActive = (lastActive?: string): string => {
  if (!lastActive) return 'Ніколи';

  const minutesAgo = parseLastActive(lastActive);
  if (minutesAgo === null) return 'Ніколи';

  if (minutesAgo < 1) return 'Щойно';
  if (minutesAgo < 60) return `${minutesAgo} хв тому`;

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} год тому`;

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo === 1) return 'Вчора';
  if (daysAgo < 7) return `${daysAgo} дн тому`;

  // Return formatted date
  const date = new Date(lastActive);
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format registration date
 * 
 * Formats registration timestamp into Ukrainian date format.
 * 
 * @param registered - ISO date string of registration
 * @returns Formatted registration date
 * 
 * @example
 * ```tsx
 * formatRegistered('2024-12-15T10:00:00Z');  // "15 груд. 2024"
 * formatRegistered('2024-01-01T00:00:00Z');  // "1 січ. 2024"
 * formatRegistered(undefined);               // "—"
 * ```
 */
export const formatRegistered = (registered?: string): string => {
  if (!registered) return '—';

  const date = new Date(registered);
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format percentage
 * 
 * Formats percentage value with '%' symbol.
 * 
 * @param percentage - Percentage value (0-100)
 * @returns Formatted percentage string
 * 
 * @example
 * ```tsx
 * formatPercentage(75);   // "75%"
 * formatPercentage(100);  // "100%"
 * formatPercentage(0);    // "0%"
 * formatPercentage(33);   // "33%"
 * ```
 */
export const formatPercentage = (percentage: number): string => {
  return `${percentage}%`;
};
