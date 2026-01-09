/**
 * Configuration data for Audit Log Table
 */

/**
 * Table column headers configuration
 */
export const tableHeaders = [
  { key: 'timestamp', label: 'Час' },
  { key: 'user', label: 'Користувач' },
  { key: 'action', label: 'Дія' },
  { key: 'category', label: 'Категорія' },
  { key: 'target', label: 'Ціль' },
  { key: 'details', label: 'Деталі' },
  { key: 'ip', label: 'IP адреса' },
  { key: 'status', label: 'Статус' },
] as const;
