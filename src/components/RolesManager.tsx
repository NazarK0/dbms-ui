import { useState } from 'react';
import { Shield, Plus, Edit, Trash2, Key, Lock, Users, LayoutDashboard, Database, UserCircle, Terminal, Activity, Server, Archive, FileText, Settings, Eye, ShieldCheck, Table2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Fragment } from 'react';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Switch } from './ui/switch';

export default function RolesManager() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState<any>(null);

  // UI visibility settings
  const [uiSettings, setUiSettings] = useState({
    dashboard: true,
    databases: true,
    users: false,
    roles: false,
    query: true,
    performance: true,
    clusters: false,
    backups: true,
    logs: true,
    config: false,
  });

  // Row Level Security policies
  const [rlsPolicies, setRlsPolicies] = useState<{[key: string]: {
    enabled: boolean;
    select: boolean;
    insert: boolean;
    update: boolean;
    delete: boolean;
    using: string;
    withCheck: string;
  }}>({
    'users': {
      enabled: false,
      select: true,
      insert: false,
      update: false,
      delete: false,
      using: 'user_id = current_user_id()',
      withCheck: 'user_id = current_user_id()'
    },
    'orders': {
      enabled: false,
      select: true,
      insert: true,
      update: true,
      delete: false,
      using: 'company_id = current_user_company_id()',
      withCheck: 'company_id = current_user_company_id()'
    },
    'products': {
      enabled: false,
      select: true,
      insert: false,
      update: false,
      delete: false,
      using: 'is_public = true OR owner_id = current_user_id()',
      withCheck: 'owner_id = current_user_id()'
    },
    'audit_logs': {
      enabled: false,
      select: true,
      insert: false,
      update: false,
      delete: false,
      using: 'user_id = current_user_id() OR current_user_role() = \'admin\'',
      withCheck: 'false'
    }
  });

  const roles = [
    { 
      name: 'Superadmin', 
      users: 2, 
      description: 'Повний доступ до всіх функцій системи',
      color: 'from-red-500 to-red-600',
      badge: 'destructive'
    },
    { 
      name: 'Database Admin', 
      users: 5, 
      description: 'Управління базами даних, таблицями, схемами',
      color: 'from-lime-500 to-green-600',
      badge: 'default'
    },
    { 
      name: 'Developer', 
      users: 12, 
      description: 'Доступ до query editor, перегляд схем',
      color: 'from-yellow-500 to-lime-600',
      badge: 'secondary'
    },
    { 
      name: 'Analyst', 
      users: 8, 
      description: 'Тільки читання даних, виконання SELECT запитів',
      color: 'from-green-500 to-lime-600',
      badge: 'outline'
    },
    { 
      name: 'Viewer', 
      users: 15, 
      description: 'Перегляд метрик та моніторингу без можливості змін',
      color: 'from-lime-600 to-yellow-600',
      badge: 'secondary'
    },
  ];

  const permissions = [
    {
      category: 'Управління базами даних',
      items: [
        { id: 'db_create', name: 'Створення БД', superadmin: true, dbadmin: true, developer: false, analyst: false, viewer: false },
        { id: 'db_delete', name: 'Видалення БД', superadmin: true, dbadmin: true, developer: false, analyst: false, viewer: false },
        { id: 'db_modify', name: 'Модифікація БД', superadmin: true, dbadmin: true, developer: false, analyst: false, viewer: false },
        { id: 'db_view', name: 'Перегляд БД', superadmin: true, dbadmin: true, developer: true, analyst: true, viewer: true },
      ]
    },
    {
      category: 'Управління таблицями',
      items: [
        { id: 'table_create', name: 'Створення таблиць', superadmin: true, dbadmin: true, developer: true, analyst: false, viewer: false },
        { id: 'table_delete', name: 'Видалення таблиць', superadmin: true, dbadmin: true, developer: false, analyst: false, viewer: false },
        { id: 'table_alter', name: 'Зміна структури', superadmin: true, dbadmin: true, developer: true, analyst: false, viewer: false },
        { id: 'table_view', name: 'Перегляд схеми', superadmin: true, dbadmin: true, developer: true, analyst: true, viewer: true },
      ]
    },
    {
      category: 'SQL запити',
      items: [
        { id: 'sql_select', name: 'SELECT запити', superadmin: true, dbadmin: true, developer: true, analyst: true, viewer: false },
        { id: 'sql_insert', name: 'INSERT запити', superadmin: true, dbadmin: true, developer: true, analyst: false, viewer: false },
        { id: 'sql_update', name: 'UPDATE запити', superadmin: true, dbadmin: true, developer: true, analyst: false, viewer: false },
        { id: 'sql_delete', name: 'DELETE запити', superadmin: true, dbadmin: true, developer: false, analyst: false, viewer: false },
      ]
    },
    {
      category: 'Управління користувачами',
      items: [
        { id: 'user_create', name: 'Створення користувачів', superadmin: true, dbadmin: false, developer: false, analyst: false, viewer: false },
        { id: 'user_delete', name: 'Видалення користувачів', superadmin: true, dbadmin: false, developer: false, analyst: false, viewer: false },
        { id: 'user_modify', name: 'Зміна користувачів', superadmin: true, dbadmin: false, developer: false, analyst: false, viewer: false },
        { id: 'user_view', name: 'Перегляд користувачів', superadmin: true, dbadmin: true, developer: false, analyst: false, viewer: false },
      ]
    },
    {
      category: 'Розширення та функції',
      items: [
        { id: 'ext_install', name: 'Встановлення розширень', superadmin: true, dbadmin: true, developer: false, analyst: false, viewer: false },
        { id: 'func_create', name: 'Створення функцій', superadmin: true, dbadmin: true, developer: true, analyst: false, viewer: false },
        { id: 'trigger_create', name: 'Створення тригерів', superadmin: true, dbadmin: true, developer: true, analyst: false, viewer: false },
      ]
    },
    {
      category: 'Резервне копіювання',
      items: [
        { id: 'backup_create', name: 'Створення бекапів', superadmin: true, dbadmin: true, developer: false, analyst: false, viewer: false },
        { id: 'backup_restore', name: 'Відновлення з бекапів', superadmin: true, dbadmin: true, developer: false, analyst: false, viewer: false },
        { id: 'backup_view', name: 'Перегляд бекапів', superadmin: true, dbadmin: true, developer: true, analyst: false, viewer: false },
      ]
    },
    {
      category: 'Моніторинг та логи',
      items: [
        { id: 'monitor_view', name: 'Перегляд метрик', superadmin: true, dbadmin: true, developer: true, analyst: true, viewer: true },
        { id: 'logs_view', name: 'Перегляд логів', superadmin: true, dbadmin: true, developer: true, analyst: false, viewer: false },
        { id: 'performance_view', name: 'Аналіз продуктивності', superadmin: true, dbadmin: true, developer: true, analyst: true, viewer: true },
      ]
    },
  ];

  const roleHistory = [
    { action: 'Створено роль "Developer"', user: 'admin', timestamp: '2024-01-20 14:30', type: 'create' },
    { action: 'Змінено права ролі "Analyst"', user: 'admin', timestamp: '2024-01-20 10:15', type: 'modify' },
    { action: 'Видалено роль "Temporary"', user: 'root', timestamp: '2024-01-19 16:45', type: 'delete' },
  ];

  // UI menu items configuration
  const uiMenuItems = [
    { id: 'dashboard', label: 'Панель управління', icon: LayoutDashboard, description: 'Головний дашборд з метриками' },
    { id: 'databases', label: 'Бази даних', icon: Database, description: 'Управління БД, схемами та таблицями' },
    { id: 'users', label: 'Користувачі', icon: UserCircle, description: 'Керування користувачами системи' },
    { id: 'roles', label: 'Ролі', icon: Shield, description: 'Управління ролями та правами доступу' },
    { id: 'query', label: 'SQL редактор', icon: Terminal, description: 'Виконання SQL запитів' },
    { id: 'performance', label: 'Продуктивність', icon: Activity, description: 'Аналіз продуктивності БД' },
    { id: 'clusters', label: 'Кластери', icon: Server, description: 'Управління реплікацією та кластерами' },
    { id: 'backups', label: 'Резервні копії', icon: Archive, description: 'Бекапи та відновлення' },
    { id: 'logs', label: 'Логи', icon: FileText, description: 'Системні логи та історія дій' },
    { id: 'config', label: 'Конфігурація', icon: Settings, description: 'Параметри PostgreSQL' },
  ];

  const handleUiSettingChange = (settingId: string) => {
    setUiSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId as keyof typeof prev]
    }));
  };

  const handleEditRole = (role: any) => {
    setEditingRole(role);
    // Reset UI settings based on role (mock data)
    if (role.name === 'Database Admin') {
      setUiSettings({
        dashboard: true,
        databases: true,
        users: false,
        roles: false,
        query: true,
        performance: true,
        clusters: true,
        backups: true,
        logs: true,
        config: true,
      });
    } else if (role.name === 'Developer') {
      setUiSettings({
        dashboard: true,
        databases: true,
        users: false,
        roles: false,
        query: true,
        performance: true,
        clusters: false,
        backups: false,
        logs: false,
        config: false,
      });
    }
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">5</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Всього ролей</CardTitle>
            <CardDescription>Активні ролі в системі</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-lime-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">42</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Користувачів</CardTitle>
            <CardDescription>З призначеними ролями</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-lime-600 rounded-xl flex items-center justify-center">
                <Key className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">47</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Дозволів</CardTitle>
            <CardDescription>Унікальних прав доступу</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Roles List */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ролі системи</CardTitle>
              <CardDescription>Управління ролями та їх описом</CardDescription>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Створити роль
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <div 
                key={role.name} 
                className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setSelectedRole(role.name)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center`}>
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-slate-900">{role.name}</h4>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      {role.users} користувачів
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-4">{role.description}</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditRole(role)}>
                    <Edit className="w-3 h-3 mr-1" />
                    Редагувати
                  </Button>
                  {role.name !== 'Superadmin' && (
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RBAC Matrix */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-slate-700" />
            <CardTitle>Матриця прав доступу (RBAC)</CardTitle>
          </div>
          <CardDescription>Налаштування дозволів для кожної ролі</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-64">Дозвіл</TableHead>
                  <TableHead className="text-center">Superadmin</TableHead>
                  <TableHead className="text-center">DB Admin</TableHead>
                  <TableHead className="text-center">Developer</TableHead>
                  <TableHead className="text-center">Analyst</TableHead>
                  <TableHead className="text-center">Viewer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((group, groupIdx) => (
                  <Fragment key={`group-${groupIdx}`}>
                    <TableRow className="bg-slate-50">
                      <TableCell colSpan={6} className="font-medium text-slate-900">
                        {group.category}
                      </TableCell>
                    </TableRow>
                    {group.items.map((perm) => (
                      <TableRow key={perm.id}>
                        <TableCell className="text-slate-700">{perm.name}</TableCell>
                        <TableCell className="text-center">
                          <Checkbox checked={perm.superadmin} className="mx-auto" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox checked={perm.dbadmin} className="mx-auto" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox checked={perm.developer} className="mx-auto" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox checked={perm.analyst} className="mx-auto" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox checked={perm.viewer} className="mx-auto" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Role History */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Історія змін ролей</CardTitle>
          <CardDescription>Останні дії з ролями та правами доступу</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дія</TableHead>
                <TableHead>Користувач</TableHead>
                <TableHead>Час</TableHead>
                <TableHead>Тип</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roleHistory.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-slate-900">{item.action}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.user}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-600 text-sm">{item.timestamp}</TableCell>
                  <TableCell>
                    {item.type === 'create' && <Badge variant="default">Створення</Badge>}
                    {item.type === 'modify' && <Badge variant="secondary">Зміна</Badge>}
                    {item.type === 'delete' && <Badge variant="destructive">Видалення</Badge>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Role Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Створити нову роль</DialogTitle>
            <DialogDescription>Налаштуйте назву, опис, права доступу та видимість UI</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
            <div className="space-y-6 py-4">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="role-name">Назва ролі</Label>
                  <Input id="role-name" placeholder="Наприклад: Backend Developer" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="role-description">Опис ролі</Label>
                  <Textarea id="role-description" placeholder="Опишіть призначення та обов'язки ролі..." className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="base-role">Базувати на існуючій ролі</Label>
                  <select id="base-role" className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500">
                    <option value="">Почати з порожніх прав</option>
                    <option value="developer">Developer</option>
                    <option value="analyst">Analyst</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
              </div>

              <Separator />

              {/* UI Visibility Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-lime-600" />
                  <div>
                    <h4 className="text-slate-900">Видимість інтерфейсу адмін-панелі</h4>
                    <p className="text-sm text-slate-600">Оберіть які розділи будуть доступні для цієї ролі</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  {uiMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-lime-300 transition-colors">
                        <Checkbox
                          id={`ui-${item.id}`}
                          checked={uiSettings[item.id as keyof typeof uiSettings]}
                          onCheckedChange={() => handleUiSettingChange(item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor={`ui-${item.id}`} className="flex items-center gap-2 cursor-pointer">
                            <Icon className="w-4 h-4 text-slate-600" />
                            <span className="text-slate-900">{item.label}</span>
                          </Label>
                          <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900">
                    <strong>Примітка:</strong> Навіть якщо розділ видимий, фактичні можливості користувача будуть обмежені правами доступу RBAC.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Row Level Security */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-lime-600" />
                  <div>
                    <h4 className="text-slate-900">Row Level Security (RLS)</h4>
                    <p className="text-sm text-slate-600">Налаштуйте політики безпеки на рівні рядків для таблиць</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <p className="text-sm text-amber-900">
                    <strong>Важливо:</strong> RLS політики застосовуються на рівні PostgreSQL і обмежують доступ до даних незалежно від прав RBAC.
                  </p>
                </div>

                <div className="space-y-3">
                  {Object.entries(rlsPolicies).map(([tableName, policy]) => (
                    <div key={tableName} className="border border-slate-200 rounded-lg bg-white">
                      <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Table2 className="w-4 h-4 text-slate-600" />
                          <div>
                            <h5 className="text-slate-900">{tableName}</h5>
                            <p className="text-xs text-slate-500">Таблиця бази даних</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`rls-${tableName}`} className="text-sm text-slate-600">
                            {policy.enabled ? 'Увімкнено' : 'Вимкнено'}
                          </Label>
                          <Switch
                            id={`rls-${tableName}`}
                            checked={policy.enabled}
                            onCheckedChange={() => {
                              setRlsPolicies(prev => ({
                                ...prev,
                                [tableName]: { ...prev[tableName], enabled: !prev[tableName].enabled }
                              }));
                            }}
                          />
                        </div>
                      </div>
                      
                      {policy.enabled && (
                        <div className="p-4 space-y-4">
                          <div>
                            <Label className="text-sm text-slate-700 mb-2 block">Дозволені операції</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`${tableName}-select`}
                                  checked={policy.select}
                                  onCheckedChange={() => {
                                    setRlsPolicies(prev => ({
                                      ...prev,
                                      [tableName]: { ...prev[tableName], select: !prev[tableName].select }
                                    }));
                                  }}
                                />
                                <Label htmlFor={`${tableName}-select`} className="text-sm cursor-pointer">SELECT</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`${tableName}-insert`}
                                  checked={policy.insert}
                                  onCheckedChange={() => {
                                    setRlsPolicies(prev => ({
                                      ...prev,
                                      [tableName]: { ...prev[tableName], insert: !prev[tableName].insert }
                                    }));
                                  }}
                                />
                                <Label htmlFor={`${tableName}-insert`} className="text-sm cursor-pointer">INSERT</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`${tableName}-update`}
                                  checked={policy.update}
                                  onCheckedChange={() => {
                                    setRlsPolicies(prev => ({
                                      ...prev,
                                      [tableName]: { ...prev[tableName], update: !prev[tableName].update }
                                    }));
                                  }}
                                />
                                <Label htmlFor={`${tableName}-update`} className="text-sm cursor-pointer">UPDATE</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`${tableName}-delete`}
                                  checked={policy.delete}
                                  onCheckedChange={() => {
                                    setRlsPolicies(prev => ({
                                      ...prev,
                                      [tableName]: { ...prev[tableName], delete: !prev[tableName].delete }
                                    }));
                                  }}
                                />
                                <Label htmlFor={`${tableName}-delete`} className="text-sm cursor-pointer">DELETE</Label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor={`${tableName}-using`} className="text-sm text-slate-700 mb-2 block">
                              USING вираз (SELECT/UPDATE/DELETE)
                            </Label>
                            <Textarea
                              id={`${tableName}-using`}
                              value={policy.using}
                              onChange={(e) => {
                                setRlsPolicies(prev => ({
                                  ...prev,
                                  [tableName]: { ...prev[tableName], using: e.target.value }
                                }));
                              }}
                              placeholder="Наприклад: user_id = current_user_id()"
                              className="font-mono text-sm"
                              rows={2}
                            />
                            <p className="text-xs text-slate-500 mt-1">SQL умова, яка визначає які рядки доступні для читання і модифікації</p>
                          </div>

                          <div>
                            <Label htmlFor={`${tableName}-check`} className="text-sm text-slate-700 mb-2 block">
                              WITH CHECK вираз (INSERT/UPDATE)
                            </Label>
                            <Textarea
                              id={`${tableName}-check`}
                              value={policy.withCheck}
                              onChange={(e) => {
                                setRlsPolicies(prev => ({
                                  ...prev,
                                  [tableName]: { ...prev[tableName], withCheck: e.target.value }
                                }));
                              }}
                              placeholder="Наприклад: company_id = current_user_company_id()"
                              className="font-mono text-sm"
                              rows={2}
                            />
                            <p className="text-xs text-slate-500 mt-1">SQL умова для перевірки нових або змінених рядків</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900">
                    <strong>Приклад:</strong> Для обмеження доступу до власних записів використовуйте: <code className="bg-white px-1 rounded">user_id = current_user_id()</code>
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Скасувати
            </Button>
            <Button onClick={() => setShowCreateModal(false)}>
              <Plus className="w-4 h-4 mr-2" />
              Створити роль
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Редагувати роль {editingRole?.name}</DialogTitle>
            <DialogDescription>Змініть назву, опис, права доступу та видимість UI</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
            <div className="space-y-6 py-4">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-role-name">Назва ролі</Label>
                  <Input id="edit-role-name" placeholder="Наприклад: Backend Developer" defaultValue={editingRole?.name} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="edit-role-description">Опис ролі</Label>
                  <Textarea id="edit-role-description" placeholder="Опишіть призначення та обов'язки ролі..." defaultValue={editingRole?.description} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="edit-base-role">Базувати на існуючій ролі</Label>
                  <select id="edit-base-role" className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500">
                    <option value="">Почати з порожніх прав</option>
                    <option value="developer">Developer</option>
                    <option value="analyst">Analyst</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
              </div>

              <Separator />

              {/* UI Visibility Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-lime-600" />
                  <div>
                    <h4 className="text-slate-900">Видимість інтерфейсу адмін-панелі</h4>
                    <p className="text-sm text-slate-600">Оберіть які розділи будуть доступні для цієї ролі</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  {uiMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-lime-300 transition-colors">
                        <Checkbox
                          id={`edit-ui-${item.id}`}
                          checked={uiSettings[item.id as keyof typeof uiSettings]}
                          onCheckedChange={() => handleUiSettingChange(item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor={`edit-ui-${item.id}`} className="flex items-center gap-2 cursor-pointer">
                            <Icon className="w-4 h-4 text-slate-600" />
                            <span className="text-slate-900">{item.label}</span>
                          </Label>
                          <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900">
                    <strong>Примітка:</strong> Навіть якщо розділ видимий, фактичні можливості користувача будуть обмежені правами доступу RBAC.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Row Level Security */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-lime-600" />
                  <div>
                    <h4 className="text-slate-900">Row Level Security (RLS)</h4>
                    <p className="text-sm text-slate-600">Налаштуйте політики безпеки на рівні рядків для таблиць</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <p className="text-sm text-amber-900">
                    <strong>Важливо:</strong> RLS політики застосовуються на рівні PostgreSQL і обмежують доступ до даних незалежно від прав RBAC.
                  </p>
                </div>

                <div className="space-y-3">
                  {Object.entries(rlsPolicies).map(([tableName, policy]) => (
                    <div key={tableName} className="border border-slate-200 rounded-lg bg-white">
                      <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Table2 className="w-4 h-4 text-slate-600" />
                          <div>
                            <h5 className="text-slate-900">{tableName}</h5>
                            <p className="text-xs text-slate-500">Таблиця бази даних</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`rls-${tableName}`} className="text-sm text-slate-600">
                            {policy.enabled ? 'Увімкнено' : 'Вимкнено'}
                          </Label>
                          <Switch
                            id={`rls-${tableName}`}
                            checked={policy.enabled}
                            onCheckedChange={() => {
                              setRlsPolicies(prev => ({
                                ...prev,
                                [tableName]: { ...prev[tableName], enabled: !prev[tableName].enabled }
                              }));
                            }}
                          />
                        </div>
                      </div>
                      
                      {policy.enabled && (
                        <div className="p-4 space-y-4">
                          <div>
                            <Label className="text-sm text-slate-700 mb-2 block">Дозволені операції</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`${tableName}-select`}
                                  checked={policy.select}
                                  onCheckedChange={() => {
                                    setRlsPolicies(prev => ({
                                      ...prev,
                                      [tableName]: { ...prev[tableName], select: !prev[tableName].select }
                                    }));
                                  }}
                                />
                                <Label htmlFor={`${tableName}-select`} className="text-sm cursor-pointer">SELECT</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`${tableName}-insert`}
                                  checked={policy.insert}
                                  onCheckedChange={() => {
                                    setRlsPolicies(prev => ({
                                      ...prev,
                                      [tableName]: { ...prev[tableName], insert: !prev[tableName].insert }
                                    }));
                                  }}
                                />
                                <Label htmlFor={`${tableName}-insert`} className="text-sm cursor-pointer">INSERT</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`${tableName}-update`}
                                  checked={policy.update}
                                  onCheckedChange={() => {
                                    setRlsPolicies(prev => ({
                                      ...prev,
                                      [tableName]: { ...prev[tableName], update: !prev[tableName].update }
                                    }));
                                  }}
                                />
                                <Label htmlFor={`${tableName}-update`} className="text-sm cursor-pointer">UPDATE</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`${tableName}-delete`}
                                  checked={policy.delete}
                                  onCheckedChange={() => {
                                    setRlsPolicies(prev => ({
                                      ...prev,
                                      [tableName]: { ...prev[tableName], delete: !prev[tableName].delete }
                                    }));
                                  }}
                                />
                                <Label htmlFor={`${tableName}-delete`} className="text-sm cursor-pointer">DELETE</Label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor={`${tableName}-using`} className="text-sm text-slate-700 mb-2 block">
                              USING вираз (SELECT/UPDATE/DELETE)
                            </Label>
                            <Textarea
                              id={`${tableName}-using`}
                              value={policy.using}
                              onChange={(e) => {
                                setRlsPolicies(prev => ({
                                  ...prev,
                                  [tableName]: { ...prev[tableName], using: e.target.value }
                                }));
                              }}
                              placeholder="Наприклад: user_id = current_user_id()"
                              className="font-mono text-sm"
                              rows={2}
                            />
                            <p className="text-xs text-slate-500 mt-1">SQL умова, яка визначає які рядки доступні для читання і модифікації</p>
                          </div>

                          <div>
                            <Label htmlFor={`${tableName}-check`} className="text-sm text-slate-700 mb-2 block">
                              WITH CHECK вираз (INSERT/UPDATE)
                            </Label>
                            <Textarea
                              id={`${tableName}-check`}
                              value={policy.withCheck}
                              onChange={(e) => {
                                setRlsPolicies(prev => ({
                                  ...prev,
                                  [tableName]: { ...prev[tableName], withCheck: e.target.value }
                                }));
                              }}
                              placeholder="Наприклад: company_id = current_user_company_id()"
                              className="font-mono text-sm"
                              rows={2}
                            />
                            <p className="text-xs text-slate-500 mt-1">SQL умова для перевірки нових або змінених рядків</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900">
                    <strong>Приклад:</strong> Для обмеження доступу до власних записів використовуйте: <code className="bg-white px-1 rounded">user_id = current_user_id()</code>
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Скасувати
            </Button>
            <Button onClick={() => setShowEditModal(false)}>
              <Edit className="w-4 h-4 mr-2" />
              Зберегти зміни
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}