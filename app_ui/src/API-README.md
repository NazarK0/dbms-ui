# API System - Quick Start Guide

Централізована система управління API endpoints для PostgreSQL DBMS.

## 📋 Огляд

Проект використовує централізовану конфігурацію API endpoints з автоматичним перемиканням між mock даними (development) та справжніми HTTP запитами (production).

## ✨ Зворотна сумісність

**Добра новина!** Система повністю **зворотно сумісна** з існуючим кодом:

```typescript
// ✅ Старий формат - продовжує працювати
mockApiCall('databases/list', {}, 900);
mockApiCall('schemas/list', { database: 'mydb' }, 700);

// ✅ Новий формат - рекомендується для нових компонентів
api.get(API.admin.databaseManager.userDatabases.list());
api.get(API.admin.databaseTools.schemas.list());
```

> 💡 [Дивіться Migration Guide](./documentation/api-migration-guide.md) для детальної інформації про міграцію.

## 🚀 Швидкий старт

### 1. Імпорт API utilities

```typescript
import { API, api } from './utils/api';
```

### 2. Виконання запитів

```typescript
// GET запит
const databases = await api.get(
  API.admin.databaseManager.userDatabases.list()
);

// POST запит
await api.post(
  API.admin.databaseManager.userDatabases.create(),
  { name: 'mydb', owner: 'postgres' }
);

// DELETE запит
await api.delete(
  API.admin.databaseManager.userDatabases.delete(),
  { id: 'db-123' }
);
```

### 3. Використання в компонентах

```typescript
import { useState, useEffect } from 'react';
import { API, api } from '../utils/api';

export default function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await api.get(API.admin.dashboard.widgets.list());
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return <div>{/* Your UI */}</div>;
}
```

## 📁 Структура файлів

```
/
├── api-endpoints.json              # Конфігурація всіх endpoints
├── utils/api/
│   ├── endpoints.ts               # Type-safe доступ
│   ├── client.ts                  # HTTP client
│   └── index.ts                   # Головний export
├── mockData/                      # Mock дані для development
└── documentation/api-usage.md     # Детальна документація
```

## 🔑 Ключові особливості

✅ **Single Source of Truth** - всі endpoints в одному JSON файлі  
✅ **Type-Safe** - повна підтримка TypeScript  
✅ **Auto Mock/Real** - автоматичне перемикання між режимами  
✅ **Network Simulation** - реалістична затримка мережі в dev режимі  
✅ **Error Handling** - вбудована обробка помилок  

## 📚 Доступні Endpoints

### Admin API

**Dashboard:**
- `API.admin.dashboard.widgets.list()`
- `API.admin.dashboard.stats.overview()`
- `API.admin.dashboard.activity.recent()`

**Database Manager:**
- `API.admin.databaseManager.userDatabases.list()`
- `API.admin.databaseManager.userDatabases.create()`
- `API.admin.databaseManager.templateDatabases.list()`

**Database Tools:**
- `API.admin.databaseTools.schemas.list()`
- `API.admin.databaseTools.tables.list()`
- `API.admin.databaseTools.extensions.list()`
- `API.admin.databaseTools.queryExecutor.execute()`

**Users & Roles:**
- `API.admin.usersManager.users.list()`
- `API.admin.rolesManager.adminRoles.list()`
- `API.admin.rolesManager.permissions.admin()`

**Monitoring:**
- `API.admin.systemMonitor.connections.active()`
- `API.admin.performanceAnalyzer.queries.stats()`
- `API.admin.replicaClusters.replicas.list()`

**Other:**
- `API.admin.auditLog.entries.list()`
- `API.admin.postgresConfig.parameters.all()`
- `API.admin.cli.commands.common()`

### User API

**Dashboard:**
- `API.user.dashboard.databases.all()`
- `API.user.dashboard.activity.records()`

**Profile:**
- `API.user.profile.info()`
- `API.user.profile.databaseAccess()`

**Data:**
- `API.user.databases.analytics()`
- `API.user.tableSchemas.crm()`
- `API.user.records.list()`

[Повний список endpoints](./documentation/api-usage.md)

## 🔄 Режими роботи

### Development Mode
```typescript
// Автоматично використовує mock дані
const data = await api.get(API.admin.dashboard.widgets.list());
// → Завантажує з mockData/ з симуляцією затримки 300-800ms
```

### Production Mode
```typescript
// Виконує справжні HTTP запити
const data = await api.get(API.admin.dashboard.widgets.list());
// → GET /api/admin/dashboard/widgets
```

## 💡 Best Practices

### ✅ Правильно

```typescript
// Використовуйте API helper
const data = await api.get(API.admin.dashboard.widgets.list());

// Обробляйте помилки
try {
  const data = await api.get(endpoint);
} catch (error) {
  console.error('API Error:', error);
}

// Використовуйте loading states
const [loading, setLoading] = useState(true);
```

### ❌ Неправильно

```typescript
// НЕ імпортуйте mockData напряму
import { widgetsData } from './mockData/admin/dashboard';

// НЕ hardcode URLs
api.get('/api/admin/dashboard/widgets');

// НЕ ігноруйте помилки
const data = await api.get(endpoint); // Без try/catch
```

## 🆕 Додавання нових endpoints

1. **Додати в `api-endpoints.json`:**
```json
{
  "admin": {
    "newFeature": {
      "list": "/api/admin/new-feature"
    }
  }
}
```

2. **Додати type-safe accessor в `utils/api/endpoints.ts`:**
```typescript
admin: {
  newFeature: {
    list: () => getEndpoint('admin.newFeature.list'),
  }
}
```

3. **Використовувати:**
```typescript
const data = await api.get(API.admin.newFeature.list());
```

## 📖 Додаткова документація

- [Детальна документація](./documentation/api-usage.md)
- [Приклад компонента](./components/examples/ApiUsageExample.tsx)
- [API Endpoints JSON](./api-endpoints.json)

## 🐛 Debugging

Для debugging встановіть в console:
```typescript
// Переглянути всі доступні endpoints
console.log(API);

// Отримати URL конкретного endpoint
console.log(API.admin.dashboard.widgets.list());
// → "/api/admin/dashboard/widgets"
```

## 🤝 Підтримка

Для питань та проблем створіть issue або зверніться до команди розробки.

---

**Створено:** December 2024  
**Версія:** 1.0.0  
**Статус:** ✅ Production Ready