/**
 * Formatting Utility Functions
 * 
 * Functions for formatting permission and action labels in Ukrainian.
 * 
 * @module utils/formatters
 */

/**
 * Format permission label
 * 
 * Converts permission key to Ukrainian display label.
 * 
 * @param key - Permission key
 * @returns Ukrainian permission label
 * 
 * @example
 * ```tsx
 * formatPermissionLabel('createProjects');   // "Створення проєктів"
 * formatPermissionLabel('deleteProjects');   // "Видалення проєктів"
 * formatPermissionLabel('shareProjects');    // "Спільний доступ"
 * formatPermissionLabel('exportData');       // "Експорт даних"
 * formatPermissionLabel('importData');       // "Імпорт даних"
 * formatPermissionLabel('useApi');           // "Використання API"
 * formatPermissionLabel('customBranding');   // "Свій брендинг"
 * formatPermissionLabel('prioritySupport');  // "Пріоритетна підтримка"
 * formatPermissionLabel('unknown');          // "unknown"
 * ```
 */
export const formatPermissionLabel = (key: string): string => {
  const labels: Record<string, string> = {
    createProjects: 'Створення проєктів',
    deleteProjects: 'Видалення проєктів',
    shareProjects: 'Спільний доступ',
    exportData: 'Експорт даних',
    importData: 'Імпорт даних',
    useApi: 'Використання API',
    customBranding: 'Свій брендинг',
    prioritySupport: 'Пріоритетна підтримка',
  };
  return labels[key] || key;
};

/**
 * Format action label
 * 
 * Converts permission key to Ukrainian action button label.
 * Uses shorter, action-oriented text compared to permission labels.
 * 
 * @param key - Permission/action key
 * @returns Ukrainian action label
 * 
 * @example
 * ```tsx
 * formatActionLabel('createProjects');   // "Новий проєкт"
 * formatActionLabel('deleteProjects');   // "Видалити"
 * formatActionLabel('shareProjects');    // "Поділитись"
 * formatActionLabel('exportData');       // "Експорт"
 * formatActionLabel('importData');       // "Імпорт"
 * formatActionLabel('useApi');           // "API"
 * formatActionLabel('customBranding');   // "Брендинг"
 * formatActionLabel('prioritySupport');  // "Підтримка"
 * formatActionLabel('unknown');          // "unknown"
 * ```
 */
export const formatActionLabel = (key: string): string => {
  const labels: Record<string, string> = {
    createProjects: 'Новий проєкт',
    deleteProjects: 'Видалити',
    shareProjects: 'Поділитись',
    exportData: 'Експорт',
    importData: 'Імпорт',
    useApi: 'API',
    customBranding: 'Брендинг',
    prioritySupport: 'Підтримка',
  };
  return labels[key] || key;
};
