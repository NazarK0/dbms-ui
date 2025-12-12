import { useState } from 'react';
import { TrendingUp, Clock, Database, AlertCircle, RefreshCw, Download, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import { Progress } from '../../ui/progress';

export default function PerformanceAnalyzer() {
  const [timeRange, setTimeRange] = useState('1h');
  const [sortBy, setSortBy] = useState('total_time');

  const queryStats = [
    {
      query: 'SELECT * FROM orders WHERE user_id = $1 AND status = $2',
      calls: 15234,
      totalTime: '45.2с',
      avgTime: '2.97мс',
      minTime: '0.8мс',
      maxTime: '125мс',
      rows: 152340,
      hitRatio: 98.5,
    },
    {
      query: 'UPDATE users SET last_login = NOW() WHERE id = $1',
      calls: 8521,
      totalTime: '12.4с',
      avgTime: '1.45мс',
      minTime: '0.5мс',
      maxTime: '45мс',
      rows: 8521,
      hitRatio: 99.2,
    },
    {
      query: 'SELECT p.*, c.name as category FROM products p JOIN categories c ON...',
      calls: 3421,
      totalTime: '28.7с',
      avgTime: '8.39мс',
      minTime: '2.1мс',
      maxTime: '234мс',
      rows: 68420,
      hitRatio: 85.3,
    },
    {
      query: 'INSERT INTO logs (level, message, created_at) VALUES ($1, $2, $3)',
      calls: 42134,
      totalTime: '18.9с',
      avgTime: '0.45мс',
      minTime: '0.2мс',
      maxTime: '12мс',
      rows: 42134,
      hitRatio: 100,
    },
    {
      query: 'SELECT COUNT(*) FROM order_items WHERE order_id IN (SELECT...)',
      calls: 1234,
      totalTime: '156.8с',
      avgTime: '127.1мс',
      minTime: '45мс',
      maxTime: '1.2с',
      rows: 1234,
      hitRatio: 45.2,
    },
  ];

  const slowQueries = [
    {
      query: 'SELECT * FROM large_table WHERE unindexed_column = $1',
      avgTime: '2.4с',
      calls: 145,
      recommendation: 'Створіть індекс для unindexed_column',
      impact: 'Висока',
    },
    {
      query: 'SELECT * FROM orders o JOIN users u ON o.user_id = u.id WHERE...',
      avgTime: '1.8с',
      calls: 89,
      recommendation: 'Оптимізуйте JOIN, використовуйте індекси',
      impact: 'Середня',
    },
    {
      query: 'UPDATE inventory SET quantity = quantity - $1 WHERE product_id...',
      avgTime: '950мс',
      calls: 234,
      recommendation: 'Розгляньте використання партіонування',
      impact: 'Середня',
    },
  ];

  const cacheStats = [
    { metric: 'Коефіцієнт попадань', value: '98.2%', trend: 'up', percentage: 98.2 },
    { metric: 'Блоки з диску', value: '1.2M', trend: 'down', percentage: 45 },
    { metric: 'Блоки з кешу', value: '58.4M', trend: 'up', percentage: 92 },
    { metric: 'Блоки записані', value: '850K', trend: 'neutral', percentage: 68 },
  ];

  const indexUsage = [
    {
      table: 'orders',
      index: 'idx_orders_user_id',
      scans: 15234,
      rowsRead: 152340,
      usage: 95,
      size: '2.4 МБ',
    },
    {
      table: 'users',
      index: 'idx_users_email',
      scans: 8521,
      rowsRead: 8521,
      usage: 89,
      size: '1.2 МБ',
    },
    {
      table: 'products',
      index: 'idx_products_category',
      scans: 234,
      rowsRead: 4680,
      usage: 12,
      size: '512 КБ',
    },
    {
      table: 'logs',
      index: 'idx_logs_created_at',
      scans: 42,
      rowsRead: 840,
      usage: 3,
      size: '3.8 МБ',
    },
  ];

  const getImpactVariant = (impact: string) => {
    switch(impact) {
      case 'Висока': return 'destructive';
      case 'Середня': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">Аналіз продуктивності</h2>
          <p className="text-slate-600">Статистика запитів та рекомендації з оптимізації (pg_stat_statements)</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">Останні 15 хвилин</SelectItem>
              <SelectItem value="1h">Остання година</SelectItem>
              <SelectItem value="24h">Останні 24 години</SelectItem>
              <SelectItem value="7d">Останні 7 днів</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Оновити
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Експорт звіту
          </Button>
        </div>
      </div>

      {/* Cache Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cacheStats.map((stat) => {
          const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : TrendingUp;
          const trendColor = stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-slate-600';
          return (
            <Card key={stat.metric} className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <p className="text-slate-600 text-sm mb-2">{stat.metric}</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-slate-900 text-2xl">{stat.value}</span>
                  <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Slow Queries Alert */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-900">Виявлено повільні запити</AlertTitle>
        <AlertDescription className="text-yellow-700">
          Знайдено {slowQueries.length} запитів, які потребують оптимізації. Перегляньте рекомендації нижче.
        </AlertDescription>
      </Alert>

      {/* Query Statistics */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-slate-700" />
              <CardTitle>Статистика запитів</CardTitle>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="total_time">За загальним часом</SelectItem>
                <SelectItem value="avg_time">За середнім часом</SelectItem>
                <SelectItem value="calls">За кількістю викликів</SelectItem>
                <SelectItem value="hit_ratio">За коефіцієнтом попадань</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardDescription>Детальна статистика виконання SQL запитів</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Запит</TableHead>
                <TableHead>Виклики</TableHead>
                <TableHead>Загальний час</TableHead>
                <TableHead>Середній час</TableHead>
                <TableHead>Мін/Макс</TableHead>
                <TableHead>Рядки</TableHead>
                <TableHead>Попадання кешу</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queryStats.map((stat, index) => (
                <TableRow key={index}>
                  <TableCell className="max-w-md">
                    <code className="text-xs text-slate-900 line-clamp-2 bg-slate-50 px-2 py-1 rounded">
                      {stat.query}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{stat.calls.toLocaleString()}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {stat.totalTime}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600 font-mono text-sm">{stat.avgTime}</TableCell>
                  <TableCell className="text-slate-600 text-xs font-mono">
                    {stat.minTime} / {stat.maxTime}
                  </TableCell>
                  <TableCell className="text-slate-600">{stat.rows.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={stat.hitRatio} className="h-2 flex-1 max-w-[80px]" />
                      <span className="text-sm text-slate-900 min-w-[50px]">{stat.hitRatio}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Slow Queries & Recommendations */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <CardTitle>Повільні запити та рекомендації</CardTitle>
          </div>
          <CardDescription>Запити, які потребують оптимізації</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {slowQueries.map((query, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <code className="text-sm text-slate-900 block mb-2 bg-white px-3 py-2 rounded font-mono">
                      {query.query}
                    </code>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline" className="gap-1">
                        <Clock className="w-3 h-3" />
                        Середній час: {query.avgTime}
                      </Badge>
                      <Badge variant="secondary">{query.calls} викликів</Badge>
                    </div>
                  </div>
                  <Badge variant={getImpactVariant(query.impact)}>
                    {query.impact} важливість
                  </Badge>
                </div>
                <Alert className="bg-blue-50 border-blue-200">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-900">
                    <strong>Рекомендація:</strong> {query.recommendation}
                  </AlertDescription>
                </Alert>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Index Usage */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Використання індексів</CardTitle>
          <CardDescription>Статистика використання індексів таблиць</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Таблиця</TableHead>
                <TableHead>Індекс</TableHead>
                <TableHead>Сканування</TableHead>
                <TableHead>Прочитано рядків</TableHead>
                <TableHead>Використання</TableHead>
                <TableHead>Розмір</TableHead>
                <TableHead className="text-right">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indexUsage.map((idx, index) => (
                <TableRow key={index}>
                  <TableCell className="text-slate-900">{idx.table}</TableCell>
                  <TableCell>
                    <code className="text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded">{idx.index}</code>
                  </TableCell>
                  <TableCell className="text-slate-600">{idx.scans.toLocaleString()}</TableCell>
                  <TableCell className="text-slate-600">{idx.rowsRead.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={idx.usage} className="h-2 flex-1 max-w-[100px]" />
                      <span className="text-sm text-slate-900 min-w-[45px]">{idx.usage}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{idx.size}</TableCell>
                  <TableCell className="text-right">
                    {idx.usage < 10 && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Не використовується
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}