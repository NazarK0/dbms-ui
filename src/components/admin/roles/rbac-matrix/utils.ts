/**
 * Utility functions for RBAC Matrix
 */

import type { RoleType } from './types';

/**
 * Get color classes for role type
 */
export function getColorClasses(type: RoleType) {
  if (type === 'admin') {
    return {
      gradient: 'from-lime-500 to-green-600',
      bgGradient: 'from-lime-50 to-green-50',
      bgGradientHover: 'from-lime-100 to-green-100',
      border: 'border-lime-200',
      iconColor: 'text-lime-600',
      badgeBorder: 'border-lime-300',
      badgeText: 'text-lime-700',
      hoverBg: 'hover:bg-lime-50/30',
      checkboxChecked:
        'data-[state=checked]:bg-lime-600 data-[state=checked]:border-lime-600',
    };
  }

  return {
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-50 to-purple-50',
    bgGradientHover: 'from-violet-100 to-purple-100',
    border: 'border-violet-200',
    iconColor: 'text-violet-600',
    badgeBorder: 'border-violet-300',
    badgeText: 'text-violet-700',
    hoverBg: 'hover:bg-violet-50/30',
    checkboxChecked:
      'data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600',
  };
}

/**
 * Toggle category in expanded set
 */
export function toggleCategory(
  category: string,
  expandedCategories: Set<string>
): Set<string> {
  const newExpanded = new Set(expandedCategories);
  if (newExpanded.has(category)) {
    newExpanded.delete(category);
  } else {
    newExpanded.add(category);
  }
  return newExpanded;
}

/**
 * Get role type label
 */
export function getRoleTypeLabel(type: RoleType): string {
  return type === 'admin' ? 'Роль адміна' : 'Роль користувача';
}
