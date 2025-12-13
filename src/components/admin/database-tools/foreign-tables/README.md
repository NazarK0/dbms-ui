# Foreign Tables Manager Components

Модульні компоненти для управління Foreign Data Wrappers (FDW) таблицями в PostgreSQL.

## 📁 Структура

```
foreign-tables/
├── TablesHeader.tsx           # Header з кнопкою створення
├── TablesSearchBar.tsx        # Пошук таблиць
├── TablesInfoAlert.tsx        # Інформація про FDW
├── TableActions.tsx           # Дії для рядків таблиці
├── ForeignTablesTable.tsx     # Список зовнішніх таблиць
├── CreateTableModal.tsx       # Модальне вікно створення
├── utils.ts                   # Допоміжні функції
├── index.ts                   # Центральний експорт
└── README.md                  # Ця документація
```

## 🧩 Компоненти

### TablesHeader
Header компонент з назвою та кнопкою створення зовнішньої таблиці.

**Props:**
```typescript
interface TablesHeaderProps {
  onCreateTable: () => void;
}
```

**Використання:**
```tsx
<TablesHeader onCreateTable={() => setShowModal(true)} />
```

---

### TablesSearchBar
Поле пошуку для фільтрації зовнішніх таблиць.

**Props:**
```typescript
interface TablesSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

**Використання:**
```tsx
<TablesSearchBar 
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Пошук таблиць..."
/>
```

---

### TablesInfoAlert
Alert компонент з інформацією про Foreign Data Wrappers.

**Props:** Немає

**Використання:**
```tsx
<TablesInfoAlert />
```

---

### TableActions
Кнопки дій для кожного рядка таблиці (оновити, редагувати, видалити).

**Props:**
```typescript
interface TableActionsProps {
  tableName: string;
  onRefresh: (tableName: string) => void;
  onEdit?: (tableName: string) => void;
  onDelete: (tableName: string) => void;
}
```

**Використання:**
```tsx
<TableActions
  tableName="remote_users"
  onRefresh={handleRefresh}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

---

### ForeignTablesTable
Таблиця зі списком зовнішніх таблиць та їх деталями.

**Props:**
```typescript
interface ForeignTablesTableProps {
  tables: ForeignTable[];
  onRefresh: (tableName: string) => void;
  onEdit?: (tableName: string) => void;
  onDelete: (tableName: string) => void;
}
```

**Використання:**
```tsx
<ForeignTablesTable
  tables={filteredTables}
  onRefresh={handleRefresh}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

**Дані таблиці:**
- Локальна назва таблиці (з іконкою)
- Зовнішній сервер
- Віддалена таблиця (schema.table)
- Статус (активна/помилка)
- Остання синхронізація
- Дії (оновити, редагувати, видалити)

---

### CreateTableModal
Модальне вікно для створення нової зовнішньої таблиці.

**Props:**
```typescript
interface CreateTableModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TableFormData) => void;
}

interface TableFormData {
  tableName: string;
  serverName: string;
  remoteSchema: string;
  remoteTable: string;
}
```

**Використання:**
```tsx
<CreateTableModal
  open={showModal}
  onOpenChange={setShowModal}
  onSubmit={(data) => console.log('Create table:', data)}
/>
```

**Поля форми:**
- Локальна назва таблиці
- Зовнішній сервер (select)
- Віддалена схема
- Віддалена таблиця

**Валідація:**
- Всі поля обов'язкові
- Кнопка "Створити" неактивна при порожніх полях

---

## 🛠️ Утиліти (utils.ts)

### getStatusBadge
Повертає Badge компонент для статусу таблиці.

```typescript
getStatusBadge(status: 'active' | 'error'): JSX.Element
```

**Приклад:**
```tsx
const badge = getStatusBadge('active'); // Зелений badge "Активна"
```

---

### formatRemoteTable
Форматує повну назву віддаленої таблиці.

```typescript
formatRemoteTable(schema: string, table: string): string
```

**Приклад:**
```tsx
const fullName = formatRemoteTable('public', 'users'); // "public.users"
```

---

### isValidTableName
Перевіряє валідність назви таблиці згідно правил PostgreSQL.

```typescript
isValidTableName(name: string): boolean
```

**Приклад:**
```tsx
isValidTableName('remote_users'); // true
isValidTableName('123invalid');   // false (починається з цифри)
isValidTableName('valid_name_123'); // true
```

**Правила:**
- Починається з літери або підкреслення
- Містить тільки літери, цифри, підкреслення
- Максимум 63 символи

---

### validateTableForm
Валідує всі поля форми створення таблиці.

```typescript
validateTableForm(data: TableFormData): { valid: boolean; errors: string[] }
```

**Приклад:**
```tsx
const result = validateTableForm({
  tableName: 'remote_users',
  serverName: 'external_db',
  remoteSchema: 'public',
  remoteTable: 'users'
});
// result.valid === true
// result.errors === []
```

---

## 📦 Імпорт

### Окремі компоненти
```typescript
import { 
  TablesHeader,
  TablesSearchBar,
  TablesInfoAlert,
  TableActions,
  ForeignTablesTable,
  CreateTableModal,
  type TableFormData
} from './foreign-tables';
```

### Утиліти
```typescript
import { 
  getStatusBadge,
  formatRemoteTable,
  isValidTableName,
  validateTableForm
} from './foreign-tables';
```

---

## 🎨 Приклад використання

### Повний приклад головного компонента

```typescript
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { foreignTables } from '../../../mockData';
import {
  TablesHeader,
  TablesSearchBar,
  TablesInfoAlert,
  ForeignTablesTable,
  CreateTableModal,
  type TableFormData,
} from './foreign-tables';

export default function ForeignTablesManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredTables = foreignTables.filter(table =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.server.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTable = (data: TableFormData) => {
    console.log('Creating table:', data);
    setShowCreateModal(false);
  };

  const handleDeleteTable = (tableName: string) => {
    if (confirm(`Видалити таблицю "${tableName}"?`)) {
      console.log('Deleting:', tableName);
    }
  };

  const handleRefreshTable = (tableName: string) => {
    console.log('Refreshing:', tableName);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <TablesHeader onCreateTable={() => setShowCreateModal(true)} />
        </CardHeader>
        
        <CardContent className="space-y-4">
          <TablesSearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <TablesInfoAlert />

          <ForeignTablesTable
            tables={filteredTables}
            onRefresh={handleRefreshTable}
            onDelete={handleDeleteTable}
          />
        </CardContent>
      </Card>

      <CreateTableModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={handleCreateTable}
      />
    </div>
  );
}
```

---

## 🎯 Особливості

### Автоматичне скидання форми
CreateTableModal автоматично скидає всі поля після успішного створення таблиці або при натисканні "Скасувати".

### Валідація форми
Кнопка "Створити" в модальному вікні активна тільки коли всі поля заповнені.

### Інтеграція з ForeignServers
Модальне вікно автоматично завантажує список доступних зовнішніх серверів з `foreignServersSimple`.

### Кольорові індикатори
- **Активна таблиця:** Зелений badge
- **Помилка:** Червоний badge (destructive)
- **Іконка таблиці:** Синьо-індиго градієнт

### Підказки на кнопках
Всі кнопки дій мають атрибут `title` для підказок при наведенні.

---

## 🔄 Інтеграція з API

### Приклад реальної інтеграції

```typescript
const handleCreateTable = async (data: TableFormData) => {
  try {
    const response = await fetch('/api/foreign-tables', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        localName: data.tableName,
        serverName: data.serverName,
        remoteSchema: data.remoteSchema,
        remoteTable: data.remoteTable,
      }),
    });

    if (response.ok) {
      toast.success('Зовнішню таблицю створено');
      setShowCreateModal(false);
      // Reload tables list
      await reloadTables();
    } else {
      toast.error('Помилка створення таблиці');
    }
  } catch (error) {
    toast.error('Помилка з\'єднання');
  }
};
```

---

## 🚀 Майбутні покращення

### Заплановані функції
- [ ] EditTableModal для редагування існуючих таблиць
- [ ] Batch операції (видалення декількох таблиць)
- [ ] Експорт/імпорт конфігурацій таблиць
- [ ] Перегляд структури віддаленої таблиці
- [ ] Статистика використання зовнішніх таблиць
- [ ] User mappings для зовнішніх таблиць
- [ ] Advanced фільтри (по серверу, статусу)
- [ ] Сортування по колонкам

### Оптимізації
- [ ] Lazy loading для великої кількості таблиць
- [ ] Кешування списку серверів
- [ ] Debounce для пошуку
- [ ] Skeleton loaders

---

## 📊 Метрики

- **Компонентів:** 6
- **Утиліт:** 4
- **Загальний розмір:** ~350 рядків коду
- **Середній розмір компонента:** ~50 рядків
- **Покриття TypeScript:** 100%

---

## 🔗 Пов'язані модулі

- [ForeignServers](../foreign-servers/README.md) - Управління зовнішніми серверами
- [BackupRestore](../backup-restore/README.md) - Резервне копіювання
- [DataTypes](../data-types/README.md) - Типи даних

---

**Останнє оновлення:** 13 грудня 2025  
**Версія:** 1.0.0  
**Статус:** ✅ Готово до використання
