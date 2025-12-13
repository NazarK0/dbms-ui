# Table Browser Components

Модульні компоненти для перегляду структури таблиць PostgreSQL, схем даних та попереднього перегляду рядків.

## 📁 Структура

```
table-browser/
├── TableListSidebar.tsx          # Sidebar з пошуком та списком таблиць
├── TableHeaderCard.tsx           # Header з назвою таблиці
├── TableSchemaView.tsx           # Таблиця схеми (колонки, типи, ключі)
├── TableDataPreview.tsx          # Попередній перегляд даних
├── EmptyTableState.tsx           # Placeholder коли нічого не вибрано
├── types.ts                      # TypeScript інтерфейси
├── data.ts                       # Mock дані таблиць
├── utils.ts                      # Допоміжні функції (34 functions)
├── index.ts                      # Центральний експорт
└── README.md                     # Ця документація
```

## 🧩 Компоненти

### TableListSidebar
Бічна панель з пошуком та списком таблиць бази даних.

**Props:**
```typescript
interface TableListSidebarProps {
  tables: string[];
  selectedTable: string | null;
  selectedDatabase?: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onTableSelect: (table: string) => void;
}
```

**Використання:**
```tsx
<TableListSidebar
  tables={['users', 'orders', 'products']}
  selectedTable={selectedTable}
  selectedDatabase="production_db"
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  onTableSelect={setSelectedTable}
/>
```

**Особливості:**

**Search Input:**
- Іконка Search зліва
- Placeholder "Пошук таблиць..."
- Real-time filtering
- Callback `onSearchChange`

**Table List:**
- ScrollArea (400px height)
- Table2 іконка для кожної таблиці
- Active state (blue background)
- Hover state (gray background)
- Click callback `onTableSelect`

**Card Structure:**
- Title: "Таблиці"
- Description: Database name
- Compact header (pb-3)

**Visual States:**
- **Selected** - `bg-blue-600 text-white`
- **Hover** - `hover:bg-slate-100`
- **Default** - `text-slate-700`

**Responsive:**
- Fixed width in sidebar
- ScrollArea for many tables
- Truncate long table names

---

### TableHeaderCard
Інформаційна карточка з назвою вибраної таблиці.

**Props:**
```typescript
interface TableHeaderCardProps {
  tableName: string;
  databaseName?: string;
  columnCount: number;
}
```

**Використання:**
```tsx
<TableHeaderCard
  tableName="users"
  databaseName="production_db"
  columnCount={7}
/>
```

**Особливості:**

**Visual Design:**
- Gradient background `from-blue-50 to-indigo-50`
- Border `border-slate-200`
- Shadow `shadow-sm`

**Header Layout:**
```
┌────────────────────────────────────────┐
│ 📋 users                    🗄️         │
│ production_db • 7 колонок              │
└────────────────────────────────────────┘
```

**Left Side:**
- Table2 icon (blue-600)
- Table name (title)
- Database + column count (description)

**Right Side:**
- Database icon (blue-400)
- Decorative element

**Typography:**
- Title with icon flex layout
- Description with metadata separator (•)

---

### TableSchemaView
Таблиця структури колонок з типами даних та ключами.

**Props:**
```typescript
interface TableSchemaViewProps {
  schema: ColumnSchema[];
}

interface ColumnSchema {
  column: string;
  type: string;
  nullable: boolean;
  default: string | null;
  key: 'PRI' | 'UNI' | 'FOR' | '';
}
```

**Використання:**
```tsx
const schema = [
  { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
  { column: 'email', type: 'varchar(255)', nullable: false, default: null, key: 'UNI' },
];

<TableSchemaView schema={schema} />
```

**Колонки (5):**

| Колонка | Опис | Формат |
|---------|------|--------|
| **Колонка** | Назва колонки | Bold text |
| **Тип** | Data type | Code block (gray bg) |
| **Nullable** | Чи дозволено NULL | Badge (yellow/green) |
| **За замовчуванням** | Default value | Code or dash |
| **Ключ** | Key constraint | Badge (PRI/UNI/FOR) |

**Nullable Badges:**

**Yes (nullable):**
```tsx
<Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
  Yes
</Badge>
```

**No (not nullable):**
```tsx
<Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
  No
</Badge>
```

**Key Badges:**

| Key | Variant | Meaning |
|-----|---------|---------|
| **PRI** | default (olive) | Primary Key |
| **UNI** | secondary (gray) | Unique |
| **FOR** | outline | Foreign Key |
| *empty* | — | No constraint |

**Type Display:**
- Code block with gray background
- Monospace font
- Examples: `integer`, `varchar(255)`, `timestamp`

**Default Value:**
- Code format if exists
- Dash (—) if null
- Examples: `nextval()`, `CURRENT_TIMESTAMP`, `'active'`

**Card Structure:**
- Title: "Схема таблиці"
- Description: "Структура та типи даних колонок"

---

### TableDataPreview
Попередній перегляд рядків даних таблиці.

**Props:**
```typescript
interface TableDataPreviewProps {
  data: TableDataRow[];
  limit?: number;
}

interface TableDataRow {
  [columnName: string]: any;
}
```

**Використання:**
```tsx
const data = [
  { id: 1, username: 'john_doe', email: 'john@example.com' },
  { id: 2, username: 'jane_smith', email: 'jane@example.com' },
];

<TableDataPreview data={data} limit={100} />
```

**Особливості:**

**Data Display:**
- Dynamic columns from data keys
- Monospace font for values
- Limit rows (default 100)
- ScrollArea for large data

**Empty State:**
```tsx
// If data is empty
<Card>
  <CardHeader>
    <CardTitle>Попередній перегляд даних</CardTitle>
    <CardDescription>Немає даних для відображення</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Таблиця порожня</p>
  </CardContent>
</Card>
```

**Table Structure:**
- Auto-generated columns from first row
- Dynamic cell rendering
- Monospace text (font-mono)
- Slate-600 color

**Card Header:**
- Title: "Попередній перегляд даних"
- Description: "Перші {limit} рядків таблиці"

**Data Processing:**
```typescript
const displayData = limitTableData(data, limit);
const columns = getDataKeys(displayData);
```

**Cell Rendering:**
- Shows actual value
- Monospace for readability
- Handles all data types

---

### EmptyTableState
Placeholder коли таблиця не вибрана.

**Props:**
```typescript
interface EmptyTableStateProps {
  message?: string;
  description?: string;
}
```

**Використання:**
```tsx
<EmptyTableState />

// Custom message
<EmptyTableState
  message="Немає даних"
  description="Створіть нову таблицю для початку роботи"
/>
```

**Default Props:**
- **message:** "Таблицю не вибрано"
- **description:** "Оберіть таблицю зі списку, щоб переглянути її схему та дані"

**Visual Design:**

```
┌────────────────────────────────────┐
│                                    │
│          ┌────────────┐            │
│          │  📋        │            │
│          └────────────┘            │
│                                    │
│      Таблицю не вибрано            │
│  Оберіть таблицю зі списку...      │
│                                    │
└────────────────────────────────────┘
```

**Elements:**
- Gray rounded square (16x16)
- Table2 icon (8x8, slate-400)
- Title (slate-900, mb-2)
- Description (slate-600)
- Center alignment
- Large padding (p-12)

**Use Cases:**
- Initial state (no table selected)
- Empty search results
- Database without tables

---

## 🛠️ Утиліти (utils.ts)

### Key Constraint Functions

#### getKeyBadgeVariant
Повертає variant Badge для типу ключа.

```typescript
getKeyBadgeVariant(key: KeyType): 'default' | 'secondary' | 'outline'
```

**Приклад:**
```tsx
<Badge variant={getKeyBadgeVariant('PRI')}>PRI</Badge>
```

**Mapping:**
- `PRI` → `'default'` (olive)
- `UNI` → `'secondary'` (gray)
- `FOR` → `'outline'` (border)
- `''` → `'outline'` (no key)

---

#### getKeyTypeText
Повертає повну назву типу ключа.

```typescript
getKeyTypeText(key: KeyType): string
```

**Приклад:**
```tsx
getKeyTypeText('PRI');  // "Primary Key"
getKeyTypeText('UNI');  // "Unique"
getKeyTypeText('FOR');  // "Foreign Key"
```

---

### Table Filtering

#### filterTables
Фільтрує таблиці за пошуковим терміном.

```typescript
filterTables(tables: string[], searchTerm: string): string[]
```

**Приклад:**
```tsx
const tables = ['users', 'orders', 'products'];
filterTables(tables, 'ord');  // ['orders']
```

**Features:**
- Case-insensitive
- Substring matching
- Returns original array if searchTerm is empty

---

### Schema Analysis

#### getColumnCount
Підраховує кількість колонок.

```typescript
getColumnCount(schema: ColumnSchema[]): number
```

---

#### hasKeyConstraint
Перевіряє чи колонка має обмеження ключа.

```typescript
hasKeyConstraint(column: ColumnSchema): boolean
```

---

#### getPrimaryKeyColumns
Повертає колонки з Primary Key.

```typescript
getPrimaryKeyColumns(schema: ColumnSchema[]): ColumnSchema[]
```

**Приклад:**
```tsx
const pkColumns = getPrimaryKeyColumns(schema);
// [{ column: 'id', type: 'integer', ... }]
```

---

#### getUniqueKeyColumns
Повертає колонки з Unique constraint.

```typescript
getUniqueKeyColumns(schema: ColumnSchema[]): ColumnSchema[]
```

---

#### getForeignKeyColumns
Повертає колонки з Foreign Key.

```typescript
getForeignKeyColumns(schema: ColumnSchema[]): ColumnSchema[]
```

---

#### getNullableColumns
Повертає nullable колонки.

```typescript
getNullableColumns(schema: ColumnSchema[]): ColumnSchema[]
```

---

#### getNonNullableColumns
Повертає NOT NULL колонки.

```typescript
getNonNullableColumns(schema: ColumnSchema[]): ColumnSchema[]
```

---

### Column Checks

#### isNullable
Перевіряє чи колонка nullable.

```typescript
isNullable(column: ColumnSchema): boolean
```

---

#### hasDefaultValue
Перевіряє чи колонка має default value.

```typescript
hasDefaultValue(column: ColumnSchema): boolean
```

---

#### formatColumnType
Форматує тип колонки для відображення.

```typescript
formatColumnType(type: string): string
```

---

#### getColumnNames
Витягує назви всіх колонок.

```typescript
getColumnNames(schema: ColumnSchema[]): string[]
```

**Приклад:**
```tsx
getColumnNames(schema);  // ['id', 'username', 'email']
```

---

#### getColumnByName
Знаходить колонку за назвою.

```typescript
getColumnByName(schema: ColumnSchema[], columnName: string): ColumnSchema | undefined
```

---

### Data Operations

#### hasTableData
Перевіряє чи таблиця має дані.

```typescript
hasTableData(data: TableDataRow[]): boolean
```

---

#### getRowCount
Підраховує кількість рядків.

```typescript
getRowCount(data: TableDataRow[]): number
```

---

#### getDataKeys
Витягує назви колонок з даних.

```typescript
getDataKeys(data: TableDataRow[]): string[]
```

**Приклад:**
```tsx
const data = [{ id: 1, name: 'John' }];
getDataKeys(data);  // ['id', 'name']
```

---

#### limitTableData
Обмежує кількість рядків.

```typescript
limitTableData(data: TableDataRow[], limit: number): TableDataRow[]
```

**Приклад:**
```tsx
const limited = limitTableData(data, 10);  // First 10 rows
```

---

#### formatCellValue
Форматує значення комірки.

```typescript
formatCellValue(value: any): string
```

**Приклад:**
```tsx
formatCellValue(null);      // "—"
formatCellValue(123);       // "123"
formatCellValue('text');    // "text"
```

---

#### isNullValue
Перевіряє чи значення null.

```typescript
isNullValue(value: any): boolean
```

---

### Statistics

#### getTableStats
Повертає статистику таблиці.

```typescript
getTableStats(schema: ColumnSchema[], data: TableDataRow[]): {
  columns: number;
  rows: number;
  primaryKeys: number;
  foreignKeys: number;
  uniqueKeys: number;
  nullableColumns: number;
}
```

**Приклад:**
```tsx
const stats = getTableStats(schema, data);
console.log(`${stats.columns} columns, ${stats.rows} rows`);
```

---

### Sorting & Filtering

#### sortColumnsByKey
Сортує колонки за типом ключа (PRI → UNI → FOR → others).

```typescript
sortColumnsByKey(schema: ColumnSchema[]): ColumnSchema[]
```

---

#### filterColumnsByType
Фільтрує колонки за типом даних.

```typescript
filterColumnsByType(schema: ColumnSchema[], type: string): ColumnSchema[]
```

**Приклад:**
```tsx
filterColumnsByType(schema, 'varchar');
```

---

#### getNumericColumns
Повертає числові колонки.

```typescript
getNumericColumns(schema: ColumnSchema[]): ColumnSchema[]
```

**Типи:** integer, int, bigint, smallint, decimal, numeric, real, double, float

---

#### getTextColumns
Повертає текстові колонки.

```typescript
getTextColumns(schema: ColumnSchema[]): ColumnSchema[]
```

**Типи:** varchar, char, text

---

#### getTimestampColumns
Повертає timestamp колонки.

```typescript
getTimestampColumns(schema: ColumnSchema[]): ColumnSchema[]
```

**Типи:** timestamp, date, time

---

### Validation

#### isValidTableName
Валідує назву таблиці (PostgreSQL rules).

```typescript
isValidTableName(name: string): boolean
```

**Правила:**
- Починається з букви або _
- Містить тільки букви, цифри, _
- Regex: `^[a-zA-Z_][a-zA-Z0-9_]*$`

**Приклад:**
```tsx
isValidTableName('users');      // true
isValidTableName('user_data');  // true
isValidTableName('123users');   // false
isValidTableName('user-data');  // false
```

---

### SQL Generation

#### generateCreateTableSQL
Генерує CREATE TABLE SQL.

```typescript
generateCreateTableSQL(tableName: string, schema: ColumnSchema[]): string
```

**Приклад:**
```tsx
const sql = generateCreateTableSQL('users', schema);
// CREATE TABLE users (
//   id integer NOT NULL DEFAULT nextval(),
//   username varchar(255) NOT NULL,
//   email varchar(255) NOT NULL,
//   PRIMARY KEY (id)
// );
```

---

### Schema Checks

#### hasPrimaryKey
Перевіряє чи схема має Primary Key.

```typescript
hasPrimaryKey(schema: ColumnSchema[]): boolean
```

---

#### hasForeignKeys
Перевіряє чи схема має Foreign Keys.

```typescript
hasForeignKeys(schema: ColumnSchema[]): boolean
```

---

### Type Analysis

#### getColumnTypeCategory
Визначає категорію типу колонки.

```typescript
getColumnTypeCategory(type: string): 'numeric' | 'text' | 'timestamp' | 'boolean' | 'other'
```

**Приклад:**
```tsx
getColumnTypeCategory('integer');       // 'numeric'
getColumnTypeCategory('varchar(255)');  // 'text'
getColumnTypeCategory('timestamp');     // 'timestamp'
getColumnTypeCategory('boolean');       // 'boolean'
```

---

### Size Estimation

#### estimateTableSize
Оцінює розмір таблиці.

```typescript
estimateTableSize(schema: ColumnSchema[], rowCount: number): string
```

**Приклад:**
```tsx
estimateTableSize(schema, 1000);  // "45.2 KB"
estimateTableSize(schema, 1000000);  // "43.5 MB"
```

**Логіка:**
- integer = 4 bytes
- bigint = 8 bytes
- varchar(N) = N bytes
- text = 100 bytes (average)
- timestamp = 8 bytes

---

## 📦 Імпорт

### Компоненти
```typescript
import {
  TableListSidebar,
  TableHeaderCard,
  TableSchemaView,
  TableDataPreview,
  EmptyTableState,
} from './table-browser';
```

### Types
```typescript
import type {
  TableInfo,
  ColumnSchema,
  TableSchema,
  TableDataRow,
  KeyType,
} from './table-browser';
```

### Utils
```typescript
import {
  filterTables,
  getKeyBadgeVariant,
  getPrimaryKeyColumns,
  getTableStats,
  generateCreateTableSQL,
} from './table-browser';
```

### Data
```typescript
import { tables, tableSchema, tableData } from './table-browser/data';
```

---

## 🎨 Повний приклад

```typescript
import { useState } from 'react';
import {
  TableListSidebar,
  TableHeaderCard,
  TableSchemaView,
  TableDataPreview,
  EmptyTableState,
} from './table-browser';
import { tables, tableSchema, tableData } from './table-browser/data';

export default function TableBrowser({ selectedDatabase }) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const currentSchema = selectedTable 
    ? (tableSchema[selectedTable] || []) 
    : [];
  const currentData = selectedTable 
    ? (tableData[selectedTable] || []) 
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <TableListSidebar
          tables={tables}
          selectedTable={selectedTable}
          selectedDatabase={selectedDatabase}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onTableSelect={setSelectedTable}
        />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {selectedTable ? (
          <>
            <TableHeaderCard
              tableName={selectedTable}
              databaseName={selectedDatabase}
              columnCount={currentSchema.length}
            />
            <TableSchemaView schema={currentSchema} />
            <TableDataPreview data={currentData} limit={100} />
          </>
        ) : (
          <EmptyTableState />
        )}
      </div>
    </div>
  );
}
```

---

## 🎯 Особливості

### Database Schema Browsing
- **Table list** з пошуком
- **Schema viewer** з типами даних
- **Key constraints** (PRI/UNI/FOR)
- **Data preview** перших 100 рядків

### Column Information
- **Data type** з форматуванням
- **Nullable status** (Yes/No badges)
- **Default values** (code format)
- **Key constraints** (colored badges)

### Data Viewing
- **Dynamic columns** з даних
- **Monospace display** для читабельності
- **Limit support** (default 100 rows)
- **Empty state** handling

### Search & Navigation
- **Real-time search** по таблицях
- **Active state** для вибраної таблиці
- **Hover effects** для списку
- **ScrollArea** для багатьох таблиць

---

## 🔄 Інтеграція з API

### Приклад реальної інтеграції

```typescript
const TableBrowser = ({ selectedDatabase }) => {
  const [tables, setTables] = useState<string[]>([]);
  const [schema, setSchema] = useState<ColumnSchema[]>([]);
  const [data, setData] = useState<TableDataRow[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // Fetch tables
  useEffect(() => {
    if (selectedDatabase) {
      fetchTables(selectedDatabase);
    }
  }, [selectedDatabase]);

  // Fetch schema and data when table selected
  useEffect(() => {
    if (selectedTable) {
      fetchTableSchema(selectedDatabase, selectedTable);
      fetchTableData(selectedDatabase, selectedTable);
    }
  }, [selectedTable]);

  const fetchTables = async (database: string) => {
    const response = await fetch(`/api/databases/${database}/tables`);
    const data = await response.json();
    setTables(data);
  };

  const fetchTableSchema = async (database: string, table: string) => {
    const response = await fetch(
      `/api/databases/${database}/tables/${table}/schema`
    );
    const data = await response.json();
    setSchema(data);
  };

  const fetchTableData = async (database: string, table: string) => {
    const response = await fetch(
      `/api/databases/${database}/tables/${table}/data?limit=100`
    );
    const data = await response.json();
    setData(data);
  };

  return (
    <>
      <TableListSidebar
        tables={tables}
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
      />
      {selectedTable && (
        <>
          <TableSchemaView schema={schema} />
          <TableDataPreview data={data} />
        </>
      )}
    </>
  );
};
```

---

## 📊 Метрики

- **Компонентів:** 5
- **Утиліт:** 34
- **Загальний розмір:** ~500 рядків коду
- **Середній розмір компонента:** ~60 рядків
- **Покриття TypeScript:** 100%
- **Таблиць у mock data:** 7
- **Mock schemas:** 4

---

## 🔗 Пов'язані модулі

- [SchemasManager](../schemas/README.md) - Schema management
- [QueryExecutor](../QueryExecutor.tsx) - SQL queries
- [ForeignTablesManager](../foreign-tables/README.md) - Foreign tables

---

**Останнє оновлення:** 13 грудня 2025  
**Версія:** 1.0.0  
**Статус:** ✅ Готово до використання
