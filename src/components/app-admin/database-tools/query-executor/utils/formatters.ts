/**
 * Formatting Utilities
 * ====================
 * 
 * Функції для форматування даних для відображення користувачу.
 */

import { QueryError } from '../types';

/**
 * Форматує час виконання запиту з мілісекунд у читабельний формат
 * 
 * @param milliseconds - Час виконання в мілісекундах
 * @returns Форматований рядок (наприклад, "250мс" або "2.34с")
 * 
 * @example
 * ```typescript
 * formatExecutionTime(150); // "150мс"
 * formatExecutionTime(2340); // "2.34с"
 * formatExecutionTime(60000); // "60.00с"
 * ```
 */
export function formatExecutionTime(milliseconds: number): string {
  if (milliseconds < 1000) {
    return `${milliseconds}мс`;
  }
  
  const seconds = (milliseconds / 1000).toFixed(2);
  return `${seconds}с`;
}

/**
 * Форматує значення комірки таблиці для відображення
 * 
 * @param value - Значення для форматування (будь-який тип)
 * @returns Форматований рядок для відображення
 * 
 * @example
 * ```typescript
 * formatCellValue(null); // "NULL"
 * formatCellValue(true); // "true"
 * formatCellValue({ id: 1, name: 'Test' }); // '{"id":1,"name":"Test"}'
 * formatCellValue('Very long text...'); // "Very long text... (truncated to 100 chars)"
 * ```
 */
export function formatCellValue(value: any): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  
  if (typeof value === 'string' && value.length > 100) {
    return value.substring(0, 100) + '...';
  }
  
  return String(value);
}

/**
 * Форматує повідомлення про помилку для відображення користувачу
 * 
 * @param error - Об'єкт помилки запиту
 * @returns Форматоване повідомлення з кодом та позицією (якщо є)
 * 
 * @example
 * ```typescript
 * formatErrorMessage({ 
 *   message: 'Syntax error', 
 *   code: 'ER_PARSE_ERROR', 
 *   position: 15 
 * }); 
 * // "Syntax error (позиція: 15) [Код: ER_PARSE_ERROR]"
 * ```
 */
export function formatErrorMessage(error: QueryError): string {
  let message = error.message;
  
  if (error.position) {
    message += ` (позиція: ${error.position})`;
  }
  
  if (error.code) {
    message += ` [Код: ${error.code}]`;
  }
  
  return message;
}

/**
 * Форматує розмір даних (bytes) у читабельний формат
 * 
 * @param bytes - Розмір в байтах
 * @returns Форматований рядок (KB, MB, GB)
 * 
 * @example
 * ```typescript
 * formatBytes(1024); // "1.00 KB"
 * formatBytes(1048576); // "1.00 MB"
 * formatBytes(500); // "500 B"
 * ```
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
}

/**
 * Форматує дату та час у український формат
 * 
 * @param isoString - ISO 8601 дата (наприклад, "2024-12-15T10:30:00Z")
 * @returns Форматований рядок дати та часу
 * 
 * @example
 * ```typescript
 * formatDateTime('2024-12-15T10:30:00Z'); // "15.12.2024, 10:30"
 * ```
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Форматує кількість рядків з правильним відмінюванням
 * 
 * @param count - Кількість рядків
 * @returns Форматований рядок (наприклад, "5 рядків", "1 рядок")
 * 
 * @example
 * ```typescript
 * formatRowCount(1); // "1 рядок"
 * formatRowCount(2); // "2 рядки"
 * formatRowCount(5); // "5 рядків"
 * formatRowCount(21); // "21 рядок"
 * ```
 */
export function formatRowCount(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  // Виняток для 11-14
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} рядків`;
  }
  
  if (lastDigit === 1) {
    return `${count} рядок`;
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} рядки`;
  }
  
  return `${count} рядків`;
}
