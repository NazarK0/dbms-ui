# Skeleton Компоненти

Skeleton компоненти використовуються для відображення placeholder контенту під час завантаження даних. Це покращує користувацький досвід, показуючи структуру контенту до його завантаження.

## Базовий Skeleton

### `Skeleton`

Базовий skeleton компонент з shadcn/ui.

**Приклад:**
```tsx
import { Skeleton } from './ui/skeleton';

<Skeleton className="h-4 w-full" />
<Skeleton className="h-8 w-32" />
<Skeleton className="h-12 w-12 rounded-full" />
```

## Card Skeletons

### `SkeletonCard`

Skeleton для стандартних карток з заголовком та контентом.

**Props:**
- `showHeader?: boolean` - Показувати заголовок (за замовчуванням: true)
- `contentLines?: number` - Кількість рядків контенту (за замовчуванням: 3)
- `showFooter?: boolean` - Показувати footer (за замовчуванням: false)
- `className?: string` - Додаткові CSS класи

**Приклад:**
```tsx
import { SkeletonCard } from './ui/skeleton-card';

<SkeletonCard 
  showHeader={true} 
  contentLines={5} 
  showFooter={true} 
/>
```

### `SkeletonStatCard`

Skeleton для статистичних карток (з іконкою, числом та описом).

**Приклад:**
```tsx
import { SkeletonStatCard } from './ui/skeleton-card';

<SkeletonStatCard />
```

### `SkeletonIconCard`

Skeleton для карток з іконкою та текстом.

**Приклад:**
```tsx
import { SkeletonIconCard } from './ui/skeleton-card';

<SkeletonIconCard />
```

### `SkeletonCardGrid`

Grid з skeleton карток.

**Props:**
- `count?: number` - Кількість карток (за замовчуванням: 4)
- `columns?: 2 | 3 | 4 | 5` - Кількість колонок (за замовчуванням: 4)
- `cardType?: 'default' | 'stat' | 'icon'` - Тип картки (за замовчуванням: 'default')
- `className?: string` - Додаткові CSS класи

**Приклад:**
```tsx
import { SkeletonCardGrid } from './ui/skeleton-card';

// Grid зі статистичними картками
<SkeletonCardGrid count={5} columns={5} cardType="stat" />

// Grid зі звичайними картками
<SkeletonCardGrid count={6} columns={3} cardType="default" />
```

## Table Skeletons

### `SkeletonTable`

Skeleton для повноцінних таблиць.

**Props:**
- `rows?: number` - Кількість рядків (за замовчуванням: 5)
- `columns?: number` - Кількість колонок (за замовчуванням: 4)
- `showCheckbox?: boolean` - Показувати checkbox колонку (за замовчуванням: false)
- `showActions?: boolean` - Показувати колонку дій (за замовчуванням: false)
- `className?: string` - Додаткові CSS класи

**Приклад:**
```tsx
import { SkeletonTable } from './ui/skeleton-table';

// Проста таблиця
<SkeletonTable rows={10} columns={5} />

// Таблиця з checkboxes та діями
<SkeletonTable 
  rows={8} 
  columns={6} 
  showCheckbox={true} 
  showActions={true} 
/>
```

### `SkeletonTableCompact`

Компактна версія skeleton таблиці (для списків).

**Приклад:**
```tsx
import { SkeletonTableCompact } from './ui/skeleton-table';

<SkeletonTableCompact rows={5} columns={3} />
```

### `SkeletonTableWithPagination`

Skeleton таблиці з пагінацією.

**Приклад:**
```tsx
import { SkeletonTableWithPagination } from './ui/skeleton-table';

<SkeletonTableWithPagination 
  rows={10} 
  columns={6} 
  showCheckbox={true} 
  showActions={true} 
/>
```

### `SkeletonGroupedTable`

Skeleton для таблиці з угрупованими даними.

**Props:**
- `groups?: number` - Кількість груп (за замовчуванням: 3)
- `rowsPerGroup?: number` - Рядків на групу (за замовчуванням: 3)
- `columns?: number` - Кількість колонок (за замовчуванням: 4)

**Приклад:**
```tsx
import { SkeletonGroupedTable } from './ui/skeleton-table';

<SkeletonGroupedTable groups={4} rowsPerGroup={5} columns={4} />
```

## List Skeletons

### `SkeletonList`

Skeleton для простих списків.

**Props:**
- `items?: number` - Кількість елементів (за замовчуванням: 5)
- `showAvatar?: boolean` - Показувати аватар/іконку (за замовчуванням: true)
- `showMeta?: boolean` - Показувати додаткову інформацію (за замовчуванням: true)
- `className?: string` - Додаткові CSS класи

**Приклад:**
```tsx
import { SkeletonList } from './ui/skeleton-list';

<SkeletonList items={8} showAvatar={true} showMeta={true} />
```

### `SkeletonListCard`

Skeleton для списку карток.

**Приклад:**
```tsx
import { SkeletonListCard } from './ui/skeleton-list';

<SkeletonListCard items={5} />
```

### `SkeletonSidebarMenu`

Skeleton для вертикального меню/sidebar.

**Props:**
- `items?: number` - Кількість елементів (за замовчуванням: 8)
- `showIcons?: boolean` - Показувати іконки (за замовчуванням: true)

**Приклад:**
```tsx
import { SkeletonSidebarMenu } from './ui/skeleton-list';

<SkeletonSidebarMenu items={10} showIcons={true} />
```

### `SkeletonTimeline`

Skeleton для timeline/activity feed.

**Приклад:**
```tsx
import { SkeletonTimeline } from './ui/skeleton-list';

<SkeletonTimeline items={6} />
```

### `SkeletonChipList`

Skeleton для horizontal scroll списку (теги, чіпси).

**Приклад:**
```tsx
import { SkeletonChipList } from './ui/skeleton-list';

<SkeletonChipList items={8} />
```

### `SkeletonTree`

Skeleton для дерева (файлова структура, категорії).

**Props:**
- `depth?: number` - Глибина дерева (за замовчуванням: 3)
- `itemsPerLevel?: number` - Елементів на рівень (за замовчуванням: 3)

**Приклад:**
```tsx
import { SkeletonTree } from './ui/skeleton-list';

<SkeletonTree depth={4} itemsPerLevel={4} />
```

## Chart Skeletons

### `SkeletonChart`

Skeleton для графіків та візуалізацій.

**Props:**
- `type?: 'line' | 'bar' | 'pie' | 'area'` - Тип графіка (за замовчуванням: 'line')
- `height?: number` - Висота графіка (за замовчуванням: 300)
- `showHeader?: boolean` - Показувати заголовок (за замовчуванням: true)
- `showLegend?: boolean` - Показувати легенду (за замовчуванням: true)
- `className?: string` - Додаткові CSS класи

**Приклад:**
```tsx
import { SkeletonChart } from './ui/skeleton-chart';

// Line chart
<SkeletonChart type="line" height={400} showHeader showLegend />

// Bar chart
<SkeletonChart type="bar" height={300} showLegend={false} />

// Pie chart
<SkeletonChart type="pie" height={350} />
```

### `SkeletonChartGrid`

Grid з кількома skeleton графіками.

**Props:**
- `charts?: number` - Кількість графіків (за замовчуванням: 2)
- `className?: string` - Додаткові CSS класи

**Приклад:**
```tsx
import { SkeletonChartGrid } from './ui/skeleton-chart';

<SkeletonChartGrid charts={3} />
```

### `SkeletonStatsRow`

Skeleton для статистичних індикаторів.

**Props:**
- `stats?: number` - Кількість статистик (за замовчуванням: 4)
- `className?: string` - Додаткові CSS класи

**Приклад:**
```tsx
import { SkeletonStatsRow } from './ui/skeleton-chart';

<SkeletonStatsRow stats={5} />
```

## Використання з даними

### Базовий патерн

```tsx
import { useState, useEffect } from 'react';
import { mockApiCall } from '../../utils/mockApi';
import { SkeletonTable } from '../ui/skeletons';
import { DataTable } from './DataTable';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    mockApiCall(myData, 'normal').then((result) => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <SkeletonTable rows={10} columns={5} />
  ) : (
    <DataTable data={data} />
  );
}
```

### Кілька секцій

```tsx
function Dashboard() {
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(true);

  return (
    <div className="space-y-6">
      {/* Stats */}
      {isLoadingStats ? (
        <SkeletonCardGrid count={4} columns={4} cardType="stat" />
      ) : (
        <StatsGrid data={stats} />
      )}

      {/* Table */}
      {isLoadingTable ? (
        <SkeletonTableWithPagination rows={10} columns={6} />
      ) : (
        <DataTable data={tableData} />
      )}
    </div>
  );
}
```

### Умовне відображення

```tsx
function DataGrid({ showChart, showTable }) {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <>
        {showChart && <SkeletonChart type="bar" />}
        {showTable && <SkeletonTable rows={5} columns={4} />}
      </>
    );
  }

  return (
    <>
      {showChart && <Chart data={chartData} />}
      {showTable && <Table data={tableData} />}
    </>
  );
}
```

## Best Practices

### 1. Підбирайте тип skeleton під ваш контент

```tsx
// ✅ Добре - skeleton відповідає реальному контенту
{isLoading ? (
  <SkeletonCardGrid count={5} columns={5} cardType="stat" />
) : (
  <StatsGrid stats={stats} /> // Grid з 5 статистичних карток
)}

// ❌ Погано - skeleton не відповідає реальному контенту
{isLoading ? (
  <SkeletonTable rows={3} columns={2} />
) : (
  <StatsGrid stats={stats} /> // Grid з карток, а не таблиця
)}
```

### 2. Використовуйте однакову кількість елементів

```tsx
// ✅ Добре
{isLoading ? (
  <SkeletonList items={10} />
) : (
  <UserList users={users} /> // Приблизно 10 користувачів
)}
```

### 3. Групуйте skeleton компоненти логічно

```tsx
// ✅ Добре - skeleton для всієї секції
{isLoadingDashboard ? (
  <>
    <SkeletonCardGrid count={4} columns={4} cardType="stat" />
    <SkeletonChart type="line" />
    <SkeletonTable rows={5} columns={4} />
  </>
) : (
  <Dashboard />
)}
```

### 4. Використовуйте skeleton для кожної асинхронної секції окремо

```tsx
// ✅ Добре - окремі loading states
<div className="space-y-6">
  {isLoadingStats ? (
    <SkeletonCardGrid count={4} columns={4} cardType="stat" />
  ) : (
    <StatsGrid stats={stats} />
  )}
  
  {isLoadingChart ? (
    <SkeletonChart type="bar" />
  ) : (
    <PerformanceChart data={chartData} />
  )}
</div>
```

## Центральний імпорт

Всі skeleton компоненти доступні через центральний експорт:

```tsx
import {
  Skeleton,
  SkeletonCard,
  SkeletonCardGrid,
  SkeletonStatCard,
  SkeletonIconCard,
  SkeletonTable,
  SkeletonTableCompact,
  SkeletonTableWithPagination,
  SkeletonGroupedTable,
  SkeletonList,
  SkeletonListCard,
  SkeletonSidebarMenu,
  SkeletonTimeline,
  SkeletonChipList,
  SkeletonTree,
  SkeletonChart,
  SkeletonChartGrid,
  SkeletonStatsRow,
} from './ui/skeletons';
```
