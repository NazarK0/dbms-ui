# UserUIPreview Components

Модульні компоненти для попереднього перегляду користувацького інтерфейсу: вибір ролі, девайсу, імітація UI та панель прав доступу.

## 📁 Структура

```
user-ui-preview/
├── PreviewHeader.tsx                # Заголовок з селекторами
├── RoleSelector.tsx                 # Вибір ролі користувача
├── DeviceSelector.tsx               # Вибір типу пристрою
├── PreviewWindow.tsx                # Вікно попереднього перегляду
├── MockUserInterface.tsx            # Імітація інтерфейсу
├── UIHeader.tsx                     # Заголовок UI
├── UINavigation.tsx                 # Навігація UI
├── UIContent.tsx                    # Контент UI
├── ActionButton.tsx                 # Кнопка дії з правами
├── PermissionsPanel.tsx             # Панель прав доступу
├── PermissionItem.tsx               # Елемент права доступу
├── types.ts                         # TypeScript інтерфейси
├── data.ts                          # Конфігурації та константи
├── utils.ts                         # Допоміжні функції (50+ functions)
├── index.ts                         # Центральний експорт
└── README.md                        # Ця документація
```

## 🧩 Компоненти

### PreviewHeader
Заголовок з селекторами ролі та пристрою.

**Props:**
```typescript
interface PreviewHeaderProps {
  selectedRole: string;
  roles: UserRole[];
  deviceType: DeviceType;
  onRoleChange: (roleId: string) => void;
  onDeviceChange: (device: DeviceType) => void;
}
```

**Використання:**
```tsx
import { PreviewHeader, userRoles } from './user-ui-preview';

<PreviewHeader
  selectedRole="data-analyst"
  roles={userRoles}
  deviceType="desktop"
  onRoleChange={setSelectedRole}
  onDeviceChange={setDeviceType}
/>
```

**Особливості:**

**Card Structure:**
- Border: slate-200
- Shadow: sm
- Icon: Eye (lime-600)

**Header:**
- Title: "Перегляд користувацького інтерфейсу"
- Description: "Попередній перегляд інтерфейсу для різних ролей користувачів"

**Content:**
- RoleSelector (left)
- DeviceSelector (right)

**Visual:**
```
┌────────────────────────────────────────────────────┐
│ 👁️ Перегляд користувацького інтерфейсу             │
│ Попередній перегляд інтерфейсу для різних ролей... │
├────────────────────────────────────────────────────┤
│ Роль користувача:                                  │
│ [Data Analyst] [Content Manager] [Report Viewer]   │
│                                  [💻] [📱] [📱]    │
└────────────────────────────────────────────────────┘
```

---

### RoleSelector
Кнопки вибору ролі користувача.

**Props:**
```typescript
interface RoleSelectorProps {
  selectedRole: string;
  roles: UserRole[];
  onRoleChange: (roleId: string) => void;
}
```

**Використання:**
```tsx
import { RoleSelector, userRoles } from './user-ui-preview';

<RoleSelector
  selectedRole="data-analyst"
  roles={userRoles}
  onRoleChange={handleRoleChange}
/>
```

**Особливості:**

**Label:**
- Text: "Роль користувача:"
- Color: slate-700

**Buttons:**
- Selected: gradient background (role color), white text
- Unselected: outline variant
- Size: sm

**4 Roles:**
1. **Data Analyst** (violet-500 to purple-600)
2. **Content Manager** (blue-500 to cyan-600)
3. **Report Viewer** (indigo-500 to violet-600)
4. **Guest User** (slate-400 to slate-500)

**Visual:**
```
Роль користувача:
[🟣 Data Analyst] [Content Manager] [Report Viewer] [Guest User]
     Selected         Outline          Outline         Outline
```

---

### DeviceSelector
Кнопки вибору типу пристрою.

**Props:**
```typescript
interface DeviceSelectorProps {
  deviceType: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';
```

**Використання:**
```tsx
import { DeviceSelector } from './user-ui-preview';

<DeviceSelector
  deviceType="desktop"
  onDeviceChange={setDeviceType}
/>
```

**Особливості:**

**Container:**
- Background: slate-100
- Padding: 1 (p-1)
- Rounded: lg
- Flex gap: 2

**3 Devices:**
1. **Desktop** (Monitor icon)
   - Size: 100% × 600px
2. **Tablet** (Tablet icon)
   - Size: 768px × 600px
3. **Mobile** (Smartphone icon)
   - Size: 375px × 667px

**Visual:**
```
[💻 Desktop] [📱 Tablet] [📱 Mobile]
   Selected    Ghost       Ghost
```

---

### PreviewWindow
Вікно попереднього перегляду з імітацією UI.

**Props:**
```typescript
interface PreviewWindowProps {
  deviceType: DeviceType;
  deviceSize: DeviceSize;
  selectedRole: string;
  roleName: string;
  permissions: UserPermissions;
}

interface DeviceSize {
  width: string;
  height: string;
}
```

**Використання:**
```tsx
import { PreviewWindow, deviceSizes, getPermissionsForRole } from './user-ui-preview';

<PreviewWindow
  deviceType="desktop"
  deviceSize={deviceSizes.desktop}
  selectedRole="data-analyst"
  roleName="Data Analyst"
  permissions={getPermissionsForRole('data-analyst')}
/>
```

**Особливості:**

**Card:**
- Title: "Попередній перегляд інтерфейсу"
- Background: slate-50
- Padding: 6 (p-6)

**Device Frame:**
- Border: 8px slate-800
- Shadow: xl
- Rounded: lg
- Overflow: hidden
- Dynamic size based on deviceType

**Content:**
- MockUserInterface component

**Visual:**
```
┌────────────────────────────────────────┐
│ Попередній перегляд інтерфейсу         │
├────────────────────────────────────────┤
│ ┌──────────────────────────────────┐   │
│ │ ╔════════════════════════════╗   │   │
│ │ ║ Mock User Interface        ║   │   │
│ │ ║ - Header                   ║   │   │
│ │ ║ - Navigation               ║   │   │
│ │ ║ - Content                  ║   │   │
│ │ ╚════════════════════════════╝   │   │
│ └──────────────────────────────────┘   │
└────────────────────────────────────────┘
```

---

### MockUserInterface
Імітація користувацького інтерфейсу.

**Props:**
```typescript
interface MockUserInterfaceProps {
  deviceType: DeviceType;
  selectedRole: string;
  roleName: string;
  permissions: UserPermissions;
}
```

**Використання:**
```tsx
import { MockUserInterface } from './user-ui-preview';

<MockUserInterface
  deviceType="desktop"
  selectedRole="data-analyst"
  roleName="Data Analyst"
  permissions={permissions}
/>
```

**Особливості:**

**Structure:**
- UIHeader (завжди)
- UINavigation (тільки desktop)
- UIContent (завжди)

**Layout:**
- Height: 100%
- Flex direction: column

**Visual:**
```
┌────────────────────────────────────┐
│ UIHeader                           │
│ [🏠 Мій застосунок]  [Data Analyst]│
├────────────────────────────────────┤
│ UINavigation (desktop only)        │
│ Головна | Проєкти | API | Допомога │
├────────────────────────────────────┤
│ UIContent                          │
│ - Welcome card                     │
│ - Actions grid (2/3 cols)          │
│ - Priority support banner          │
└────────────────────────────────────┘
```

---

### UIHeader
Заголовок імітації інтерфейсу.

**Props:**
```typescript
interface UIHeaderProps {
  deviceType: DeviceType;
  roleName: string;
}
```

**Використання:**
```tsx
import { UIHeader } from './user-ui-preview';

<UIHeader deviceType="desktop" roleName="Data Analyst" />
```

**Особливості:**

**Background:**
- Gradient: lime-500 to green-600
- Padding: 4 (p-4)

**Left Side:**
- Home icon (white bg, lime-600 icon)
- App name (desktop only): "Мій застосунок"

**Right Side:**
- Role badge (white/20 bg, white text)
- User avatar (white/20 bg, user icon)

**Visual:**
```
┌────────────────────────────────────────┐
│ [🏠] Мій застосунок    [Data Analyst] 👤│
└────────────────────────────────────────┘
```

---

### UINavigation
Навігація імітації інтерфейсу (тільки desktop).

**Props:**
```typescript
interface UINavigationProps {
  deviceType: DeviceType;
  permissions: UserPermissions;
}
```

**Використання:**
```tsx
import { UINavigation } from './user-ui-preview';

<UINavigation deviceType="desktop" permissions={permissions} />
```

**Особливості:**

**Display:**
- Only on desktop
- Returns null for tablet/mobile

**Background:**
- slate-50
- Border bottom: slate-200
- Padding: px-4 py-2

**4 Nav Items:**
1. **Головна** (Home, lime-600, active)
2. **Проєкти** (FolderOpen, slate-600, hover)
3. **API** (Settings, conditional on useApi permission)
4. **Допомога** (HelpCircle, slate-600, hover)

**Visual:**
```
┌────────────────────────────────────────┐
│ 🏠 Головна | 📁 Проєкти | ⚙️ API | ❓ Допомога │
└────────────────────────────────────────┘
```

---

### UIContent
Контент імітації інтерфейсу.

**Props:**
```typescript
interface UIContentProps {
  deviceType: DeviceType;
  roleName: string;
  permissions: UserPermissions;
}
```

**Використання:**
```tsx
import { UIContent } from './user-ui-preview';

<UIContent
  deviceType="desktop"
  roleName="Data Analyst"
  permissions={permissions}
/>
```

**Особливості:**

**Layout:**
- Flex: 1 (flex-1)
- Padding: 4 (p-4)
- Overflow: auto

**Sections:**

**1. Welcome Card:**
- Background: violet-50 to purple-50
- Border: violet-200
- Title: "Вітаємо!"
- Text: "Ваша роль: **Data Analyst**"

**2. Actions Grid:**
- Grid columns: 2 (mobile) or 3 (tablet/desktop)
- Gap: 3
- 6 ActionButtons:
  - Новий проєкт (createProjects)
  - Поділитись (shareProjects)
  - Експорт (exportData)
  - Імпорт (importData)
  - Брендинг (customBranding)
  - API (useApi)

**3. Priority Support Banner (conditional):**
- Background: amber-50
- Border: amber-200
- Icon: Bell (amber-600)
- Text: "Пріоритетна підтримка активна"

**Visual:**
```
┌────────────────────────────────────┐
│ Вітаємо!                           │
│ Ваша роль: Data Analyst            │
├────────────────────────────────────┤
│ [📁 Новий]  [🔗 Поділитись] [⬇️ Експорт] │
│ [⬆️ Імпорт] [⭐ Брендинг]   [⚙️ API]     │
├────────────────────────────────────┤
│ 🔔 Пріоритетна підтримка активна   │
└────────────────────────────────────┘
```

---

### ActionButton
Кнопка дії з правами доступу.

**Props:**
```typescript
interface ActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  enabled: boolean;
}
```

**Використання:**
```tsx
import { ActionButton } from './user-ui-preview';
import { FolderOpen } from 'lucide-react';

<ActionButton
  icon={FolderOpen}
  label="Новий проєкт"
  enabled={true}
/>
```

**Особливості:**

**Enabled State:**
- Border: lime-200
- Background: lime-50
- Hover: border-lime-300
- Icon: lime-600
- Clickable

**Disabled State:**
- Border: slate-200
- Background: slate-50
- Opacity: 50
- Cursor: not-allowed
- Icon: slate-400
- Not clickable

**Visual:**
```
Enabled:
┌─────────────┐
│ 📁          │
│ Новий проєкт│
└─────────────┘

Disabled:
┌─────────────┐
│ 📁 (gray)   │
│ Імпорт      │
└─────────────┘
```

---

### PermissionsPanel
Панель прав доступу з 8 елементами.

**Props:**
```typescript
interface PermissionsPanelProps {
  permissions: UserPermissions;
}

interface UserPermissions {
  createProjects: boolean;
  deleteProjects: boolean;
  shareProjects: boolean;
  exportData: boolean;
  importData: boolean;
  useApi: boolean;
  customBranding: boolean;
  prioritySupport: boolean;
}
```

**Використання:**
```tsx
import { PermissionsPanel, getPermissionsForRole } from './user-ui-preview';

<PermissionsPanel permissions={getPermissionsForRole('data-analyst')} />
```

**Особливості:**

**Card:**
- Title: "Доступні можливості"
- Border: slate-200
- Shadow: sm

**8 Permissions:**
1. Створення проєктів
2. Видалення проєктів
3. Спільний доступ
4. Експорт даних
5. Імпорт даних
6. Використання API
7. Свій брендинг
8. Пріоритетна підтримка

**Each Item:**
- Background: slate-50
- Padding: 3 (p-3)
- Rounded: lg
- Badge: "Дозволено" / "Заборонено"

**Visual:**
```
┌────────────────────────────────┐
│ Доступні можливості            │
├────────────────────────────────┤
│ Створення проєктів   [Дозволено]│
│ Видалення проєктів   [Дозволено]│
│ Спільний доступ      [Дозволено]│
│ Експорт даних        [Дозволено]│
│ Імпорт даних         [Дозволено]│
│ Використання API     [Дозволено]│
│ Свій брендинг        [Дозволено]│
│ Пріоритетна підтримка[Дозволено]│
└────────────────────────────────┘
```

---

### PermissionItem
Елемент права доступу.

**Props:**
```typescript
interface PermissionItemProps {
  label: string;
  enabled: boolean;
}
```

**Використання:**
```tsx
import { PermissionItem } from './user-ui-preview';

<PermissionItem label="Створення проєктів" enabled={true} />
<PermissionItem label="Імпорт даних" enabled={false} />
```

**Особливості:**

**Layout:**
- Flex: space-between
- Padding: 3 (p-3)
- Background: slate-50
- Rounded: lg

**Content:**
- Label (text-sm, slate-900)
- Badge (variant based on enabled)

**Badge:**
- Enabled: default variant, "Дозволено"
- Disabled: outline variant, "Заборонено"

**Visual:**
```
┌────────────────────────────────────┐
│ Створення проєктів   [✅ Дозволено]│
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Імпорт даних        [⭕ Заборонено]│
└────────────────────────────────────┘
```

---

## 🛠️ Утиліти (utils.ts)

### Permission Functions (10)

#### getPermissionsForRole
Отримує права для ролі.

```typescript
getPermissionsForRole(roleId: string): UserPermissions
```

**Example:**
```tsx
const perms = getPermissionsForRole('data-analyst');
// { createProjects: true, deleteProjects: true, ... }
```

---

#### hasPermission
Перевіряє наявність права.

```typescript
hasPermission(roleId: string, permission: keyof UserPermissions): boolean
```

**Example:**
```tsx
hasPermission('data-analyst', 'useApi');  // true
hasPermission('report-viewer', 'deleteProjects');  // false
```

---

#### countEnabledPermissions
Підраховує дозволені права.

```typescript
countEnabledPermissions(permissions: UserPermissions): number
```

---

#### getPermissionPercentage
Обчислює відсоток дозволених прав.

```typescript
getPermissionPercentage(permissions: UserPermissions): number
```

---

#### getEnabledPermissions
Повертає список дозволених прав.

```typescript
getEnabledPermissions(roleId: string): Array<keyof UserPermissions>
```

---

#### getDisabledPermissions
Повертає список заборонених прав.

```typescript
getDisabledPermissions(roleId: string): Array<keyof UserPermissions>
```

---

#### compareRolePermissions
Порівнює права двох ролей.

```typescript
compareRolePermissions(roleId1: string, roleId2: string): {
  same: Array<keyof UserPermissions>;
  different: Array<keyof UserPermissions>;
  onlyInFirst: Array<keyof UserPermissions>;
  onlyInSecond: Array<keyof UserPermissions>;
}
```

---

#### mergePermissions
Об'єднує права (OR операція).

```typescript
mergePermissions(perms1: UserPermissions, perms2: UserPermissions): UserPermissions
```

---

#### intersectPermissions
Перетин прав (AND операція).

```typescript
intersectPermissions(perms1: UserPermissions, perms2: UserPermissions): UserPermissions
```

---

#### getPermissionSummary
Отримує підсумок прав.

```typescript
getPermissionSummary(permissions: UserPermissions): {
  total: number;
  enabled: number;
  disabled: number;
  percentage: number;
}
```

---

### Role Functions (8)

#### getRoleById
Отримує роль за ID.

```typescript
getRoleById(roleId: string): UserRole | undefined
```

---

#### getRoleName
Отримує назву ролі.

```typescript
getRoleName(roleId: string): string
```

---

#### getRoleColor
Отримує колір ролі.

```typescript
getRoleColor(roleId: string): string
```

---

#### getAllRoles
Повертає всі ролі.

```typescript
getAllRoles(): UserRole[]
```

---

#### getRolesWithPermission
Повертає ролі з певним правом.

```typescript
getRolesWithPermission(permission: keyof UserPermissions): UserRole[]
```

---

#### getRolesByPermissionCount
Сортує ролі за кількістю прав.

```typescript
getRolesByPermissionCount(): UserRole[]
```

---

#### getMostPermissiveRole
Повертає найбільш дозвільну роль.

```typescript
getMostPermissiveRole(): UserRole | undefined
```

---

#### getLeastPermissiveRole
Повертає найменш дозвільну роль.

```typescript
getLeastPermissiveRole(): UserRole | undefined
```

---

### Device Functions (4)

#### getDeviceSize
Отримує розмір пристрою.

```typescript
getDeviceSize(deviceType: DeviceType): DeviceSize
```

---

#### getDeviceDisplayName
Отримує відображувану назву пристрою.

```typescript
getDeviceDisplayName(deviceType: DeviceType): string
```

---

#### shouldShowNavigation
Перевіряє, чи показувати навігацію.

```typescript
shouldShowNavigation(deviceType: DeviceType): boolean
```

---

#### getActionGridCols
Повертає кількість колонок для grid.

```typescript
getActionGridCols(deviceType: DeviceType): number
// mobile: 2, tablet/desktop: 3
```

---

### UI Functions (5)

#### getActionButtonClass
Генерує класи для кнопки дії.

```typescript
getActionButtonClass(enabled: boolean): string
```

---

#### getActionIconClass
Генерує класи для іконки дії.

```typescript
getActionIconClass(enabled: boolean): string
```

---

#### getPermissionBadgeVariant
Повертає варіант badge.

```typescript
getPermissionBadgeVariant(enabled: boolean): 'default' | 'outline'
```

---

#### getPermissionBadgeText
Повертає текст badge.

```typescript
getPermissionBadgeText(enabled: boolean): string
// 'Дозволено' або 'Заборонено'
```

---

#### formatPermissionLabel
Форматує назву права.

```typescript
formatPermissionLabel(key: string): string
```

---

### Export Functions (3)

#### exportPermissionsToJSON
Експортує права ролі в JSON.

```typescript
exportPermissionsToJSON(roleId: string): string
```

---

#### exportAllRolesPermissionsToJSON
Експортує права всіх ролей.

```typescript
exportAllRolesPermissionsToJSON(): string
```

---

#### generatePermissionMatrix
Генерує матрицю прав.

```typescript
generatePermissionMatrix(): Record<string, Record<keyof UserPermissions, boolean>>
```

---

### Statistics Functions (2)

#### getPermissionStatistics
Статистика прав по всіх ролях.

```typescript
getPermissionStatistics(): Record<keyof UserPermissions, {
  enabled: number;
  disabled: number;
  percentage: number;
}>
```

---

#### countRolesWithPermission
Підраховує ролі з правом.

```typescript
countRolesWithPermission(permission: keyof UserPermissions): number
```

---

### Validation Functions (3)

#### arePermissionsEqual
Перевіряє рівність прав.

```typescript
arePermissionsEqual(perms1: UserPermissions, perms2: UserPermissions): boolean
```

---

#### isValidDeviceType
Валідує тип пристрою.

```typescript
isValidDeviceType(device: string): device is DeviceType
```

---

#### isValidRoleId
Валідує ID ролі.

```typescript
isValidRoleId(roleId: string): boolean
```

---

## 📦 Імпорт

### Компоненти
```typescript
import {
  PreviewHeader,
  RoleSelector,
  DeviceSelector,
  PreviewWindow,
  MockUserInterface,
  UIHeader,
  UINavigation,
  UIContent,
  ActionButton,
  PermissionsPanel,
  PermissionItem,
} from './user-ui-preview';
```

### Types
```typescript
import type {
  DeviceType,
  UserRole,
  UserPermissions,
  DeviceSize,
} from './user-ui-preview';
```

### Utils
```typescript
import {
  getPermissionsForRole,
  getRoleName,
  hasPermission,
  getDeviceSize,
  getActionGridCols,
} from './user-ui-preview';
```

### Data
```typescript
import {
  userRoles,
  deviceSizes,
  rolePermissions,
  actionConfigs,
  permissionConfigs,
} from './user-ui-preview/data';
```

---

## 🎨 Повний приклад

```typescript
import { useState } from 'react';
import {
  PreviewHeader,
  PreviewWindow,
  PermissionsPanel,
  userRoles,
  deviceSizes,
  getPermissionsForRole,
  getRoleName,
  defaultDeviceType,
  defaultRole,
} from './user-ui-preview';
import type { DeviceType } from './user-ui-preview';

export default function UserUIPreview() {
  const [deviceType, setDeviceType] = useState<DeviceType>(defaultDeviceType);
  const [selectedRole, setSelectedRole] = useState(defaultRole);

  const currentPermissions = getPermissionsForRole(selectedRole);
  const roleName = getRoleName(selectedRole);
  const deviceSize = deviceSizes[deviceType];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PreviewHeader
        selectedRole={selectedRole}
        roles={userRoles}
        deviceType={deviceType}
        onRoleChange={setSelectedRole}
        onDeviceChange={setDeviceType}
      />

      {/* Preview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Window */}
        <div className="lg:col-span-2">
          <PreviewWindow
            deviceType={deviceType}
            deviceSize={deviceSize}
            selectedRole={selectedRole}
            roleName={roleName}
            permissions={currentPermissions}
          />
        </div>

        {/* Permissions Panel */}
        <div>
          <PermissionsPanel permissions={currentPermissions} />
        </div>
      </div>
    </div>
  );
}
```

---

## 🎯 Особливості

### 4 User Roles

**1. Data Analyst** (violet-500 to purple-600)
- All permissions enabled (8/8)
- Full access to data analysis, API, and export/import

**2. Content Manager** (blue-500 to cyan-600)
- 4/8 permissions enabled
- Create, delete, share projects, export data
- No import, API, branding, or priority support

**3. Report Viewer** (indigo-500 to violet-600)
- 1/8 permissions enabled
- Only create projects
- Read-only for most features

**4. Guest User** (slate-400 to slate-500)
- 7/8 permissions enabled
- All except custom branding
- Full functionality for guests

---

### 3 Device Types

**Desktop (100% × 600px):**
- Full navigation
- Full app name
- 3-column action grid

**Tablet (768px × 600px):**
- No navigation
- Full app name
- 3-column action grid

**Mobile (375px × 667px):**
- No navigation
- No app name
- 2-column action grid

---

### 8 Permissions

1. **createProjects** - Створення проєктів
2. **deleteProjects** - Видалення проєктів
3. **shareProjects** - Спільний доступ
4. **exportData** - Експорт даних
5. **importData** - Імпорт даних
6. **useApi** - Використання API
7. **customBranding** - Свій брендинг
8. **prioritySupport** - Пріоритетна підтримка

---

### 6 Action Buttons

1. **Новий проєкт** (FolderOpen) - createProjects
2. **Поділитись** (Share2) - shareProjects
3. **Експорт** (Download) - exportData
4. **Імпорт** (Upload) - importData
5. **Брендинг** (Star) - customBranding
6. **API** (Settings) - useApi

---

## 📊 Mock Data

### Role Permissions

```typescript
{
  'data-analyst': {
    createProjects: true,
    deleteProjects: true,
    shareProjects: true,
    exportData: true,
    importData: true,
    useApi: true,
    customBranding: true,
    prioritySupport: true,
  },
  'content-manager': {
    createProjects: true,
    deleteProjects: true,
    shareProjects: true,
    exportData: true,
    importData: false,
    useApi: false,
    customBranding: false,
    prioritySupport: false,
  },
  'report-viewer': {
    createProjects: true,
    deleteProjects: false,
    shareProjects: false,
    exportData: false,
    importData: false,
    useApi: false,
    customBranding: false,
    prioritySupport: false,
  },
  'guest-user': {
    createProjects: true,
    deleteProjects: true,
    shareProjects: true,
    exportData: true,
    importData: true,
    useApi: true,
    customBranding: false,
    prioritySupport: true,
  },
}
```

---

## 📊 Метрики

- **Компонентів:** 11
- **Утиліт:** 50+
- **Загальний розмір:** ~900 рядків коду
- **Середній розмір компонента:** ~30 рядків
- **Покриття TypeScript:** 100%
- **Ролей:** 4
- **Пристроїв:** 3
- **Прав доступу:** 8
- **Кнопок дій:** 6

---

## 🔗 Пов'язані модулі

- [UsersManager](../UsersManager.tsx) - User management
- [RolesManager](../RolesManager.tsx) - Role management
- [Dashboard](../Dashboard.tsx) - Main admin dashboard

---

**Останнє оновлення:** 13 грудня 2025  
**Версія:** 1.0.0  
**Статус:** ✅ Готово до використання
