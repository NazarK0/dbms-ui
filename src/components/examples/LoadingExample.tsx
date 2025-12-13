/**
 * Приклад компонента з використанням Mock API та Skeleton компонентів
 * Демонструє best practices для обробки завантаження даних
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { RefreshCw, Download, TrendingUp } from 'lucide-react';
import { mockApiCall, mockPaginatedApiCall, mockMutationApiCall } from '../../utils/mockApi';
import {
  SkeletonCardGrid,
  SkeletonTable,
  SkeletonChart,
  SkeletonList,
} from '../ui/skeletons';
import { toast } from 'sonner@2.0.3';

// Типи даних
interface Stat {
  id: number;
  label: string;
  value: number;
  change: number;
}

interface TableRow {
  id: number;
  name: string;
  status: string;
  value: number;
}

// Mock дані
const mockStats: Stat[] = [
  { id: 1, label: 'Користувачі', value: 1243, change: 12.5 },
  { id: 2, label: 'Запити', value: 45678, change: -3.2 },
  { id: 3, label: 'Продуктивність', value: 98.5, change: 1.8 },
  { id: 4, label: 'Помилки', value: 12, change: -45.2 },
];

const mockTableData: TableRow[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Запис ${i + 1}`,
  status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'pending' : 'inactive',
  value: Math.floor(Math.random() * 1000),
}));

export default function LoadingExample() {
  // Loading states для різних секцій
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingChart, setIsLoadingChart] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Data states
  const [stats, setStats] = useState<Stat[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [listData, setListData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadAllData();
  }, []);

  // Завантаження всіх даних
  const loadAllData = async () => {
    // Паралельне завантаження швидких даних (статистика)
    mockApiCall(mockStats, 'fast')
      .then((data) => {
        setStats(data);
        setIsLoadingStats(false);
      })
      .catch((error) => {
        console.error('Error loading stats:', error);
        toast.error('Помилка завантаження статистики');
        setIsLoadingStats(false);
      });

    // Завантаження графіка (нормальна швидкість)
    mockApiCall(generateChartData(), 'normal')
      .then((data) => {
        setChartData(data);
        setIsLoadingChart(false);
      })
      .catch((error) => {
        console.error('Error loading chart:', error);
        setIsLoadingChart(false);
      });

    // Завантаження пагінованої таблиці (повільніше)
    mockPaginatedApiCall(mockTableData, currentPage, 10, 'slow')
      .then((result) => {
        setTableData(result.data);
        setIsLoadingTable(false);
      })
      .catch((error) => {
        console.error('Error loading table:', error);
        setIsLoadingTable(false);
      });

    // Завантаження списку активності
    mockApiCall(generateActivityData(), 'normal')
      .then((data) => {
        setListData(data);
        setIsLoadingList(false);
      })
      .catch((error) => {
        console.error('Error loading list:', error);
        setIsLoadingList(false);
      });
  };

  // Оновлення даних
  const handleRefresh = async () => {
    setIsRefreshing(true);
    toast.info('Оновлення даних...');

    // Оновлюємо тільки статистику та графік
    try {
      const [newStats, newChart] = await Promise.all([
        mockApiCall(mockStats, 'fast'),
        mockApiCall(generateChartData(), 'normal'),
      ]);

      setStats(newStats);
      setChartData(newChart);
      toast.success('Дані оновлено успішно');
    } catch (error) {
      toast.error('Помилка оновлення даних');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Експорт даних
  const handleExport = async () => {
    toast.info('Підготовка експорту...');

    try {
      await mockMutationApiCall({ type: 'export', data: tableData }, 'verySlow', 0.98);
      toast.success('Дані експортовано успішно');
    } catch (error) {
      toast.error('Помилка експорту даних');
    }
  };

  // Helper функції для генерації даних
  function generateChartData() {
    return Array.from({ length: 7 }, (_, i) => ({
      day: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'][i],
      value: Math.floor(Math.random() * 100) + 50,
    }));
  }

  function generateActivityData() {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `Активність ${i + 1}`,
      description: `Опис активності ${i + 1}`,
      timestamp: `${i + 1} годин тому`,
    }));
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-900">Приклад завантаження даних</h1>
          <p className="text-slate-600 mt-1">
            Демонстрація Mock API та Skeleton компонентів
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Оновити
          </Button>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Експорт
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      {isLoadingStats ? (
        <SkeletonCardGrid count={4} columns={4} cardType="stat" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <Badge variant={stat.change >= 0 ? 'default' : 'destructive'}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </Badge>
                </div>
                <p className="text-3xl">{stat.value.toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          {isLoadingChart ? (
            <SkeletonChart type="bar" height={300} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Графік активності</CardTitle>
                <CardDescription>За останній тиждень</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-around gap-2 p-4">
                  {chartData.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-violet-500 to-purple-600 rounded-t"
                        style={{ height: `${item.value * 2}px` }}
                      />
                      <p className="text-xs text-slate-600">{item.day}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Activity List */}
        <div>
          {isLoadingList ? (
            <SkeletonList items={5} showAvatar />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Остання активність</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listData.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-600">{item.description}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Table Section */}
      {isLoadingTable ? (
        <SkeletonTable rows={10} columns={4} showActions />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Таблиця даних</CardTitle>
            <CardDescription>Пагінований список записів</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-3 text-sm">ID</th>
                    <th className="text-left p-3 text-sm">Назва</th>
                    <th className="text-left p-3 text-sm">Статус</th>
                    <th className="text-left p-3 text-sm">Значення</th>
                    <th className="text-left p-3 text-sm">Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="border-t">
                      <td className="p-3 text-sm">{row.id}</td>
                      <td className="p-3 text-sm">{row.name}</td>
                      <td className="p-3 text-sm">
                        <Badge
                          variant={
                            row.status === 'active'
                              ? 'default'
                              : row.status === 'pending'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {row.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">{row.value}</td>
                      <td className="p-3 text-sm">
                        <Button size="sm" variant="ghost">
                          Переглянути
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
