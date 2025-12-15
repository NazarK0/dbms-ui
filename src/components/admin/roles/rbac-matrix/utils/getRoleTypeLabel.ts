import type { RoleType } from '../types';

/**
 * Get role type label
 */
export function getRoleTypeLabel(type: RoleType): string {
  return type === 'admin' ? 'Роль адміна' : 'Роль користувача';
}
