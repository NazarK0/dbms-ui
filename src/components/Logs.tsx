import { useState } from 'react';
import { Search, Download, RefreshCw, Filter, AlertCircle, Info, AlertTriangle, XCircle } from 'lucide-react';

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');

  const logs = [
    {
      id: 1,
      timestamp: '2024-11-30 14:32:15',
      level: 'ERROR',
      source: 'PostgreSQL',
      database: 'production_db',
      user: 'app_user',
      message: 'помилка підключення: занадто багато клієнтів',
      details: 'FATAL: sorry, too many clients already',
    },
    {
      id: 2,
      timestamp: '2024-11-30 14:31:42',
      level: 'WARNING',
      source: 'Backup',
      database: 'analytics_db',
      user: 'system',
      message: 'резервне копіювання зайняло більше часу, ніж очікувалося',
      details: 'Backup duration: 45m 23s (expected: < 30m)',
    },
    {
      id: 3,
      timestamp: '2024-11-30 14:30:18',
      level: 'INFO',
      source: 'Replication',
      database: 'production_db',
      user: 'replicator',
      message: 'репліка успішно синхронізована',
      details: 'Replica lag: 12ms',
    },
    {
      id: 4,
      timestamp: '2024-11-30 14:28:55',
      level: 'ERROR',
      source: 'Query',
      database: 'production_db',
      user: 'developer',
      message: 'синтаксична помилка в SQL запиті',
      details: 'ERROR: syntax error at or near "FORM" at line 1',
    },
    {
      id: 5,
      timestamp: '2024-11-30 14:27:33',
      level: 'WARNING',
      source: 'Performance',
      database: 'analytics_db',
      user: 'analyst',
      message: 'повільний запит виявлено',
      details: 'Query execution time: 2.4s (threshold: 1s)',
    },
    {
      id: 6,
      timestamp: '2024-11-30 14:25:10',
      level: 'INFO',
      source: 'PostgreSQL',
      database: 'staging_db',
      user: 'admin',
      message: 'таблицю успішно створено',
      details: 'CREATE TABLE test_table completed',
    },
    {
      id: 7,
      timestamp: '2024-11-30 14:23:45',
      level: 'ERROR',
      source: 'PostgreSQL',
      database: 'production_db',
      user: 'app_user',
      message: 'deadlock виявлено',
      details: 'ERROR: deadlock detected; Process 1234 waits for ShareLock',
    },
    {
      id: 8,
      timestamp: '2024-11-30 14:20:12',
      level: 'INFO',
      source: 'Extension',
      database: 'production_db',
      user: 'admin',
      message: 'розширення успішно встановлено',
      details: 'CREATE EXTENSION pg_stat_statements',
    },
    {
      id: 9,
      timestamp: '2024-11-30 14:18:30',
      level: 'WARNING',
      source: 'PostgreSQL',
      database: 'production_db',
      user: 'system',
      message: 'високе використання дискового простору',
      details: 'Database size: 8.7 GB (threshold: 8 GB)',
    },
    {
      id: 10,
      timestamp: '2024-11-30 14:15:22',
      level: 'INFO',
      source: 'Backup',
      database: 'production_db',
      user: 'system',
      message: 'резервне копіювання завершено успішно',
      details: 'Backup file: production_db_2024_11_30.sql (1.2 GB)',
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.database.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
    const matchesSource = selectedSource === 'all' || log.source === selectedSource;
    
    return matchesSearch && matchesLevel && matchesSource;
  });

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'ERROR':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'INFO':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-50 border-red-200';
      case 'WARNING':
        return 'bg-yellow-50 border-yellow-200';
      case 'INFO':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const logStats = {
    total: logs.length,
    errors: logs.filter((l) => l.level === 'ERROR').length,
    warnings: logs.filter((l) => l.level === 'WARNING').length,
    info: logs.filter((l) => l.level === 'INFO').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Системні логи</h2>
          <p className="text-gray-600">Журнал подій та помилок системи</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Оновити
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Експорт логів
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Всього записів</p>
          <p className="text-gray-900 mt-2">{logStats.total}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Помилки</p>
          <p className="text-red-600 mt-2">{logStats.errors}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Попередження</p>
          <p className="text-yellow-600 mt-2">{logStats.warnings}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Інформаційні</p>
          <p className="text-blue-600 mt-2">{logStats.info}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Пошук логів..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Всі рівні</option>
              <option value="ERROR">Помилки</option>
              <option value="WARNING">Попередження</option>
              <option value="INFO">Інформація</option>
            </select>
          </div>
          <div>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Всі джерела</option>
              <option value="PostgreSQL">PostgreSQL</option>
              <option value="Backup">Резервне копіювання</option>
              <option value="Replication">Реплікація</option>
              <option value="Query">Запити</option>
              <option value="Performance">Продуктивність</option>
              <option value="Extension">Розширення</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-gray-900">Записи логів ({filteredLogs.length})</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>Відфільтровано</span>
          </div>
        </div>
        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {filteredLogs.map((log) => (
            <div key={log.id} className={`p-4 border-l-4 ${getLogColor(log.level)}`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getLogIcon(log.level)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          log.level === 'ERROR' ? 'bg-red-100 text-red-700' :
                          log.level === 'WARNING' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {log.level}
                        </span>
                        <span className="text-xs text-gray-500">{log.source}</span>
                      </div>
                      <p className="text-gray-900">{log.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{log.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>БД: {log.database}</span>
                    <span>•</span>
                    <span>Користувач: {log.user}</span>
                  </div>
                  <div className="bg-gray-100 rounded p-2 mt-2">
                    <code className="text-xs text-gray-800">{log.details}</code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
