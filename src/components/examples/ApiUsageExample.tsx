/**
 * API Usage Example Component
 * 
 * Демонструє правильне використання централізованої API системи
 */

import { useState, useEffect } from 'react';
import { API, api } from '../../utils/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Loader2, Database, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';

export default function ApiUsageExample() {
  // State management
  const [databases, setDatabases] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Load data on component mount
  useEffect(() => {
    loadDatabases();
  }, []);

  /**
   * Example: GET request
   * Завантажити список баз даних
   */
  const loadDatabases = async () => {
    try {
      setLoading(true);
      setError(null);

      // Використання API helper для GET запиту
      const data = await api.get(
        API.admin.databaseManager.userDatabases.list(),
        { status: 'active' } // Query parameters
      );

      setDatabases(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load databases');
      console.error('Error loading databases:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Example: POST request
   * Створити нову базу даних
   */
  const createDatabase = async () => {
    try {
      setLoading(true);
      setError(null);

      const newDatabase = {
        name: `test_db_${Date.now()}`,
        owner: 'postgres',
        encoding: 'UTF8',
        template: 'template0',
      };

      // Використання API helper для POST запиту
      await api.post(
        API.admin.databaseManager.userDatabases.create(),
        newDatabase
      );

      // Перезавантажити список після створення
      await loadDatabases();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create database');
      console.error('Error creating database:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Example: DELETE request
   * Видалити базу даних
   */
  const deleteDatabase = async (id: string) => {
    if (!confirm('Ви впевнені, що хочете видалити цю базу даних?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Використання API helper для DELETE запиту
      await api.delete(
        API.admin.databaseManager.userDatabases.delete(),
        { id }
      );

      // Перезавантажити список після видалення
      await loadDatabases();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete database');
      console.error('Error deleting database:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Example: Parallel requests
   * Завантажити дані з декількох endpoints одночасно
   */
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Паралельні запити до різних endpoints
      const [stats, activity, connections] = await Promise.all([
        api.get(API.admin.dashboard.stats.overview()),
        api.get(API.admin.dashboard.activity.recent()),
        api.get(API.admin.dashboard.activity.connections()),
      ]);

      console.log('Dashboard data loaded:', { stats, activity, connections });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            API Usage Example
          </CardTitle>
          <CardDescription>
            Демонстрація використання централізованої системи API endpoints
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={loadDatabases}
              disabled={loading}
              variant="outline"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Завантаження...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Оновити список
                </>
              )}
            </Button>

            <Button
              onClick={createDatabase}
              disabled={loading}
            >
              <Database className="w-4 h-4 mr-2" />
              Створити БД
            </Button>

            <Button
              onClick={loadDashboardData}
              disabled={loading}
              variant="secondary"
            >
              Завантажити Dashboard
            </Button>
          </div>

          {/* Error message */}
          {error && (
            <Alert variant="destructive">
              <XCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success message */}
          {!loading && !error && lastUpdated && (
            <Alert>
              <CheckCircle2 className="w-4 h-4" />
              <AlertDescription>
                Дані завантажено успішно. Останнє оновлення:{' '}
                {lastUpdated.toLocaleTimeString('uk-UA')}
              </AlertDescription>
            </Alert>
          )}

          {/* Databases list */}
          <div className="space-y-2">
            <h3 className="font-semibold">Бази даних ({databases.length})</h3>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-olive-600" />
              </div>
            ) : databases.length === 0 ? (
              <p className="text-slate-500 text-sm">Немає баз даних</p>
            ) : (
              <div className="space-y-2">
                {databases.slice(0, 5).map((db) => (
                  <div
                    key={db.id}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Database className="w-4 h-4 text-olive-600" />
                      <div>
                        <code className="text-sm font-medium">{db.name}</code>
                        <p className="text-xs text-slate-500">{db.owner}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={db.status === 'active' ? 'default' : 'secondary'}>
                        {db.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteDatabase(db.id)}
                        disabled={loading}
                      >
                        Видалити
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* API Endpoints Info */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold mb-2">Використані endpoints:</h4>
            <ul className="space-y-1 text-sm font-mono text-slate-600">
              <li>• API.admin.databaseManager.userDatabases.list()</li>
              <li>• API.admin.databaseManager.userDatabases.create()</li>
              <li>• API.admin.databaseManager.userDatabases.delete()</li>
              <li>• API.admin.dashboard.stats.overview()</li>
              <li>• API.admin.dashboard.activity.recent()</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Code example */}
      <Card>
        <CardHeader>
          <CardTitle>Приклад коду</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import { API, api } from '../../utils/api';

// GET request
const databases = await api.get(
  API.admin.databaseManager.userDatabases.list(),
  { status: 'active' }
);

// POST request
await api.post(
  API.admin.databaseManager.userDatabases.create(),
  { name: 'mydb', owner: 'postgres' }
);

// DELETE request
await api.delete(
  API.admin.databaseManager.userDatabases.delete(),
  { id: 'db-123' }
);

// Parallel requests
const [stats, activity] = await Promise.all([
  api.get(API.admin.dashboard.stats.overview()),
  api.get(API.admin.dashboard.activity.recent()),
]);`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
