import { useState } from 'react';
import { Error400, Error401, Error403, Error404, Error500 } from '../error-pages';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

/**
 * Приклад використання error pages компонентів
 * 
 * Доступні компоненти:
 * - Error400: Невірний запит
 * - Error401: Неавторизований доступ
 * - Error403: Доступ заборонено
 * - Error404: Сторінку не знайдено
 * - Error500: Внутрішня помилка сервера
 */
export function ErrorPagesExample() {
  const [selectedError, setSelectedError] = useState<string | null>(null);

  // Handlers
  const handleBack = () => {
    console.log('Повернутися назад');
    setSelectedError(null);
  };

  const handleHome = () => {
    console.log('На головну');
    setSelectedError(null);
  };

  const handleLogin = () => {
    console.log('Увійти до системи');
  };

  const handleRetry = () => {
    console.log('Спробувати ще раз');
  };

  // Show error page if selected
  if (selectedError === '400') {
    return (
      <Error400
        onBack={handleBack}
        onHome={handleHome}
        message="Запит містить некоректні параметри. Перевірте введені дані."
      />
    );
  }

  if (selectedError === '401') {
    return (
      <Error401
        onLogin={handleLogin}
        onHome={handleHome}
      />
    );
  }

  if (selectedError === '403') {
    return (
      <Error403
        onBack={handleBack}
        onHome={handleHome}
        currentRole="Data Analyst"
        requiredRole="Database Administrator"
      />
    );
  }

  if (selectedError === '404') {
    return (
      <Error404
        onBack={handleBack}
        onHome={handleHome}
        resourceType="базу даних"
      />
    );
  }

  if (selectedError === '500') {
    return (
      <Error500
        onRetry={handleRetry}
        onHome={handleHome}
        errorId="ERR-2024-12-17-001"
        timestamp={new Date().toLocaleString('uk-UA')}
        showTechnicalDetails={true}
        technicalMessage="PostgreSQL connection timeout: Could not connect to database server at localhost:5432"
      />
    );
  }

  // Demo page
  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Error Pages - Демонстрація</CardTitle>
          <p className="text-muted-foreground">
            Сервісні сторінки для HTTP статус кодів з українською локалізацією
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Огляд</TabsTrigger>
              <TabsTrigger value="examples">Приклади</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-6">
              <div className="grid gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="mb-2">400 - Bad Request</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Використовується коли клієнт надіслав невірний запит або некоректні дані
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedError('400')}
                  >
                    Переглянути
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="mb-2">401 - Unauthorized</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Для доступу до ресурсу необхідна автентифікація через Microsoft AD
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedError('401')}
                  >
                    Переглянути
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="mb-2">403 - Forbidden</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Користувач автентифікований, але не має прав доступу через RBAC
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedError('403')}
                  >
                    Переглянути
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="mb-2">404 - Not Found</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Запитуваний ресурс (база даних, таблиця, сторінка) не знайдено
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedError('404')}
                  >
                    Переглянути
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="mb-2">500 - Internal Server Error</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Помилка сервера PostgreSQL або внутрішня помилка системи
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedError('500')}
                  >
                    Переглянути
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="mt-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="mb-3">Базове використання</h4>
                  <pre className="text-xs bg-background p-3 rounded overflow-x-auto">
{`import { Error404 } from './components/error-pages';

function App() {
  return (
    <Error404 
      onBack={() => navigate(-1)}
      onHome={() => navigate('/')}
    />
  );
}`}
                  </pre>
                </div>

                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="mb-3">З додатковими параметрами</h4>
                  <pre className="text-xs bg-background p-3 rounded overflow-x-auto">
{`import { Error403 } from './components/error-pages';

function ProtectedRoute() {
  return (
    <Error403 
      onBack={() => navigate(-1)}
      onHome={() => navigate('/')}
      currentRole="Data Analyst"
      requiredRole="Database Administrator"
      message="Доступ до управління базами даних обмежено"
    />
  );
}`}
                  </pre>
                </div>

                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="mb-3">Error 500 з технічними деталями</h4>
                  <pre className="text-xs bg-background p-3 rounded overflow-x-auto">
{`import { Error500 } from './components/error-pages';

function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Error500 
      onRetry={() => window.location.reload()}
      onHome={() => navigate('/')}
      errorId={generateErrorId()}
      timestamp={new Date().toISOString()}
      showTechnicalDetails={isDevelopment}
      technicalMessage={error.stack}
    />
  );
}`}
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
