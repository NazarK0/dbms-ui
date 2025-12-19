/**
 * UI Formatters for Table Browser
 * 
 * Функції для форматування даних для відображення в UI
 */

import type { KeyType } from '../types';

/**
 * Get badge variant for column key type
 * 
 * @param key - Key type (PRI, UNI, FOR, or empty)
 * @returns Badge variant for styling
 * 
 * @example
 * ```typescript
 * getKeyBadgeVariant('PRI'); // 'default'
 * getKeyBadgeVariant('UNI'); // 'secondary'
 * getKeyBadgeVariant('FOR'); // 'outline'
 * ```
 */
export const getKeyBadgeVariant = (key: KeyType): 'default' | 'secondary' | 'outline' => {
  switch (key) {
    case 'PRI':
      return 'default';
    case 'UNI':
      return 'secondary';
    case 'FOR':
      return 'outline';
    default:
      return 'outline';
  }
};

/**
 * Get key type display text
 * 
 * @param key - Key type (PRI, UNI, FOR, or empty)
 * @returns Human-readable key type text
 * 
 * @example
 * ```typescript
 * getKeyTypeText('PRI'); // 'Primary Key'
 * getKeyTypeText('UNI'); // 'Unique'
 * getKeyTypeText('FOR'); // 'Foreign Key'
 * ```
 */
export const getKeyTypeText = (key: KeyType): string => {
  switch (key) {
    case 'PRI':
      return 'Primary Key';
    case 'UNI':
      return 'Unique';
    case 'FOR':
      return 'Foreign Key';
    default:
      return '';
  }
};

/**
 * Format column type for display
 * 
 * @param type - Column data type
 * @returns Formatted type string
 * 
 * @example
 * ```typescript
 * formatColumnType('VARCHAR(255)'); // 'VARCHAR(255)'
 * ```
 */
export const formatColumnType = (type: string): string => {
  return type;
};

/**
 * Format cell value for display
 * 
 * @param value - Cell value to format
 * @returns Formatted string for display (null/undefined as '—')
 * 
 * @example
 * ```typescript
 * formatCellValue(null);      // '—'
 * formatCellValue(undefined); // '—'
 * formatCellValue(123);       // '123'
 * formatCellValue('hello');   // 'hello'
 * ```
 */
export const formatCellValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '—';
  }
  return String(value);
};
