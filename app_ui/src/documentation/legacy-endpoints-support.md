# Legacy Endpoints Support

Цей документ містить повний список старих (legacy) endpoints, які продовжують підтримуватися для зворотної сумісності.

## 📋 Підтримувані Legacy Endpoints

### Database Management
```typescript
// Legacy format (slash-based)
mockApiCall('databases/list', {}, delay)

// Mapped to mock data
→ [...userDatabases, ...templateDatabases, ...adminDatabases]

// New format (recommended)
api.get(API.admin.databaseManager.userDatabases.list())
```

### Schema Management
```typescript
// Legacy
mockApiCall('schemas/list', { database: 'mydb' }, delay)

// Mapped to
→ schemas (from mockData/admin/schemas)

// New format
api.get(API.admin.databaseTools.schemas.list())
```

### Audit Log
```typescript
// Legacy: Statistics
mockApiCall('audit/statistics', {}, delay)

// Mapped to
→ auditStatistics = {
    totalEntries,
    successCount,
    failureCount,
    warningCount,
    uniqueUsers,
    categoriesCount
  }

// New format
api.get(API.admin.auditLog.stats())

// Legacy: Action Stats
mockApiCall('audit/action-stats', {}, delay)

// Mapped to
→ actionTypeStats = [
    { action: 'create', count: ... },
    { action: 'update', count: ... },
    ...
  ]

// New format
api.get(API.admin.auditLog.filters.actions())

// Legacy: Audit Logs
mockApiCall('audit/logs', {}, delay)

// Mapped to
→ auditEntries

// New format
api.get(API.admin.auditLog.entries.list())
```

### PostgreSQL Configuration
```typescript
// Legacy
mockApiCall('config/parameters', {}, delay)

// Mapped to
→ [
    ...memoryParams,
    ...connectionParams,
    ...walParams,
    ...autovacuumParams,
    ...loggingParams,
    ...performanceParams
  ]

// New format
api.get(API.admin.postgresConfig.parameters.all())
```

### Replica Clusters
```typescript
// Legacy: Stats
mockApiCall('replicas/stats', {}, delay)

// Mapped to
→ replicationStats

// New format
api.get(API.admin.replicaClusters.replication.stats())

// Legacy: Topology
mockApiCall('replicas/topology', {}, delay)

// Mapped to
→ { replicas }

// New format
api.get(API.admin.replicaClusters.replicas.list())

// Legacy: Clusters
mockApiCall('replicas/clusters', {}, delay)

// Mapped to
→ replicas

// New format
api.get(API.admin.replicaClusters.replicas.list())

// Legacy: Activity
mockApiCall('replicas/activity', {}, delay)

// Mapped to
→ replicationActivity

// New format
api.get(API.admin.replicaClusters.replication.activity())
```

### Server Logs
```typescript
// Legacy: Statistics
mockApiCall('logs/statistics', {}, delay)

// Mapped to (calculated)
→ {
    totalLogs,
    errorCount,
    warningCount,
    infoCount
  }

// New format
api.get(API.admin.logs.stats())

// Legacy: Logs List
mockApiCall('logs/list', {}, delay)

// Mapped to
→ logs

// New format
api.get(API.admin.logs.list())
```

## 🔧 Технічна реалізація

Legacy endpoints обробляються в функції `getMockDataForEndpoint()` у файлі `/utils/mockApi/mockApiCall.ts`:

```typescript
// Support for old slash-based format
if (endpoint.includes('/')) {
  const [module, action] = endpoint.split('/');
  
  switch (module) {
    case 'databases':
      // Handle databases/* endpoints
      break;
    case 'schemas':
      // Handle schemas/* endpoints
      break;
    // ... інші модулі
  }
}
```

## ⚠️ Deprecation Notice

Хоча legacy endpoints продовжують працювати, вони вважаються **застарілими** і можуть бути видалені в майбутніх версіях.

**Рекомендується:**
- Використовувати новий формат для всіх нових компонентів
- Поступово мігрувати існуючі компоненти
- Слідувати [Migration Guide](./api-migration-guide.md)

## 📊 Статистика використання

Для моніторингу використання legacy endpoints, можна включити логування:

```typescript
// В getMockDataForEndpoint()
if (endpoint.includes('/')) {
  console.warn(`[LEGACY] Using deprecated endpoint format: ${endpoint}`);
  console.warn(`[LEGACY] Consider migrating to new API format`);
  // ...
}
```

## 🎯 Переваги міграції

| Аспект | Legacy Format | New Format |
|--------|---------------|------------|
| **Type Safety** | ❌ Немає | ✅ Повна підтримка |
| **Autocomplete** | ❌ Немає | ✅ IDE підказки |
| **Single Source** | ❌ Розпорошено | ✅ Централізовано |
| **Error Handling** | ⚠️ Базова | ✅ Розширена |
| **Production Ready** | ⚠️ Потребує змін | ✅ Готово |
| **Documentation** | ⚠️ Обмежена | ✅ Повна |

## 🚀 Швидка міграція

Використовуйте цей шаблон для швидкої міграції:

**Крок 1: Search & Replace в компоненті**
```typescript
// Знайти всі
mockApiCall('

// І визначити які endpoints використовуються
```

**Крок 2: Замінити імпорти**
```typescript
// Видалити
import { mockApiCall } from '../../../utils/mockApi';
import { dataName } from '../../../mockData/...';

// Додати
import { API, api } from '../../../utils/api';
```

**Крок 3: Замінити виклики**
```typescript
// Використовувати таблицю вище для знаходження відповідного нового endpoint
```

## 📞 Підтримка

Якщо у вас виникли проблеми з міграцією:
1. Перевірте [Migration Guide](./api-migration-guide.md)
2. Подивіться [Example Component](../components/examples/ApiUsageExample.tsx)
3. Створіть issue з тегом `migration`

---

**Примітка:** Ця документація буде оновлюватися при додаванні нових legacy endpoints або видаленні підтримки старих.

**Остання ревізія:** December 2024
