import { useState } from 'react';
import { History, Download, Search, Filter, Calendar, User, Database, Shield, Table as TableIcon, FileCode, Copy, HardDrive, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

type ActionType = 'create' | 'update' | 'delete' | 'select' | 'grant' | 'revoke' | 'login' | 'backup';

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: ActionType;
  category: string;
  target: string;
  details: string;
  ip: string;
  status: 'success' | 'failed';
}

export default function AuditLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUser, setFilterUser] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const auditEntries: AuditEntry[] = [
    {
      id: '1',
      timestamp: '2024-12-12 14:23:15',
      user: 'admin',
      action: 'create',
      category: 'База даних',
      target: 'production_v2',
      details: 'Створено нову базу даних з кодуванням UTF-8',
      ip: '192.168.1.100',
      status: 'success',
    },
    {
      id: '2',
      timestamp: '2024-12-12 14:15:42',
      user: 'developer',
      action: 'update',
      category: 'Таблиця',
      target: 'users.email',
      details: 'Змінено тип поля з VARCHAR(255) на TEXT',
      ip: '192.168.1.105',
      status: 'success',
    },
    {
      id: '3',
      timestamp: '2024-12-12 14:08:33',
      user: 'analyst',
      action: 'select',
      category: 'Запит',
      target: 'SELECT * FROM orders',
      details: 'Виконано SELECT запит, повернуто 1523 рядки',
      ip: '192.168.1.110',
      status: 'success',
    },
    {
      id: '4',
      timestamp: '2024-12-12 13:55:19',
      user: 'admin',
      action: 'grant',
      category: 'Права доступу',
      target: 'developer → staging_db',
      details: 'Надано права SELECT, INSERT, UPDATE на staging_db',
      ip: '192.168.1.100',
      status: 'success',
    },
    {
      id: '5',
      timestamp: '2024-12-12 13:42:07',
      user: 'app_user',
      action: 'delete',
      category: 'Таблиця',
      target: 'temp_cache',
      details: 'Видалено 342 застарілих записів з таблиці',
      ip: '10.0.0.45',
      status: 'success',
    },
    {
      id: '6',
      timestamp: '2024-12-12 13:30:25',
      user: 'backup_service',
      action: 'backup',
      category: 'Резервна копія',
      target: 'production_db',
      details: 'Створено повну резервну копію (2.3 GB)',
      ip: '10.0.0.50',
      status: 'success',
    },
    {
      id: '7',
      timestamp: '2024-12-12 13:15:52',
      user: 'developer',
      action: 'create',
      category: 'Функція',
      target: 'calculate_order_total()',
      details: 'Створено PL/pgSQL функцію для розрахунку суми замовлень',
      ip: '192.168.1.105',
      status: 'success',
    },
    {
      id: '8',
      timestamp: '2024-12-12 12:58:41',
      user: 'developer',
      action: 'delete',
      category: 'База даних',
      target: 'test_old',
      details: 'Спроба видалення бази даних (відмовлено - активні підключення)',
      ip: '192.168.1.105',
      status: 'failed',
    },
    {
      id: '9',
      timestamp: '2024-12-12 12:45:18',
      user: 'admin',
      action: 'create',
      category: 'Користувач',
      target: 'new_analyst',
      details: 'Створено нового користувача з роллю Analyst',
      ip: '192.168.1.100',
      status: 'success',
    },
    {
      id: '10',
      timestamp: '2024-12-12 12:30:09',
      user: 'analyst',
      action: 'login',
      category: 'Автентифікація',
      target: 'PostgreSQL Server',
      details: 'Успішний вхід в систему',
      ip: '192.168.1.110',
      status: 'success',
    },
    {
      id: '11',
      timestamp: '2024-12-12 12:15:33',
      user: 'developer',
      action: 'create',
      category: 'Тригер',
      target: 'before_user_update',
      details: 'Створено тригер для валідації даних перед оновленням',
      ip: '192.168.1.105',
      status: 'success',
    },
    {
      id: '12',
      timestamp: '2024-12-12 11:58:22',
      user: 'admin',
      action: 'revoke',
      category: 'Права доступу',
      target: 'temp_user → production_db',
      details: 'Відкликано всі права доступу до production_db',
      ip: '192.168.1.100',
      status: 'success',
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'База даних': return Database;
      case 'Таблиця': return TableIcon;
      case 'Запит': return FileCode;
      case 'Права доступу': return Shield;
      case 'Резервна копія': return Copy;
      case 'Функція': return Activity;
      case 'Тригер': return Activity;
      case 'Користувач': return User;
      case 'Автентифікація': return Shield;
      default: return Activity;
    }
  };

  const getActionBadge = (action: ActionType) => {
    const badges = {
      create: { variant: 'default' as const, label: 'Створення', color: 'from-green-500 to-lime-600' },
      update: { variant: 'secondary' as const, label: 'Оновлення', color: 'from-yellow-500 to-lime-600' },
      delete: { variant: 'destructive' as const, label: 'Видалення', color: 'from-red-500 to-red-600' },
      select: { variant: 'outline' as const, label: 'Вибірка', color: 'from-slate-500 to-slate-600' },
      grant: { variant: 'default' as const, label: 'Надання прав', color: 'from-lime-500 to-green-600' },
      revoke: { variant: 'destructive' as const, label: 'Відкликання', color: 'from-orange-500 to-red-600' },
      login: { variant: 'outline' as const, label: 'Вхід', color: 'from-blue-500 to-blue-600' },
      backup: { variant: 'secondary' as const, label: 'Резервування', color: 'from-lime-600 to-yellow-600' },
    };
    return badges[action];
  };

  const statistics = {
    total: auditEntries.length,
    today: auditEntries.filter(e => e.timestamp.startsWith('2024-12-12')).length,
    success: auditEntries.filter(e => e.status === 'success').length,
    failed: auditEntries.filter(e => e.status === 'failed').length,
  };

  const actionsByType = {
    create: auditEntries.filter(e => e.action === 'create').length,
    update: auditEntries.filter(e => e.action === 'update').length,
    delete: auditEntries.filter(e => e.action === 'delete').length,
    query: auditEntries.filter(e => e.action === 'select').length,
  };

  const filteredEntries = auditEntries.filter(entry => {
    const matchesSearch = 
      entry.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUser = filterUser === 'all' || entry.user === filterUser;
    const matchesAction = filterAction === 'all' || entry.action === filterAction;
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;

    return matchesSearch && matchesUser && matchesAction && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center">
                <History className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">{statistics.total}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Всього подій</CardTitle>
            <CardDescription>За весь період</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-lime-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">{statistics.today}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Сьогодні</CardTitle>
            <CardDescription>Події за 12 грудня</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-lime-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <Badge variant="default" className="text-lg">{statistics.success}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Успішних</CardTitle>
            <CardDescription>Виконано без помилок</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm border-red-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <Badge variant="destructive" className="text-lg">{statistics.failed}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Помилкових</CardTitle>
            <CardDescription>Виконано з помилками</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Action Type Statistics */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Статистика за типом дій</CardTitle>
          <CardDescription>Розподіл операцій в системі</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-600 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Створення</p>
                  <p className="text-2xl text-slate-900">{actionsByType.create}</p>
                </div>
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-lime-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Оновлення</p>
                  <p className="text-2xl text-slate-900">{actionsByType.update}</p>
                </div>
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <HardDrive className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Видалення</p>
                  <p className="text-2xl text-slate-900">{actionsByType.delete}</p>
                </div>
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-lime-600 to-yellow-600 rounded-lg flex items-center justify-center">
                  <FileCode className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Запити</p>
                  <p className="text-2xl text-slate-900">{actionsByType.query}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Історія всіх дій</CardTitle>
              <CardDescription>Повний аудит лог операцій в системі</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Експорт
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Пошук по діям..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger>
                  <User className="w-4 h-4 mr-2 text-slate-400" />
                  <SelectValue placeholder="Користувач" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі користувачі</SelectItem>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="developer">developer</SelectItem>
                  <SelectItem value="analyst">analyst</SelectItem>
                  <SelectItem value="app_user">app_user</SelectItem>
                  <SelectItem value="backup_service">backup_service</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2 text-slate-400" />
                  <SelectValue placeholder="Тип дії" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі дії</SelectItem>
                  <SelectItem value="create">Створення</SelectItem>
                  <SelectItem value="update">Оновлення</SelectItem>
                  <SelectItem value="delete">Видалення</SelectItem>
                  <SelectItem value="select">Вибірка</SelectItem>
                  <SelectItem value="grant">Надання прав</SelectItem>
                  <SelectItem value="revoke">Відкликання</SelectItem>
                  <SelectItem value="login">Вхід</SelectItem>
                  <SelectItem value="backup">Резервування</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <Database className="w-4 h-4 mr-2 text-slate-400" />
                  <SelectValue placeholder="Категорія" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі категорії</SelectItem>
                  <SelectItem value="База даних">База даних</SelectItem>
                  <SelectItem value="Таблиця">Таблиця</SelectItem>
                  <SelectItem value="Запит">Запит</SelectItem>
                  <SelectItem value="Права доступу">Права доступу</SelectItem>
                  <SelectItem value="Резервна копія">Резервна копія</SelectItem>
                  <SelectItem value="Функція">Функція</SelectItem>
                  <SelectItem value="Тригер">Тригер</SelectItem>
                  <SelectItem value="Користувач">Користувач</SelectItem>
                  <SelectItem value="Автентифікація">Автентифікація</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Знайдено записів: <strong>{filteredEntries.length}</strong> з {auditEntries.length}</span>
              {(searchQuery || filterUser !== 'all' || filterAction !== 'all' || filterCategory !== 'all') && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterUser('all');
                    setFilterAction('all');
                    setFilterCategory('all');
                  }}
                >
                  Скинути фільтри
                </Button>
              )}
            </div>

            {/* Audit Log Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Час</TableHead>
                    <TableHead>Користувач</TableHead>
                    <TableHead>Дія</TableHead>
                    <TableHead>Категорія</TableHead>
                    <TableHead>Ціль</TableHead>
                    <TableHead>Деталі</TableHead>
                    <TableHead>IP адреса</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => {
                    const Icon = getCategoryIcon(entry.category);
                    const actionBadge = getActionBadge(entry.action);
                    
                    return (
                      <TableRow key={entry.id} className={entry.status === 'failed' ? 'bg-red-50/50' : ''}>
                        <TableCell className="text-slate-600 text-sm font-mono">
                          {entry.timestamp}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-slate-900">{entry.user}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={actionBadge.variant}>
                            {actionBadge.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-700">{entry.category}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-900 font-mono text-sm max-w-xs truncate">
                          {entry.target}
                        </TableCell>
                        <TableCell className="text-slate-600 text-sm max-w-md truncate">
                          {entry.details}
                        </TableCell>
                        <TableCell className="text-slate-600 text-sm font-mono">
                          {entry.ip}
                        </TableCell>
                        <TableCell>
                          {entry.status === 'success' ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                              Успішно
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                              Помилка
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
