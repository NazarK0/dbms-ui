/**
 * Category Utility Functions
 * 
 * Handles category-related operations like label mapping.
 * 
 * @module category.utils
 */

/**
 * Get category label in Ukrainian
 * 
 * Maps category IDs to their Ukrainian display labels.
 * Falls back to the original category name if not found.
 * 
 * @param category - Category identifier
 * @returns Ukrainian label for the category
 * 
 * @example
 * ```ts
 * getCategoryLabel('stats') // "Статистика"
 * getCategoryLabel('performance') // "Продуктивність"
 * getCategoryLabel('activity') // "Активність"
 * getCategoryLabel('unknown') // "unknown"
 * ```
 */
export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    stats: 'Статистика',
    performance: 'Продуктивність',
    activity: 'Активність',
  };
  return labels[category] || category;
};
