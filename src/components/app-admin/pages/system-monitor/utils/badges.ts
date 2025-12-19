/**
 * Badge Utility Functions
 * 
 * Functions for determining badge variants based on connection states.
 * 
 * @module utils/badges
 */

import type { ConnectionState, BadgeVariant } from '../types';
import { connectionStateBadgeVariants } from '../data';

/**
 * Get badge variant for connection state
 * 
 * Maps ConnectionState enum to shadcn/ui Badge variant.
 * Falls back to 'secondary' if state not found.
 * 
 * @param state - Connection state enum
 * @returns Badge variant string
 * 
 * @example
 * ```tsx
 * const variant = getStateBadge('активний'); // 'default'
 * <Badge variant={variant}>Active</Badge>
 * ```
 */
export const getStateBadge = (state: ConnectionState): BadgeVariant => {
  return connectionStateBadgeVariants[state] || 'secondary';
};

/**
 * Get connection state badge variant (compatibility)
 * 
 * Legacy function for string-based state mapping.
 * Prefer getStateBadge for type-safe usage.
 * 
 * @param state - Connection state as string
 * @returns Badge variant string
 * 
 * @example
 * ```tsx
 * const variant = getConnectionStateBadge('активний'); // 'default'
 * <Badge variant={variant}>Active</Badge>
 * ```
 */
export const getConnectionStateBadge = (state: string): BadgeVariant => {
  const stateMap: Record<string, BadgeVariant> = {
    'активний': 'default',
    'очікує': 'secondary',
    'в транзакції': 'outline',
    'простій': 'secondary',
  };
  return stateMap[state] || 'secondary';
};
