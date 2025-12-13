# Утиліти Mock API

Цей модуль надає функції для імітації backend API запитів з реалістичними затримками та поведінкою.

## Основні функції

### `mockApiCall<T>(data, delayType, successRate)`

Основна функція для імітації API запиту з затримкою.

**Параметри:**
- `data: T` - Дані для повернення
- `delayType: 'fast' | 'normal' | 'slow' | 'verySlow'` - Тип затримки (за замовчуванням: 'normal')
- `successRate: number` - Ймовірність успіху від 0 до 1 (за замовчуванням: 1)

**Приклад:**
```typescript
import { mockApiCall } from '../utils/mockApi';

const loadData = async () => {
  const data = await mockApiCall(myData, 'normal');
  setData(data);
};
```

### Типи затримок

- **fast**: 200-500ms (швидкі запити - статистика, проста інформація)
- **normal**: 500-1200ms (стандартні запити - списки, таблиці)
- **slow**: 1200-2500ms (складні запити - аналітика, звіти)
- **verySlow**: 2500-5000ms (дуже повільні запити - backup, export, import)

### `mockPaginatedApiCall<T>(allData, page, pageSize, delayType)`

Імітація пагінованого API запиту.

**Повертає:**
```typescript
{
  data: T[];           // Дані для поточної сторінки
  total: number;       // Загальна кількість записів
  page: number;        // Поточна сторінка
  pageSize: number;    // Розмір сторінки
  totalPages: number;  // Загальна кількість сторінок
}
```

**Приклад:**
```typescript
const result = await mockPaginatedApiCall(users, 1, 10, 'normal');
console.log(result.data); // 10 користувачів
console.log(result.totalPages); // Кількість сторінок
```

### `mockMutationApiCall<T>(data, delayType, successRate)`

Імітація запиту на створення/оновлення даних.

**Повертає:**
```typescript
{
  success: boolean;
  data: T;
  message: string;
}
```

**Приклад:**
```typescript
const handleSave = async (newData) => {
  try {
    const result = await mockMutationApiCall(newData, 'normal', 0.95);
    if (result.success) {
      toast.success(result.message);
    }
  } catch (error) {
    toast.error('Помилка збереження');
  }
};
```

### `mockDeleteApiCall(id, delayType, successRate)`

Імітація запиту на видалення.

**Приклад:**
```typescript
const handleDelete = async (id: string) => {
  try {
    const result = await mockDeleteApiCall(id, 'fast', 0.95);
    toast.success(result.message);
  } catch (error) {
    toast.error('Помилка видалення');
  }
};
```

### `mockProgressApiCall(onProgress, totalDuration, updateInterval)`

Імітація прогресу довготривалої операції (backup, export тощо).

**Приклад:**
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
```

### `mockBatchApiCall<T>(requests)`

Імітація batch запиту (кілька запитів одночасно).

**Приклад:**
```typescript
const loadAllData = async () => {
  const result = await mockBatchApiCall({
    users: () => mockApiCall(usersData, 'normal'),
    roles: () => mockApiCall(rolesData, 'normal'),
    permissions: () => mockApiCall(permissionsData, 'fast'),
  });
  
  setUsers(result.users);
  setRoles(result.roles);
  setPermissions(result.permissions);
};
```

## Обробка помилок

### `MockNetworkError`

Спеціальний клас помилок для імітації мережевих помилок.

**Типи помилок:**
- `TIMEOUT` - Час очікування вичерпано (408)
- `NOT_FOUND` - Ресурс не знайдено (404)
- `UNAUTHORIZED` - Необхідна авторизація (401)
- `SERVER_ERROR` - Внутрішня помилка сервера (500)
- `BAD_REQUEST` - Невірний запит (400)

**Приклад:**
```typescript
import { mockApiCallWithError, NetworkErrorType } from '../utils/mockApi';

try {
  await mockApiCallWithError(NetworkErrorType.UNAUTHORIZED, 1000);
} catch (error) {
  if (error instanceof MockNetworkError) {
    console.log(error.type); // "UNAUTHORIZED"
    console.log(error.statusCode); // 401
    console.log(error.message); // "Необхідна авторизація"
  }
}
```

## Створення Custom Endpoints

### `createMockEndpoint<TRequest, TResponse>(handler, delayType)`

Створення власного mock endpoint.

**Приклад:**
```typescript
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

const loginEndpoint = createMockEndpoint<LoginRequest, LoginResponse>(
  (request) => {
    // Логіка обробки
    return {
      token: 'mock-token-123',
      user: { id: 1, email: request.email }
    };
  },
  'normal'
);

// Використання
const result = await loginEndpoint({ email: 'user@example.com', password: '123' });
```

## Best Practices

### 1. Використовуйте правильні типи затримок

```typescript
// ✅ Добре - швидкі дані
mockApiCall(stats, 'fast');

// ✅ Добре - таблиці та списки
mockApiCall(users, 'normal');

// ✅ Добре - складні аналітичні запити
mockApiCall(analyticsReport, 'slow');
```

### 2. Обробляйте помилки

```typescript
// ✅ Добре
try {
  const data = await mockApiCall(myData, 'normal', 0.95);
  setData(data);
} catch (error) {
  toast.error('Не вдалося завантажити дані');
  console.error(error);
}
```

### 3. Використовуйте loading states

```typescript
// ✅ Добре
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState(null);

useEffect(() => {
  mockApiCall(myData, 'normal').then((result) => {
    setData(result);
    setIsLoading(false);
  });
}, []);

return isLoading ? <SkeletonTable /> : <DataTable data={data} />;
```

### 4. Групуйте паралельні запити

```typescript
// ✅ Добре - паралельне завантаження
Promise.all([
  mockApiCall(users, 'normal'),
  mockApiCall(roles, 'normal'),
]).then(([usersData, rolesData]) => {
  setUsers(usersData);
  setRoles(rolesData);
});

// ❌ Погано - послідовне завантаження
const users = await mockApiCall(usersData, 'normal');
const roles = await mockApiCall(rolesData, 'normal'); // Чекає завершення першого запиту
```

## Інтеграція з компонентами

```typescript
import { useState, useEffect } from 'react';
import { mockApiCall } from '../utils/mockApi';
import { SkeletonTable } from '../ui/skeletons';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await mockApiCall(myData, 'normal');
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <SkeletonTable rows={5} columns={4} />;
  if (error) return <ErrorMessage message={error} />;
  
  return <DataTable data={data} />;
}
```
