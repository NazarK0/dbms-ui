/**
 * Dashboard Configuration Utility Functions
 * 
 * Manages dashboard configuration including:
 * - Validation
 * - Import/Export
 * - Summary generation
 * - Reset to defaults
 * 
 * @module config.utils
 */

import type { DashboardCard, DashboardStats } from '../types';

/**
 * Get dashboard summary
 * 
 * Converts DashboardStats object to string-keyed summary.
 * 
 * @param stats - Dashboard statistics object
 * @returns Summary object with string values
 * 
 * @example
 * ```ts
 * const summary = getDashboardSummary({
 *   totalDatabases: 12,
 *   totalAdmins: 3,
 *   totalUsers: 45,
 *   totalTables: 156,
 *   storageUsed: "24.5 ГБ"
 * });
 * // { databases: "12", admins: "3", users: "45", ... }
 * ```
 */
export const getDashboardSummary = (
  stats: DashboardStats
): Record<string, string> => {
  return {
    databases: stats.totalDatabases.toString(),
    admins: stats.totalAdmins.toString(),
    users: stats.totalUsers.toString(),
    tables: stats.totalTables.toString(),
    storage: stats.storageUsed,
  };
};

/**
 * Validate dashboard card
 * 
 * Checks if a card object has all required properties.
 * 
 * @param card - Partial dashboard card object
 * @returns True if valid, false otherwise
 * 
 * @example
 * ```ts
 * validateDashboardCard({
 *   id: 'db-count',
 *   name: 'Databases',
 *   description: 'Total databases',
 *   category: 'stats',
 *   visible: true
 * }) // true
 * 
 * validateDashboardCard({ id: 'test' }) // false
 * ```
 */
export const validateDashboardCard = (
  card: Partial<DashboardCard>
): boolean => {
  return !!(
    card.id &&
    card.name &&
    card.description &&
    card.category &&
    typeof card.visible === 'boolean'
  );
};

/**
 * Export dashboard configuration
 * 
 * Serializes dashboard cards to JSON string.
 * 
 * @param cards - Array of dashboard cards
 * @returns JSON string representation
 * 
 * @example
 * ```ts
 * const json = exportDashboardConfig(cards);
 * // Download or save to backend
 * downloadFile(json, 'dashboard-config.json');
 * ```
 */
export const exportDashboardConfig = (cards: DashboardCard[]): string => {
  return JSON.stringify(cards, null, 2);
};

/**
 * Import dashboard configuration
 * 
 * Parses and validates dashboard configuration from JSON string.
 * Returns null if parsing fails or validation fails.
 * 
 * @param configString - JSON string to parse
 * @returns Array of valid cards or null
 * 
 * @example
 * ```ts
 * const cards = importDashboardConfig(jsonString);
 * if (cards) {
 *   setDashboardCards(cards);
 * } else {
 *   showError('Invalid configuration');
 * }
 * ```
 */
export const importDashboardConfig = (
  configString: string
): DashboardCard[] | null => {
  try {
    const cards = JSON.parse(configString);
    if (Array.isArray(cards) && cards.every(validateDashboardCard)) {
      return cards;
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Reset dashboard to defaults
 * 
 * Resets all cards to visible state.
 * Returns a new array with all cards visible.
 * 
 * @param defaultCards - Default card configuration
 * @returns New array with all cards set to visible
 * 
 * @example
 * ```ts
 * const reset = resetDashboardToDefaults(defaultCards);
 * setDashboardCards(reset);
 * ```
 */
export const resetDashboardToDefaults = (
  defaultCards: DashboardCard[]
): DashboardCard[] => {
  return defaultCards.map((card) => ({ ...card, visible: true }));
};
