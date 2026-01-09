# API Migration Guide

Цей документ описує міграцію зі старого формату API endpoints на новий централізований підхід.

## 🔄 Зворотна сумісність

**Хороші новини!** Система підтримує **зворотну сумісність** з існуючим кодом. Старі формати endpoints продовжують працювати:

```typescript
// ✅ Старий формат - працює
mockApiCall('databases/list', {}, 900);
mockApiCall('schemas/list', { database: 'mydb' }, 700);
mockApiCall('audit/logs', {}, 1200);

// ✅ Новий формат - рекомендується
api.get(API.admin.databaseManager.userDatabases.list());
api.get(API.admin.databaseTools.schemas.list());
api.get(API.admin.auditLog.entries.list());
```

## 📋 Таблиця міграції endpoints

### Database Manager

| Старий формат | Новий формат |
|---------------|--------------|
| `mockApiCall('databases/list', {}, delay)` | `api.get(API.admin.databaseManager.userDatabases.list())` |

### Database Tools

| Старий формат | Новий формат |
|---------------|--------------|
| `mockApiCall('schemas/list', {}, delay)` | `api.get(API.admin.databaseTools.schemas.list())` |

### Audit Log

| Старий формат | Новий формат |
|---------------|--------------|
| `mockApiCall('audit/statistics', {}, delay)` | `api.get(API.admin.auditLog.stats())` |
| `mockApiCall('audit/action-stats', {}, delay)` | `api.get(API.admin.auditLog.filters.actions())` |
| `mockApiCall('audit/logs', {}, delay)` | `api.get(API.admin.auditLog.entries.list())` |

### PostgreSQL Config

| Старий формат | Новий формат |
|---------------|--------------|
| `mockApiCall('config/parameters', {}, delay)` | `api.get(API.admin.postgresConfig.parameters.all())` |

### Replica Clusters

| Старий формат | Новий формат |
|---------------|--------------|
| `mockApiCall('replicas/stats', {}, delay)` | `api.get(API.admin.replicaClusters.replication.stats())` |
| `mockApiCall('replicas/topology', {}, delay)` | `api.get(API.admin.replicaClusters.replicas.list())` |
| `mockApiCall('replicas/clusters', {}, delay)` | `api.get(API.admin.replicaClusters.replicas.list())` |
| `mockApiCall('replicas/activity', {}, delay)` | `api.get(API.admin.replicaClusters.replication.activity())` |

### Logs

| Старий формат | Новий формат |
|---------------|--------------|
| `mockApiCall('logs/statistics', {}, delay)` | `api.get(API.admin.logs.stats())` |
| `mockApiCall('logs/list', {}, delay)` | `api.get(API.admin.logs.list())` |

## 🚀 Рекомендований процес міграції

### Крок 1: Імпортуйте API utilities

**Було:**
```typescript
import { mockApiCall } from '../../../utils/mockApi';
import { userDatabases } from '../../../mockData/admin/databases';
```

**Стало:**
```typescript
import { API, api } from '../../../utils/api';
```

### Крок 2: Замініть mockApiCall на api.get

**Було:**
```typescript
useEffect(() => {
  mockApiCall('databases/list', {}, 900).then((data) => {
    setDatabases(userDatabases);
    setIsLoading(false);
  });
}, []);
```

**Стало:**
```typescript
useEffect(() => {
  loadDatabases();
}, []);

const loadDatabases = async () => {
  try {
    const data = await api.get(API.admin.databaseManager.userDatabases.list());
    setDatabases(data);
  } catch (error) {
    console.error('Error loading databases:', error);
  } finally {
    setIsLoading(false);
  }
};
```

### Крок 3: Видаліть прямі імпорти mockData

**Було:**
```typescript
import { userDatabases, templateDatabases } from '../../../mockData/admin/databases';
import { schemas } from '../../../mockData/admin/schemas';

// Використання в коді
setDatabases(userDatabases);
setSchemas(schemas);
```

**Стало:**
```typescript
// Дані завантажуються через API
const databases = await api.get(API.admin.databaseManager.userDatabases.list());
const schemas = await api.get(API.admin.databaseTools.schemas.list());

setDatabases(databases);
setSchemas(schemas);
```

## 📝 Приклади міграції компонентів

### Приклад 1: DatabaseManager.tsx

**Було:**
```typescript
import { useState, useEffect } from 'react';
import { mockApiCall } from '../../../utils/mockApi';
import { userDatabases } from '../../../mockData/admin/databases';

export default function DatabaseManager() {
  const [databases, setDatabases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mockApiCall('databases/list', {}, 900).then(() => {
      setDatabases(userDatabases);
      setIsLoading(false);
    });
  }, []);

  // ...
}
```

**Стало:**
```typescript
import { useState, useEffect } from 'react';
import { API, api } from '../../../utils/api';

export default function DatabaseManager() {
  const [databases, setDatabases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDatabases();
  }, []);

  const loadDatabases = async () => {
    try {
      const data = await api.get(API.admin.databaseManager.userDatabases.list());
      setDatabases(data);
    } catch (error) {
      console.error('Error loading databases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ...
}
```

### Приклад 2: AuditLog.tsx

**Було:**
```typescript
import { useState, useEffect } from 'react';
import { mockApiCall } from '../../../utils/mockApi';
import { auditEntries } from '../../../mockData/admin/auditLog';

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [actionStats, setActionStats] = useState([]);

  useEffect(() => {
    mockApiCall('audit/statistics', {}, 800).then(() => {
      setStatistics(calculateStatistics(auditEntries));
    });

    mockApiCall('audit/action-stats', {}, 1000).then(() => {
      setActionStats(calculateActionTypeStats(auditEntries));
    });

    mockApiCall('audit/logs', {}, 1200).then(() => {
      setLogs(auditEntries);
    });
  }, []);

  // ...
}
```

**Стало:**
```typescript
import { useState, useEffect } from 'react';
import { API, api } from '../../../utils/api';

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [actionStats, setActionStats] = useState([]);

  useEffect(() => {
    loadAuditData();
  }, []);

  const loadAuditData = async () => {
    try {
      // Паралельні запити
      const [stats, actions, entries] = await Promise.all([
        api.get(API.admin.auditLog.stats()),
        api.get(API.admin.auditLog.filters.actions()),
        api.get(API.admin.auditLog.entries.list()),
      ]);

      setStatistics(stats);
      setActionStats(actions);
      setLogs(entries);
    } catch (error) {
      console.error('Error loading audit data:', error);
    }
  };

  // ...
}
```

### Приклад 3: ReplicaClusters.tsx

**Було:**
```typescript
useEffect(() => {
  mockApiCall('replicas/stats', {}, 800).then((data) => {
    setStats(replicationStats);
  });

  mockApiCall('replicas/topology', {}, 1100).then((data) => {
    // ...
  });

  mockApiCall('replicas/clusters', {}, 1000).then((data) => {
    setClusters(initialClusters);
  });

  mockApiCall('replicas/activity', {}, 1200).then((data) => {
    setActivity(replicationActivity);
  });
}, []);
```

**Стало:**
```typescript
useEffect(() => {
  loadReplicaData();
}, []);

const loadReplicaData = async () => {
  try {
    const [stats, replicas, activity] = await Promise.all([
      api.get(API.admin.replicaClusters.replication.stats()),
      api.get(API.admin.replicaClusters.replicas.list()),
      api.get(API.admin.replicaClusters.replication.activity()),
    ]);

    setStats(stats);
    setClusters(replicas);
    setActivity(activity);
  } catch (error) {
    console.error('Error loading replica data:', error);
  }
};
```

## ✅ Переваги нового підходу

### 1. **Type Safety**
```typescript
// ❌ Старий спосіб - легко зробити помилку
mockApiCall('databses/list', {}, 900); // Typo!

// ✅ Новий спосіб - TypeScript підказує
api.get(API.admin.databaseManager.userDatabases.list());
//     ^-- Autocomplete працює!
```

### 2. **Single Source of Truth**
- Всі endpoints в одному файлі `api-endpoints.json`
- Легко знайти та оновити endpoints
- Зміна URL в одному місці оновлює весь проект

### 3. **Automatic Mock/Real API**
```typescript
// Development mode - використовує mock дані
const data = await api.get(endpoint); // → mockData/

// Production mode - справжні HTTP запити
const data = await api.get(endpoint); // → GET /api/...
```

### 4. **Better Error Handling**
```typescript
// Вбудована обробка помилок
try {
  const data = await api.get(endpoint);
} catch (error) {
  // Централізована обробка
}
```

### 5. **Easier Testing**
```typescript
// Mock API client для тестів
import { apiClient } from '../utils/api';

jest.mock('../utils/api', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));
```

## 🎯 Чек-лист міграції

Для кожного компонента:

- [ ] Імпортувати `{ API, api }` замість `mockApiCall` та прямих mockData
- [ ] Замінити `mockApiCall('endpoint', {}, delay)` на `api.get(API...)`
- [ ] Використовувати async/await замість `.then()`
- [ ] Додати try/catch для обробки помилок
- [ ] Видалити прямі імпорти з `mockData/`
- [ ] Використовувати `Promise.all()` для паралельних запитів
- [ ] Тестувати компонент після міграції

## 📚 Додаткові ресурси

- [API Usage Guide](./api-usage.md) - Детальна документація
- [API Endpoints JSON](../api-endpoints.json) - Список всіх endpoints
- [Example Component](../components/examples/ApiUsageExample.tsx) - Приклад використання

## ⚠️ Важливо

Хоча старий формат продовжує працювати, **рекомендується** мігрувати на новий підхід для:
- Кращої підтримки коду
- Type safety
- Легшого масштабування
- Підготовки до production

---

Питання? Створіть issue або зверніться до команди розробки.
