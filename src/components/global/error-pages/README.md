# Error Pages

Сервісні сторінки для відображення HTTP статус кодів з українською локалізацією.

## Доступні компоненти

### Error400 - Невірний запит
Використовується коли клієнт надіслав невірний запит або некоректні дані.

```tsx
import { Error400 } from '@/components/error-pages';

<Error400 
  onBack={() => navigate(-1)}
  onHome={() => navigate('/')}
  message="Запит містить некоректні параметри"
/>
```

**Props:**
- `onBack?: () => void` - Callback для повернення назад
- `onHome?: () => void` - Callback для переходу на головну
- `message?: string` - Кастомне повідомлення

---

### Error401 - Неавторизований доступ
Для доступу до ресурсу необхідна автентифікація.

```tsx
import { Error401 } from '@/components/error-pages';

<Error401 
  onLogin={() => redirectToAD()}
  onHome={() => navigate('/')}
/>
```

**Props:**
- `onLogin?: () => void` - Callback для авторизації
- `onHome?: () => void` - Callback для переходу на головну
- `message?: string` - Кастомне повідомлення

---

### Error403 - Доступ заборонено
Користувач автентифікований, але не має прав доступу.

```tsx
import { Error403 } from '@/components/error-pages';

<Error403 
  onBack={() => navigate(-1)}
  onHome={() => navigate('/')}
  currentRole="Data Analyst"
  requiredRole="Database Administrator"
  message="Доступ до управління базами даних обмежено"
/>
```

**Props:**
- `onBack?: () => void` - Callback для повернення назад
- `onHome?: () => void` - Callback для переходу на головну
- `message?: string` - Кастомне повідомлення
- `requiredRole?: string` - Необхідна роль
- `currentRole?: string` - Поточна роль користувача

---

### Error404 - Сторінку не знайдено
Запитуваний ресурс не знайдено.

```tsx
import { Error404 } from '@/components/error-pages';

<Error404 
  onBack={() => navigate(-1)}
  onHome={() => navigate('/')}
  resourceType="базу даних"
/>
```

**Props:**
- `onBack?: () => void` - Callback для повернення назад
- `onHome?: () => void` - Callback для переходу на головну
- `message?: string` - Кастомне повідомлення
- `resourceType?: string` - Тип ресурсу (за замовчуванням "сторінку")

---

### Error500 - Внутрішня помилка сервера
Помилка сервера або внутрішня помилка системи.

```tsx
import { Error500 } from '@/components/error-pages';

<Error500 
  onRetry={() => window.location.reload()}
  onHome={() => navigate('/')}
  errorId="ERR-2024-12-17-001"
  timestamp={new Date().toISOString()}
  showTechnicalDetails={isDevelopment}
  technicalMessage={error.stack}
/>
```

**Props:**
- `onRetry?: () => void` - Callback для повторної спроби
- `onHome?: () => void` - Callback для переходу на головну
- `message?: string` - Кастомне повідомлення
- `errorId?: string` - Унікальний ідентифікатор помилки
- `timestamp?: string` - Час виникнення помилки
- `showTechnicalDetails?: boolean` - Показувати технічні деталі
- `technicalMessage?: string` - Технічне повідомлення для розробників

## Особливості

### Адаптивний дизайн
Всі сторінки адаптовані для різних розмірів екранів з урахуванням політики блокування мобільних пристроїв.

### Темна тема
Підтримка темної теми через CSS змінні з globals.css.

### Консистентна структура
Всі error pages мають єдиний дизайн:
- Іконка з кольоровим фоном
- Статус код і заголовок
- Описове повідомлення
- Кнопки дій
- Додаткова інформація

### Українська локалізація
Всі тексти українською мовою відповідно до корпоративних стандартів.

## Інтеграція з системою

### З React Router
```tsx
import { Error404 } from '@/components/error-pages';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  
  return (
    <Error404 
      onBack={() => navigate(-1)}
      onHome={() => navigate('/dashboard')}
    />
  );
}
```

### Error Boundary
```tsx
import { Error500 } from '@/components/error-pages';
import { Component, ErrorInfo, ReactNode } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Error500
          onRetry={() => window.location.reload()}
          onHome={() => window.location.href = '/'}
          errorId={generateErrorId()}
          timestamp={new Date().toISOString()}
          showTechnicalDetails={process.env.NODE_ENV === 'development'}
          technicalMessage={this.state.error?.stack}
        />
      );
    }

    return this.props.children;
  }
}
```

### З RBAC
```tsx
import { Error403 } from '@/components/error-pages';
import { useAuth } from '@/contexts/AuthContext';

function ProtectedRoute({ requiredRole, children }) {
  const { user } = useAuth();

  if (!user.roles.includes(requiredRole)) {
    return (
      <Error403
        currentRole={user.roles[0]}
        requiredRole={requiredRole}
        onHome={() => navigate('/dashboard')}
      />
    );
  }

  return children;
}
```

## Кольорова схема

Кожен тип помилки має свій колір для швидкої візуальної ідентифікації:

- **400** - Жовтий (warning)
- **401** - Помаранчевий (auth required)
- **403** - Червоний (forbidden)
- **404** - Синій (not found)
- **500** - Destructive (server error)

## Best Practices

1. **Завжди надавайте callbacks** - onHome та onBack/onRetry для кращого UX
2. **Кастомізуйте повідомлення** - для специфічних випадків використовуйте prop message
3. **Логування помилок** - для Error500 завжди генеруйте errorId та зберігайте в логах
4. **Технічні деталі** - показуйте тільки в development режимі
5. **Контекстна інформація** - для Error403 вказуйте ролі, для Error404 - тип ресурсу

## Приклад використання з API

```tsx
import { Error400, Error401, Error403, Error500 } from '@/components/error-pages';

async function fetchData() {
  try {
    const response = await api.getData();
    return response;
  } catch (error) {
    switch (error.status) {
      case 400:
        return <Error400 message={error.message} />;
      case 401:
        return <Error401 onLogin={() => redirectToAD()} />;
      case 403:
        return <Error403 currentRole={user.role} />;
      case 500:
        return <Error500 
          errorId={error.id}
          timestamp={error.timestamp}
        />;
      default:
        return <Error500 />;
    }
  }
}
```
