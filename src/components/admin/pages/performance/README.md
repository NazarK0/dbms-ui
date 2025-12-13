# Performance Analyzer Components

Модульні компоненти для аналізу продуктивності PostgreSQL з моніторингом запитів, кешу та індексів через pg_stat_statements.

## 📁 Структура

```
performance/
├── PerformanceHeader.tsx       # Header з фільтрами та діями
├── CacheStatsCards.tsx         # Карточки статистики кешу
├── SlowQueriesAlert.tsx        # Alert про повільні запити
├── QueryStatsTable.tsx         # Таблиця статистики запитів
├── SlowQueriesCard.tsx         # Карточка з повільними запитами
├── IndexUsageTable.tsx         # Таблиця використання індексів
├── utils.ts                    # Допоміжні функції
├── index.ts                    # Центральний експорт
└── README.md                   # Ця документація
```

## 🧩 Компоненти

### PerformanceHeader
Header з назвою, описом, селектором часового діапазону та кнопками дій.

**Props:**
```typescript
interface PerformanceHeaderProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
}
```

**Використання:**
```tsx
<PerformanceHeader
  timeRange="1h"
  onTimeRangeChange={setTimeRange}
  onRefresh={handleRefresh}
  onExport={handleExport}
/>
```

**Часові діапазони:**
- `15m` - Останні 15 хвилин
- `1h` - Остання година
- `24h` - Останні 24 години
- `7d` - Останні 7 днів

**Кнопки:**
- **Оновити** (RefreshCw) - опціонально
- **Експорт звіту** (Download) - опціонально

---

### CacheStatsCards
Сітка карточок з метриками кешу та трендами.

**Props:**
```typescript
interface CacheStatsCardsProps {
  stats: CacheStat[];
}

interface CacheStat {
  metric: string;
  value: string;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}
```

**Використання:**
```tsx
<CacheStatsCards stats={cacheStats} />
```

**Особливості:**
- 4-колонкова сітка (responsive: 1/2/4)
- Індикатори трендів (TrendingUp/TrendingDown)
- Кольорові тренди:
  - ↑ Зелений (up)
  - ↓ Червоний (down)
  - → Сірий (stable)
- Progress bar для відсотків

**Приклад даних:**
```typescript
const cacheStats = [
  {
    metric: 'Cache Hit Ratio',
    value: '98.5%',
    percentage: 98.5,
    trend: 'up',
  },
  // ...
];
```

---

### SlowQueriesAlert
Alert, що попереджає про повільні запити.

**Props:**
```typescript
interface SlowQueriesAlertProps {
  count: number;
}
```

**Використання:**
```tsx
<SlowQueriesAlert count={slowQueryDetails.length} />
```

**Особливості:**
- Автоматично ховається якщо `count === 0`
- Жовтий фон з іконкою AlertCircle
- Показує кількість повільних запитів

---

### QueryStatsTable
Детальна таблиця статистики виконання SQL запитів.

**Props:**
```typescript
interface QueryStatsTableProps {
  stats: QueryStat[];
  sortBy: string;
  onSortByChange: (value: string) => void;
}

interface QueryStat {
  query: string;
  calls: number;
  totalTime: string;
  avgTime: string;
  minTime: string;
  maxTime: string;
  rows: number;
  hitRatio: number;
}
```

**Використання:**
```tsx
<QueryStatsTable
  stats={queryStats}
  sortBy="total_time"
  onSortByChange={setSortBy}
/>
```

**Колонки:**
1. **Запит** - SQL код (line-clamp-2)
2. **Виклики** - Badge з кількістю
3. **Загальний час** - Badge з purple кольором
4. **Середній час** - Monospace шрифт
5. **Мін/Макс** - Діапазон часу
6. **Рядки** - Кількість повернутих рядків
7. **Попадання кешу** - Progress bar + відсоток

**Сортування:**
- `total_time` - За загальним часом
- `avg_time` - За середнім часом
- `calls` - За кількістю викликів
- `hit_ratio` - За коефіцієнтом попадань

---

### SlowQueriesCard
Карточка з повільними запитами та рекомендаціями з оптимізації.

**Props:**
```typescript
interface SlowQueriesCardProps {
  queries: SlowQueryDetail[];
}

interface SlowQueryDetail {
  query: string;
  avgTime: string;
  calls: string;
  impact: 'Висока' | 'Середня' | 'Низька';
  recommendation: string;
}
```

**Використання:**
```tsx
<SlowQueriesCard queries={slowQueryDetails} />
```

**Структура кожного запиту:**
```
┌─────────────────────────────────────────┐
│ SQL Code (white bg, monospace)          │
│ ├─ Badge: Середній час                  │
│ └─ Badge: Кількість викликів             │
│                            [Impact Badge] │
├─────────────────────────────────────────┤
│ 💡 Alert: Рекомендація (blue bg)        │
└─────────────────────────────────────────┘
```

**Impact badges:**
- **Висока** → `destructive` (червоний)
- **Середня** → `default` (сірий)
- **Низька** → `secondary` (світло-сірий)

**Рекомендації містять:**
- Створення індексів
- Оптимізація JOIN
- Перевірка EXPLAIN ANALYZE
- Зміна структури запиту

---

### IndexUsageTable
Таблиця статистики використання індексів.

**Props:**
```typescript
interface IndexUsageTableProps {
  indexes: IndexUsage[];
}

interface IndexUsage {
  table: string;
  index: string;
  scans: number;
  rowsRead: number;
  usage: number;
  size: string;
}
```

**Використання:**
```tsx
<IndexUsageTable indexes={indexUsage} />
```

**Колонки:**
1. **Таблиця** - Назва таблиці
2. **Індекс** - Назва індексу (code element)
3. **Сканування** - Кількість скануань
4. **Прочитано рядків** - Кількість рядків
5. **Використання** - Progress bar + відсоток
6. **Розмір** - Розмір індексу
7. **Статус** - Badge якщо не використовується

**Індикатор невикористання:**
- Якщо `usage < 10%` → жовтий badge "Не використовується"
- Допомагає виявити надлишкові індекси

---

## 🛠️ Утиліти (utils.ts)

### getImpactVariant
Повертає variant badge на основі важливості.

```typescript
getImpactVariant(impact: string): 'destructive' | 'default' | 'secondary'
```

**Приклад:**
```tsx
const variant = getImpactVariant('Висока'); // 'destructive'
<Badge variant={variant}>Висока важливість</Badge>
```

---

### getTrendColor
Повертає клас кольору для тренду.

```typescript
getTrendColor(trend: 'up' | 'down' | 'stable'): string
```

**Приклад:**
```tsx
const color = getTrendColor('up'); // 'text-green-600'
<TrendingUp className={color} />
```

---

### formatDuration
Форматує мілісекунди у читабельний формат.

```typescript
formatDuration(milliseconds: number): string
```

**Приклад:**
```tsx
formatDuration(500);      // "500.00ms"
formatDuration(2000);     // "2.00s"
formatDuration(120000);   // "2.00m"
```

---

### getTimeRangeLabel
Перетворює значення часового діапазону в мітку.

```typescript
getTimeRangeLabel(timeRange: string): string
```

**Приклад:**
```tsx
getTimeRangeLabel('1h');   // "Остання година"
getTimeRangeLabel('24h');  // "Останні 24 години"
```

---

### calculateHitRatio
Обчислює відсоток попадань в кеш.

```typescript
calculateHitRatio(hits: number, misses: number): number
```

**Приклад:**
```tsx
calculateHitRatio(980, 20); // 98 (%)
```

---

### formatLargeNumber
Форматує великі числа з суфіксом K/M/B.

```typescript
formatLargeNumber(num: number): string
```

**Приклад:**
```tsx
formatLargeNumber(1500);       // "1.5K"
formatLargeNumber(2500000);    // "2.5M"
formatLargeNumber(3000000000); // "3.0B"
```

---

### isUnderutilizedIndex
Перевіряє, чи індекс недовикористовується.

```typescript
isUnderutilizedIndex(usage: number, threshold?: number): boolean
```

**Приклад:**
```tsx
isUnderutilizedIndex(5);    // true (< 10%)
isUnderutilizedIndex(15);   // false
isUnderutilizedIndex(5, 3); // false (custom threshold)
```

---

### getPerformanceStatus
Визначає статус продуктивності на основі hit ratio.

```typescript
getPerformanceStatus(hitRatio: number): {
  status: 'excellent' | 'good' | 'fair' | 'poor';
  label: string;
  color: string;
}
```

**Приклад:**
```tsx
const status = getPerformanceStatus(98);
// { status: 'excellent', label: 'Відмінно', color: 'green' }
```

**Пороги:**
- ≥ 95% → Відмінно (зелений)
- ≥ 85% → Добре (синій)
- ≥ 70% → Задовільно (жовтий)
- < 70% → Погано (червоний)

---

### sortQueryStats
Сортує статистику запитів за вибраною метрикою.

```typescript
sortQueryStats<T>(stats: T[], sortBy: string): T[]
```

**Приклад:**
```tsx
const sorted = sortQueryStats(queryStats, 'total_time');
// Відсортовано за загальним часом (від більшого до меншого)
```

---

### exportPerformanceReport
Експортує звіт продуктивності у JSON.

```typescript
exportPerformanceReport(data: {
  timeRange: string;
  queryStats: any[];
  slowQueries: any[];
  cacheStats: any[];
  indexUsage: any[];
}): void
```

**Приклад:**
```tsx
<Button onClick={() => exportPerformanceReport({ ... })}>
  Експорт звіту
</Button>
```

**Структура звіту:**
```json
{
  "generatedAt": "2025-12-13T12:00:00.000Z",
  "timeRange": "Остання година",
  "summary": {
    "totalQueries": 15,
    "slowQueries": 3,
    "avgCacheHitRatio": 98.5
  },
  "queryStats": [...],
  "slowQueries": [...],
  "cacheStats": [...],
  "indexUsage": [...]
}
```

---

### getRecommendationPriority
Повертає числовий пріоритет рекомендації.

```typescript
getRecommendationPriority(impact: string): number
```

**Приклад:**
```tsx
getRecommendationPriority('Висока');   // 1
getRecommendationPriority('Середня');  // 2
getRecommendationPriority('Низька');   // 3
```

**Використання для сортування:**
```tsx
const sorted = recommendations.sort((a, b) => 
  getRecommendationPriority(a.impact) - getRecommendationPriority(b.impact)
);
```

---

### filterSlowQueries
Фільтрує запити за мінімальним порогом часу.

```typescript
filterSlowQueries<T>(queries: T[], thresholdMs?: number): T[]
```

**Приклад:**
```tsx
const slow = filterSlowQueries(allQueries, 100);
// Тільки запити з avgTime >= 100ms
```

---

## 📦 Імпорт

### Окремі компоненти
```typescript
import { 
  PerformanceHeader,
  CacheStatsCards,
  SlowQueriesAlert,
  QueryStatsTable,
  SlowQueriesCard,
  IndexUsageTable
} from './performance';
```

### Утиліти
```typescript
import { 
  getImpactVariant,
  getTrendColor,
  formatDuration,
  calculateHitRatio,
  exportPerformanceReport
} from './performance';
```

---

## 🎨 Приклад використання

### Повний приклад головного компонента

```typescript
import { useState } from 'react';
import { queryStats, slowQueryDetails, cacheStats, indexUsage } from '../../../mockData/admin';
import {
  PerformanceHeader,
  CacheStatsCards,
  SlowQueriesAlert,
  QueryStatsTable,
  SlowQueriesCard,
  IndexUsageTable,
  exportPerformanceReport,
} from './performance';

export default function PerformanceAnalyzer() {
  const [timeRange, setTimeRange] = useState('1h');
  const [sortBy, setSortBy] = useState('total_time');

  const handleRefresh = () => {
    console.log('Refreshing performance data...');
  };

  const handleExport = () => {
    exportPerformanceReport({
      timeRange,
      queryStats,
      slowQueries: slowQueryDetails,
      cacheStats,
      indexUsage,
    });
  };

  return (
    <div className="space-y-6">
      <PerformanceHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      <CacheStatsCards stats={cacheStats} />

      <SlowQueriesAlert count={slowQueryDetails.length} />

      <QueryStatsTable
        stats={queryStats}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      <SlowQueriesCard queries={slowQueryDetails} />

      <IndexUsageTable indexes={indexUsage} />
    </div>
  );
}
```

---

## 🎯 Особливості

### pg_stat_statements Integration
Компоненти розроблені для роботи з PostgreSQL extension `pg_stat_statements`:
- Query performance tracking
- Execution statistics
- Cache hit ratios
- Index usage patterns

### Performance Insights
- **Cache Stats** - Моніторинг ефективності кешу
- **Slow Queries** - Виявлення проблемних запитів
- **Query Stats** - Детальна статистика виконання
- **Index Usage** - Оптимізація індексів

### Actionable Recommendations
Кожен повільний запит супроводжується:
- Оцінкою важливості (impact level)
- Конкретною рекомендацією
- Інформацією про кількість викликів
- Середнім часом виконання

### Export Capability
- JSON формат звіту
- Timestamp генерації
- Summary metrics
- Повна статистика

---

## 🔄 Інтеграція з API

### Приклад реальної інтеграції

```typescript
const PerformanceAnalyzer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPerformanceData = async (timeRange: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/performance?range=${timeRange}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanceData(timeRange);
  }, [timeRange]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PerformanceHeader
        timeRange={timeRange}
        onTimeRangeChange={(range) => {
          setTimeRange(range);
          fetchPerformanceData(range);
        }}
        onRefresh={() => fetchPerformanceData(timeRange)}
        onExport={handleExport}
      />
      {/* Rest of components */}
    </div>
  );
};
```

---

## 🚀 Майбутні покращення

### Заплановані функції
- [ ] Real-time updates via WebSocket
- [ ] Query plan visualization (EXPLAIN ANALYZE)
- [ ] Performance alerts and notifications
- [ ] Historical trend charts
- [ ] Query comparison tool
- [ ] Automatic index recommendations
- [ ] Query rewrite suggestions
- [ ] Performance regression detection

### Оптимізації
- [ ] Virtual scrolling for large datasets
- [ ] Lazy loading tabs
- [ ] Data caching strategy
- [ ] Progressive loading
- [ ] Search and filtering

---

## 📊 Метрики

- **Компонентів:** 6
- **Утиліт:** 11
- **Загальний розмір:** ~550 рядків коду
- **Середній розмір компонента:** ~70 рядків
- **Покриття TypeScript:** 100%
- **Mock data types:** 4

---

## 🔗 Пов'язані модулі

- [QueryExecutor](../QueryExecutor.tsx) - Виконання SQL запитів
- [SystemMonitor](../SystemMonitor.tsx) - Системний моніторинг
- [DatabaseOverview](../../DatabaseOverview.tsx) - Огляд БД

---

**Останнє оновлення:** 13 грудня 2025  
**Версія:** 1.0.0  
**Статус:** ✅ Готово до використання
