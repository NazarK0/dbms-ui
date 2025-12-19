/**
 * Permission utility functions
 */

/**
 * Checks if user has INSERT permission
 */
export function canInsert(permissions: string[]): boolean {
  return permissions.includes('INSERT');
}

/**
 * Checks if user has UPDATE permission
 */
export function canUpdate(permissions: string[]): boolean {
  return permissions.includes('UPDATE');
}

/**
 * Checks if user has DELETE permission
 */
export function canDelete(permissions: string[]): boolean {
  return permissions.includes('DELETE');
}

/**
 * Checks if user has SELECT permission
 */
export function canSelect(permissions: string[]): boolean {
  return permissions.includes('SELECT');
}

/**
 * Gets all permission flags at once
 */
export function getPermissions(permissions: string[]) {
  return {
    canInsert: canInsert(permissions),
    canUpdate: canUpdate(permissions),
    canDelete: canDelete(permissions),
    canSelect: canSelect(permissions),
  };
}
