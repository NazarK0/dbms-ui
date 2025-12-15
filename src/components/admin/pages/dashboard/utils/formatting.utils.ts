/**
 * Formatting Utility Functions
 * 
 * Handles data formatting for display purposes including:
 * - Storage sizes
 * - Time durations
 * - Relative timestamps
 * - Numbers and percentages
 * 
 * @module formatting.utils
 */

/**
 * Format storage size
 * 
 * Converts bytes to human-readable format with Ukrainian units.
 * 
 * @param bytes - Size in bytes
 * @returns Formatted string with unit
 * 
 * @example
 * ```ts
 * formatStorageSize(1024)        // "1.0 КБ"
 * formatStorageSize(1048576)     // "1.0 МБ"
 * formatStorageSize(1073741824)  // "1.0 ГБ"
 * ```
 */
export const formatStorageSize = (bytes: number): string => {
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
 * Format duration
 * 
 * Converts seconds to HH:MM:SS format.
 * 
 * @param seconds - Duration in seconds
 * @returns Formatted time string (HH:MM:SS)
 * 
 * @example
 * ```ts
 * formatDuration(3661)  // "01:01:01"
 * formatDuration(90)    // "00:01:30"
 * formatDuration(7200)  // "02:00:00"
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
 * Parse duration string (HH:MM:SS) to seconds
 * 
 * Converts time string to total seconds.
 * 
 * @param duration - Time string in HH:MM:SS format
 * @returns Total seconds
 * 
 * @example
 * ```ts
 * parseDuration("01:01:01")  // 3661
 * parseDuration("00:01:30")  // 90
 * parseDuration("02:00:00")  // 7200
 * ```
 */
export const parseDuration = (duration: string): number => {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * Format time ago
 * 
 * Converts a date to relative time in Ukrainian.
 * 
 * @param date - Date to format
 * @returns Relative time string
 * 
 * @example
 * ```ts
 * formatTimeAgo(new Date(Date.now() - 30000))  // "30 секунд тому"
 * formatTimeAgo(new Date(Date.now() - 120000)) // "2 хвилин тому"
 * formatTimeAgo(new Date(Date.now() - 7200000)) // "2 годин тому"
 * ```
 */
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} секунд тому`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} хвилин тому`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} годин тому`;
  return `${Math.floor(diffInSeconds / 86400)} днів тому`;
};

/**
 * Format number with commas
 * 
 * Formats numbers using Ukrainian locale for readability.
 * 
 * @param num - Number to format
 * @returns Formatted number string
 * 
 * @example
 * ```ts
 * formatNumber(1000)     // "1 000"
 * formatNumber(1234567)  // "1 234 567"
 * ```
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('uk-UA');
};

/**
 * Calculate percentage change
 * 
 * Calculates percentage change between two values.
 * Returns formatted string with sign.
 * 
 * @param oldValue - Previous value
 * @param newValue - Current value
 * @returns Formatted percentage with sign
 * 
 * @example
 * ```ts
 * calculatePercentageChange(100, 150)  // "+50.0%"
 * calculatePercentageChange(100, 75)   // "-25.0%"
 * calculatePercentageChange(0, 100)    // "+100%"
 * ```
 */
export const calculatePercentageChange = (
  oldValue: number,
  newValue: number
): string => {
  if (oldValue === 0) return '+100%';
  const change = ((newValue - oldValue) / oldValue) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
};
