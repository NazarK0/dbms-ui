/**
 * UI helper functions for CLI components
 */

import type { CommandStatus } from '../types';

/**
 * Get status color class
 */
export const getStatusColorClass = (status: CommandStatus): string => {
  return status === 'success' ? 'text-green-300' : 'text-red-400';
};

/**
 * Get status badge variant
 */
export const getStatusBadgeVariant = (
  status: CommandStatus
): 'default' | 'destructive' => {
  return status === 'success' ? 'default' : 'destructive';
};

/**
 * Get status label
 */
export const getStatusLabel = (status: CommandStatus): string => {
  return status === 'success' ? 'OK' : 'ERROR';
};
