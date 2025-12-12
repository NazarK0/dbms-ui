# Admin Components Directory

This directory contains all admin-panel-specific components for the PostgreSQL DBMS management system.

## 📁 Directory Structure

```
/components/admin/
├── layout/                         # Layout components
│   ├── AdminHeader.tsx            # Main admin header (Logo, Home, Notifications)
│   ├── AdminTabsList.tsx          # Navigation tabs (12 admin tabs)
│   └── index.ts
│
├── dashboard/                      # Dashboard widgets
│   ├── StatCard.tsx               # Statistics card (databases, users, etc.)
│   ├── ActivityItem.tsx           # Activity log item
│   ├── ConnectionItem.tsx         # Active connection item
│   └── index.ts
│
├── database/                       # Database management components
│   ├── DatabaseRow.tsx            # Database table row
│   └── index.ts
│
├── roles/                          # Role management components
│   ├── RoleCard.tsx               # Individual role card
│   ├── RolesGrid.tsx              # Grid of role cards
│   ├── AdminRolesPanel.tsx        # Admin roles panel
│   ├── UserRolesPanel.tsx         # User roles panel
│   ├── CreateRoleModal.tsx        # Create/Edit role modal
│   ├── StatsCards.tsx             # Role statistics cards
│   ├── RBACMatrix.tsx             # RBAC permissions matrix
│   ├── RoleHistory.tsx            # Role change history
│   └── index.ts
│
├── users/                          # User management components
│   ├── UserTable.tsx              # User list table
│   ├── CreateUserModal.tsx        # Create/Edit user modal
│   └── index.ts
│
├── hooks/                          # Custom React hooks
│   └── useDashboardCustomization.ts
│
├── data/                           # Mock data and constants
│   └── mockAdminData.ts
│
├── AdminHeader.tsx                 # (source file)
├── AdminTabsList.tsx               # (source file)
├── RolesManager.tsx                # Main roles manager page
├── Logs.tsx                        # System logs viewer
├── index.ts                        # Main export file
└── README.md                       # This file
```

## 🎯 Main Admin Pages

These pages are re-exported from `/components/admin/index.ts`:

| Component | Path | Description |
|-----------|------|-------------|
| Dashboard | `/Dashboard.tsx` | Main admin dashboard |
| DatabaseManager | `/DatabaseManager.tsx` | Database management interface |
| UsersManager | `/UsersManager.tsx` | User management interface |
| RolesManager | `/admin/RolesManager.tsx` | Role & RBAC management |
| AuditLog | `/AuditLog.tsx` | System audit logs |
| PostgresConfig | `/PostgresConfig.tsx` | PostgreSQL configuration |
| CLI | `/CLI.tsx` | Command-line interface |
| SystemMonitor | `/SystemMonitor.tsx` | System performance monitor |
| ReplicaClusters | `/ReplicaClusters.tsx` | Replica cluster management |
| PerformanceAnalyzer | `/PerformanceAnalyzer.tsx` | Performance analysis tools |
| Logs | `/admin/Logs.tsx` | System logs viewer |
| UserUIPreview | `/UserUIPreview.tsx` | Preview of user interface |

## 🔧 Sub-Components (Database Tools)

Used by DatabaseManager and other pages:

- **QueryExecutor** - SQL query execution interface
- **TableBrowser** - Browse and edit table data
- **SchemaVisualizer** - Visualize database schema
- **SchemasManager** - Manage database schemas
- **ExtensionManager** - Manage PostgreSQL extensions
- **FunctionsManager** - Manage database functions
- **TriggersRules** - Manage triggers and rules
- **BackupRestore** - Backup and restore operations

## 📦 Import Examples

### Import from organized structure:
```tsx
// Layout components
import { AdminHeader, AdminTabsList } from '@/components/admin/layout';

// Dashboard components
import { StatCard, ActivityItem, ConnectionItem } from '@/components/admin/dashboard';

// Database components
import { DatabaseRow } from '@/components/admin/database';

// Roles components
import { RoleCard, RolesGrid, CreateRoleModal } from '@/components/admin/roles';

// Users components
import { UserTable, CreateUserModal } from '@/components/admin/users';

// Hooks
import { useDashboardCustomization } from '@/components/admin/hooks';

// Mock data
import { statsData, recentActivity, activeConnections } from '@/components/admin/data';
```

### Import main pages:
```tsx
import { 
  Dashboard, 
  DatabaseManager, 
  UsersManager, 
  RolesManager 
} from '@/components/admin';
```

### Import from root (backward compatibility):
```tsx
import Dashboard from '@/components/Dashboard';
import DatabaseManager from '@/components/DatabaseManager';
import UsersManager from '@/components/UsersManager';
```

## 🎨 Component Patterns

### 1. StatCard Component
```tsx
<StatCard 
  id="databases"
  label="Всього баз даних"
  value="12"
  icon={Database}
  color="from-lime-500 to-green-600"
  change="+2"
  trend="up"
  visible={true}
/>
```

### 2. ActivityItem Component
```tsx
<ActivityItem 
  action="База даних створена"
  details="production_db"
  user="admin"
  time="2 хвилини тому"
  type="success"
/>
```

### 3. DatabaseRow Component
```tsx
<DatabaseRow
  name="production_db"
  owner="admin"
  size="1.2 ГБ"
  tables={45}
  encoding="UTF8"
  collation="uk_UA.UTF-8"
  isSelected={true}
  onSelect={() => handleSelect('production_db')}
  onDelete={() => handleDelete('production_db')}
/>
```

## 🔄 Custom Hooks

### useDashboardCustomization
Manages dashboard widget visibility and customization:

```tsx
const {
  visibleCards,           // Array of dashboard cards with visibility state
  customizeDialogOpen,    // Dialog open/closed state
  setCustomizeDialogOpen, // Toggle customization dialog
  toggleCardVisibility,   // Toggle card visibility by ID
  isCardVisible,          // Check if card is visible
  visibleCount,           // Count of visible cards
} = useDashboardCustomization();
```

## 🎨 Color Theme

Admin panel uses **olive/lime** color scheme:

- Primary: `lime-600` to `green-700`
- Accents: `lime-50`, `lime-100`, `lime-200`
- Active states: `bg-lime-600 text-white`
- Hover states: `hover:bg-lime-50`

## 📊 Mock Data

Located in `/admin/data/mockAdminData.ts`:

- **statsData** - Dashboard statistics (databases, users, tables, storage)
- **recentActivity** - Recent system activity log
- **activeConnections** - Current database connections
- **performanceMetrics** - System performance metrics

## 🚀 Adding New Components

When adding new admin components:

1. Create component in appropriate subfolder
2. Add to subfolder's `index.ts`
3. Add to main `/admin/index.ts` if needed
4. Update this README
5. Follow naming convention: PascalCase for components
6. Use TypeScript interfaces for props
7. Keep components focused (SRP - Single Responsibility Principle)

## ✅ Code Quality Standards

- ✅ **DRY** - Don't Repeat Yourself
- ✅ **SRP** - Single Responsibility Principle
- ✅ **Modular** - Small, reusable components
- ✅ **TypeScript** - Full type safety
- ✅ **Documented** - Clear prop interfaces
- ✅ **Tested** - Easy to test in isolation
- ✅ **Accessible** - Proper ARIA labels
- ✅ **Responsive** - Works on all screen sizes (desktop 1024px+)

## 📝 Notes

- All admin components use **olive/lime** color theme
- Desktop-only (min-width: 1024px)
- Ukrainian language interface
- Uses shadcn/ui components
- PostgreSQL-specific functionality
