# Admin Components Directory

This directory contains all admin-panel-specific components for the PostgreSQL DBMS management system.

## 📁 Directory Structure

```
/components/admin/
├── AdminHeader.tsx              # Main admin header (Logo, Home, Notifications)
├── AdminTabsList.tsx            # Navigation tabs (12 admin tabs)
├── Logs.tsx                     # System logs viewer
│
├── dashboard/                   # Dashboard widgets
│   ├── StatCard.tsx            # Statistics card (databases, users, etc.)
│   ├── ActivityItem.tsx        # Activity log item
│   ├── ConnectionItem.tsx      # Active connection item
│   └── index.ts
│
├── database/                    # Database management components
│   └── index.ts                # (Reserved for future components)
│
├── database-manager/            # Database manager components
│   ├── UserDatabasesTable.tsx  # User databases table
│   ├── TemplateDatabasesCard.tsx # Template databases card
│   ├── AdminDatabasesCard.tsx  # Admin databases card
│   ├── DatabaseToolsView.tsx   # Database tools view
│   └── index.ts
│
├── database-tools/              # Database tools components
│   ├── QueryExecutor.tsx       # SQL query execution interface
│   ├── TableBrowser.tsx        # Browse and edit table data
│   ├── SchemaVisualizer.tsx    # Visualize database schema
│   ├── SchemasManager.tsx      # Manage database schemas
│   ├── ExtensionManager.tsx    # Manage PostgreSQL extensions
│   ├── FunctionsManager.tsx    # Manage database functions
│   ├── TriggersRules.tsx       # Manage triggers and rules
│   ├── BackupRestore.tsx       # Backup and restore operations
│   ├── DataTypesManager.tsx    # Manage data types
│   ├── ForeignServersManager.tsx # Manage foreign servers
│   └── ForeignTablesManager.tsx # Manage foreign tables
│
├── roles/                       # Role management components
│   ├── RoleCard.tsx            # Individual role card
│   ├── RolesGrid.tsx           # Grid of role cards
│   ├── AdminRolesPanel.tsx     # Admin roles panel
│   ├── UserRolesPanel.tsx      # User roles panel
│   ├── CreateRoleModal.tsx     # Create new role modal
│   ├── EditAdminRoleModal.tsx  # Edit admin role modal
│   ├── EditUserRoleModal.tsx   # Edit user role modal
│   ├── StatsCards.tsx          # Role statistics cards
│   ├── RBACMatrix.tsx          # RBAC permissions matrix
│   ├── RoleHistory.tsx         # Role change history
│   └── index.ts
│
├── hooks/                       # Custom React hooks
│   └── useDashboardCustomization.ts
│
├── pages/                       # Main admin pages
│   ├── Dashboard.tsx           # Main admin dashboard
│   ├── DatabaseManager.tsx     # Database management interface
│   ├── UsersManager.tsx        # User management interface
│   ├── RolesManager.tsx        # Role & RBAC management
│   ├── AuditLog.tsx            # System audit logs
│   ├── PostgresConfig.tsx      # PostgreSQL configuration
│   ├── CLI.tsx                 # Command-line interface
│   ├── SystemMonitor.tsx       # System performance monitor
│   ├── ReplicaClusters.tsx     # Replica cluster management
│   ├── PerformanceAnalyzer.tsx # Performance analysis tools
│   └── UserUIPreview.tsx       # Preview of user interface
│
├── index.ts                     # Main export file
└── README.md                    # This file
```

## 🎯 Main Admin Pages

These pages are re-exported from `/components/admin/index.ts`:

| Component | Path | Description |
|-----------|------|-------------|
| Dashboard | `pages/Dashboard.tsx` | Main admin dashboard with widgets |
| DatabaseManager | `pages/DatabaseManager.tsx` | Database management interface |
| UsersManager | `pages/UsersManager.tsx` | User management interface |
| RolesManager | `pages/RolesManager.tsx` | Role & RBAC management |
| AuditLog | `pages/AuditLog.tsx` | System audit logs |
| PostgresConfig | `pages/PostgresConfig.tsx` | PostgreSQL configuration |
| CLI | `pages/CLI.tsx` | Command-line interface |
| SystemMonitor | `pages/SystemMonitor.tsx` | System performance monitor |
| ReplicaClusters | `pages/ReplicaClusters.tsx` | Replica cluster management |
| PerformanceAnalyzer | `pages/PerformanceAnalyzer.tsx` | Performance analysis tools |
| Logs | `Logs.tsx` | System logs viewer |
| UserUIPreview | `pages/UserUIPreview.tsx` | Preview of user interface |

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
- **DataTypesManager** - Manage custom data types
- **ForeignServersManager** - Manage foreign data wrappers
- **ForeignTablesManager** - Manage foreign tables

## 📦 Import Examples

### Import from main index:
```tsx
import { 
  Dashboard, 
  DatabaseManager, 
  UsersManager, 
  RolesManager,
  StatCard,
  ActivityItem,
  ConnectionItem,
  RoleCard,
  RolesGrid,
  AdminRolesPanel,
  UserRolesPanel,
  CreateRoleModal,
  StatsCards,
  useDashboardCustomization
} from '@/components/admin';
```

### Import from subfolders:
```tsx
// Dashboard components
import { StatCard, ActivityItem, ConnectionItem } from '@/components/admin/dashboard';

// Roles components
import { RoleCard, RolesGrid, CreateRoleModal } from '@/components/admin/roles';

// Database tools
import { QueryExecutor, TableBrowser } from '@/components/admin/database-tools';

// Hooks
import { useDashboardCustomization } from '@/components/admin/hooks';
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

### 3. RoleCard Component
```tsx
<RoleCard
  role={{
    name: "Developer",
    type: "user",
    users: 12,
    databases: 5,
    permissions: ["read", "write"]
  }}
  onEdit={handleEdit}
  onSelect={handleSelect}
  onDelete={handleDelete}
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
- Borders: `border-lime-200`

## 📊 Mock Data

Located in `/mockData/admin/`:

- **dashboard.ts** - Dashboard statistics, activity, connections, metrics
- **roles.ts** - Admin and user roles data
- **users.ts** - User management data
- **tables.ts** - Database tables data
- **schemas.ts** - Database schemas data
- **extensions.ts** - PostgreSQL extensions data
- **functions.ts** - Database functions data
- **triggers.ts** - Database triggers data
- **backups.ts** - Backup and restore data
- **queries.ts** - SQL query history
- **dataTypes.ts** - Custom data types
- **foreignServers.ts** - Foreign data wrapper servers

## 🚀 Adding New Components

When adding new admin components:

1. Create component in appropriate subfolder
2. Add to subfolder's `index.ts`
3. Add to main `/admin/index.ts` if needed for external use
4. Update this README
5. Follow naming convention: PascalCase for components
6. Use TypeScript interfaces for props
7. Keep components focused (SRP - Single Responsibility Principle)

## ✅ Code Quality Standards

- ✅ **DRY** - Don't Repeat Yourself (no duplicates)
- ✅ **SRP** - Single Responsibility Principle
- ✅ **Modular** - Small, reusable components
- ✅ **TypeScript** - Full type safety
- ✅ **Documented** - Clear prop interfaces
- ✅ **Clean** - No unused components or dead code
- ✅ **Accessible** - Proper ARIA labels
- ✅ **Responsive** - Works on all screen sizes (desktop 1024px+)

## 📝 Notes

- All admin components use **olive/lime** color theme
- Desktop-only (min-width: 1024px)
- Ukrainian language interface
- Uses shadcn/ui components
- PostgreSQL-specific functionality
- No duplicate data - all mock data in `/mockData/admin/`
- No unused components - all code is actively used

## 🗑️ Recently Cleaned

Last cleanup: December 2024

**Removed duplicates:**
- `/components/admin/data/mockAdminData.ts` - Duplicate of `/mockData/admin/dashboard.ts`

**Removed unused components:**
- `/components/admin/database/DatabaseRow.tsx` - Not used anywhere
- `/components/admin/database-manager/DatabaseList.tsx` - Not used anywhere
- `/components/admin/database-manager/modals/CreateDatabaseModal.tsx` - Not used
- `/components/admin/database-manager/modals/CopyDatabaseModal.tsx` - Not used
- `/components/admin/database-manager/modals/ExportSchemaModal.tsx` - Not used
- `/components/admin/database-manager/modals/ImportSchemaModal.tsx` - Not used

**Fixed broken imports:**
- Removed unused `useUser` import from `Dashboard.tsx`

Result: **Clean, optimized structure with 100% active components** 🚀
