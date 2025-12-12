import { useState } from 'react';
import { Shield, Plus, Edit, Trash2, Key, Lock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Fragment } from 'react';

export default function RolesManager() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

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
                  <Button variant="outline" size="sm" className="flex-1">
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Створити нову роль</DialogTitle>
            <DialogDescription>Налаштуйте назву, опис та початкові права доступу</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm text-slate-700 mb-2 block">Назва ролі</label>
              <Input placeholder="Наприклад: Backend Developer" />
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-2 block">Опис ролі</label>
              <Textarea placeholder="Опишіть призначення та обов'язки ролі..." />
            </div>
            <div>
              <label className="text-sm text-slate-700 mb-2 block">Базувати на існуючій ролі</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500">
                <option value="">Почати з порожніх прав</option>
                <option value="developer">Developer</option>
                <option value="analyst">Analyst</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Скасувати
            </Button>
            <Button onClick={() => setShowCreateModal(false)}>
              Створити роль
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}