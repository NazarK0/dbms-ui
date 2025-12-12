// Admin Panel Components - Centralized exports
// All admin-related components should be imported from here

// ==================== LAYOUT & NAVIGATION ====================
export { default as AdminHeader } from './AdminHeader';
export { default as AdminTabsList } from './AdminTabsList';

// ==================== DASHBOARD COMPONENTS ====================
export { default as StatCard } from './dashboard/StatCard';
export { default as ActivityItem } from './dashboard/ActivityItem';
export { default as ConnectionItem } from './dashboard/ConnectionItem';

// ==================== DATABASE COMPONENTS ====================
export { default as DatabaseRow } from './database/DatabaseRow';

// ==================== ROLES COMPONENTS ====================
export { default as RoleCard } from './roles/RoleCard';
export { default as RolesGrid } from './roles/RolesGrid';
export { default as AdminRolesPanel } from './roles/AdminRolesPanel';
export { default as UserRolesPanel } from './roles/UserRolesPanel';
export { default as CreateRoleModal } from './roles/CreateRoleModal';
export { default as StatsCards } from './roles/StatsCards';

// ==================== USERS COMPONENTS ====================
export { default as UserTable } from '../users/UserTable';
export { default as CreateUserModal } from '../users/CreateUserModal';

// ==================== CUSTOM HOOKS ====================
export { useDashboardCustomization } from './hooks/useDashboardCustomization';
export type { DashboardCard } from './hooks/useDashboardCustomization';

// ==================== MOCK DATA ====================
export * from './data/mockAdminData';

// ==================== MAIN ADMIN PAGES ====================
// These are re-exported from root /components for backward compatibility
export { default as Dashboard } from '../Dashboard';
export { default as DatabaseManager } from '../DatabaseManager';
export { default as UsersManager } from '../UsersManager';
export { default as RolesManager } from './RolesManager';
export { default as AuditLog } from '../AuditLog';
export { default as PostgresConfig } from '../PostgresConfig';
export { default as CLI } from '../CLI';
export { default as SystemMonitor } from '../SystemMonitor';
export { default as ReplicaClusters } from '../ReplicaClusters';
export { default as PerformanceAnalyzer } from '../PerformanceAnalyzer';
export { default as Logs } from './Logs';
export { default as UserUIPreview } from '../UserUIPreview';

// ==================== SUB-COMPONENTS (used by main pages) ====================
export { default as QueryExecutor } from '../QueryExecutor';
export { default as TableBrowser } from '../TableBrowser';
export { default as SchemaVisualizer } from '../SchemaVisualizer';
export { default as SchemasManager } from '../SchemasManager';
export { default as ExtensionManager } from '../ExtensionManager';
export { default as FunctionsManager } from '../FunctionsManager';
export { default as TriggersRules } from '../TriggersRules';
export { default as BackupRestore } from '../BackupRestore';
