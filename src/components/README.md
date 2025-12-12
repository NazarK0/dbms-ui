# Components Directory Structure

Організація компонентів PostgreSQL DBMS системи управління базами даних.

## 📁 Структура каталогів

```
/components/
│
├── 🔐 admin/                      # Адміністративні компоненти
│   ├── pages/                     # Admin pages (Dashboard, Users, Roles, Logs)
│   ├── dashboard/                 # Dashboard віджети
│   ├── database/                  # Database компоненти
│   ├── roles/                     # Управління ролями
│   ├── hooks/                     # Custom React hooks
│   ├── data/                      # Mock дані
│   ├── AdminHeader.tsx            # Header адмін панелі
│   ├── AdminTabsList.tsx          # Tabs адмін панелі
│   ├── Logs.tsx                   # Системні логи
│   └── README.md                  # Детальна документація
│
├── 👤 user/                       # User application компоненти
│   ├── hooks/                     # User-specific hooks
│   ├── data/                      # User mock дані
│   ├── UserApplication.tsx        # Головний компонент
│   ├── UserApplicationHeader.tsx  # Header користувача
│   ├── DatabaseCard.tsx           # Картка бази даних
│   ├── ActivityRecordItem.tsx     # Запис активності
│   ├── AccessedTableItem.tsx      # Елемент таблиці доступу
│   └── index.ts                   # Експорти
│
├── 🌐 global/                     # Глобальні компоненти
│   └── HomePage.tsx               # Головна сторінка
│
├── 🎨 ui/                         # Shadcn UI компоненти
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ... (інші UI примітиви)
│
├── 🎭 figma/                      # Figma-специфічні компоненти
│   └── ImageWithFallback.tsx
│
├── 📄 users/                      # Shared user management components
│   ├── UserTable.tsx              # Таблиця користувачів
│   └── CreateUserModal.tsx        # Модальне вікно створення користувача
│
└── 📊 Основні компоненти (root level)
    ├── DatabaseManager.tsx        # Управління БД
    ├── AuditLog.tsx               # Журнал аудиту
    ├── PostgresConfig.tsx         # Конфігурація PostgreSQL
    ├── CLI.tsx                    # Command-line interface
    ├── SystemMonitor.tsx          # Системний моніторинг
    ├── ReplicaClusters.tsx        # Управління репліками
    ├── PerformanceAnalyzer.tsx    # Аналізатор продуктивності
    ├── UserUIPreview.tsx          # Попередній перегляд UI користувача
    │
    └── Sub-components (DB tools):
        ├── QueryExecutor.tsx      # Виконання SQL запитів
        ├── TableBrowser.tsx       # Браузер таблиць
        ├── SchemaVisualizer.tsx   # Візуалізація схеми
        ├── SchemasManager.tsx     # Управління схемами
        ├── ExtensionManager.tsx   # Управління розширеннями
        ├── FunctionsManager.tsx   # Управління функціями
        ├── TriggersRules.tsx      # Управління тригерами
        └── BackupRestore.tsx      # Резервне копіювання
```

## 🎯 Категорії компонентів

### 1. 🔐 Admin Components (`/admin`)
**Призначення:** Адміністративна панель для root/superadmin користувачів

**Колірна тема:** Olive/Lime (lime-600, green-700)

**Основні можливості:**
- ✅ Управління базами даних (CRUD)
- ✅ Управління користувачами та ролями (RBAC)
- ✅ Моніторинг системи та продуктивності
- ✅ SQL редактор та браузер таблиць
- ✅ Візуалізація схем БД
- ✅ Резервне копіювання та відновлення
- ✅ Управління репліками кластерів
- ✅ Аудит та логи системи

**Головні сторінки:**
```tsx
import Dashboard from '@/components/admin/pages/Dashboard';
import UsersManager from '@/components/admin/pages/UsersManager';
import RolesManager from '@/components/admin/pages/RolesManager';
```

**Layout компоненти:**
```tsx
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabsList from '@/components/admin/AdminTabsList';
```

**Sub-components:**
```tsx
import { StatCard, ActivityItem } from '@/components/admin/dashboard';
import { DatabaseRow } from '@/components/admin/database';
import { useDashboardCustomization } from '@/components/admin/hooks';
```

### 2. 👤 User Components (`/user`)
**Призначення:** Інтерфейс для звичайних користувачів системи

**Колірна тема:** Violet/Purple (violet-500, purple-600)

**Основні можливості:**
- ✅ Перегляд доступних баз даних
- ✅ Робота з таблицями (CRUD згідно з правами)
- ✅ Історія активності
- ✅ Dashboard з останніми діями

**Головні компоненти:**
```tsx
import { 
  UserApplication,        // Головний компонент
  UserApplicationHeader,  // Header користувача
  DatabaseCard,          // Картка БД
  ActivityRecordItem,    // Запис активності
  AccessedTableItem      // Елемент таблиці
} from '@/components/user';
```

### 3. 🌐 Global Components (`/global`)
**Призначення:** Спільні компоненти для всієї системи

**Компоненти:**
```tsx
import HomePage from '@/components/global/HomePage';
```

### 4. 🎨 UI Components (`/ui`)
**Призначення:** Базові UI примітиви (shadcn/ui)

**Компоненти:**
- Button, Card, Input, Badge, Dialog
- Table, Tabs, Select, Checkbox
- Alert, Progress, ScrollArea і т.д.

```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

## 📦 Патерни імпортів

### ✅ Рекомендовані імпорти:

```tsx
// Admin pages
import Dashboard from '@/components/admin/pages/Dashboard';
import UsersManager from '@/components/admin/pages/UsersManager';
import RolesManager from '@/components/admin/pages/RolesManager';

// Admin layout
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabsList from '@/components/admin/AdminTabsList';
import Logs from '@/components/admin/Logs';

// Admin sub-components
import { StatCard, ActivityItem } from '@/components/admin/dashboard';
import { DatabaseRow } from '@/components/admin/database';
import { useDashboardCustomization } from '@/components/admin/hooks';

// Root level components
import DatabaseManager from '@/components/DatabaseManager';
import AuditLog from '@/components/AuditLog';
import SystemMonitor from '@/components/SystemMonitor';

// User components
import { UserApplication } from '@/components/user';
import { useTabNavigation } from '@/components/user/hooks';

// Global components
import HomePage from '@/components/global/HomePage';

// UI components
import { Button, Card, Badge } from '@/components/ui';
```

## 🔄 Зміни структури (Грудень 2024)

### ✅ Завершені зміни:

1. **Видалено re-export wrappers** - всі компоненти тепер імпортуються з фактичного розташування
2. **Переміщено admin pages до /admin/pages/**:
   - Dashboard.tsx → /admin/pages/Dashboard.tsx
   - UsersManager.tsx → /admin/pages/UsersManager.tsx
   - RolesManager.tsx → /admin/pages/RolesManager.tsx
3. **Переміщено HomePage до /global/**:
   - HomePage.tsx → /global/HomePage.tsx
4. **Видалено дублікати**:
   - /admin/layout/ (re-exports)
   - /admin/users/ (re-exports)
   - /global/index.ts (re-export)
5. **Оновлено App.tsx** з новими імпортами

### 🎯 Переваги нової структури:

- ✅ Немає дублікатів та re-exports
- ✅ Чіткіша організація за функціональністю
- ✅ Прості та зрозумілі імпорти
- ✅ Кращ performance (less indirection)
- ✅ Легше знайти компоненти

## 🎨 Колірні теми

### Admin Panel (Olive/Lime):
```css
Primary: from-lime-500 to-green-600
Accent: lime-50, lime-100, lime-200
Active: bg-lime-600 text-white
Hover: hover:bg-lime-50
Border: border-lime-200
```

### User Interface (Violet/Purple):
```css
Primary: from-violet-500 to-purple-600
Accent: violet-50, violet-100, violet-200
Active: bg-violet-600 text-white
Hover: hover:bg-violet-50
Border: border-violet-200
```

## 📊 Статистика структури

| Категорія | Компонентів | Підпапок | Файлів |
|-----------|-------------|----------|--------|
| **Admin** | 30+ | 5 | 35+ |
| **User** | 10+ | 2 | 12+ |
| **Global** | 1 | 0 | 1 |
| **UI** | 30+ | 0 | 30+ |
| **Root** | 17 | 1 | 18 |
| **Всього** | 88+ | 8 | 96+ |

## 🚀 Додавання нових компонентів

### Для Admin сторінок:
1. Створіть компонент в `/components/admin/pages/`
2. Імпортуйте в App.tsx
3. Оновіть `/components/admin/README.md`

### Для Admin sub-components:
1. Визначте категорію (dashboard, database, roles, etc.)
2. Створіть компонент в `/components/admin/{category}/`
3. Додайте до index.ts категорії (якщо потрібно)

### Для User компонентів:
1. Створіть компонент в `/components/user/`
2. Додайте експорт до `/components/user/index.ts`

### Для Global компонентів:
1. Створіть компонент в `/components/global/`

## ✅ Стандарти якості коду

- ✅ **TypeScript** - Повна типізація
- ✅ **Модульність** - Малі, перевикористовувані компоненти
- ✅ **DRY** - Не повторюйте код
- ✅ **SRP** - Одна відповідальність на компонент
- ✅ **Props interfaces** - Чіткі інтерфейси для props
- ✅ **No Re-exports** - Пряме імпортування
- ✅ **Documentation** - README для кожної категорії
- ✅ **Naming** - PascalCase для компонентів, camelCase для функцій

## 📝 Корисні посилання

- [Admin Components README](/components/admin/README.md) - Детальна документація admin компонентів
- [Shadcn UI](https://ui.shadcn.com/) - Документація UI компонентів
- [Tailwind CSS](https://tailwindcss.com/) - Документація стилів

## 🔧 Технологічний стек

- **React** 18+ з TypeScript
- **Tailwind CSS** v4.0 для стилізації
- **Shadcn/ui** для UI компонентів
- **Lucide React** для іконок
- **Recharts** для графіків та діаграм

## 🌍 Мова інтерфейсу

Весь інтерфейс повністю **українською мовою**:
- Всі лейбли та тексти
- Повідомлення про помилки
- Підказки та документація

## 💻 Вимоги до платформи

- **Мінімальна ширина екрану:** 1024px (тільки desktop)
- **Браузери:** Chrome, Firefox, Safari, Edge (останні версії)
- **Адаптивність:** Повна підтримка різних розширень desktop екранів
