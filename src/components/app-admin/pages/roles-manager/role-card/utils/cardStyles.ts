/**
 * Utilities for RoleCard styling
 * Determines colors and gradients based on role type
 */

import type { RoleType } from '../types';

export interface CardStyle {
  bgGradient: string;
  borderColor: string;
}

/**
 * Get card styling based on role type
 */
export function getCardStyle(type: RoleType): CardStyle {
  const isAdmin = type === 'admin';
  
  return {
    bgGradient: isAdmin 
      ? 'from-lime-50 to-green-50 hover:from-lime-100 hover:to-green-100' 
      : 'from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100',
    borderColor: isAdmin ? 'border-lime-200' : 'border-violet-200',
  };
}

/**
 * Check if role is admin type
 */
export function isAdminRole(type: RoleType): boolean {
  return type === 'admin';
}

/**
 * Check if role can be deleted
 */
export function isDeletableRole(roleName: string): boolean {
  return roleName !== 'Superadmin';
}
