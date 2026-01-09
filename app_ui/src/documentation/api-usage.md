# API Usage Guide

Цей документ описує, як використовувати централізовану систему API endpoints у проекті.

## Огляд

Проект використовує централізовану конфігурацію API endpoints, визначену в `api-endpoints.json`. Це забезпечує:

- ✅ Єдине джерело правди для всіх API endpoints
- ✅ Type-safe доступ до endpoints
- ✅ Легке перемикання між mock даними та real API
- ✅ Автоматична симуляція network delay в development режимі
- ✅ Централізована обробка помилок

## Структура

```
/api-endpoints.json         # Конфігурація всіх API endpoints
/utils/api/
  ├── endpoints.ts          # Type-safe доступ до endpoints
  ├── client.ts             # HTTP client для API запитів
  └── index.ts              # Головний export
```

## Основне використання

### 1. Імпорт API utilities

```typescript
import { API, api } from '../../../utils/api';
```

### 2. GET запити

```typescript
// Отримати список widgets для dashboard
const widgets = await api.get(API.admin.dashboard.widgets.list());

// Отримати список баз даних з параметрами
const databases = await api.get(
  API.admin.databaseManager.userDatabases.list(),
  { status: 'active', limit: 10 }
);
```

### 3. POST запити

```typescript
// Створити нову базу даних
const result = await api.post(
  API.admin.databaseManager.userDatabases.create(),
  {
    name: 'mydb',
    owner: 'user1',
    encoding: 'UTF8'
  }
);
```

### 4. PUT запити

```typescript
// Оновити базу даних
const result = await api.put(
  API.admin.databaseManager.userDatabases.update(),
  {
    id: 'db-123',
    connectionLimit: 100
  }
);
```

### 5. DELETE запити

```typescript
// Видалити базу даних
await api.delete(
  API.admin.databaseManager.userDatabases.delete(),
  { id: 'db-123' }
);
```

## Використання в компонентах

### Приклад: Dashboard Component

```typescript
import { useState, useEffect } from 'react';
import { API, api } from '../../../utils/api';

export default function Dashboard() {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Завантажити widgets
      const widgetsData = await api.get(
        API.admin.dashboard.widgets.list()
      );
      
      setWidgets(widgetsData);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return <div>{/* Render widgets */}</div>;
}
```

### Приклад: Database Manager Component

```typescript
import { useState } from 'react';
import { API, api } from '../../../utils/api';

export default function DatabaseManager() {
  const [databases, setDatabases] = useState([]);

  const loadDatabases = async () => {
    const data = await api.get(
      API.admin.databaseManager.userDatabases.list()
    );
    setDatabases(data);
  };

  const createDatabase = async (formData) => {
    await api.post(
      API.admin.databaseManager.userDatabases.create(),
      formData
    );
    
    // Перезавантажити список
    await loadDatabases();
  };

  const deleteDatabase = async (id) => {
    await api.delete(
      API.admin.databaseManager.userDatabases.delete(),
      { id }
    );
    
    await loadDatabases();
  };

  return (
    <div>
      {/* UI */}
    </div>
  );
}
```

## Режими роботи

### Development Mode (Mock Data)

У режимі розробки API client автоматично використовує mock дані:

```typescript
// Автоматично використовує mock дані з mockData/
const data = await api.get(API.admin.dashboard.widgets.list());
```

Симулюється:
- Network delay (300-800ms)
- Realistic loading states
- Error scenarios (if configured)

### Production Mode (Real API)

У production режимі виконуються справжні HTTP запити:

```typescript
// Виконує справжній HTTP GET запит до /api/admin/dashboard/widgets
const data = await api.get(API.admin.dashboard.widgets.list());
```

## Доступні API Endpoints

### Admin API

#### Dashboard
- `API.admin.dashboard.widgets.list()` - Список widgets
- `API.admin.dashboard.widgets.allDatabases()` - Всі бази даних
- `API.admin.dashboard.widgets.allAdmins()` - Всі адміністратори
- `API.admin.dashboard.widgets.lastActivity()` - Остання активність
- `API.admin.dashboard.stats.overview()` - Огляд статистики
- `API.admin.dashboard.stats.performance()` - Продуктивність
- `API.admin.dashboard.activity.recent()` - Недавня активність
- `API.admin.dashboard.activity.connections()` - Активні підключення

#### Database Manager
- `API.admin.databaseManager.userDatabases.list()` - Список користувацьких БД
- `API.admin.databaseManager.userDatabases.create()` - Створити БД
- `API.admin.databaseManager.userDatabases.update()` - Оновити БД
- `API.admin.databaseManager.userDatabases.delete()` - Видалити БД
- `API.admin.databaseManager.templateDatabases.list()` - Список template БД
- `API.admin.databaseManager.adminDatabases.list()` - Список admin БД
- `API.admin.databaseManager.options.*` - Опції (encodings, collations, etc.)

#### Database Tools
- `API.admin.databaseTools.schemas.*` - Управління схемами
- `API.admin.databaseTools.tables.*` - Управління таблицями
- `API.admin.databaseTools.extensions.*` - Управління extensions
- `API.admin.databaseTools.functions.*` - Управління функціями
- `API.admin.databaseTools.triggers.*` - Управління triggers
- `API.admin.databaseTools.dataTypes.*` - Управління типами даних
- `API.admin.databaseTools.foreignServers.*` - Foreign servers
- `API.admin.databaseTools.backupRestore.*` - Backup/Restore
- `API.admin.databaseTools.queryExecutor.*` - SQL Query Executor
- `API.admin.databaseTools.schemaVisualizer.data()` - Schema visualization

#### Users & Roles
- `API.admin.usersManager.users.*` - Управління користувачами
- `API.admin.usersManager.timezones()` - Список timezones
- `API.admin.rolesManager.adminRoles.*` - Admin ролі
- `API.admin.rolesManager.userRoles.*` - User ролі
- `API.admin.rolesManager.permissions.*` - Права доступу

#### Monitoring & Performance
- `API.admin.systemMonitor.*` - Системний моніторинг
- `API.admin.performanceAnalyzer.*` - Аналіз продуктивності
- `API.admin.replicaClusters.*` - Управління репліками

#### Other
- `API.admin.auditLog.*` - Audit log
- `API.admin.postgresConfig.*` - Конфігурація PostgreSQL
- `API.admin.cli.*` - CLI інтерфейс
- `API.admin.logs.*` - Системні логи

### User API

#### Dashboard
- `API.user.dashboard.databases.*` - Бази даних користувача
- `API.user.dashboard.activity.*` - Активність користувача

#### Profile
- `API.user.profile.info()` - Інформація профілю
- `API.user.profile.databaseAccess()` - Доступ до БД
- `API.user.profile.activityStats()` - Статистика активності
- `API.user.profile.recentActivity()` - Недавня активність

#### Data Management
- `API.user.databases.*` - Специфічні бази даних
- `API.user.tableSchemas.*` - Схеми таблиць
- `API.user.records.*` - CRUD операції з записами
- `API.user.roles.available()` - Доступні ролі

## Custom API Client

Якщо потрібен custom API client з іншими налаштуваннями:

```typescript
import ApiClient from '../../../utils/api';

const customClient = new ApiClient({
  baseUrl: 'https://custom-api.example.com',
  timeout: 60000,
  headers: {
    'Authorization': 'Bearer token',
    'X-Custom-Header': 'value'
  }
});

const data = await customClient.get('/custom/endpoint');
```

## Best Practices

1. **Завжди використовуйте API helper** замість прямих імпортів з mockData
   ```typescript
   // ✅ Правильно
   const data = await api.get(API.admin.dashboard.widgets.list());
   
   // ❌ Неправильно
   import { widgetsData } from '../../../mockData/admin/dashboard';
   ```

2. **Обробляйте помилки**
   ```typescript
   try {
     const data = await api.get(endpoint);
   } catch (error) {
     console.error('API Error:', error);
     // Handle error
   }
   ```

3. **Використовуйте loading states**
   ```typescript
   const [loading, setLoading] = useState(true);
   
   useEffect(() => {
     api.get(endpoint)
       .then(data => setData(data))
       .finally(() => setLoading(false));
   }, []);
   ```

4. **Не дублюйте endpoint URLs** - завжди використовуйте API helper
   ```typescript
   // ✅ Правильно - single source of truth
   api.get(API.admin.dashboard.widgets.list());
   
   // ❌ Неправильно - hardcoded URL
   api.get('/api/admin/dashboard/widgets');
   ```

## Додавання нових endpoints

1. Додати endpoint в `api-endpoints.json`:
   ```json
   {
     "admin": {
       "newFeature": {
         "list": "/api/admin/new-feature"
       }
     }
   }
   ```

2. Додати type-safe accessor в `utils/api/endpoints.ts`:
   ```typescript
   admin: {
     newFeature: {
       list: () => getEndpoint('admin.newFeature.list'),
     }
   }
   ```

3. Використовувати в компонентах:
   ```typescript
   const data = await api.get(API.admin.newFeature.list());
   ```
