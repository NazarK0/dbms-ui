// Admin Panel Components - Centralized exports
// All admin-related components should be imported from here

// ==================== LAYOUT & NAVIGATION ====================
export { default as AdminHeader } from './AdminHeader';
export { default as AdminTabsList } from './AdminTabsList';

// ==================== DASHBOARD COMPONENTS ====================
export { default as StatCard } from './dashboard/StatCard';
export { default as ActivityItem } from './dashboard/ActivityItem';
export { default as ConnectionItem } from './dashboard/ConnectionItem';

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

// ==================== MAIN ADMIN PAGES ====================
// These are re-exported from pages directory
export { default as Dashboard } from './pages/Dashboard';
export { default as DatabaseManager } from './pages/DatabaseManager';
export { default as UsersManager } from './pages/UsersManager';
export { default as RolesManager } from './pages/RolesManager';
export { default as AuditLog } from './pages/AuditLog';
export { default as PostgresConfig } from './pages/PostgresConfig';
export { default as CLI } from './pages/CLI';
export { default as SystemMonitor } from './pages/SystemMonitor';
export { default as ReplicaClusters } from './pages/ReplicaClusters';
export { default as PerformanceAnalyzer } from './pages/PerformanceAnalyzer';
export { default as Logs } from './Logs';
export { default as UserUIPreview } from './pages/UserUIPreview';

// ==================== SUB-COMPONENTS (used by main pages) ====================
export { default as QueryExecutor } from './database-tools/QueryExecutor';
export { default as TableBrowser } from './database-tools/TableBrowser';
export { default as SchemaVisualizer } from './database-tools/SchemaVisualizer';
export { default as SchemasManager } from './database-tools/SchemasManager';
export { default as ExtensionManager } from './database-tools/ExtensionManager';
export { default as FunctionsManager } from './database-tools/FunctionsManager';
export { default as TriggersRules } from './database-tools/TriggersRules';
export { default as BackupRestore } from './database-tools/BackupRestore';