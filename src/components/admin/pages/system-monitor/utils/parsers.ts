/**
 * Parsing Utility Functions
 * 
 * Functions for parsing various string formats into numeric values.
 * 
 * @module utils/parsers
 */

/**
 * Parse memory string to bytes
 * 
 * Converts Ukrainian memory format (e.g., "2.5 ГБ") to bytes.
 * 
 * @param memory - Memory string with unit (Б, КБ, МБ, ГБ, ТБ)
 * @returns Size in bytes
 * 
 * @example
 * ```tsx
 * parseMemoryString("1 КБ");    // 1024
 * parseMemoryString("2.5 МБ");  // 2621440
 * parseMemoryString("1 ГБ");    // 1073741824
 * parseMemoryString("invalid"); // 0
 * ```
 */
export const parseMemoryString = (memory: string): number => {
  const match = memory.match(/^([\d.]+)\s*(Б|КБ|МБ|ГБ|ТБ)$/i);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  const multipliers: Record<string, number> = {
    'Б': 1,
    'КБ': 1024,
    'МБ': 1024 ** 2,
    'ГБ': 1024 ** 3,
    'ТБ': 1024 ** 4,
  };

  return value * (multipliers[unit] || 0);
};

/**
 * Parse duration string (HH:MM:SS) to seconds
 * 
 * Converts time format string to total seconds.
 * 
 * @param duration - Time string in HH:MM:SS format
 * @returns Total seconds
 * 
 * @example
 * ```tsx
 * parseDuration("01:30:45");  // 5445
 * parseDuration("00:02:30");  // 150
 * parseDuration("10:00:00");  // 36000
 * parseDuration("invalid");   // 0
 * ```
 */
export const parseDuration = (duration: string): number => {
  const parts = duration.split(':').map(Number);
  if (parts.length !== 3) return 0;

  const [hours, minutes, seconds] = parts;
  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * Parse query duration (e.g., "2.4с") to seconds
 * 
 * Converts query duration format (seconds or milliseconds) to seconds.
 * 
 * @param duration - Duration string with unit (с or ms)
 * @returns Duration in seconds
 * 
 * @example
 * ```tsx
 * parseQueryDuration("2.4с");   // 2.4
 * parseQueryDuration("500ms");  // 0.5
 * parseQueryDuration("1.5с");   // 1.5
 * parseQueryDuration("invalid"); // 0
 * ```
 */
export const parseQueryDuration = (duration: string): number => {
  const match = duration.match(/^([\d.]+)(с|ms)$/);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2];

  return unit === 'с' ? value : value / 1000;
};
