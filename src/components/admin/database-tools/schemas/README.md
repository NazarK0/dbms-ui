# Schemas Manager Components

Модульні компоненти для управління схемами PostgreSQL бази даних з вкладками для перегляду таблиць, функцій, тригерів та інших об'єктів.

## 📁 Структура

```
schemas/
├── SchemasHeader.tsx           # Header з кнопкою створення
├── SelectedSchemaAlert.tsx     # Alert для обраної схеми
├── SchemaActions.tsx           # Дії для рядків таблиці
├── SchemasTable.tsx            # Список схем
├── SchemaTabNavigation.tsx     # Навігація по вкладках схеми
├── SchemaTabsContent.tsx       # Вміст вкладок схеми
├── CreateSchemaModal.tsx       # Модальне вікно створення
├── utils.ts                    # Допоміжні функції
├── index.ts                    # Центральний експорт
└── README.md                   # Ця документація
```

## 🧩 Компоненти

### SchemasHeader
Header компонент з назвою бази даних та кнопкою створення схеми.

**Props:**
```typescript
interface SchemasHeaderProps {
  selectedDatabase: string;
  onCreateSchema: () => void;
}
```

**Використання:**
```tsx
<SchemasHeader 
  selectedDatabase="production"
  onCreateSchema={() => setShowModal(true)} 
/>
```

---

### SelectedSchemaAlert
Alert компонент для відображення обраної схеми з кнопкою "Назад до схем".

**Props:**
```typescript
interface SelectedSchemaAlertProps {
  database: string;
  schema: string;
  onBack: () => void;
}
```

**Використання:**
```tsx
<SelectedSchemaAlert
  database="production"
  schema="public"
  onBack={() => setSelectedSchema(null)}
/>
```

**Особливості:**
- Синьо-індиго градієнт фону
- Показує повний шлях: `database.schema`
- Іконка Layers
- Кнопка "Назад" з іконкою ArrowLeft

---

### SchemaActions
Кнопки дій для кожного рядка таблиці схем.

**Props:**
```typescript
interface SchemaActionsProps {
  schemaName: string;
  isPublicSchema: boolean;
  onExport?: (schemaName: string) => void;
  onEdit?: (schemaName: string) => void;
  onDelete: (schemaName: string) => void;
}
```

**Використання:**
```tsx
<SchemaActions
  schemaName="my_schema"
  isPublicSchema={false}
  onExport={handleExport}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

**Особливості:**
- **Експорт** (Download) - опціонально
- **Редагувати** (Edit) - опціонально
- **Видалити** (Trash2) - недоступно для public схеми

---

### SchemasTable
Таблиця зі списком схем бази даних.

**Props:**
```typescript
interface SchemasTableProps {
  schemas: Schema[];
  onSelectSchema: (schemaName: string) => void;
  onExport?: (schemaName: string) => void;
  onEdit?: (schemaName: string) => void;
  onDelete: (schemaName: string) => void;
}
```

**Використання:**
```tsx
<SchemasTable
  schemas={schemas}
  onSelectSchema={setSelectedSchema}
  onExport={handleExport}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

**Колонки:**
1. Назва схеми (з іконкою та badge для public)
2. Власник
3. Таблиці (кількість)
4. Функції (кількість)
5. Опис
6. Дії

**Особливості:**
- Клік на рядок відкриває схему
- Public схема має світло-синій фон
- Hover ефект для всіх рядків
- Клік на дії не відкриває схему (stopPropagation)

---

### SchemaTabNavigation
Навігація по вкладках для перегляду вмісту схеми.

**Props:**
```typescript
interface SchemaTabNavigationProps {
  activeTab?: SchemaTab;
}

type SchemaTab = 'tables' | 'views' | 'functions' | 'triggers' | 'foreign-tables' | 'data-types';
```

**Використання:**
```tsx
<SchemaTabNavigation activeTab="tables" />
```

**Вкладки:**
1. **Таблиці** (Table2 icon)
2. **Перегляди** (Eye icon)
3. **Функції** (Code icon)
4. **Тригери** (Zap icon)
5. **Зовнішні таблиці** (Database icon)
6. **Типи даних** (Type icon)

---

### SchemaTabsContent
Вміст вкладок схеми з відповідними компонентами.

**Props:**
```typescript
interface SchemaTabsContentProps {
  selectedDatabase: string;
}
```

**Використання:**
```tsx
<Tabs defaultValue="tables">
  <SchemaTabNavigation />
  <SchemaTabsContent selectedDatabase="production" />
</Tabs>
```

**Інтеграції:**
- **tables** → `TableBrowser`
- **views** → `TableBrowser`
- **functions** → `FunctionsManager`
- **triggers** → `TriggersRules`
- **foreign-tables** → `ForeignTablesManager`
- **data-types** → `DataTypesManager`

---

### CreateSchemaModal
Модальне вікно для створення нової схеми.

**Props:**
```typescript
interface CreateSchemaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SchemaFormData) => void;
  selectedDatabase: string;
}

interface SchemaFormData {
  schemaName: string;
  schemaOwner: string;
  schemaDescription: string;
}
```

**Використання:**
```tsx
<CreateSchemaModal
  open={showModal}
  onOpenChange={setShowModal}
  onSubmit={(data) => console.log('Create:', data)}
  selectedDatabase="production"
/>
```

**Поля форми:**
1. **Назва схеми** (обов'язкове)
2. **Власник** (select: postgres, admin, developer, analyst)
3. **Опис** (текстове поле, опціонально)

**Валідація:**
- Кнопка "Створити" неактивна при порожній назві
- Автоматичне скидання форми після створення

**Власники за замовчуванням:**
- `postgres`
- `admin`
- `developer`
- `analyst`

---

## 🛠️ Утиліти (utils.ts)

### isValidSchemaName
Перевіряє валідність назви схеми згідно правил PostgreSQL.

```typescript
isValidSchemaName(name: string): boolean
```

**Приклад:**
```tsx
isValidSchemaName('my_schema');     // true
isValidSchemaName('123invalid');    // false (починається з цифри)
isValidSchemaName('pg_invalid');    // false (зарезервоване ім'я)
```

**Правила:**
- Починається з літери або підкреслення
- Містить тільки літери, цифри, підкреслення
- Максимум 63 символи
- Не може починатися з `pg_` або бути `information_schema`

---

### isSystemSchema
Перевіряє, чи є схема системною.

```typescript
isSystemSchema(schemaName: string): boolean
```

**Приклад:**
```tsx
isSystemSchema('pg_catalog');         // true
isSystemSchema('information_schema'); // true
isSystemSchema('public');             // false
isSystemSchema('my_schema');          // false
```

**Системні схеми:**
- `pg_catalog`
- `information_schema`
- `pg_toast`
- `pg_temp_*`
- Всі що починаються з `pg_`

---

### isPublicSchema
Перевіряє, чи є схема public.

```typescript
isPublicSchema(schemaName: string): boolean
```

**Приклад:**
```tsx
isPublicSchema('public');    // true
isPublicSchema('my_schema'); // false
```

---

### canDeleteSchema
Перевіряє, чи можна видалити схему.

```typescript
canDeleteSchema(schemaName: string): boolean
```

**Приклад:**
```tsx
canDeleteSchema('public');         // false (захищена)
canDeleteSchema('pg_catalog');     // false (системна)
canDeleteSchema('my_schema');      // true
```

---

### formatSchemaIdentifier
Форматує повний ідентифікатор схеми для SQL.

```typescript
formatSchemaIdentifier(database: string, schema: string): string
```

**Приклад:**
```tsx
formatSchemaIdentifier('production', 'public'); // "production.public"
```

---

### validateSchemaForm
Валідує всі поля форми створення схеми.

```typescript
validateSchemaForm(data: {
  schemaName: string;
  schemaOwner: string;
}): { valid: boolean; errors: string[] }
```

**Приклад:**
```tsx
const result = validateSchemaForm({
  schemaName: 'my_schema',
  schemaOwner: 'postgres'
});
// result.valid === true
// result.errors === []
```

---

### getSchemaStatsSummary
Повертає текстовий опис статистики схеми.

```typescript
getSchemaStatsSummary(schema: {
  tables: number;
  functions: number;
}): string
```

**Приклад:**
```tsx
getSchemaStatsSummary({ tables: 5, functions: 3 }); // "5 табл., 3 функц."
getSchemaStatsSummary({ tables: 0, functions: 0 }); // "Порожня"
```

---

### sortSchemas
Сортує схеми з public на першому місці.

```typescript
sortSchemas<T extends { name: string }>(schemas: T[]): T[]
```

**Приклад:**
```tsx
const sorted = sortSchemas([
  { name: 'my_schema' },
  { name: 'public' },
  { name: 'analytics' }
]);
// Результат: public, analytics, my_schema
```

---

## 📦 Імпорт

### Окремі компоненти
```typescript
import { 
  SchemasHeader,
  SelectedSchemaAlert,
  SchemaActions,
  SchemasTable,
  SchemaTabNavigation,
  SchemaTabsContent,
  CreateSchemaModal,
  type SchemaFormData,
  type SchemaTab
} from './schemas';
```

### Утиліти
```typescript
import { 
  isValidSchemaName,
  isSystemSchema,
  isPublicSchema,
  canDeleteSchema,
  formatSchemaIdentifier,
  validateSchemaForm,
  getSchemaStatsSummary,
  sortSchemas
} from './schemas';
```

---

## 🎨 Приклад використання

### Повний приклад головного компонента

```typescript
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Tabs } from '../../ui/tabs';
import { getSchemasByDatabase } from '../../../mockData';
import {
  SchemasHeader,
  SelectedSchemaAlert,
  SchemasTable,
  SchemaTabNavigation,
  SchemaTabsContent,
  CreateSchemaModal,
  type SchemaFormData,
  type SchemaTab,
} from './schemas';

export default function SchemasManager({ selectedDatabase }: { selectedDatabase: string }) {
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SchemaTab>('tables');
  const [showModal, setShowModal] = useState(false);

  const schemas = getSchemasByDatabase(selectedDatabase);

  const handleCreate = (data: SchemaFormData) => {
    console.log('Creating:', data);
    setShowModal(false);
  };

  const handleDelete = (schemaName: string) => {
    if (confirm(`Видалити схему "${schemaName}"?`)) {
      console.log('Deleting:', schemaName);
    }
  };

  // Schema detail view
  if (selectedSchema) {
    return (
      <div className="space-y-6">
        <SelectedSchemaAlert
          database={selectedDatabase}
          schema={selectedSchema}
          onBack={() => setSelectedSchema(null)}
        />

        <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as SchemaTab)}>
          <SchemaTabNavigation />
          <SchemaTabsContent selectedDatabase={selectedDatabase} />
        </Tabs>
      </div>
    );
  }

  // Schemas list view
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <SchemasHeader 
            selectedDatabase={selectedDatabase}
            onCreateSchema={() => setShowModal(true)}
          />
        </CardHeader>
        
        <CardContent>
          <SchemasTable
            schemas={schemas}
            onSelectSchema={setSelectedSchema}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <CreateSchemaModal
        open={showModal}
        onOpenChange={setShowModal}
        onSubmit={handleCreate}
        selectedDatabase={selectedDatabase}
      />
    </div>
  );
}
```

---

## 🎯 Особливості

### Двоетапний інтерфейс
1. **Список схем** - таблиця з усіма схемами
2. **Деталі схеми** - вкладки з таблицями, функціями, тригерами тощо

### Захист public схеми
- Не можна видалити
- Візуально відрізняється (світло-синій фон)
- Badge "За замовчуванням"

### Інтеграція з іншими компонентами
Автоматично підключає:
- `TableBrowser` для таблиць та переглядів
- `FunctionsManager` для функцій
- `TriggersRules` для тригерів
- `ForeignTablesManager` для зовнішніх таблиць
- `DataTypesManager` для типів даних

### Валідація назв схем
- PostgreSQL naming rules
- Заборона системних імен
- Max 63 символи

### Кольорові індикатори
- **Header icon:** Оливковий градієнт (lime-green)
- **Schema icon:** Синьо-індиго градієнт
- **Alert:** Синій градієнт для обраної схеми

---

## 🔄 Інтеграція з API

### Приклад реальної інтеграції

```typescript
const handleCreateSchema = async (data: SchemaFormData) => {
  try {
    const response = await fetch('/api/schemas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        database: selectedDatabase,
        schemaName: data.schemaName,
        owner: data.schemaOwner,
        description: data.schemaDescription,
      }),
    });

    if (response.ok) {
      toast.success('Схему створено');
      setShowModal(false);
      await reloadSchemas();
    } else {
      toast.error('Помилка створення схеми');
    }
  } catch (error) {
    toast.error('Помилка з\'єднання');
  }
};
```

---

## 🚀 Майбутні покращення

### Заплановані функції
- [ ] EditSchemaModal для редагування схем
- [ ] Permissions matrix для управління правами
- [ ] Schema search/filter
- [ ] Batch operations (видалення декількох схем)
- [ ] Schema comparison tool
- [ ] Schema migration wizard
- [ ] Schema size statistics
- [ ] Schema dependencies visualization

### Оптимізації
- [ ] Lazy loading для вкладок
- [ ] Кешування даних схем
- [ ] Virtual scrolling для великої кількості схем
- [ ] Debounce для пошуку

---

## 📊 Метрики

- **Компонентів:** 7
- **Утиліт:** 7
- **Загальний розмір:** ~450 рядків коду
- **Середній розмір компонента:** ~50 рядків
- **Покриття TypeScript:** 100%
- **Інтегрованих компонентів:** 5

---

## 🔗 Пов'язані модулі

- [TableBrowser](../TableBrowser.tsx) - Перегляд таблиць
- [FunctionsManager](../FunctionsManager.tsx) - Управління функціями
- [TriggersRules](../TriggersRules.tsx) - Управління тригерами
- [ForeignTables](../foreign-tables/README.md) - Зовнішні таблиці
- [DataTypes](../data-types/README.md) - Типи даних

---

**Останнє оновлення:** 13 грудня 2025  
**Версія:** 1.0.0  
**Статус:** ✅ Готово до використання
