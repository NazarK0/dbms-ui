/**
 * Storage Utility Functions
 * 
 * Manages localStorage operations for dashboard configuration.
 * Provides save, load, and clear functionality.
 * 
 * @module storage.utils
 */

import type { DashboardCard } from '../types';
import { importDashboardConfig } from './config.utils';

/**
 * LocalStorage key for dashboard configuration
 */
const STORAGE_KEY = 'dashboard_config';

/**
 * Save dashboard config to localStorage
 * 
 * Persists dashboard card configuration to browser storage.
 * 
 * @param cards - Array of dashboard cards to save
 * 
 * @example
 * ```ts
 * saveDashboardConfig(updatedCards);
 * ```
 */
export const saveDashboardConfig = (cards: DashboardCard[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
};

/**
 * Load dashboard config from localStorage
 * 
 * Retrieves and validates saved dashboard configuration.
 * Returns null if no configuration exists or validation fails.
 * 
 * @returns Array of dashboard cards or null
 * 
 * @example
 * ```ts
 * const saved = loadDashboardConfig();
 * if (saved) {
 *   setDashboardCards(saved);
 * } else {
 *   setDashboardCards(defaultCards);
 * }
 * ```
 */
export const loadDashboardConfig = (): DashboardCard[] | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  return importDashboardConfig(saved);
};

/**
 * Clear dashboard config from localStorage
 * 
 * Removes saved dashboard configuration from storage.
 * Useful for reset functionality.
 * 
 * @example
 * ```ts
 * clearDashboardConfig();
 * setDashboardCards(defaultCards);
 * ```
 */
export const clearDashboardConfig = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
