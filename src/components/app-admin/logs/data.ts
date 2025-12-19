/**
 * Configuration constants for Logs component
 */

/**
 * Available log sources
 */
export const logSources = [
  { value: 'all', label: 'Всі джерела' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'Backup', label: 'Резервне копіювання' },
  { value: 'Replication', label: 'Реплікація' },
  { value: 'Query', label: 'Запити' },
  { value: 'Performance', label: 'Продуктивність' },
  { value: 'Extension', label: 'Розширення' },
];

/**
 * Available log levels
 */
export const logLevels = [
  { value: 'all', label: 'Всі рівні' },
  { value: 'ERROR', label: 'Помилки' },
  { value: 'WARNING', label: 'Попередження' },
  { value: 'INFO', label: 'Інформація' },
];

/**
 * Items per page options
 */
export const itemsPerPageOptions = [10, 20, 50, 100];