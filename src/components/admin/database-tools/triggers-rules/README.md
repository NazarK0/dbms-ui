# Triggers & Rules Components

Модульні компоненти для управління тригерами та правилами PostgreSQL з підтримкою створення, редагування та видалення.

## 📁 Структура

```
triggers-rules/
├── TriggersTable.tsx             # Таблиця тригерів з управлінням
├── RulesTable.tsx                # Таблиця правил перезапису
├── types.ts                      # TypeScript інтерфейси
├── data.ts                       # Mock дані (6 triggers, 4 rules)
├── utils.ts                      # Допоміжні функції (50+ functions)
├── index.ts                      # Центральний експорт
└── README.md                     # Ця документація
```

## 🧩 Компоненти

### TriggersTable
Таблиця тригерів PostgreSQL з можливістю створення, редагування та видалення.

**Props:**
```typescript
interface TriggersTableProps {
  triggers: Trigger[];
  selectedDatabase?: string;
  onCreateTrigger?: () => void;
  onEditTrigger?: (trigger: Trigger) => void;
  onDeleteTrigger?: (trigger: Trigger) => void;
  onToggleTrigger?: (trigger: Trigger) => void;
}

interface Trigger {
  name: string;
  table: string;
  event: string;
  timing: 'BEFORE' | 'AFTER';
  function: string;
  enabled: boolean;
}
```

**Використання:**
```tsx
import { TriggersTable } from './triggers-rules';

<TriggersTable
  triggers={triggers}
  selectedDatabase="production_db"
  onCreateTrigger={() => console.log('Create')}
  onEditTrigger={(trigger) => console.log('Edit', trigger.name)}
  onDeleteTrigger={(trigger) => console.log('Delete', trigger.name)}
/>
```

**Особливості:**

**Header:**
- Zap icon (orange-600)
- Title "Тригери"
- Create button з Plus icon
- Database name display

**Table Columns (6):**

| Колонка | Опис | Компонент |
|---------|------|-----------|
| **Назва** | Trigger name | Bold text |
| **Таблиця** | Table name | Badge (secondary) |
| **Подія** | Event type | Badge (colored by event) |
| **Функція** | Function name | Code (monospace) |
| **Статус** | Enabled/Disabled | Badge with Power icon |
| **Дії** | Actions | Edit + Delete buttons |

**Event Badge Colors:**

```typescript
// INSERT events
'bg-green-50 text-green-700 border-green-200'

// UPDATE events
'bg-blue-50 text-blue-700 border-blue-200'

// DELETE events
'bg-red-50 text-red-700 border-red-200'

// SELECT events
'bg-purple-50 text-purple-700 border-purple-200'
```

**Status Badge:**

**Enabled:**
```tsx
<Badge variant="default" className="gap-1">
  <Power className="w-3 h-3" />
  Увімкнено
</Badge>
```

**Disabled:**
```tsx
<Badge variant="secondary">Вимкнено</Badge>
```

**Action Buttons:**
- **Edit** - Ghost icon button
- **Delete** - Ghost icon button (red text)

**Visual Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│ ⚡ Тригери                          [+ Створити тригер]        │
│ База даних: production_db                                      │
├────────────────────────────────────────────────────────────────┤
│ Назва            │ Таблиця │ Подія        │ Функція  │ Статус │
├──────────────────┼─────────┼──────────────┼──────────┼────────┤
│ update_timestamp │ users   │ BEFORE UPDATE│ update() │ ⚡ Увім│
│ log_changes      │ orders  │ AFTER INSERT │ log()    │ ⚡ Увім│
│ validate_email   │ users   │ BEFORE INSERT│ validate│  Вимк  │
└────────────────────────────────────────────────────────────────┘
```

---

### RulesTable
Таблиця правил перезапису запитів PostgreSQL.

**Props:**
```typescript
interface RulesTableProps {
  rules: Rule[];
  onCreateRule?: () => void;
  onEditRule?: (rule: Rule) => void;
  onDeleteRule?: (rule: Rule) => void;
}

interface Rule {
  name: string;
  table: string;
  event: string;
  type: 'INSTEAD' | 'ALSO';
  command: string;
}
```

**Використання:**
```tsx
import { RulesTable } from './triggers-rules';

<RulesTable
  rules={rules}
  onCreateRule={() => console.log('Create')}
  onEditRule={(rule) => console.log('Edit', rule.name)}
  onDeleteRule={(rule) => console.log('Delete', rule.name)}
/>
```

**Особливості:**

**Header:**
- Title "Правила (Rules)"
- Create button з Plus icon
- Description "Правила перезапису запитів"

**Table Columns (5):**

| Колонка | Опис | Компонент |
|---------|------|-----------|
| **Назва** | Rule name | Bold text |
| **Таблиця/View** | Target table | Badge (secondary) |
| **Подія** | Event (INSERT/UPDATE/DELETE) | Badge (outline) |
| **Тип** | INSTEAD or ALSO | Badge (colored) |
| **Дії** | Actions | Edit + Delete buttons |

**Rule Type Badge Colors:**

**INSTEAD:**
```typescript
'bg-orange-50 text-orange-700 border-orange-200'
```

**ALSO:**
```typescript
'bg-teal-50 text-teal-700 border-teal-200'
```

**Visual Layout:**
```
┌──────────────────────────────────────────────────────────┐
│ Правила (Rules)                  [+ Створити правило]    │
│ Правила перезапису запитів                               │
├──────────────────────────────────────────────────────────┤
│ Назва     │ Таблиця/View │ Подія  │ Тип     │ Дії       │
├───────────┼──────────────┼────────┼─────────┼───────────┤
│ _RETURN   │ user_view    │ INSERT │ INSTEAD │ [✏️][🗑️]  │
│ audit_log │ sensitive    │ DELETE │ ALSO    │ [✏️][🗑️]  │
└──────────────────────────────────────────────────────────┘
```

**Action Buttons:**
- **Edit** - Ghost icon button
- **Delete** - Ghost icon button (red text)

---

## 🛠️ Утиліти (utils.ts)

### Badge Color Functions

#### getEventBadgeColor
Повертає Tailwind класи для події тригера.

```typescript
getEventBadgeColor(event: string): string
```

**Приклад:**
```tsx
getEventBadgeColor('BEFORE INSERT');  
// 'bg-green-50 text-green-700 border-green-200'

getEventBadgeColor('AFTER UPDATE');   
// 'bg-blue-50 text-blue-700 border-blue-200'

getEventBadgeColor('BEFORE DELETE');  
// 'bg-red-50 text-red-700 border-red-200'
```

**Колірна схема:**
- **INSERT** → Green (зелений)
- **UPDATE** → Blue (синій)
- **DELETE** → Red (червоний)
- **SELECT** → Purple (фіолетовий)

---

#### getRuleTypeBadgeColor
Повертає Tailwind класи для типу правила.

```typescript
getRuleTypeBadgeColor(type: string): string
```

**Приклад:**
```tsx
getRuleTypeBadgeColor('INSTEAD');  
// 'bg-orange-50 text-orange-700 border-orange-200'

getRuleTypeBadgeColor('ALSO');     
// 'bg-teal-50 text-teal-700 border-teal-200'
```

---

#### getTimingBadgeColor
Повертає Tailwind класи для timing тригера.

```typescript
getTimingBadgeColor(timing: string): string
```

**Приклад:**
```tsx
getTimingBadgeColor('BEFORE');  // Yellow
getTimingBadgeColor('AFTER');   // Indigo
```

---

### Filter Functions

#### filterTriggersByTable
Фільтрує тригери за назвою таблиці.

```typescript
filterTriggersByTable(triggers: Trigger[], tableName: string): Trigger[]
```

**Приклад:**
```tsx
filterTriggersByTable(triggers, 'users');
// Returns all triggers on 'users' table
```

---

#### filterTriggersByStatus
Фільтрує тригери за статусом (enabled/disabled).

```typescript
filterTriggersByStatus(triggers: Trigger[], enabled: boolean): Trigger[]
```

**Приклад:**
```tsx
const enabledTriggers = filterTriggersByStatus(triggers, true);
const disabledTriggers = filterTriggersByStatus(triggers, false);
```

---

#### filterTriggersByTiming
Фільтрує тригери за timing (BEFORE/AFTER).

```typescript
filterTriggersByTiming(triggers: Trigger[], timing: 'BEFORE' | 'AFTER'): Trigger[]
```

---

#### filterTriggersByEvent
Фільтрує тригери за типом події.

```typescript
filterTriggersByEvent(triggers: Trigger[], eventType: string): Trigger[]
```

**Приклад:**
```tsx
filterTriggersByEvent(triggers, 'INSERT');
// Returns all INSERT triggers
```

---

#### filterRulesByTable
Фільтрує правила за таблицею.

```typescript
filterRulesByTable(rules: Rule[], tableName: string): Rule[]
```

---

#### filterRulesByType
Фільтрує правила за типом (INSTEAD/ALSO).

```typescript
filterRulesByType(rules: Rule[], type: 'INSTEAD' | 'ALSO'): Rule[]
```

---

#### filterRulesByEvent
Фільтрує правила за подією.

```typescript
filterRulesByEvent(rules: Rule[], event: string): Rule[]
```

---

### Get Functions

#### getEnabledTriggers
Повертає всі увімкнені тригери.

```typescript
getEnabledTriggers(triggers: Trigger[]): Trigger[]
```

---

#### getDisabledTriggers
Повертає всі вимкнені тригери.

```typescript
getDisabledTriggers(triggers: Trigger[]): Trigger[]
```

---

#### getBeforeTriggers
Повертає всі BEFORE тригери.

```typescript
getBeforeTriggers(triggers: Trigger[]): Trigger[]
```

---

#### getAfterTriggers
Повертає всі AFTER тригери.

```typescript
getAfterTriggers(triggers: Trigger[]): Trigger[]
```

---

#### getInsteadRules
Повертає всі INSTEAD правила.

```typescript
getInsteadRules(rules: Rule[]): Rule[]
```

---

#### getAlsoRules
Повертає всі ALSO правила.

```typescript
getAlsoRules(rules: Rule[]): Rule[]
```

---

### Statistics

#### getTriggerStats
Повертає статистику тригерів.

```typescript
getTriggerStats(triggers: Trigger[]): TriggerStats

interface TriggerStats {
  total: number;
  enabled: number;
  disabled: number;
  beforeTriggers: number;
  afterTriggers: number;
}
```

**Приклад:**
```tsx
const stats = getTriggerStats(triggers);
// {
//   total: 6,
//   enabled: 4,
//   disabled: 2,
//   beforeTriggers: 3,
//   afterTriggers: 3
// }
```

---

#### getRuleStats
Повертає статистику правил.

```typescript
getRuleStats(rules: Rule[]): RuleStats

interface RuleStats {
  total: number;
  insteadRules: number;
  alsoRules: number;
}
```

---

#### isTriggerEnabled
Перевіряє чи тригер увімкнено.

```typescript
isTriggerEnabled(trigger: Trigger): boolean
```

---

#### getTriggerEventType
Витягує типи подій з тригера.

```typescript
getTriggerEventType(trigger: Trigger): string[]
```

**Приклад:**
```tsx
getTriggerEventType({ event: 'AFTER INSERT OR UPDATE', ... });
// ['INSERT', 'UPDATE']
```

---

### Unique Values

#### getUniqueTriggerTables
Повертає унікальні таблиці з тригерів.

```typescript
getUniqueTriggerTables(triggers: Trigger[]): string[]
```

**Приклад:**
```tsx
getUniqueTriggerTables(triggers);
// ['users', 'orders', 'products']
```

---

#### getUniqueRuleTables
Повертає унікальні таблиці з правил.

```typescript
getUniqueRuleTables(rules: Rule[]): string[]
```

---

### Lookup Functions

#### getTriggersByTable
Отримує всі тригери для таблиці.

```typescript
getTriggersByTable(triggers: Trigger[], tableName: string): Trigger[]
```

---

#### getRulesByTable
Отримує всі правила для таблиці.

```typescript
getRulesByTable(rules: Rule[], tableName: string): Rule[]
```

---

### Counting Functions

#### countTriggersPerTable
Підраховує тригери по таблицях.

```typescript
countTriggersPerTable(triggers: Trigger[]): Record<string, number>
```

**Приклад:**
```tsx
countTriggersPerTable(triggers);
// {
//   users: 2,
//   orders: 2,
//   products: 1,
//   user_sessions: 1
// }
```

---

#### countRulesPerTable
Підраховує правила по таблицях.

```typescript
countRulesPerTable(rules: Rule[]): Record<string, number>
```

---

### Search Functions

#### searchTriggers
Пошук тригерів за назвою, функцією або таблицею.

```typescript
searchTriggers(triggers: Trigger[], searchTerm: string): Trigger[]
```

**Приклад:**
```tsx
searchTriggers(triggers, 'email');
// Returns triggers with 'email' in name, function, or table
```

---

#### searchRules
Пошук правил за назвою, командою або таблицею.

```typescript
searchRules(rules: Rule[], searchTerm: string): Rule[]
```

---

### Sorting Functions

#### sortTriggersByName
Сортує тригери за назвою.

```typescript
sortTriggersByName(triggers: Trigger[], ascending: boolean = true): Trigger[]
```

---

#### sortTriggersByTable
Сортує тригери за таблицею.

```typescript
sortTriggersByTable(triggers: Trigger[], ascending: boolean = true): Trigger[]
```

---

#### sortRulesByName
Сортує правила за назвою.

```typescript
sortRulesByName(rules: Rule[], ascending: boolean = true): Rule[]
```

---

#### sortRulesByTable
Сортує правила за таблицею.

```typescript
sortRulesByTable(rules: Rule[], ascending: boolean = true): Rule[]
```

---

### Validation Functions

#### isValidTriggerName
Валідує назву тригера (PostgreSQL rules).

```typescript
isValidTriggerName(name: string): boolean
```

**Приклад:**
```tsx
isValidTriggerName('update_timestamp');  // true
isValidTriggerName('update-timestamp');  // false (dash not allowed)
isValidTriggerName('123_trigger');       // false (starts with number)
```

---

#### isValidRuleName
Валідує назву правила.

```typescript
isValidRuleName(name: string): boolean
```

---

### SQL Generation

#### generateCreateTriggerSQL
Генерує CREATE TRIGGER SQL.

```typescript
generateCreateTriggerSQL(trigger: Trigger): string
```

**Приклад:**
```tsx
const sql = generateCreateTriggerSQL({
  name: 'update_timestamp',
  table: 'users',
  event: 'BEFORE UPDATE',
  timing: 'BEFORE',
  function: 'update_timestamp()',
  enabled: true,
});

// CREATE TRIGGER update_timestamp
//   BEFORE UPDATE
//   ON users
//   FOR EACH ROW
//   EXECUTE FUNCTION update_timestamp();
```

---

#### generateCreateRuleSQL
Генерує CREATE RULE SQL.

```typescript
generateCreateRuleSQL(rule: Rule): string
```

**Приклад:**
```tsx
const sql = generateCreateRuleSQL({
  name: '_RETURN',
  table: 'user_view',
  event: 'INSERT',
  type: 'INSTEAD',
  command: 'DO INSTEAD INSERT INTO users ...',
});

// CREATE RULE _RETURN
//   AS ON INSERT
//   TO user_view
//   DO INSTEAD INSERT INTO users ...;
```

---

#### generateDropTriggerSQL
Генерує DROP TRIGGER SQL.

```typescript
generateDropTriggerSQL(trigger: Trigger): string
```

**Приклад:**
```tsx
generateDropTriggerSQL(trigger);
// DROP TRIGGER IF EXISTS update_timestamp ON users;
```

---

#### generateDropRuleSQL
Генерує DROP RULE SQL.

```typescript
generateDropRuleSQL(rule: Rule): string
```

---

#### generateEnableTriggerSQL
Генерує ALTER TRIGGER ENABLE SQL.

```typescript
generateEnableTriggerSQL(trigger: Trigger): string
```

**Приклад:**
```tsx
generateEnableTriggerSQL(trigger);
// ALTER TABLE users ENABLE TRIGGER update_timestamp;
```

---

#### generateDisableTriggerSQL
Генерує ALTER TRIGGER DISABLE SQL.

```typescript
generateDisableTriggerSQL(trigger: Trigger): string
```

---

### Formatting Functions

#### formatTriggerEvent
Форматує подію тригера для відображення.

```typescript
formatTriggerEvent(event: string): string
```

---

#### formatRuleCommand
Форматує команду правила (обрізає довгі команди).

```typescript
formatRuleCommand(command: string): string
```

**Приклад:**
```tsx
formatRuleCommand('DO INSTEAD INSERT INTO users (id, name) VALUES (1, "John")');
// 'DO INSTEAD INSERT INTO users (id, name) VALUES...'
```

---

#### getTriggerFunctionName
Витягує назву функції без дужок.

```typescript
getTriggerFunctionName(trigger: Trigger): string
```

**Приклад:**
```tsx
getTriggerFunctionName({ function: 'update_timestamp()', ... });
// 'update_timestamp'
```

---

### Check Functions

#### isTriggerOnTable
Перевіряє чи тригер прикріплений до таблиці.

```typescript
isTriggerOnTable(trigger: Trigger, tableName: string): boolean
```

---

#### isRuleOnTable
Перевіряє чи правило прикріплено до таблиці.

```typescript
isRuleOnTable(rule: Rule, tableName: string): boolean
```

---

### Aggregation Functions

#### getAllTriggerEvents
Повертає всі унікальні події з тригерів.

```typescript
getAllTriggerEvents(triggers: Trigger[]): string[]
```

**Приклад:**
```tsx
getAllTriggerEvents(triggers);
// ['BEFORE UPDATE', 'AFTER INSERT', 'BEFORE INSERT', 'AFTER DELETE']
```

---

#### getAllRuleEvents
Повертає всі унікальні події з правил.

```typescript
getAllRuleEvents(rules: Rule[]): string[]
```

---

### Grouping Functions

#### groupTriggersByTable
Групує тригери за таблицями.

```typescript
groupTriggersByTable(triggers: Trigger[]): Record<string, Trigger[]>
```

**Приклад:**
```tsx
groupTriggersByTable(triggers);
// {
//   users: [trigger1, trigger2],
//   orders: [trigger3, trigger4],
//   products: [trigger5]
// }
```

---

#### groupRulesByTable
Групує правила за таблицями.

```typescript
groupRulesByTable(rules: Rule[]): Record<string, Rule[]>
```

---

### Validation Functions

#### isValidEventType
Перевіряє чи тип події валідний.

```typescript
isValidEventType(event: string): boolean
```

**Приклад:**
```tsx
isValidEventType('INSERT');   // true
isValidEventType('UPDATE');   // true
isValidEventType('INVALID');  // false
```

---

#### parseTriggerEvent
Розбирає подію тригера на компоненти.

```typescript
parseTriggerEvent(event: string): {
  timing: 'BEFORE' | 'AFTER';
  operations: string[];
}
```

**Приклад:**
```tsx
parseTriggerEvent('AFTER INSERT OR UPDATE');
// {
//   timing: 'AFTER',
//   operations: ['INSERT', 'UPDATE']
// }
```

---

## 📦 Імпорт

### Компоненти
```typescript
import { TriggersTable, RulesTable } from './triggers-rules';
```

### Types
```typescript
import type {
  Trigger,
  Rule,
  TriggerEvent,
  RuleEvent,
  RuleType,
  TriggerStats,
  RuleStats,
} from './triggers-rules';
```

### Utils
```typescript
import {
  getEventBadgeColor,
  getRuleTypeBadgeColor,
  filterTriggersByTable,
  getTriggerStats,
  generateCreateTriggerSQL,
} from './triggers-rules';
```

### Data
```typescript
import { triggers, rules } from './triggers-rules/data';
```

---

## 🎨 Повний приклад

```typescript
import { useState } from 'react';
import { TriggersTable, RulesTable } from './triggers-rules';
import { triggers, rules } from './triggers-rules/data';
import type { Trigger, Rule } from './triggers-rules';

export default function TriggersRules({ selectedDatabase }) {
  const handleCreateTrigger = () => {
    console.log('Create trigger');
  };

  const handleEditTrigger = (trigger: Trigger) => {
    console.log('Edit trigger:', trigger.name);
  };

  const handleDeleteTrigger = (trigger: Trigger) => {
    console.log('Delete trigger:', trigger.name);
  };

  const handleCreateRule = () => {
    console.log('Create rule');
  };

  const handleEditRule = (rule: Rule) => {
    console.log('Edit rule:', rule.name);
  };

  const handleDeleteRule = (rule: Rule) => {
    console.log('Delete rule:', rule.name);
  };

  return (
    <div className="space-y-6">
      <TriggersTable
        triggers={triggers}
        selectedDatabase={selectedDatabase}
        onCreateTrigger={handleCreateTrigger}
        onEditTrigger={handleEditTrigger}
        onDeleteTrigger={handleDeleteTrigger}
      />

      <RulesTable
        rules={rules}
        onCreateRule={handleCreateRule}
        onEditRule={handleEditRule}
        onDeleteRule={handleDeleteRule}
      />
    </div>
  );
}
```

---

## 🎯 Особливості

### Trigger Management
- **Create** - Створення нових тригерів
- **Edit** - Редагування існуючих
- **Delete** - Видалення тригерів
- **Enable/Disable** - Увімкнення/вимкнення

### Trigger Information
- **Name** - Назва тригера
- **Table** - Таблиця прикріплення
- **Event** - Подія (INSERT/UPDATE/DELETE)
- **Function** - Функція виконання
- **Status** - Enabled/Disabled з Power icon

### Rule Management
- **Create** - Створення правил
- **Edit** - Редагування правил
- **Delete** - Видалення правил

### Rule Information
- **Name** - Назва правила
- **Table/View** - Таблиця або view
- **Event** - Подія (INSERT/UPDATE/DELETE/SELECT)
- **Type** - INSTEAD або ALSO

### Color Coding
- **INSERT** - Green badges
- **UPDATE** - Blue badges
- **DELETE** - Red badges
- **SELECT** - Purple badges
- **INSTEAD** - Orange badges
- **ALSO** - Teal badges

---

## 🔄 Інтеграція з API

### Приклад реальної інтеграції

```typescript
const TriggersRules = ({ selectedDatabase }) => {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    fetchTriggers();
    fetchRules();
  }, [selectedDatabase]);

  const fetchTriggers = async () => {
    const response = await fetch(
      `/api/databases/${selectedDatabase}/triggers`
    );
    const data = await response.json();
    setTriggers(data);
  };

  const fetchRules = async () => {
    const response = await fetch(
      `/api/databases/${selectedDatabase}/rules`
    );
    const data = await response.json();
    setRules(data);
  };

  const handleCreateTrigger = async () => {
    // Show create dialog
    // POST /api/databases/${selectedDatabase}/triggers
    await fetchTriggers(); // Refresh
  };

  const handleDeleteTrigger = async (trigger: Trigger) => {
    await fetch(
      `/api/databases/${selectedDatabase}/triggers/${trigger.name}`,
      { method: 'DELETE' }
    );
    await fetchTriggers();
  };

  return (
    <>
      <TriggersTable
        triggers={triggers}
        onCreateTrigger={handleCreateTrigger}
        onDeleteTrigger={handleDeleteTrigger}
      />
      <RulesTable rules={rules} />
    </>
  );
};
```

---

## 📊 Метрики

- **Компонентів:** 2
- **Утиліт:** 50+
- **Загальний розмір:** ~600 рядків коду
- **Середній розмір компонента:** ~90 рядків
- **Покриття TypeScript:** 100%
- **Тригерів у mock data:** 6
- **Правил у mock data:** 4

---

## 🔗 Пов'язані модулі

- [FunctionsManager](../FunctionsManager.tsx) - Function management
- [SchemasManager](../schemas/README.md) - Schema management
- [TableBrowser](../table-browser/README.md) - Table browsing

---

**Останнє оновлення:** 13 грудня 2025  
**Версія:** 1.0.0  
**Статус:** ✅ Готово до використання
