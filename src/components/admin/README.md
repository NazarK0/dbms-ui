# Admin Components

Компоненти для адміністративної панелі управління DBMS.

## Структура

```
/components/admin/
├── RolesManager.tsx          # Головний компонент управління ролями
├── index.ts                  # Barrel export для зручного імпорту
├── README.md                 # Ця документація
└── roles/                    # Підкомпоненти для управління ролями
    ├── RoleCard.tsx          # Картка окремої ролі (admin/user)
    ├── RolesGrid.tsx         # Сітка карток ролей
    ├── AdminRolesPanel.tsx   # Панель адміністративних ролей
    ├── UserRolesPanel.tsx    # Панель користувацьких ролей
    ├── StatsCards.tsx        # Статистичні картки (header)
    ├── CreateRoleModal.tsx   # Модальне вікно створення ролі
    ├── RBACMatrix.tsx        # Матриця прав доступу RBAC
    ├── RoleHistory.tsx       # Історія змін ролей
    └── index.ts              # Barrel export
```

## Компоненти

### RolesManager
Головний контейнер для управління ролями.

**Функціонал:**
- Відображення статистики
- Розділення admin/user ролей
- Створення/редагування/видалення ролей
- Матриця RBAC
- Історія змін

**Використання:**
```tsx
import { RolesManager } from '@/components/admin';

function AdminPanel() {
  return <RolesManager />;
}
```

### StatsCards
Статистичні картки в header секції.

**Props:**
- `totalRoles: number` - загальна кількість ролей
- `totalAdmins: number` - кількість адміністраторів
- `totalUsers: number` - кількість користувачів
- `totalPermissions?: number` - кількість унікальних прав (default: 47)

### AdminRolesPanel
Панель з адміністративними ролями (зелена колірна схема).

**Props:**
- `roles: Role[]` - масив admin ролей
- `onEdit: (role: Role) => void` - callback редагування
- `onSelect: (name: string) => void` - callback вибору ролі
- `onDelete?: (role: Role) => void` - callback видалення
- `onCreateClick: () => void` - callback створення нової ролі

### UserRolesPanel
Панель з користувацькими ролями (фіолетова колірна схема).

**Props:**
- `roles: Role[]` - масив user ролей
- `onEdit: (role: Role) => void` - callback редагування
- `onSelect: (name: string) => void` - callback вибору ролі
- `onDelete?: (role: Role) => void` - callback видалення
- `onCreateClick: () => void` - callback створення нової ролі

### RoleCard
Картка окремої ролі з messenger-style badge.

**Props:**
- `role: Role` - об'єкт ролі
- `onEdit: (role: Role) => void` - callback редагування
- `onSelect: (name: string) => void` - callback вибору
- `onDelete?: (role: Role) => void` - callback видалення

**Особливості:**
- Квадратна форма (aspect-square)
- Notification badge в лівому верхньому куті
- Edit/Delete кнопки в правому верхньому куті (hover)
- Glassmorphism overlay для назви
- Велика центральна іконка
- Колірна диференціація admin (зелений) vs user (фіолетовий)

### RolesGrid
Responsive сітка карток ролей.

**Props:**
- `roles: Role[]` - масив ролей для відображення
- `onEdit: (role: Role) => void` - callback редагування
- `onSelect: (name: string) => void` - callback вибору
- `onDelete?: (role: Role) => void` - callback видалення

**Grid breakpoints:**
- Mobile (<768px): 5 columns
- Tablet (768-1024px): 8 columns
- Desktop (1024-1280px): 10 columns
- Large (1280px+): 12 columns

### CreateRoleModal
Модальне вікно для створення нової ролі.

**Props:**
- `open: boolean` - стан відкриття модалки
- `onOpenChange: (open: boolean) => void` - callback зміни стану
- `roleType: 'admin' | 'user'` - тип ролі
- `onRoleTypeChange: (type: 'admin' | 'user') => void` - callback зміни типу

**Секції:**
1. Вибір типу ролі (admin/user)
2. Базова інформація (назва, опис)
3. UI Visibility (тільки для admin) - 10 розділів інтерфейсу
4. Row Level Security - 4 таблиці з RLS політиками

## Типи

### Role
```tsx
interface Role {
  name: string;           // Назва ролі
  users: number;          // Кількість користувачів
  description: string;    // Опис ролі
  color: string;          // Tailwind gradient класи
  badge: string;          // Badge variant
  type: 'admin' | 'user'; // Тип ролі
}
```

## Колірна схема

### Admin (зелена) 🌿
- Border: `border-lime-200`
- Background: `from-lime-50/50 to-green-50/50`
- Icon: `from-lime-500 to-green-600`
- Badge: `bg-lime-100 text-lime-700 border-lime-300`
- Button: `from-lime-500 to-green-600`

### User (фіолетова) 💜
- Border: `border-violet-200`
- Background: `from-violet-50/50 to-purple-50/50`
- Icon: `from-violet-500 to-purple-600`
- Badge: `bg-violet-100 text-violet-700 border-violet-300`
- Button: `from-violet-500 to-purple-600`

## Майбутні розробки

### User UI Components
В наступних версіях буде створено окрему директорію `/components/user/` для:
- Dashboard для кінцевих користувачів
- User profile
- User settings
- Feature access based on role
- Usage quotas

### Модульність
Всі компоненти розроблені з прицілом на:
- **Розширюваність**: легко додати нові типи ролей
- **Повторне використання**: компоненти можна використовувати окремо
- **Тестування**: кожен компонент має чіткі props і можна тестувати ізольовано
- **Типізація**: всі типи експортовані для передільного використання

## Приклади використання

### Імпорт окремих компонентів
```tsx
import { 
  RoleCard, 
  RolesGrid, 
  AdminRolesPanel 
} from '@/components/admin/roles';
```

### Використання типів
```tsx
import type { Role } from '@/components/admin';

const myRole: Role = {
  name: 'Custom Admin',
  users: 3,
  description: 'Custom role',
  color: 'from-blue-500 to-cyan-600',
  badge: 'default',
  type: 'admin'
};
```

### Створення custom панелі
```tsx
import { RolesGrid } from '@/components/admin/roles';

function CustomRolesView({ roles }: { roles: Role[] }) {
  return (
    <div className="p-4">
      <h2>My Custom Roles</h2>
      <RolesGrid 
        roles={roles}
        onEdit={handleEdit}
        onSelect={handleSelect}
      />
    </div>
  );
}
```

## Backwards Compatibility

Старий імпорт все ще працює:
```tsx
// Legacy (працює, але deprecated)
import RolesManager from '@/components/RolesManager';

// New (рекомендовано)
import { RolesManager } from '@/components/admin';
```

## Ліцензія
Частина DBMS Admin Panel Project
