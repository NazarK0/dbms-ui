/**
 * Конфігурація затримок для різних типів запитів
 */
export const API_DELAYS = {
  // Швидкі запити (отримання простих даних)
  fast: { min: 200, max: 500 },
  
  // Стандартні запити (отримання списків, таблиць)
  normal: { min: 500, max: 1200 },
  
  // Повільні запити (складні запити, аналітика)
  slow: { min: 1200, max: 2500 },
  
  // Дуже повільні запити (backup, export, import)
  verySlow: { min: 2500, max: 5000 },
} as const;

/**
 * Типи затримок
 */
export type DelayType = keyof typeof API_DELAYS;
