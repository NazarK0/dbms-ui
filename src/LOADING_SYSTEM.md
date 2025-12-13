# Система завантаження даних з Mock API та Skeleton компонентами

## 📋 Огляд

Система включає в себе два основних компоненти:

1. **Mock API утиліти** (`/utils/mockApi.ts`) - Імітація backend запитів з реалістичними затримками
2. **Skeleton компоненти** (`/components/ui/skeleton-*.tsx`) - Placeholder компоненти для відображення під час завантаження

## 🚀 Швидкий старт

### 1. Імпорт необхідних модулів

```typescript
import { useState, useEffect } from 'react';
import { mockApiCall } from '../utils/mockApi';
import { SkeletonTable, SkeletonCardGrid } from '../ui/skeletons';
```

### 2. Створіть loading state

```typescript
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState([]);
```

### 3. Завантажте дані з затримкою

```typescript
useEffect(() => {
  mockApiCall(myData, 'normal').then((result) => {
    setData(result);
    setIsLoading(false);
  });
}, []);
```

### 4. Відобразіть skeleton під час завантаження

```typescript
return isLoading ? (
  <SkeletonTable rows={10} columns={5} />
) : (
  <DataTable data={data} />
);
```

## 📦 Що було додано

### Файли

```
/utils/
├── mockApi.ts           # Mock API утиліти
└── README.md            # Документація Mock API

/components/ui/
├── skeleton-card.tsx    # Skeleton компоненти для карток
├── skeleton-table.tsx   # Skeleton компоненти для таблиць
├── skeleton-list.tsx    # Skeleton компоненти для списків
├── skeleton-chart.tsx   # Skeleton компоненти для графіків
├── skeletons.tsx        # Центральний експорт
└── SKELETONS.md         # Документація Skeleton компонентів

/components/examples/
└── LoadingExample.tsx   # Приклад використання
```

### Оновлені компоненти

**Admin панель:**
- ✅ `/components/admin/pages/Dashboard.tsx`
- ✅ `/components/admin/pages/UsersManager.tsx`
- ✅ `/components/admin/pages/SystemMonitor.tsx`
- ✅ `/components/admin/pages/PerformanceAnalyzer.tsx`
- ✅ `/components/admin/pages/RolesManager.tsx`

**User інтерфейс:**
- ✅ `/components/user/UserDashboard.tsx`
- ✅ `/components/user/DatabaseBrowser.tsx`

## 🎨 Доступні Skeleton компоненти

### Cards
- `SkeletonCard` - Стандартна картка
- `SkeletonStatCard` - Статистична картка
- `SkeletonIconCard` - Картка з іконкою
- `SkeletonCardGrid` - Grid з карток

### Tables
- `SkeletonTable` - Повноцінна таблиця
- `SkeletonTableCompact` - Компактна таблиця
- `SkeletonTableWithPagination` - Таблиця з пагінацією
- `SkeletonGroupedTable` - Угрупована таблиця

### Lists
- `SkeletonList` - Простий список
- `SkeletonListCard` - Список карток
- `SkeletonSidebarMenu` - Sidebar меню
- `SkeletonTimeline` - Timeline/activity feed
- `SkeletonChipList` - Список чіпів/тегів
- `SkeletonTree` - Деревоподібна структура

### Charts
- `SkeletonChart` - Окремий графік (line, bar, pie, area)
- `SkeletonChartGrid` - Grid з графіків
- `SkeletonStatsRow` - Ряд статистик

## 🔧 Mock API функції

### Основні

- `mockApiCall(data, delayType, successRate)` - Базовий API запит
- `mockPaginatedApiCall(data, page, pageSize, delayType)` - Пагінований запит
- `mockMutationApiCall(data, delayType, successRate)` - Створення/оновлення
- `mockDeleteApiCall(id, delayType, successRate)` - Видалення
- `mockProgressApiCall(onProgress, duration, interval)` - Прогрес операції
- `mockBatchApiCall(requests)` - Batch запит

### Типи затримок

- `fast` - 200-500ms (статистика, проста інформація)
- `normal` - 500-1200ms (списки, таблиці)
- `slow` - 1200-2500ms (аналітика, звіти)
- `verySlow` - 2500-5000ms (backup, export, import)

## 💡 Приклади використання

### Простий компонент

```typescript
function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    mockApiCall(mockData, 'normal').then((result) => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? <SkeletonTable rows={5} /> : <Table data={data} />;
}
```

### Кілька секцій

```typescript
function Dashboard() {
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingChart, setIsLoadingChart] = useState(true);

  useEffect(() => {
    mockApiCall(statsData, 'fast').then((data) => {
      setStats(data);
      setIsLoadingStats(false);
    });

    mockApiCall(chartData, 'normal').then((data) => {
      setChart(data);
      setIsLoadingChart(false);
    });
  }, []);

  return (
    <>
      {isLoadingStats ? (
        <SkeletonCardGrid count={4} columns={4} cardType="stat" />
      ) : (
        <StatsGrid stats={stats} />
      )}

      {isLoadingChart ? (
        <SkeletonChart type="bar" />
      ) : (
        <Chart data={chartData} />
      )}
    </>
  );
}
```

### Паралельне завантаження

```typescript
useEffect(() => {
  Promise.all([
    mockApiCall(users, 'normal'),
    mockApiCall(roles, 'normal'),
    mockApiCall(permissions, 'fast'),
  ]).then(([usersData, rolesData, permissionsData]) => {
    setUsers(usersData);
    setRoles(rolesData);
    setPermissions(permissionsData);
    setIsLoading(false);
  });
}, []);
```

### Обробка помилок

```typescript
try {
  const data = await mockApiCall(myData, 'normal', 0.95);
  setData(data);
} catch (error) {
  toast.error('Помилка завантаження даних');
  console.error(error);
}
```

### Оновлення даних

```typescript
const handleRefresh = async () => {
  setIsRefreshing(true);
  
  try {
    const newData = await mockApiCall(data, 'fast');
    setData(newData);
    toast.success('Дані оновлено');
  } catch (error) {
    toast.error('Помилка оновлення');
  } finally {
    setIsRefreshing(false);
  }
};
```

### Прогрес операції

```typescript
const [progress, setProgress] = useState(0);

const handleBackup = async () => {
  await mockProgressApiCall(
    (progress) => setProgress(progress),
    5000,  // 5 секунд
    200    // оновлення кожні 200ms
  );
  toast.success('Backup завершено!');
};

// В компоненті
<Progress value={progress} />
```

## 📚 Документація

- **Mock API**: `/utils/README.md`
- **Skeleton компоненти**: `/components/ui/SKELETONS.md`
- **Приклад використання**: `/components/examples/LoadingExample.tsx`

## ✅ Best Practices

### 1. Окремі loading states для секцій

```typescript
// ✅ Добре
const [isLoadingStats, setIsLoadingStats] = useState(true);
const [isLoadingTable, setIsLoadingTable] = useState(true);

// ❌ Погано
const [isLoading, setIsLoading] = useState(true);
```

### 2. Підбирайте skeleton під контент

```typescript
// ✅ Добре
{isLoading ? (
  <SkeletonCardGrid count={5} columns={5} cardType="stat" />
) : (
  <StatsGrid stats={stats} /> // 5 статистичних карток
)}
```

### 3. Обробляйте помилки

```typescript
// ✅ Добре
try {
  const data = await mockApiCall(myData, 'normal');
  setData(data);
} catch (error) {
  toast.error('Помилка завантаження');
}
```

### 4. Використовуйте правильні типи затримок

```typescript
// ✅ Добре
mockApiCall(stats, 'fast');        // Швидкі дані
mockApiCall(tableData, 'normal');  // Таблиці
mockApiCall(analytics, 'slow');    // Аналітика
mockApiCall(backup, 'verySlow');   // Backup операції
```

### 5. Групуйте паралельні запити

```typescript
// ✅ Добре
Promise.all([
  mockApiCall(users, 'normal'),
  mockApiCall(roles, 'normal'),
]).then(([users, roles]) => {
  // Обробка
});

// ❌ Погано
const users = await mockApiCall(usersData, 'normal');
const roles = await mockApiCall(rolesData, 'normal'); // Чекає першого
```

## 🎯 Наступні кроки

Для додавання skeleton компонентів до інших сторінок:

1. Імпортуйте `mockApiCall` та відповідні skeleton компоненти
2. Додайте loading states для кожної секції
3. Замініть прямі присвоєння даних на `mockApiCall`
4. Додайте умовне відображення skeleton/контенту
5. Обробіть помилки з toast повідомленнями

**Сторінки що можна оновити:**
- `/components/admin/pages/DatabaseManager.tsx`
- `/components/admin/pages/AuditLog.tsx`
- `/components/admin/pages/CLI.tsx`
- `/components/admin/pages/PostgresConfig.tsx`
- `/components/admin/pages/ReplicaClusters.tsx`
- `/components/user/UserProfile.tsx`
- `/components/user/TableDataEditor.tsx`

## 📞 Підтримка

Для питань та проблем:
- Перегляньте документацію в `/utils/README.md` та `/components/ui/SKELETONS.md`
- Дивіться приклад в `/components/examples/LoadingExample.tsx`
- Вивчайте оновлені компоненти як референс
