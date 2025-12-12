import { useState } from 'react';
import { Search, Download, RefreshCw, Filter, AlertCircle, Info, AlertTriangle, XCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';

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
        return <AlertCircle className="w-5 h-5 text-slate-600" />;
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-50/50 border-red-300';
      case 'WARNING':
        return 'bg-yellow-50/50 border-yellow-300';
      case 'INFO':
        return 'bg-blue-50/50 border-blue-300';
      default:
        return 'bg-slate-50/50 border-slate-300';
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'destructive';
      case 'WARNING':
        return 'default';
      case 'INFO':
        return 'secondary';
      default:
        return 'outline';
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
          <h2 className="text-slate-900">Системні логи</h2>
          <p className="text-slate-600">Журнал подій та помилок системи</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Оновити
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Експорт логів
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-slate-600 text-sm mb-1">Всього записів</p>
            <p className="text-slate-900 text-3xl">{logStats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <p className="text-slate-600 text-sm mb-1">Помилки</p>
            <p className="text-red-600 text-3xl">{logStats.errors}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <p className="text-slate-600 text-sm mb-1">Попередження</p>
            <p className="text-yellow-600 text-3xl">{logStats.warnings}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <p className="text-slate-600 text-sm mb-1">Інформаційні</p>
            <p className="text-blue-600 text-3xl">{logStats.info}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Пошук логів..."
                className="pl-10"
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Всі рівні" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі рівні</SelectItem>
                <SelectItem value="ERROR">Помилки</SelectItem>
                <SelectItem value="WARNING">Попередження</SelectItem>
                <SelectItem value="INFO">Інформація</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger>
                <SelectValue placeholder="Всі джерела" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі джерела</SelectItem>
                <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                <SelectItem value="Backup">Резервне копіювання</SelectItem>
                <SelectItem value="Replication">Реплікація</SelectItem>
                <SelectItem value="Query">Запити</SelectItem>
                <SelectItem value="Performance">Продуктивність</SelectItem>
                <SelectItem value="Extension">Розширення</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-700" />
              <CardTitle>Записи логів ({filteredLogs.length})</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-600">Відфільтровано</span>
            </div>
          </div>
          <CardDescription>Хронологічний список подій системи</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="divide-y divide-slate-200">
              {filteredLogs.map((log) => (
                <div key={log.id} className={`p-4 border-l-4 ${getLogColor(log.level)} hover:bg-slate-50/50 transition-colors`}>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex-shrink-0">{getLogIcon(log.level)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={getLevelBadge(log.level) as any}>
                            {log.level}
                          </Badge>
                          <Badge variant="outline">{log.source}</Badge>
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap font-mono">
                          {log.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-900 mb-3">{log.message}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <span>БД: <span className="font-medium">{log.database}</span></span>
                        <span className="text-slate-400">•</span>
                        <span>Користувач: <span className="font-medium">{log.user}</span></span>
                      </div>
                      <div className="bg-slate-900 rounded-lg p-3">
                        <code className="text-xs text-slate-100 font-mono">{log.details}</code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
