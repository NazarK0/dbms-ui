# User UI CRUD Examples

Цей каталог містить приклади використання CRUD операцій в User UI.

## Використання useUserCrud Hook

Hook `useUserCrud` автоматично визначає режим роботи:
- **Preview Mode (Admin UI)**: використовує in-memory stub service
- **Production Mode (User UI)**: використовує реальні API endpoints

### Приклад базового використання

```tsx
import { useUserCrud } from '../../../hooks/useUserCrud';

function MyComponent() {
  const { 
    getRecords, 
    createRecord, 
    updateRecord, 
    deleteRecord,
    isPreviewMode 
  } = useUserCrud();

  // GET all records
  const loadRecords = async () => {
    const { data, total } = await getRecords('mydb', 'users', {
      limit: 10,
      offset: 0,
      orderBy: 'created_at',
      orderDir: 'desc',
      filters: { status: 'active' }
    });
  };

  // CREATE record
  const create = async () => {
    const result = await createRecord('mydb', 'users', {
      name: 'John Doe',
      email: 'john@example.com'
    });
    
    if (result.success) {
      console.log('Created:', result.data);
    }
  };

  // UPDATE record
  const update = async (id: number) => {
    const result = await updateRecord('mydb', 'users', id, {
      name: 'Jane Doe'
    });
  };

  // DELETE record
  const remove = async (id: number) => {
    const result = await deleteRecord('mydb', 'users', id);
  };
}
```

## Файли

- **CrudExample.tsx** - повний приклад CRUD інтерфейсу з формами та таблицею

## Preview Mode Features

В режимі preview:
- Всі дані зберігаються в пам'яті
- Автоматична генерація тестових записів
- Реалістичні затримки API (300-800ms)
- Імітація помилок з ймовірністю 2%
- Підтримка фільтрації, сортування та пагінації

## Інтеграція з існуючими компонентами

Для інтеграції CRUD stub в існуючі компоненти User UI:

1. Імпортуйте hook:
```tsx
import { useUserCrud } from '../../hooks/useUserCrud';
```

2. Замініть mock API calls:
```tsx
// Було:
mockApiCall('table/records', { database, table }, 900)

// Стало:
const { getRecords } = useUserCrud();
getRecords(database, table)
```

3. Обробляйте результати:
```tsx
const result = await createRecord(db, table, data);
if (result.success) {
  toast.success(result.message);
} else {
  toast.error(result.error);
}
```
