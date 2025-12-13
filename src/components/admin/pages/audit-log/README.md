# Audit Log Components

Модульні компоненти для відображення та фільтрації аудит логу системи PostgreSQL DBMS з статистикою, фільтрами та експортом.

## 📁 Структура

```
audit-log/
├── AuditStatisticsCards.tsx      # 4 статистичні картки
├── ActionTypeStats.tsx            # Статистика за типом дій
├── AuditFilters.tsx               # Фільтри та пошук
├── AuditLogTable.tsx              # Таблиця аудит логу
├── types.ts                       # TypeScript інтерфейси
├── data.ts                        # Mock дані (12 audit entries)
├── utils.ts                       # Допоміжні функції (40+ functions)
├── index.ts                       # Центральний експорт
└── README.md                      # Ця документація
```

## 🧩 Компоненти

### AuditStatisticsCards
4 статистичні картки з ключовими метриками аудит логу.

**Props:**
```typescript
interface AuditStatisticsCardsProps {
  statistics: AuditStatistics;
}

interface AuditStatistics {
  total: number;      // Всього подій
  today: number;      // Події за сьогодні
  success: number;    // Успішних операцій
  failed: number;     // Помилкових операцій
}
```

**Використання:**
```tsx
import { AuditStatisticsCards } from './audit-log';

const statistics = {
  total: 12,
  today: 12,
  success: 11,
  failed: 1,
};

<AuditStatisticsCards statistics={statistics} />
```

**Особливості:**

**4 Cards:**

1. **Всього подій (Total Events)**
   - History icon
   - Lime to green gradient
   - Badge: secondary with count
   - Description: "За весь період"

2. **Сьогодні (Today)**
   - Calendar icon
   - Yellow to lime gradient
   - Badge: secondary with count
   - Description: "Події за 12 грудня"

3. **Успішних (Success)**
   - Activity icon
   - Green to lime gradient
   - Badge: default with count
   - Description: "Виконано без помилок"

4. **Помилкових (Failed)**
   - Activity icon
   - Red to red gradient
   - Badge: destructive with count
   - Description: "Виконано з помилками"
   - Border: red-200

**Visual Layout:**
```
┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│ 📜 Всього подій  │ 📅 Сьогодні      │ ✅ Успішних      │ ❌ Помилкових    │
│ [12]             │ [12]             │ [11]             │ [1]              │
│ За весь період   │ Події за 12 гр.  │ Без помилок      │ З помилками      │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

---

### ActionTypeStats
Статистика операцій за типом дій (створення, оновлення, видалення, запити).

**Props:**
```typescript
interface ActionTypeStatsProps {
  statistics: ActionTypeStatistics;
}

interface ActionTypeStatistics {
  create: number;   // Створення
  update: number;   // Оновлення
  delete: number;   // Видалення
  query: number;    // Запити (SELECT)
}
```

**Використання:**
```tsx
import { ActionTypeStats } from './audit-log';

const stats = {
  create: 4,
  update: 1,
  delete: 2,
  query: 1,
};

<ActionTypeStats statistics={stats} />
```

**Особливості:**

**Card Layout:**
- Title: "Статистика за типом дій"
- Description: "Розподіл операцій в системі"

**4 Stat Boxes:**

1. **Створення (Create)**
   - Database icon
   - Green to lime gradient
   - Shows create count

2. **Оновлення (Update)**
   - Activity icon
   - Yellow to lime gradient
   - Shows update count

3. **Видалення (Delete)**
   - HardDrive icon
   - Red to red gradient
   - Shows delete count

4. **Запити (Query)**
   - FileCode icon
   - Lime to yellow gradient
   - Shows query count

**Visual Layout:**
```
┌────────────────────────────────────────────────────────────┐
│ Статистика за типом дій                                    │
│ Розподіл операцій в системі                                │
├────────────────────────────────────────────────────────────┤
│ ┌──────────┬──────────┬──────────┬──────────┐             │
│ │ 💾 Ств. 4│ ⚡ Онов. 1│ 🗑️ Вид. 2│ 📝 Зап. 1│             │
│ └──────────┴──────────┴──────────┴──────────┘             │
└────────────────────────────────────────────────────────────┘
```

---

### AuditFilters
Компонент фільтрації та пошуку аудит логу.

**Props:**
```typescript
interface AuditFiltersProps {
  filters: AuditFilters;
  onFiltersChange: (filters: Partial<AuditFilters>) => void;
  totalEntries: number;
  filteredCount: number;
}

interface AuditFilters {
  searchQuery: string;
  filterUser: string;
  filterAction: string;
  filterCategory: string;
}
```

**Використання:**
```tsx
import { AuditFilters } from './audit-log';

const [filters, setFilters] = useState({
  searchQuery: '',
  filterUser: 'all',
  filterAction: 'all',
  filterCategory: 'all',
});

<AuditFilters
  filters={filters}
  onFiltersChange={(newFilters) => 
    setFilters(prev => ({ ...prev, ...newFilters }))
  }
  totalEntries={12}
  filteredCount={8}
/>
```

**Особливості:**

**4 Filter Inputs:**

1. **Search Input**
   - Placeholder: "Пошук по діям..."
   - Search icon
   - Filters by target, details, user

2. **User Filter (Select)**
   - User icon
   - Options: All users, admin, developer, analyst, app_user, backup_service

3. **Action Filter (Select)**
   - Filter icon
   - Options: All actions, create, update, delete, select, grant, revoke, login, backup

4. **Category Filter (Select)**
   - Database icon
   - Options: All categories, База даних, Таблиця, Запит, Права доступу, etc.

**Results Count:**
- Shows: "Знайдено записів: **8** з 12"
- Reset button (when filters active): "Скинути фільтри"

**Visual Layout:**
```
┌──────────────────────────────────────────────────────────┐
│ [🔍 Пошук...] [👤 User] [⚡ Action] [💾 Category]        │
├──────────────────────────────────────────────────────────┤
│ Знайдено записів: 8 з 12              [Скинути фільтри] │
└──────────────────────────────────────────────────────────┘
```

**Filter Reset:**
- Automatically shows "Скинути фільтри" button when any filter is active
- Resets all filters to default state

---

### AuditLogTable
Таблиця аудит логу з 8 колонками.

**Props:**
```typescript
interface AuditLogTableProps {
  entries: AuditEntry[];
}

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: ActionType;
  category: AuditCategory;
  target: string;
  details: string;
  ip: string;
  status: 'success' | 'failed';
}
```

**Використання:**
```tsx
import { AuditLogTable } from './audit-log';

<AuditLogTable entries={filteredEntries} />
```

**Особливості:**

**8 Columns:**

| Колонка | Опис | Формат |
|---------|------|--------|
| **Час** | Timestamp | Monospace, slate-600 |
| **Користувач** | User with icon | Avatar + name |
| **Дія** | Action type | Badge (colored) |
| **Категорія** | Category with icon | Icon + text |
| **Ціль** | Target object | Monospace, truncated |
| **Деталі** | Details | Truncated |
| **IP адреса** | IP address | Monospace |
| **Статус** | Success/Failed | Badge (green/red) |

**Action Badges:**

```typescript
create  → Badge (default)     "Створення"
update  → Badge (secondary)   "Оновлення"
delete  → Badge (destructive) "Видалення"
select  → Badge (outline)     "Вибірка"
grant   → Badge (default)     "Надання прав"
revoke  → Badge (destructive) "Відкликання"
login   → Badge (outline)     "Вхід"
backup  → Badge (secondary)   "Резервування"
```

**Status Badges:**

**Success:**
```tsx
<Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
  Успішно
</Badge>
```

**Failed:**
```tsx
<Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
  Помилка
</Badge>
```

**Row Highlighting:**
- Failed entries have `bg-red-50/50` background

**Category Icons:**
- База даних → Database
- Таблиця → TableIcon
- Запит → FileCode
- Права доступу → Shield
- Резервна копія → Copy
- Функція → Activity
- Тригер → Activity
- Користувач → User
- Автентифікація → Shield

**Visual Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│ Час          │ User  │ Дія      │ Категорія │ Ціль │ ... │ ✅  │
├──────────────┼───────┼──────────┼───────────┼──────┼─────┼────┤
│ 14:23:15     │ admin │ Створ.   │ БД        │ prod │ ... │ ✅  │
│ 14:15:42     │ dev   │ Онов.    │ Таблиця   │ user │ ... │ ✅  │
│ 12:58:41 🔴  │ dev   │ Видал.   │ БД        │ test │ ... │ ❌  │
└────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Утиліти (utils.ts)

### Icon Functions

#### getCategoryIcon
Повертає іконку для категорії аудит логу.

```typescript
getCategoryIcon(category: string): LucideIcon
```

**Mapping:**
```
База даних       → Database
Таблиця         → TableIcon
Запит           → FileCode
Права доступу   → Shield
Резервна копія  → Copy
Функція         → Activity
Тригер          → Activity
Користувач      → User
Автентифікація  → Shield
```

---

#### getActionBadge
Повертає конфігурацію badge для типу дії.

```typescript
getActionBadge(action: ActionType): ActionBadgeConfig

interface ActionBadgeConfig {
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  label: string;
  color: string;
}
```

**Приклад:**
```tsx
getActionBadge('create');
// {
//   variant: 'default',
//   label: 'Створення',
//   color: 'from-green-500 to-lime-600'
// }
```

---

### Statistics Functions

#### calculateStatistics
Обчислює загальну статистику.

```typescript
calculateStatistics(entries: AuditEntry[]): AuditStatistics
```

**Приклад:**
```tsx
const stats = calculateStatistics(auditEntries);
// {
//   total: 12,
//   today: 12,
//   success: 11,
//   failed: 1
// }
```

---

#### calculateActionTypeStats
Обчислює статистику за типом дій.

```typescript
calculateActionTypeStats(entries: AuditEntry[]): ActionTypeStatistics
```

**Приклад:**
```tsx
const actionStats = calculateActionTypeStats(auditEntries);
// {
//   create: 4,
//   update: 1,
//   delete: 2,
//   query: 1
// }
```

---

### Filter Functions

#### filterAuditEntries
Фільтрує записи за всіма параметрами.

```typescript
filterAuditEntries(
  entries: AuditEntry[],
  searchQuery: string,
  filterUser: string,
  filterAction: string,
  filterCategory: string
): AuditEntry[]
```

**Приклад:**
```tsx
const filtered = filterAuditEntries(
  auditEntries,
  'database',
  'admin',
  'create',
  'all'
);
```

---

#### filterByUser
Фільтрує за користувачем.

```typescript
filterByUser(entries: AuditEntry[], user: string): AuditEntry[]
```

---

#### filterByAction
Фільтрує за типом дії.

```typescript
filterByAction(entries: AuditEntry[], action: ActionType): AuditEntry[]
```

---

#### filterByCategory
Фільтрує за категорією.

```typescript
filterByCategory(entries: AuditEntry[], category: AuditCategory): AuditEntry[]
```

---

#### filterByStatus
Фільтрує за статусом.

```typescript
filterByStatus(entries: AuditEntry[], status: 'success' | 'failed'): AuditEntry[]
```

---

#### filterByDate
Фільтрує за датою.

```typescript
filterByDate(entries: AuditEntry[], date: string): AuditEntry[]
```

---

#### filterByIP
Фільтрує за IP адресою.

```typescript
filterByIP(entries: AuditEntry[], ip: string): AuditEntry[]
```

---

### Get Functions

#### getSuccessfulEntries
Повертає успішні записи.

```typescript
getSuccessfulEntries(entries: AuditEntry[]): AuditEntry[]
```

---

#### getFailedEntries
Повертає помилкові записи.

```typescript
getFailedEntries(entries: AuditEntry[]): AuditEntry[]
```

---

#### getTodayEntries
Повертає записи за сьогодні.

```typescript
getTodayEntries(entries: AuditEntry[]): AuditEntry[]
```

---

#### getUniqueUsers
Повертає унікальних користувачів.

```typescript
getUniqueUsers(entries: AuditEntry[]): string[]
```

**Приклад:**
```tsx
getUniqueUsers(auditEntries);
// ['admin', 'developer', 'analyst', 'app_user', 'backup_service']
```

---

#### getUniqueCategories
Повертає унікальні категорії.

```typescript
getUniqueCategories(entries: AuditEntry[]): AuditCategory[]
```

---

#### getUniqueActions
Повертає унікальні типи дій.

```typescript
getUniqueActions(entries: AuditEntry[]): ActionType[]
```

---

### Count Functions

#### countEntriesByUser
Підраховує записи по користувачах.

```typescript
countEntriesByUser(entries: AuditEntry[]): Record<string, number>
```

**Приклад:**
```tsx
countEntriesByUser(auditEntries);
// {
//   admin: 4,
//   developer: 4,
//   analyst: 2,
//   app_user: 1,
//   backup_service: 1
// }
```

---

#### countEntriesByCategory
Підраховує записи по категоріях.

```typescript
countEntriesByCategory(entries: AuditEntry[]): Record<string, number>
```

---

#### countEntriesByAction
Підраховує записи по діях.

```typescript
countEntriesByAction(entries: AuditEntry[]): Record<string, number>
```

---

### Sort Functions

#### sortByTimestampDesc
Сортує за часом (новіші перші).

```typescript
sortByTimestampDesc(entries: AuditEntry[]): AuditEntry[]
```

---

#### sortByTimestampAsc
Сортує за часом (старіші перші).

```typescript
sortByTimestampAsc(entries: AuditEntry[]): AuditEntry[]
```

---

#### sortByUser
Сортує за користувачем.

```typescript
sortByUser(entries: AuditEntry[], ascending: boolean = true): AuditEntry[]
```

---

#### sortByAction
Сортує за типом дії.

```typescript
sortByAction(entries: AuditEntry[], ascending: boolean = true): AuditEntry[]
```

---

### Search Functions

#### searchEntries
Пошук по всіх полях.

```typescript
searchEntries(entries: AuditEntry[], searchTerm: string): AuditEntry[]
```

**Searches:**
- User
- Target
- Details
- Category
- IP address

---

### Analytics Functions

#### getMostActiveUsers
Повертає найактивніших користувачів.

```typescript
getMostActiveUsers(entries: AuditEntry[], limit: number = 5): UserInfo[]

interface UserInfo {
  username: string;
  count: number;
}
```

**Приклад:**
```tsx
getMostActiveUsers(auditEntries, 3);
// [
//   { username: 'admin', count: 4 },
//   { username: 'developer', count: 4 },
//   { username: 'analyst', count: 2 }
// ]
```

---

#### getMostCommonCategories
Повертає найпопулярніші категорії.

```typescript
getMostCommonCategories(entries: AuditEntry[], limit: number = 5): CategoryInfo[]
```

---

#### getEntriesInTimeRange
Повертає записи в часовому діапазоні.

```typescript
getEntriesInTimeRange(
  entries: AuditEntry[],
  start: string,
  end: string
): AuditEntry[]
```

---

#### calculateSuccessRate
Обчислює відсоток успішних операцій.

```typescript
calculateSuccessRate(entries: AuditEntry[]): number
```

**Приклад:**
```tsx
calculateSuccessRate(auditEntries);
// 91.67 (11 out of 12 successful)
```

---

#### getEntriesByHour
Групує записи за годинами.

```typescript
getEntriesByHour(entries: AuditEntry[]): Record<number, number>
```

**Приклад:**
```tsx
getEntriesByHour(auditEntries);
// {
//   11: 1,
//   12: 5,
//   13: 4,
//   14: 2
// }
```

---

### Export Functions

#### exportToCSV
Експортує в CSV формат.

```typescript
exportToCSV(entries: AuditEntry[]): string
```

**Output:**
```csv
"Timestamp","User","Action","Category","Target","Details","IP","Status"
"2024-12-12 14:23:15","admin","create","База даних","production_v2","...","192.168.1.100","success"
```

---

#### exportToJSON
Експортує в JSON формат.

```typescript
exportToJSON(entries: AuditEntry[]): string
```

---

#### downloadFile
Завантажує файл.

```typescript
downloadFile(content: string, filename: string, mimeType: string): void
```

**Приклад:**
```tsx
const csv = exportToCSV(filteredEntries);
downloadFile(csv, 'audit-log.csv', 'text/csv');
```

---

### Utility Functions

#### getActionLabel
Повертає українську мітку для дії.

```typescript
getActionLabel(action: ActionType): string
```

---

#### getStatusBadgeClass
Повертає Tailwind класи для статусу.

```typescript
getStatusBadgeClass(status: 'success' | 'failed'): string
```

---

#### getTableRowClass
Повертає класи для рядка таблиці.

```typescript
getTableRowClass(status: 'success' | 'failed'): string
```

---

#### isValidAuditEntry
Валідує запис аудит логу.

```typescript
isValidAuditEntry(entry: Partial<AuditEntry>): entry is AuditEntry
```

---

#### groupEntriesByDate
Групує записи за датами.

```typescript
groupEntriesByDate(entries: AuditEntry[]): Record<string, AuditEntry[]>
```

**Приклад:**
```tsx
groupEntriesByDate(auditEntries);
// {
//   '2024-12-12': [entry1, entry2, ...],
//   '2024-12-11': [entry10, entry11, ...]
// }
```

---

#### groupEntriesByUser
Групує записи за користувачами.

```typescript
groupEntriesByUser(entries: AuditEntry[]): Record<string, AuditEntry[]>
```

---

#### getUniqueIPs
Повертає унікальні IP адреси.

```typescript
getUniqueIPs(entries: AuditEntry[]): string[]
```

---

#### getHourlyActivity
Повертає активність по годинах.

```typescript
getHourlyActivity(entries: AuditEntry[]): { hour: number; count: number }[]
```

---

## 📦 Імпорт

### Компоненти
```typescript
import {
  AuditStatisticsCards,
  ActionTypeStats,
  AuditFilters,
  AuditLogTable,
} from './audit-log';
```

### Types
```typescript
import type {
  AuditEntry,
  AuditStatistics,
  ActionTypeStatistics,
  AuditFilters,
  ActionType,
  AuditCategory,
} from './audit-log';
```

### Utils
```typescript
import {
  calculateStatistics,
  calculateActionTypeStats,
  filterAuditEntries,
  getCategoryIcon,
  getActionBadge,
} from './audit-log';
```

### Data
```typescript
import { auditEntries, users, categories, actions } from './audit-log/data';
```

---

## 🎨 Повний приклад

```typescript
import { useState } from 'react';
import {
  AuditStatisticsCards,
  ActionTypeStats,
  AuditFilters,
  AuditLogTable,
} from './audit-log';
import { auditEntries } from './audit-log/data';
import {
  calculateStatistics,
  calculateActionTypeStats,
  filterAuditEntries,
} from './audit-log/utils';

export default function AuditLog() {
  const [filters, setFilters] = useState({
    searchQuery: '',
    filterUser: 'all',
    filterAction: 'all',
    filterCategory: 'all',
  });

  const statistics = calculateStatistics(auditEntries);
  const actionTypeStats = calculateActionTypeStats(auditEntries);

  const filteredEntries = filterAuditEntries(
    auditEntries,
    filters.searchQuery,
    filters.filterUser,
    filters.filterAction,
    filters.filterCategory
  );

  return (
    <div className="space-y-6">
      <AuditStatisticsCards statistics={statistics} />
      <ActionTypeStats statistics={actionTypeStats} />
      
      <AuditFilters
        filters={filters}
        onFiltersChange={(newFilters) =>
          setFilters(prev => ({ ...prev, ...newFilters }))
        }
        totalEntries={auditEntries.length}
        filteredCount={filteredEntries.length}
      />
      
      <AuditLogTable entries={filteredEntries} />
    </div>
  );
}
```

---

## 🎯 Особливості

### Audit Tracking
- **12 audit entries** - Complete activity log
- **8 action types** - create, update, delete, select, grant, revoke, login, backup
- **9 categories** - Database, Table, Query, Permissions, Backup, Function, Trigger, User, Auth
- **2 statuses** - success, failed

### Visual Indicators
- **Action badges** - Color-coded by type
- **Status badges** - Green for success, red for failed
- **Category icons** - Visual category identification
- **Row highlighting** - Red background for failed entries

### Filtering
- **Search** - By user, target, details
- **User filter** - 5 users
- **Action filter** - 8 action types
- **Category filter** - 9 categories
- **Reset** - One-click filter reset

### Statistics
- **Total events** - All time count
- **Today** - Daily count
- **Success** - Successful operations
- **Failed** - Failed operations
- **Action type breakdown** - Create/Update/Delete/Query

### Export
- **CSV export** - Comma-separated values
- **JSON export** - JSON format
- **Custom filters** - Export filtered data

---

## 📊 Метрики

- **Компонентів:** 4
- **Утиліт:** 40+
- **Загальний розмір:** ~650 рядків коду
- **Середній розмір компонента:** ~100 рядків
- **Покриття TypeScript:** 100%
- **Mock entries:** 12

---

## 🔗 Пов'язані модулі

- [UsersManager](../UsersManager.tsx) - User management
- [RolesManager](../RolesManager.tsx) - Role management
- [PostgresConfig](../PostgresConfig.tsx) - Configuration

---

**Останнє оновлення:** 13 грудня 2025  
**Версія:** 1.0.0  
**Статус:** ✅ Готово до використання
