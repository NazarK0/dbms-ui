# Database Tools Architecture

## 🏗️ Component Architecture Overview

This document provides a visual overview of the modular architecture for database tool components.

---

## 📊 Component Hierarchy

### BackupRestore Component

```
┌─────────────────────────────────────────────────────────────────┐
│                      BackupRestore.tsx                          │
│                    (Main Orchestrator)                          │
│                                                                 │
│  State Management:                                              │
│  • isBackingUp                                                  │
│                                                                 │
│  Event Handlers:                                                │
│  • handleCreateBackup()                                         │
│  • handleDownloadBackup()                                       │
│  • handleRestoreBackup()                                        │
│  • handleAddSchedule()                                          │
│  • handleToggleSchedule()                                       │
│  • handleEditSchedule()                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────▼────┐          ┌─────▼─────┐        ┌─────▼─────┐
   │ Backups │          │  Restore  │        │ Schedule  │
   │   Tab   │          │    Tab    │        │    Tab    │
   └────┬────┘          └─────┬─────┘        └─────┬─────┘
        │                     │                     │
   ┌────▼──────────────┐      │              ┌─────▼──────────────┐
   │ BackupHeader      │      │              │ ScheduleHeader     │
   ├───────────────────┤      │              ├────────────────────┤
   │ BackupProgress    │      │              │ SchedulesTable     │
   │  (conditional)    │      │              │  ├─ScheduleActions │
   ├───────────────────┤      │              └────────────────────┘
   │ BackupsTable      │      │
   │  ├─BackupActions  │      │
   └───────────────────┘      │
                         ┌────▼──────────────┐
                         │ RestoreUpload     │
                         ├───────────────────┤
                         │ RestoreWarning    │
                         └───────────────────┘
```

### ForeignServersManager Component

```
┌─────────────────────────────────────────────────────────────────┐
│                  ForeignServersManager.tsx                      │
│                    (Main Orchestrator)                          │
│                                                                 │
│  State Management:                                              │
│  • searchQuery                                                  │
│  • showCreateModal                                              │
│                                                                 │
│  Event Handlers:                                                │
│  • handleCreateServer()                                         │
│  • handleDeleteServer()                                         │
│  • handleTestConnection()                                       │
│  • handleEditServer()                                           │
│                                                                 │
│  Business Logic:                                                │
│  • Filter servers by search query                               │
│  • Check FDW extension installation                             │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────▼─────────────┐  ┌────▼─────────┐   ┌─────▼─────────────┐
   │ Conditional:     │  │              │   │                   │
   │ FDW Not          │  │ Main Card    │   │ CreateServerModal │
   │ Installed Alert  │  │              │   │                   │
   └──────────────────┘  └────┬─────────┘   │ • Form fields     │
                              │             │ • Validation      │
                         ┌────▼───────────┐ │ • Auto port       │
                         │ ServersHeader  │ └───────────────────┘
                         ├────────────────┤
                         │ SearchBar      │
                         ├────────────────┤
                         │ InfoAlert      │
                         ├────────────────┤
                         │ ServersTable   │
                         │  ├─ServerRow   │
                         │  └─ServerActions│
                         └────────────────┘
```

---

## 🧩 Component Categories

### 1️⃣ Header Components
Provide title, description, and primary actions

| Component | Purpose | Props |
|-----------|---------|-------|
| `BackupHeader` | Display database + create button | selectedDatabase, onCreateBackup |
| `ScheduleHeader` | Display title + add schedule button | onAddSchedule |
| `ServersHeader` | Display title + add server button | onAddServer |

### 2️⃣ Search/Filter Components
Enable users to find specific items

| Component | Purpose | Props |
|-----------|---------|-------|
| `ServersSearchBar` | Filter foreign servers | value, onChange, placeholder? |

### 3️⃣ Alert Components
Display important information or warnings

| Component | Purpose | Props |
|-----------|---------|-------|
| `RestoreWarning` | Warn about data replacement | none |
| `ServersInfoAlert` | Explain FDW functionality | none |
| `FDWNotInstalledAlert` | Alert missing extension | none |

### 4️⃣ Progress Components
Show operation status

| Component | Purpose | Props |
|-----------|---------|-------|
| `BackupProgress` | Display backup progress | progress, estimatedTimeRemaining? |

### 5️⃣ Upload Components
Handle file uploads

| Component | Purpose | Props |
|-----------|---------|-------|
| `RestoreUpload` | Upload backup files | onFileSelect? |

### 6️⃣ Table Components
Display lists of data

| Component | Purpose | Props |
|-----------|---------|-------|
| `BackupsTable` | List backups | backups[], onDownload, onRestore |
| `SchedulesTable` | List schedules | schedules[], onToggle, onEdit |
| `ServersTable` | List foreign servers | servers[], onTest, onEdit?, onDelete |

### 7️⃣ Action Components
Provide row-level actions

| Component | Purpose | Props |
|-----------|---------|-------|
| `BackupActions` | Download/restore buttons | backupId, filename, onDownload, onRestore |
| `ScheduleActions` | Toggle/edit buttons | scheduleId, isEnabled, onToggle, onEdit |
| `ServerActions` | Test/edit/delete buttons | serverName, onTest, onEdit?, onDelete |

### 8️⃣ Modal Components
Complex forms and dialogs

| Component | Purpose | Props |
|-----------|---------|-------|
| `CreateServerModal` | Add foreign server form | open, onOpenChange, onSubmit |

---

## 🔄 Data Flow Pattern

```
┌─────────────────┐
│   mockData/     │  ← Centralized data source
│   admin/        │
└────────┬────────┘
         │ import
         ▼
┌─────────────────┐
│ Parent Component│  ← State management & business logic
│  (Orchestrator) │
└────────┬────────┘
         │ props
         ▼
┌─────────────────┐
│ Child Component │  ← Pure presentation
│   (Display)     │
└────────┬────────┘
         │ callbacks
         ▼
┌─────────────────┐
│ Parent Component│  ← Handles events
└─────────────────┘
```

### Example Flow: Creating a Backup

```
1. User clicks "Створити резервну копію" button
   ↓
2. BackupHeader emits onCreateBackup()
   ↓
3. BackupRestore.handleCreateBackup()
   • Sets isBackingUp = true
   • (Would call API in production)
   ↓
4. BackupProgress renders conditionally
   • Shows progress bar
   • Displays estimated time
   ↓
5. After completion (mock: 5 seconds)
   • Sets isBackingUp = false
   • BackupsTable re-renders with new data
```

### Example Flow: Filtering Servers

```
1. User types in search input
   ↓
2. ServersSearchBar emits onChange(value)
   ↓
3. ForeignServersManager updates searchQuery state
   ↓
4. filteredServers computed from state
   ↓
5. ServersTable re-renders with filtered data
```

---

## 📦 Import Strategy

### Before (Monolithic)
```typescript
import BackupRestore from './BackupRestore';
// Single 196-line file
```

### After (Modular)
```typescript
// Option 1: Import parent component only
import BackupRestore from './BackupRestore';

// Option 2: Import individual components for reuse
import {
  BackupHeader,
  BackupProgress,
  BackupsTable,
  BackupActions,
} from './backup-restore';

// Option 3: Import utilities
import { getBackupTypeColor, getFrequencyOptions } from './backup-restore';
```

---

## 🎯 Design Principles

### 1. Single Responsibility
Each component does ONE thing well
- ✅ `BackupHeader` → Shows header and create button
- ✅ `BackupProgress` → Shows progress indicator
- ❌ `BackupComponent` → Does everything

### 2. Composition
Build complex UIs from simple parts
```typescript
<BackupsTab>
  <BackupHeader />
  {isBackingUp && <BackupProgress />}
  <BackupsTable />
</BackupsTab>
```

### 3. Props Over State
Pass data down, emit events up
```typescript
// ✅ Good
<BackupActions 
  onDownload={handleDownload}
  onRestore={handleRestore}
/>

// ❌ Bad - component managing global state
<BackupActions />
```

### 4. Pure Functions
Utilities should be predictable
```typescript
// ✅ Pure function
export const getStatusBadge = (status: string) => {
  // Same input always produces same output
};

// ❌ Impure function
export const getStatusBadge = () => {
  // Depends on external state
};
```

### 5. Type Everything
TypeScript prevents runtime errors
```typescript
interface BackupActionsProps {
  backupId: string;
  filename: string;
  onDownload: (id: string) => void;
  onRestore: (id: string) => void;
}
```

---

## 📈 Scalability Benefits

### Easy to Test
```typescript
// Test individual components in isolation
test('BackupProgress shows correct percentage', () => {
  render(<BackupProgress progress={45} />);
  expect(screen.getByText('45% завершено')).toBeInTheDocument();
});
```

### Easy to Modify
```typescript
// Change one component without affecting others
// Modify BackupProgress → doesn't break BackupsTable
```

### Easy to Reuse
```typescript
// Use components in different contexts
<DashboardWidget>
  <BackupProgress progress={backupStatus.progress} />
</DashboardWidget>
```

### Easy to Understand
```typescript
// Clear component hierarchy
BackupRestore
  ├── BackupHeader        ← Header
  ├── BackupProgress      ← Progress
  └── BackupsTable        ← Data
       └── BackupActions  ← Actions
```

---

## 🔮 Future Patterns

### Hooks for Shared Logic
```typescript
// useBackupProgress.ts
export const useBackupProgress = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const startBackup = () => { /* ... */ };
  
  return { isBackingUp, progress, startBackup };
};
```

### Context for Deep Props
```typescript
// BackupContext.tsx
export const BackupContext = createContext<BackupContextType>({});

export const BackupProvider = ({ children }) => {
  const [backups, setBackups] = useState([]);
  
  return (
    <BackupContext.Provider value={{ backups, setBackups }}>
      {children}
    </BackupContext.Provider>
  );
};
```

### Compound Components
```typescript
// Allow flexible composition
<BackupManager>
  <BackupManager.Header />
  <BackupManager.Progress />
  <BackupManager.Table />
</BackupManager>
```

---

## ✅ Architecture Checklist

When creating new components, ensure:

- [ ] Component has single responsibility
- [ ] Props are properly typed
- [ ] Utilities are pure functions
- [ ] No hardcoded data (use mockData/)
- [ ] README documentation exists
- [ ] Central index.ts export created
- [ ] Parent component orchestrates logic
- [ ] Child components are presentational
- [ ] Events flow up via callbacks
- [ ] Data flows down via props

---

## 📚 Related Documentation

- [BackupRestore README](./backup-restore/README.md)
- [ForeignServers README](./foreign-servers/README.md)
- [Refactoring Summary](./REFACTORING_SUMMARY.md)
- [DataTypes README](./data-types/README.md)

---

**Last Updated:** 2025-12-13  
**Maintained by:** DBMS Development Team
