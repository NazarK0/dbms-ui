# UsersManager Components

Модульні компоненти для управління адміністраторами та кінцевими користувачами: статистика, Microsoft Active Directory інтеграція, табульовані таблиці та редагування прав доступу.

## 📁 Структура

```
users-manager/
├── UserStatsCards.tsx               # Сітка статистичних карток
├── UserStatsCard.tsx                # Окрема статистична картка
├── MicrosoftADInfoBanner.tsx        # Інформаційний банер AD
├── UserTabs.tsx                     # Вкладки з таблицями користувачів
├── UserTableCard.tsx                # Картка з таблицею користувачів
├── EditUserModalWrapper.tsx         # Обгортка модального вікна
├── types.ts                         # TypeScript інтерфейси
├── data.ts                          # Конфігурації та константи
├── utils.ts                         # Допоміжні функції (40+ functions)
├── index.ts                         # Центральний експорт
└── README.md                        # Ця документація
```

## 🧩 Компоненти

### UserStatsCards
Сітка з 4 статистичних карток користувачів.

**Props:**
```typescript
interface UserStatsCardsProps {
  stats: UserStats;
}

interface UserStats {
  totalUsers: number;
  administrators: number;
  endUsers: number;
  newThisMonth: number;
}
```

**Використання:**
```tsx
import { UserStatsCards, calculateUserStats } from './users-manager';

const stats = calculateUserStats(administrators, endUsers, 156);

<UserStatsCards stats={stats} />
```

**Особливості:**

**Grid Layout:**
- Responsive: `grid-cols-1 md:grid-cols-4`
- Gap: 6 (1.5rem)

**4 Cards:**
1. **Всього користувачів** (6,748)
   - Icon: Users (lime-500 to green-600)
   - Value: Total count
   - Description: "Адміни та користувачі"

2. **Адміністраторів** (42)
   - Icon: UserCog (green-500 to lime-600)
   - Value: Admin count
   - Description: "З доступом до панелі"

3. **Кінцевих користувачів** (6,706)
   - Icon: Shield (yellow-500 to lime-600)
   - Value: End user count
   - Description: "Користувачі застосунку"

4. **Цього місяця** (+156)
   - Icon: Calendar (blue-500 to cyan-600)
   - Value: New users with "+" prefix
   - Description: "Нових користувачів"

**Visual:**
```
┌──────────┬──────────┬──────────┬──────────┐
│ 👥       │ ⚙️       │ 🛡️       │ 📅       │
│ 6,748    │ 42       │ 6,706    │ +156     │
│ Всього   │ Адмініст-│ Кінцевих │ Цього    │
│ користу- │ раторів  │ користу- │ місяця   │
│ вачів    │          │ вачів    │          │
│ Адміни та│ З доступом│ Користу- │ Нових    │
│ користу- │ до панелі│ вачі     │ користу- │
│ вачі     │          │ застосунку│ вачів   │
└──────────┴──────────┴──────────┴──────────┘
```

---

### UserStatsCard
Окрема статистична картка.

**Props:**
```typescript
interface UserStatsCardProps {
  data: UserStatsCardData;
}

interface UserStatsCardData {
  icon: React.ComponentType<{ className?: string }>;
  value: number | string;
  title: string;
  description: string;
  gradient: string;
}
```

**Використання:**
```tsx
import { UserStatsCard } from './users-manager';
import { Users } from 'lucide-react';

<UserStatsCard data={{
  icon: Users,
  value: '6,748',
  title: 'Всього користувачів',
  description: 'Адміни та користувачі',
  gradient: 'from-lime-500 to-green-600'
}} />
```

**Особливості:**

**Card Structure:**
- Border: slate-200
- Shadow: sm
- Padding: 3 (pb-3) for header, default for content

**Header:**
- Icon container (w-12 h-12, gradient background, rounded-xl)
- Badge (secondary variant, text-lg) with value

**Content:**
- Title (text-2xl, mb-1)
- Description (CardDescription)

**Visual:**
```
┌────────────────────────────────┐
│ [👥]                    6,748   │
│                                │
│ Всього користувачів            │
│ Адміни та користувачі          │
└────────────────────────────────┘
```

---

### MicrosoftADInfoBanner
Інформаційний банер про синхронізацію з Microsoft Active Directory.

**Props:**
```typescript
interface MicrosoftADInfoBannerProps {
  className?: string;
}
```

**Використання:**
```tsx
import { MicrosoftADInfoBanner } from './users-manager';

<MicrosoftADInfoBanner />
<MicrosoftADInfoBanner className="mb-4" />
```

**Особливості:**

**Banner Design:**
- Background: blue-50
- Border: blue-200
- Rounded: lg
- Padding: 4 (p-4)

**Content:**
- Info icon (blue-600, w-5 h-5, flex-shrink-0)
- Title: "Управління через Microsoft Active Directory"
- Description: "Користувачі автоматично синхронізуються з корпоративного Active Directory..."

**Visual:**
```
┌──────────────────────────────────────────────────────┐
│ ℹ️  Управління через Microsoft Active Directory      │
│    Користувачі автоматично синхронізуються з         │
│    корпоративного Active Directory. Для створення    │
│    нових облікових записів зверніться до системного  │
│    адміністратора вашої організації.                 │
└──────────────────────────────────────────────────────┘
```

---

### UserTabs
Вкладки з таблицями адміністраторів та користувачів.

**Props:**
```typescript
interface UserTabsProps {
  activeTab: UserType;
  onTabChange: (tab: UserType) => void;
  administrators: User[];
  endUsers: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

type UserType = 'admin' | 'user';
```

**Використання:**
```tsx
import { UserTabs } from './users-manager';
import { administrators, endUsers } from '../../../mockData/admin/users';

<UserTabs
  activeTab="admin"
  onTabChange={(tab) => setActiveTab(tab)}
  administrators={administrators}
  endUsers={endUsers}
  onEditUser={handleEditUser}
  onDeleteUser={handleDeleteUser}
/>
```

**Особливості:**

**Tabs:**
1. **Адміністратори** (admin)
   - Icon: UserCog
   - Label: "Адміністратори (5)"
   - Shows administrators table

2. **Користувачі** (user)
   - Icon: Users
   - Label: "Користувачі (4)"
   - Shows end users table

**Tab Content:**
- UserTable component with type-specific data
- Edit and delete handlers
- Admin type shows lastActive
- User type shows registered date

**Visual:**
```
┌────────────────────────────────────────────────────┐
│ [⚙️ Адміністратори (5)] [👥 Користувачі (4)]      │
├────────────────────────────────────────────────────┤
│ Table content based on active tab                  │
│ - Admin tab: administrators with lastActive        │
│ - User tab: end users with registered date         │
└────────────────────────────────────────────────────┘
```

---

### UserTableCard
Картка з таблицею користувачів, банером AD та вкладками.

**Props:**
```typescript
interface UserTabsProps {
  activeTab: UserType;
  onTabChange: (tab: UserType) => void;
  administrators: User[];
  endUsers: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}
```

**Використання:**
```tsx
import { UserTableCard } from './users-manager';

<UserTableCard
  activeTab={activeTab}
  onTabChange={setActiveTab}
  administrators={administrators}
  endUsers={endUsers}
  onEditUser={handleEditUser}
  onDeleteUser={handleDeleteUser}
/>
```

**Особливості:**

**Card Structure:**
- Border: slate-200
- Shadow: sm

**Header:**
- Title: "Користувачі системи"
- Description: "Управління адміністраторами та користувачами"

**Content:**
- MicrosoftADInfoBanner
- UserTabs

**Visual:**
```
┌──────────────────────────────────────────────────┐
│ Користувачі системи                              │
│ Управління адміністраторами та користувачами     │
├──────────────────────────────────────────────────┤
│ [ℹ️ Microsoft AD Info Banner]                    │
│                                                  │
│ [⚙️ Адміністратори] [👥 Користувачі]            │
│ ┌──────────────────────────────────────────────┐ │
│ │ User Table                                   │ │
│ └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

---

### EditUserModalWrapper
Обгортка для модального вікна редагування прав користувача.

**Props:**
```typescript
interface EditUserModalWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  userType: UserType;
}
```

**Використання:**
```tsx
import { EditUserModalWrapper } from './users-manager';

<EditUserModalWrapper
  open={showEditModal}
  onOpenChange={setShowEditModal}
  user={selectedUser}
  userType={activeTab}
/>
```

**Особливості:**

**Functionality:**
- Renders EditUserPermissionsModal when user is not null
- Passes all props to the modal
- Returns null when no user selected

**Props Forwarding:**
- open → modal visibility
- onOpenChange → modal close handler
- user → user data
- userType → determines permissions UI

---

## 🛠️ Утиліти (utils.ts)

### Stats Functions (2)

#### calculateUserStats
Обчислює статистику користувачів.

```typescript
calculateUserStats(
  administrators: User[],
  endUsers: User[],
  newThisMonth: number
): UserStats
```

**Example:**
```tsx
const stats = calculateUserStats(administrators, endUsers, 156);
// { totalUsers: 9, administrators: 5, endUsers: 4, newThisMonth: 156 }
```

---

#### formatStatsValue
Форматує значення статистики.

```typescript
formatStatsValue(value: number, prefix?: string): string
```

**Example:**
```tsx
formatStatsValue(6748);        // '6,748'
formatStatsValue(156, '+');    // '+156'
```

---

### Filter Functions (3)

#### filterUsersBySearch
Фільтрує користувачів за пошуковим запитом.

```typescript
filterUsersBySearch(users: User[], searchQuery: string): User[]
```

**Searches in:**
- Name
- Email
- Role
- Timezone

**Example:**
```tsx
const results = filterUsersBySearch(users, 'петренко');
// Returns users with 'петренко' in name, email, role, or timezone
```

---

#### filterUsers
Фільтрує користувачів за критеріями.

```typescript
filterUsers(users: User[], filter: UserFilter): User[]
```

**Filter criteria:**
- search (string)
- role (string)
- status (UserStatus)
- timezone (string)

---

#### sortUsers
Сортує користувачів.

```typescript
sortUsers(users: User[], sort: UserSort): User[]
```

**Sort fields:**
- name
- email
- role
- lastActive
- registered
- status

---

### Group Functions (3)

#### groupUsersByRole
Групує користувачів за роллю.

```typescript
groupUsersByRole(users: User[]): UsersByRole[]
```

**Returns:**
```typescript
{
  role: string;
  count: number;
  users: User[];
  color: string;
}[]
```

---

#### groupUsersByStatus
Групує користувачів за статусом.

```typescript
groupUsersByStatus(users: User[]): UsersByStatus[]
```

---

#### groupUsersByTimezone
Групує користувачів за часовим поясом.

```typescript
groupUsersByTimezone(users: User[]): UsersByTimezone[]
```

---

### Status Functions (4)

#### getActiveUsers
Повертає активних користувачів.

```typescript
getActiveUsers(users: User[]): User[]
```

---

#### getInactiveUsers
Повертає неактивних користувачів.

```typescript
getInactiveUsers(users: User[]): User[]
```

---

#### getUserActivityStatus
Визначає статус активності користувача.

```typescript
getUserActivityStatus(user: User): 'online' | 'recent' | 'inactive'
```

**Thresholds:**
- **online:** ≤ 5 minutes
- **recent:** ≤ 60 minutes
- **inactive:** > 60 minutes or inactive status

---

#### isUserOnline
Перевіряє, чи користувач онлайн.

```typescript
isUserOnline(user: User): boolean
```

---

### Time Functions (6)

#### parseLastActive
Парсить lastActive в хвилини тому.

```typescript
parseLastActive(lastActive?: string): number | null
```

---

#### formatLastActive
Форматує lastActive в читабельний текст.

```typescript
formatLastActive(lastActive?: string): string
```

**Examples:**
- < 1 min: "Щойно"
- < 60 min: "42 хв тому"
- < 24 hours: "3 год тому"
- 1 day: "Вчора"
- < 7 days: "5 дн тому"
- Older: "15 лист. 2024"

---

#### parseRegistered
Парсить registered в дні тому.

```typescript
parseRegistered(registered?: string): number | null
```

---

#### formatRegistered
Форматує registered date.

```typescript
formatRegistered(registered?: string): string
```

**Example:**
```tsx
formatRegistered('2024-10-15');
// '15 жовт. 2024'
```

---

#### getRecentlyActiveUsers
Повертає недавно активних користувачів.

```typescript
getRecentlyActiveUsers(users: User[], limit?: number): User[]
```

---

#### getRecentlyRegisteredUsers
Повертає нещодавно зареєстрованих користувачів.

```typescript
getRecentlyRegisteredUsers(users: User[], limit?: number): User[]
```

---

### Avatar Functions (2)

#### getUserInitials
Отримує ініціали з імені.

```typescript
getUserInitials(name: string): string
```

**Examples:**
```tsx
getUserInitials('Іван Петренко');    // 'ІП'
getUserInitials('Марія');            // 'МА'
getUserInitials('');                 // '??'
```

---

#### getAvatarColor
Генерує колір аватара з імені.

```typescript
getAvatarColor(name: string): string
```

**Returns gradient from predefined set based on name hash.**

---

### Validation Functions (2)

#### validateEmail
Валідує email формат.

```typescript
validateEmail(email: string): boolean
```

---

#### validateUserName
Валідує ім'я користувача.

```typescript
validateUserName(name: string): boolean
```

**Rules:**
- Min length: 2
- Max length: 100

---

### Search Functions (1)

#### searchUsers
Шукає користувачів з scoring.

```typescript
searchUsers(users: User[], query: string): UserSearchResult[]
```

**Returns:**
```typescript
{
  user: User;
  matchFields: string[];
  score: number;
}[]
```

**Scoring:**
- Name match (starts with): 10
- Name match (contains): 5
- Email match (starts with): 8
- Email match (contains): 4
- Role match: 3
- Timezone match: 1

---

### Metrics Functions (1)

#### calculateUserMetrics
Обчислює детальні метрики користувачів.

```typescript
calculateUserMetrics(
  administrators: User[],
  endUsers: User[]
): UserMetrics
```

**Returns:**
```typescript
{
  totalAdmins: number;
  totalUsers: number;
  activeAdmins: number;
  activeUsers: number;
  inactiveAdmins: number;
  inactiveUsers: number;
  rolesDistribution: UsersByRole[];
  timezonesDistribution: UsersByTimezone[];
  recentlyActive: User[];
  recentlyRegistered: User[];
}
```

---

### Export Functions (2)

#### exportUsersToCSV
Експортує користувачів в CSV.

```typescript
exportUsersToCSV(users: User[]): string
```

---

#### exportUsersToJSON
Експортує користувачів в JSON.

```typescript
exportUsersToJSON(users: User[]): string
```

---

### Utility Functions (10+)

- `getUniqueRoles(users)` - Унікальні ролі
- `getUniqueTimezones(users)` - Унікальні часові пояси
- `getUsersByRole(users, role)` - Користувачі за роллю
- `getUsersByTimezone(users, timezone)` - Користувачі за часовим поясом
- `getUsersByStatus(users, status)` - Користувачі за статусом
- `countUsersByType(users, type)` - Підрахунок за типом
- `getTopRoles(users, limit)` - Топ ролей за кількістю
- `getTopTimezones(users, limit)` - Топ часових поясів
- `calculatePercentage(part, total)` - Обчислення відсотка
- `formatPercentage(percentage)` - Форматування відсотка

---

## 📦 Імпорт

### Компоненти
```typescript
import {
  UserStatsCards,
  UserStatsCard,
  MicrosoftADInfoBanner,
  UserTabs,
  UserTableCard,
  EditUserModalWrapper,
} from './users-manager';
```

### Types
```typescript
import type {
  User,
  UserType,
  UserStats,
  UserFilter,
  UserSort,
  UserMetrics,
} from './users-manager';
```

### Utils
```typescript
import {
  calculateUserStats,
  formatStatsValue,
  filterUsers,
  sortUsers,
  groupUsersByRole,
  getUserActivityStatus,
  formatLastActive,
  searchUsers,
} from './users-manager';
```

### Data
```typescript
import {
  userStatsCardConfig,
  microsoftADInfo,
  adminRoles,
  endUserRoles,
  userFilterOptions,
  userSortOptions,
} from './users-manager/data';
```

---

## 🎨 Повний приклад

```typescript
import { useState } from 'react';
import {
  UserStatsCards,
  UserTableCard,
  EditUserModalWrapper,
  calculateUserStats,
} from './users-manager';
import { administrators, endUsers } from '../../../mockData/admin/users';
import type { User, UserType } from './users-manager';

export default function UsersManager() {
  const [activeTab, setActiveTab] = useState<UserType>('admin');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const stats = calculateUserStats(administrators, endUsers, 156);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user: User) => {
    console.log('Delete user:', user);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <UserStatsCards stats={stats} />

      {/* Users Table with Tabs */}
      <UserTableCard
        activeTab={activeTab}
        onTabChange={setActiveTab}
        administrators={administrators}
        endUsers={endUsers}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />

      {/* Edit User Permissions Modal */}
      <EditUserModalWrapper
        open={showEditModal}
        onOpenChange={handleCloseEditModal}
        user={selectedUser}
        userType={activeTab}
      />
    </div>
  );
}
```

---

## 🎯 Особливості

### Stats Cards Layout
```
┌──────────┬──────────┬──────────┬──────────┐
│ 👥       │ ⚙️       │ 🛡️       │ 📅       │
│ 6,748    │ 42       │ 6,706    │ +156     │
│ Всього   │ Адмініст-│ Кінцевих │ Цього    │
│ користу- │ раторів  │ користу- │ місяця   │
│ вачів    │          │ вачів    │          │
└──────────┴──────────┴──────────┴──────────┘
```

### Microsoft AD Integration Banner
```
┌────────────────────────────────────────────────┐
│ ℹ️  Управління через Microsoft Active Directory│
│    Користувачі автоматично синхронізуються... │
└────────────────────────────────────────────────┘
```

### Tabbed User Tables
```
┌──────────────────────────────────────────────┐
│ [⚙️ Адміністратори (5)] [👥 Користувачі (4)] │
├──────────────────────────────────────────────┤
│ Admin Tab:                                   │
│ - Іван Петренко (Superadmin, активний)      │
│ - Марія Коваленко (Database Admin, активний)│
│ - Олександр Шевченко (Developer, неактивний)│
│ - Катерина Мельник (Analyst, активний)      │
│ - Андрій Ткач (Viewer, активний)            │
└──────────────────────────────────────────────┘
```

### User Roles

**Admin Roles (5):**
1. **Superadmin** (red-500 to red-600)
   - Permissions: all
   - Description: Повний доступ

2. **Database Admin** (lime-500 to green-600)
   - Permissions: database_management, user_management, monitoring
   - Description: Управління БД та користувачами

3. **Developer** (yellow-500 to lime-600)
   - Permissions: query_execution, schema_view, table_browse
   - Description: Виконання запитів

4. **Analyst** (green-500 to lime-600)
   - Permissions: query_execution, table_browse, reports
   - Description: Аналіз даних

5. **Viewer** (lime-600 to yellow-600)
   - Permissions: table_browse, schema_view
   - Description: Тільки перегляд

**End User Roles (4):**
1. **Data Analyst** (violet-500 to purple-600)
2. **Content Manager** (blue-500 to cyan-600)
3. **Report Viewer** (indigo-500 to violet-600)
4. **Guest User** (slate-400 to slate-500)

---

## 📊 Mock Data

### Administrators (5 users)

```typescript
[
  {
    id: 1,
    name: 'Іван Петренко',
    email: 'ivan@company.com',
    role: 'Superadmin',
    roleColor: 'from-red-500 to-red-600',
    lastActive: '2024-12-12 14:30',
    status: 'active',
    avatar: 'IP',
    timezone: 'Europe/Kyiv'
  },
  {
    id: 2,
    name: 'Марія Коваленко',
    email: 'maria@company.com',
    role: 'Database Admin',
    roleColor: 'from-lime-500 to-green-600',
    lastActive: '2024-12-12 12:15',
    status: 'active',
    avatar: 'МК',
    timezone: 'Europe/London'
  },
  {
    id: 3,
    name: 'Олександр Шевченко',
    email: 'alex@company.com',
    role: 'Developer',
    roleColor: 'from-yellow-500 to-lime-600',
    lastActive: '2024-12-11 18:45',
    status: 'inactive',
    avatar: 'ОШ',
    timezone: 'America/New_York'
  },
  {
    id: 4,
    name: 'Катерина Мельник',
    email: 'kateryna@company.com',
    role: 'Analyst',
    roleColor: 'from-green-500 to-lime-600',
    lastActive: '2024-12-12 09:20',
    status: 'active',
    avatar: 'КМ',
    timezone: 'Europe/Kyiv'
  },
  {
    id: 5,
    name: 'Андрій Ткач',
    email: 'andriy@company.com',
    role: 'Viewer',
    roleColor: 'from-lime-600 to-yellow-600',
    lastActive: '2024-12-10 16:45',
    status: 'active',
    avatar: 'АТ',
    timezone: 'Asia/Tokyo'
  }
]
```

### End Users (4 users)

```typescript
[
  {
    id: 101,
    name: 'Анна Сидоренко',
    email: 'anna.s@example.com',
    role: 'Data Analyst',
    roleColor: 'from-violet-500 to-purple-600',
    registered: '2024-10-15',
    status: 'active',
    avatar: 'АС',
    timezone: 'Europe/Kyiv'
  },
  {
    id: 102,
    name: 'Дмитро Мельник',
    email: 'dmytro.m@example.com',
    role: 'Content Manager',
    roleColor: 'from-blue-500 to-cyan-600',
    registered: '2024-11-20',
    status: 'active',
    avatar: 'ДМ',
    timezone: 'Europe/Berlin'
  },
  {
    id: 103,
    name: 'Олена Бондаренко',
    email: 'olena.b@example.com',
    role: 'Report Viewer',
    roleColor: 'from-indigo-500 to-violet-600',
    registered: '2024-12-01',
    status: 'active',
    avatar: 'ОБ',
    timezone: 'Europe/Kyiv'
  },
  {
    id: 104,
    name: 'Сергій Ткаченко',
    email: 'sergiy.t@example.com',
    role: 'Guest User',
    roleColor: 'from-slate-400 to-slate-500',
    registered: '2024-12-10',
    status: 'active',
    avatar: 'СТ',
    timezone: 'Australia/Sydney'
  }
]
```

---

## 📊 Метрики

- **Компонентів:** 6
- **Утиліт:** 40+
- **Загальний розмір:** ~1,100 рядків коду
- **Середній розмір компонента:** ~25 рядків
- **Покриття TypeScript:** 100%
- **Адміністраторів:** 5
- **Кінцевих користувачів:** 4
- **Статистичних карток:** 4
- **Ролей адміністраторів:** 5
- **Ролей користувачів:** 4

---

## 🔗 Пов'язані модулі

- [RolesManager](../RolesManager.tsx) - Role and permissions management
- [UserUIPreview](../UserUIPreview.tsx) - User interface preview
- [Dashboard](../Dashboard.tsx) - Main admin dashboard

---

**Останнє оновлення:** 13 грудня 2025  
**Версія:** 1.0.0  
**Статус:** ✅ Готово до використання
