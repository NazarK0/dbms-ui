/**
 * Приклад компонента з використанням централізованого API та Skeleton компонентів
 * Демонструє best practices для обробки завантаження даних
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { RefreshCw, Download, TrendingUp } from 'lucide-react';
import { API, api } from '../../utils/api';
import {
  SkeletonCard,
  SkeletonCardGrid,
  SkeletonTable,
  SkeletonListCard,
} from '../ui/skeletons';

interface ExampleData {
  id: number;
  title: string;
  value: number;
  status: 'active' | 'pending' | 'completed';
  date: string;
}

export default function LoadingExample() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ExampleData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Приклад використання централізованого API
      const result = await api.get(API.admin.dashboard.stats.overview());
      
      // Симуляція даних для прикладу
      const exampleData: ExampleData[] = [
        { id: 1, title: 'Запис 1', value: 150, status: 'active', date: '2024-01-15' },
        { id: 2, title: 'Запис 2', value: 280, status: 'completed', date: '2024-01-14' },
        { id: 3, title: 'Запис 3', value: 95, status: 'pending', date: '2024-01-13' },
      ];
      
      setData(exampleData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Помилка завантаження');
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  const handleExport = () => {
    console.log('Експорт даних...', data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Skeleton Cards Grid */}
        <SkeletonCardGrid count={3} columns={3} cardType="stat" />

        {/* Skeleton Table */}
        <SkeletonTable rows={5} columns={4} showActions />

        {/* Skeleton List Card */}
        <SkeletonListCard count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Помилка</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Спробувати знову
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Приклад завантаження даних</h1>
          <p className="text-slate-600">
            Демонстрація використання централізованого API та skeleton компонентів
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Оновити
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Експортувати
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всього записів</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-xs text-muted-foreground">Активних записів у системі</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Загальна сума</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.reduce((sum, item) => sum + item.value, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Сума всіх значень</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активні</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.filter(item => item.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Записів зі статусом "active"</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Таблиця даних</CardTitle>
          <CardDescription>Приклад відображення даних у таблиці</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Назва</th>
                  <th className="text-left p-3">Значення</th>
                  <th className="text-left p-3">Статус</th>
                  <th className="text-left p-3">Дата</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.value}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          item.status === 'active'
                            ? 'default'
                            : item.status === 'completed'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="p-3">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Приклад коду</CardTitle>
          <CardDescription>Як використовувати централізований API</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
            <code>{`// Імпорт централізованого API
import { API, api } from '../../utils/api';

// Використання в компоненті
const loadData = async () => {
  setIsLoading(true);
  try {
    const result = await api.get(API.admin.dashboard.stats.overview());
    setData(result);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsLoading(false);
  }
};`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
