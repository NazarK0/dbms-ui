import { useState } from 'react';
import { Search, Download, RefreshCw, Filter, AlertCircle, Info, AlertTriangle, XCircle, FileText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';

interface LogEntry {
  id: number;
  timestamp: string;
  level: 'ERROR' | 'WARNING' | 'INFO';
  source: string;
  database: string;
  user: string;
  message: string;
  details: string;
}

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  const logs: LogEntry[] = [
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
    {
      id: 11,
      timestamp: '2024-11-30 14:12:05',
      level: 'ERROR',
      source: 'PostgreSQL',
      database: 'production_db',
      user: 'app_user',
      message: 'порушення зовнішнього ключа',
      details: 'ERROR: insert or update on table "orders" violates foreign key constraint',
    },
    {
      id: 12,
      timestamp: '2024-11-30 14:10:33',
      level: 'INFO',
      source: 'Query',
      database: 'analytics_db',
      user: 'analyst',
      message: 'звіт успішно згенеровано',
      details: 'Monthly report generated: 15,234 rows processed',
    },
    {
      id: 13,
      timestamp: '2024-11-30 14:08:18',
      level: 'WARNING',
      source: 'Replication',
      database: 'production_db',
      user: 'replicator',
      message: 'затримка реплікації перевищена',
      details: 'Replica lag: 1.2s (threshold: 500ms)',
    },
    {
      id: 14,
      timestamp: '2024-11-30 14:05:47',
      level: 'INFO',
      source: 'PostgreSQL',
      database: 'staging_db',
      user: 'developer',
      message: 'індекс створено успішно',
      details: 'CREATE INDEX idx_users_email ON users(email)',
    },
    {
      id: 15,
      timestamp: '2024-11-30 14:02:22',
      level: 'ERROR',
      source: 'Backup',
      database: 'production_db',
      user: 'system',
      message: 'помилка створення резервної копії',
      details: 'ERROR: insufficient disk space for backup operation',
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

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'ERROR':
        return { variant: 'destructive' as const, icon: XCircle, className: 'bg-red-100 text-red-700 border-red-300' };
      case 'WARNING':
        return { variant: 'default' as const, icon: AlertTriangle, className: 'bg-yellow-100 text-yellow-700 border-yellow-300' };
      case 'INFO':
        return { variant: 'secondary' as const, icon: Info, className: 'bg-blue-100 text-blue-700 border-blue-300' };
      default:
        return { variant: 'outline' as const, icon: AlertCircle, className: '' };
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
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Оновити
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700">
            <Download className="w-4 h-4 mr-2" />
            Експорт
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-slate-600 text-sm mb-1">Всього записів</p>
            <p className="text-slate-900 text-2xl">{logStats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <p className="text-slate-600 text-sm mb-1">Помилки</p>
            <p className="text-red-600 text-2xl">{logStats.errors}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <p className="text-slate-600 text-sm mb-1">Попередження</p>
            <p className="text-yellow-600 text-2xl">{logStats.warnings}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <p className="text-slate-600 text-sm mb-1">Інформаційні</p>
            <p className="text-blue-600 text-2xl">{logStats.info}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative md:col-span-2">
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

      {/* Logs Table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-lime-600" />
              <CardTitle>Записи логів</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-lime-100 text-lime-700 border-lime-300">
              {filteredLogs.length} записів
            </Badge>
          </div>
          <CardDescription>Хронологічний список подій системи</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                  <TableHead className="w-[140px] font-medium">Час</TableHead>
                  <TableHead className="w-[100px] font-medium">Рівень</TableHead>
                  <TableHead className="w-[120px] font-medium">Джерело</TableHead>
                  <TableHead className="w-[140px] font-medium">База даних</TableHead>
                  <TableHead className="w-[120px] font-medium">Користувач</TableHead>
                  <TableHead className="font-medium">Повідомлення</TableHead>
                  <TableHead className="w-[80px] text-center font-medium">Деталі</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentLogs.length > 0 ? (
                  currentLogs.map((log) => {
                    const levelConfig = getLevelBadge(log.level);
                    const Icon = levelConfig.icon;
                    return (
                      <TableRow key={log.id} className="hover:bg-slate-50/50">
                        <TableCell className="font-mono text-xs text-slate-600">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>
                          <Badge variant={levelConfig.variant} className={`${levelConfig.className} gap-1`}>
                            <Icon className="w-3 h-3" />
                            {log.level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {log.source}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-700 font-medium">
                          {log.database}
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {log.user}
                        </TableCell>
                        <TableCell className="text-sm text-slate-900 max-w-md truncate">
                          {log.message}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => setSelectedLog(log)}
                          >
                            <Eye className="w-4 h-4 text-slate-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                      Записів не знайдено
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredLogs.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/30">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Показувати по:</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[70px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-slate-600">
                  Показано {startIndex + 1}-{Math.min(endIndex, filteredLogs.length)} з {filteredLogs.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current
                      return (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => {
                      // Add ellipsis
                      const prevPage = array[index - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;
                      
                      return (
                        <div key={page} className="flex items-center gap-1">
                          {showEllipsis && (
                            <span className="px-2 text-slate-400">...</span>
                          )}
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={`h-8 w-8 p-0 ${
                              currentPage === page 
                                ? 'bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700' 
                                : ''
                            }`}
                          >
                            {page}
                          </Button>
                        </div>
                      );
                    })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Log Details Modal */}
      <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-lime-600" />
              Деталі запису логу
            </DialogTitle>
            <DialogDescription>
              Повна інформація про подію системи
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Час події</p>
                  <p className="text-sm font-mono bg-slate-100 px-3 py-2 rounded">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Рівень</p>
                  <div>
                    {(() => {
                      const levelConfig = getLevelBadge(selectedLog.level);
                      const Icon = levelConfig.icon;
                      return (
                        <Badge variant={levelConfig.variant} className={`${levelConfig.className} gap-1`}>
                          <Icon className="w-3 h-3" />
                          {selectedLog.level}
                        </Badge>
                      );
                    })()}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Джерело</p>
                  <Badge variant="outline">{selectedLog.source}</Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">База даних</p>
                  <p className="text-sm font-medium">{selectedLog.database}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-600 mb-1">Користувач</p>
                  <p className="text-sm font-medium">{selectedLog.user}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-2">Повідомлення</p>
                <p className="text-sm bg-slate-100 px-3 py-2 rounded">{selectedLog.message}</p>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-2">Технічні деталі</p>
                <div className="bg-slate-900 rounded-lg p-4">
                  <code className="text-sm text-slate-100 font-mono whitespace-pre-wrap break-all">
                    {selectedLog.details}
                  </code>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}