/**
 * Create Schema Modal - Permissions
 * ==================================
 * 
 * Функції для перевірки дозволів користувачів.
 * Визначають чи може користувач призначити певного власника для схеми.
 */

/**
 * Checks if user has permission to create schema with specific owner
 * @param currentUser - Current user role
 * @param targetOwner - Target owner role
 * @returns true if allowed, false otherwise
 */
export const canAssignOwner = (currentUser: string, targetOwner: string): boolean => {
  // Superuser can assign any owner
  if (currentUser === 'postgres') return true;
  
  // Admin can assign to admin, developer, analyst
  if (currentUser === 'admin') {
    return ['admin', 'developer', 'analyst', 'content_manager'].includes(targetOwner);
  }
  
  // Regular users can only assign to themselves
  return currentUser === targetOwner;
};
