import { useState } from 'react';
import { TrendingUp, Clock, Database, AlertCircle, RefreshCw, Download } from 'lucide-react';

export default function PerformanceAnalyzer() {
  const [timeRange, setTimeRange] = useState('1h');
  const [sortBy, setSortBy] = useState('total_time');

  const queryStats = [
    {
      query: 'SELECT * FROM orders WHERE user_id = $1 AND status = $2',
      calls: 15234,
      totalTime: '45.2s',
      avgTime: '2.97ms',
      minTime: '0.8ms',
      maxTime: '125ms',
      rows: 152340,
      hitRatio: '98.5%',
    },
    {
      query: 'UPDATE users SET last_login = NOW() WHERE id = $1',
      calls: 8521,
      totalTime: '12.4s',
      avgTime: '1.45ms',
      minTime: '0.5ms',
      maxTime: '45ms',
      rows: 8521,
      hitRatio: '99.2%',
    },
    {
      query: 'SELECT p.*, c.name as category FROM products p JOIN categories c ON...',
      calls: 3421,
      totalTime: '28.7s',
      avgTime: '8.39ms',
      minTime: '2.1ms',
      maxTime: '234ms',
      rows: 68420,
      hitRatio: '85.3%',
    },
    {
      query: 'INSERT INTO logs (level, message, created_at) VALUES ($1, $2, $3)',
      calls: 42134,
      totalTime: '18.9s',
      avgTime: '0.45ms',
      minTime: '0.2ms',
      maxTime: '12ms',
      rows: 42134,
      hitRatio: '100%',
    },
    {
      query: 'SELECT COUNT(*) FROM order_items WHERE order_id IN (SELECT...)',
      calls: 1234,
      totalTime: '156.8s',
      avgTime: '127.1ms',
      minTime: '45ms',
      maxTime: '1.2s',
      rows: 1234,
      hitRatio: '45.2%',
    },
  ];

  const slowQueries = [
    {
      query: 'SELECT * FROM large_table WHERE unindexed_column = $1',
      avgTime: '2.4s',
      calls: 145,
      recommendation: 'Створіть індекс для unindexed_column',
      impact: 'Висока',
    },
    {
      query: 'SELECT * FROM orders o JOIN users u ON o.user_id = u.id WHERE...',
      avgTime: '1.8s',
      calls: 89,
      recommendation: 'Оптимізуйте JOIN, використовуйте індекси',
      impact: 'Середня',
    },
    {
      query: 'UPDATE inventory SET quantity = quantity - $1 WHERE product_id...',
      avgTime: '950ms',
      calls: 234,
      recommendation: 'Розгляньте використання партіонування',
      impact: 'Середня',
    },
  ];

  const cacheStats = [
    { metric: 'Коефіцієнт попадань', value: '98.2%', trend: 'up', color: 'text-green-600' },
    { metric: 'Блоки прочитані з диску', value: '1.2M', trend: 'down', color: 'text-blue-600' },
    { metric: 'Блоки прочитані з кешу', value: '58.4M', trend: 'up', color: 'text-green-600' },
    { metric: 'Блоки записані', value: '850K', trend: 'neutral', color: 'text-gray-600' },
  ];

  const indexUsage = [
    {
      table: 'orders',
      index: 'idx_orders_user_id',
      scans: 15234,
      rowsRead: 152340,
      usage: '95%',
      size: '2.4 МБ',
    },
    {
      table: 'users',
      index: 'idx_users_email',
      scans: 8521,
      rowsRead: 8521,
      usage: '89%',
      size: '1.2 МБ',
    },
    {
      table: 'products',
      index: 'idx_products_category',
      scans: 234,
      rowsRead: 4680,
      usage: '12%',
      size: '512 КБ',
    },
    {
      table: 'logs',
      index: 'idx_logs_created_at',
      scans: 42,
      rowsRead: 840,
      usage: '3%',
      size: '3.8 МБ',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Аналіз продуктивності</h2>
          <p className="text-gray-600">Статистика запитів та рекомендації з оптимізації (pg_stat_statements)</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="15m">Останні 15 хвилин</option>
            <option value="1h">Остання година</option>
            <option value="24h">Останні 24 години</option>
            <option value="7d">Останні 7 днів</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Оновити
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Експорт звіту
          </button>
        </div>
      </div>

      {/* Cache Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cacheStats.map((stat) => (
          <div key={stat.metric} className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 text-sm">{stat.metric}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className={`text-gray-900 ${stat.color}`}>{stat.value}</span>
              {stat.trend === 'up' && <span className="text-green-600 text-sm">↑</span>}
              {stat.trend === 'down' && <span className="text-red-600 text-sm">↓</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Slow Queries Alert */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-yellow-900 mb-1">Виявлено повільні запити</h4>
            <p className="text-yellow-700 text-sm">
              Знайдено {slowQueries.length} запитів, які потребують оптимізації. Перегляньте рекомендації нижче.
            </p>
          </div>
        </div>
      </div>

      {/* Query Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-gray-900">Статистика запитів</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="total_time">За загальним часом</option>
            <option value="avg_time">За середнім часом</option>
            <option value="calls">За кількістю викликів</option>
            <option value="hit_ratio">За коефіцієнтом попадань</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Запит</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Виклики</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Загальний час</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Середній час</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Мін/Макс</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Рядки</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Попадання кешу</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {queryStats.map((stat, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 max-w-md">
                    <code className="text-xs text-gray-900 line-clamp-2">{stat.query}</code>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{stat.calls.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {stat.totalTime}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{stat.avgTime}</td>
                  <td className="px-6 py-4 text-gray-600 text-xs">
                    {stat.minTime} / {stat.maxTime}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{stat.rows.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 max-w-[60px]">
                        <div
                          className={`h-2 rounded-full ${
                            parseFloat(stat.hitRatio) > 90 ? 'bg-green-500' : parseFloat(stat.hitRatio) > 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: stat.hitRatio }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{stat.hitRatio}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slow Queries & Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Повільні запити та рекомендації</h3>
        </div>
        <div className="p-6 space-y-4">
          {slowQueries.map((query, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <code className="text-sm text-gray-900 block mb-2">{query.query}</code>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Середній час: {query.avgTime}
                    </span>
                    <span>{query.calls} викликів</span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded text-xs ${
                    query.impact === 'Висока'
                      ? 'bg-red-100 text-red-700'
                      : query.impact === 'Середня'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {query.impact} важливість
                </span>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                <p className="text-blue-900 text-sm">
                  <strong>Рекомендація:</strong> {query.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Index Usage */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Використання індексів</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Таблиця</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Індекс</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Сканування</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Прочитано рядків</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Використання</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Розмір</th>
                <th className="px-6 py-3 text-right text-gray-700 text-sm">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {indexUsage.map((idx, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{idx.table}</td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-gray-600">{idx.index}</code>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{idx.scans.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{idx.rowsRead.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 max-w-[80px]">
                        <div
                          className={`h-2 rounded-full ${
                            parseInt(idx.usage) > 70 ? 'bg-green-500' : parseInt(idx.usage) > 30 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: idx.usage }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{idx.usage}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{idx.size}</td>
                  <td className="px-6 py-4 text-right">
                    {parseInt(idx.usage) < 10 && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                        Не використовується
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
