# Component Reorganization Plan

## Current Issues:
1. ❌ Admin components scattered in root /components
2. ❌ UserManager.tsx is unused (duplicate of UsersManager.tsx)
3. ❌ /roles and /users folders should be under /admin
4. ❌ No clear separation between admin/user/global components

## Target Structure:

```
/components/
├── admin/                          # Admin-only components
│   ├── layout/
│   │   ├── AdminHeader.tsx
│   │   └── AdminTabsList.tsx
│   ├── dashboard/
│   │   ├── StatCard.tsx
│   │   ├── ActivityItem.tsx
│   │   └── ConnectionItem.tsx
│   ├── database/
│   │   └── DatabaseRow.tsx
│   ├── roles/                      # Moved from /components/roles
│   │   ├── RoleCard.tsx
│   │   ├── RolesGrid.tsx
│   │   ├── AdminRolesPanel.tsx
│   │   ├── UserRolesPanel.tsx
│   │   ├── CreateRoleModal.tsx
│   │   ├── RoleHistory.tsx
│   │   ├── RBACMatrix.tsx
│   │   └── StatsCards.tsx
│   ├── users/                      # Moved from /components/users
│   │   ├── UserTable.tsx
│   │   └── CreateUserModal.tsx
│   ├── hooks/
│   │   └── useDashboardCustomization.ts
│   ├── data/
│   │   └── mockAdminData.ts
│   ├── Logs.tsx
│   ├── RolesManager.tsx
│   └── index.ts
│
├── user/                           # User application components
│   ├── hooks/
│   │   ├── useTabNavigation.ts
│   │   └── useNavigationHandlers.ts
│   ├── data/
│   │   └── mockUserRoles.ts
│   ├── UserApplication.tsx
│   ├── UserApplicationHeader.tsx
│   ├── UserDashboard.tsx
│   ├── DatabaseBrowser.tsx
│   ├── TableDataEditor.tsx
│   ├── BrowserTabs.tsx
│   ├── DatabaseCard.tsx
│   ├── ActivityRecordItem.tsx
│   ├── AccessedTableItem.tsx
│   └── index.ts
│
├── global/                         # Shared/global components
│   └── HomePage.tsx
│
├── ui/                            # Shadcn UI components
│   └── ...
│
├── figma/                         # Figma-specific components
│   └── ImageWithFallback.tsx
│
├── Dashboard.tsx                  # Admin components (legacy paths)
├── DatabaseManager.tsx
├── UsersManager.tsx
├── AuditLog.tsx
├── PostgresConfig.tsx
├── CLI.tsx
├── SystemMonitor.tsx
├── ReplicaClusters.tsx
├── PerformanceAnalyzer.tsx
├── UserUIPreview.tsx
├── QueryExecutor.tsx
├── TableBrowser.tsx
├── SchemaVisualizer.tsx
├── SchemasManager.tsx
├── ExtensionManager.tsx
├── FunctionsManager.tsx
├── TriggersRules.tsx
├── BackupRestore.tsx
└── Logs.tsx                       # Re-export wrapper
```

## Actions:

### ✅ COMPLETED:
1. Created /components/admin/AdminHeader.tsx
2. Created /components/admin/AdminTabsList.tsx
3. Created /components/admin/dashboard/ components
4. Created /components/admin/database/ components
5. Created /components/admin/hooks/
6. Created /components/admin/data/
7. Created /components/user/ structure with refactored components
8. Updated Dashboard.tsx to use new components
9. Updated App.tsx to use AdminHeader and AdminTabsList

### 🔄 TODO:
1. Delete UserManager.tsx (unused duplicate)
2. Move /components/roles/* to /components/admin/roles/
3. Move /components/users/* to /components/admin/users/
4. Create /components/global/ folder
5. Move HomePage.tsx to /components/global/
6. Update all import paths
7. Create comprehensive index.ts files
8. Clean up legacy wrapper files

### ❌ KEEP IN ROOT (for backward compatibility):
- All main admin components (Dashboard, DatabaseManager, etc.)
- These provide stable import paths for App.tsx
- Can be moved later in a breaking change release
