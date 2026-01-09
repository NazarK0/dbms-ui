/**
 * Formatting Utility Functions
 * 
 * Functions for formatting various data types into human-readable strings.
 * 
 * @module utils/formatters
 */

/**
 * Format percentage value
 * 
 * Formats a number to one decimal place with % suffix.
 * 
 * @param value - Percentage value (0-100)
 * @returns Formatted percentage string
 * 
 * @example
 * ```tsx
 * formatPercentage(75.456); // "75.5%"
 * formatPercentage(100);    // "100.0%"
 * ```
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

/**
 * Format bytes to human-readable size
 * 
 * Converts bytes to appropriate unit (Б, КБ, МБ, ГБ, ТБ) with Ukrainian units.
 * 
 * @param bytes - Size in bytes
 * @returns Formatted size string
 * 
 * @example
 * ```tsx
 * formatBytes(1024);           // "1.0 КБ"
 * formatBytes(1024 * 1024);    // "1.0 МБ"
 * formatBytes(1536 * 1024);    // "1.5 МБ"
 * ```
 */
export const formatBytes = (bytes: number): string => {
  const units = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

/**
 * Format seconds to HH:MM:SS
 * 
 * Converts duration in seconds to time format with zero-padding.
 * 
 * @param seconds - Duration in seconds
 * @returns Formatted time string (HH:MM:SS)
 * 
 * @example
 * ```tsx
 * formatDuration(3661);  // "01:01:01"
 * formatDuration(125);   // "00:02:05"
 * formatDuration(0);     // "00:00:00"
 * ```
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format number with thousand separators
 * 
 * Formats number with Ukrainian locale (space as thousand separator).
 * 
 * @param num - Number to format
 * @returns Formatted number string
 * 
 * @example
 * ```tsx
 * formatNumber(1000);      // "1 000"
 * formatNumber(1234567);   // "1 234 567"
 * ```
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('uk-UA');
};

/**
 * Truncate query string
 * 
 * Truncates long query strings with ellipsis.
 * 
 * @param query - SQL query string
 * @param maxLength - Maximum length before truncation (default: 100)
 * @returns Truncated query string
 * 
 * @example
 * ```tsx
 * truncateQuery("SELECT * FROM users WHERE id = 1", 20);
 * // "SELECT * FROM users ..."
 * 
 * truncateQuery("SELECT *", 100);
 * // "SELECT *"
 * ```
 */
export const truncateQuery = (query: string, maxLength: number = 100): string => {
  if (query.length <= maxLength) return query;
  return query.substring(0, maxLength) + '...';
};
