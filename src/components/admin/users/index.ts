/**
 * Barrel export for admin users components
 */

export { default as CreateUserModal } from './CreateUserModal';
export { default as EditUserPermissionsModal } from './EditUserPermissionsModal';
export { default as UserTable } from './UserTable';

// Re-export all edit-user-permissions sub-modules
export * from './edit-user-permissions';
