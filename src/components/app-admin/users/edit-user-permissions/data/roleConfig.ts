/**
 * Role configuration for admin and user types
 */

import type { Role } from '../types';

/**
 * Admin roles with color gradients
 */
export const adminRoles: Role[] = [
  { value: 'superadmin', label: 'Superadmin', color: 'from-red-500 to-red-600' },
  { value: 'database-admin', label: 'Database Admin', color: 'from-lime-500 to-green-600' },
  { value: 'developer', label: 'Developer', color: 'from-yellow-500 to-lime-600' },
  { value: 'analyst', label: 'Analyst', color: 'from-green-500 to-lime-600' },
  { value: 'viewer', label: 'Viewer', color: 'from-lime-600 to-yellow-600' },
];

/**
 * User roles with color gradients
 */
export const userRoles: Role[] = [
  { value: 'data-analyst', label: 'Data Analyst', color: 'from-violet-500 to-purple-600' },
  { value: 'content-manager', label: 'Content Manager', color: 'from-blue-500 to-cyan-600' },
  { value: 'report-viewer', label: 'Report Viewer', color: 'from-indigo-500 to-violet-600' },
  { value: 'guest-user', label: 'Guest User', color: 'from-slate-400 to-slate-500' },
];

/**
 * Get roles based on user type
 */
export const getRolesByUserType = (userType: 'admin' | 'user'): Role[] => {
  return userType === 'admin' ? adminRoles : userRoles;
};
