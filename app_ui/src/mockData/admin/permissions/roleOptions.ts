/**
 * Role Selection Options
 * 
 * Simplified role options for forms and dropdowns
 */

// Role selection options for admin forms
export const adminRoleOptions = [
  { value: 'superadmin', label: 'Superadmin', color: 'from-red-500 to-red-600' },
  { value: 'database-admin', label: 'Database Admin', color: 'from-lime-500 to-green-600' },
  { value: 'developer', label: 'Developer', color: 'from-yellow-500 to-lime-600' },
  { value: 'analyst', label: 'Analyst', color: 'from-green-500 to-lime-600' },
  { value: 'viewer', label: 'Viewer', color: 'from-lime-600 to-yellow-600' },
];

// Role selection options for user forms
export const userRoleOptions = [
  { value: 'data-analyst', label: 'Data Analyst', color: 'from-violet-500 to-purple-600' },
  { value: 'content-manager', label: 'Content Manager', color: 'from-blue-500 to-cyan-600' },
  { value: 'report-viewer', label: 'Report Viewer', color: 'from-indigo-500 to-violet-600' },
  { value: 'guest', label: 'Guest User', color: 'from-slate-400 to-slate-500' },
];
