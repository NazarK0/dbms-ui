import { useState } from 'react';
import { Plus, Trash2, Key, Lock, CheckCircle, Shield, Users as UsersIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export default function UserManager() {
  const [users, setUsers] = useState([
    { username: 'admin', role: 'Superuser', databases: 'Всі', lastLogin: '2024-11-28 09:15', status: 'активний' },
    { username: 'developer', role: 'Developer', databases: 'staging_db, test_db', lastLogin: '2024-11-28 08:30', status: 'активний' },
    { username: 'analyst', role: 'Read-only', databases: 'analytics_db', lastLogin: '2024-11-27 14:22', status: 'активний' },
    { username: 'app_user', role: 'Application', databases: 'production_db', lastLogin: '2024-11-28 09:45', status: 'активний' },
    { username: 'backup_service', role: 'Backup', databases: 'Всі', lastLogin: '2024-11-28 02:00', status: 'активний' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRBACModal, setShowRBACModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState('Developer');

  const handleCreateUser = () => {
    if (newUsername.trim()) {
      setUsers([
        ...users,
        {
          username: newUsername,
          role: newRole,
          databases: 'Немає',
          lastLogin: 'Ніколи',
          status: 'активний',
        },
      ]);
      setNewUsername('');
      setShowCreateModal(false);
    }
  };

  const handleDeleteUser = (username: string) => {
    if (confirm(`Ви впевнені, що хочете видалити користувача "${username}"?`)) {
      setUsers(users.filter((user) => user.username !== username));
    }
  };

  const roles = [
    { name: 'Superuser', permissions: ['Всі привілеї', 'Створення БД', 'Створення ролей', 'Обхід RLS'] },
    { name: 'Developer', permissions: ['Створення БД', 'Створення таблиць', 'Insert/Update/Delete', 'Виконання функцій'] },
    { name: 'Read-only', permissions: ['Вибірка даних', 'Виконання read-only функцій'] },
    { name: 'Application', permissions: ['Select', 'Insert', 'Update', 'Delete на призначених БД'] },
    { name: 'Backup', permissions: ['Читання всіх БД', 'Виконання команд резервного копіювання'] },
  ];

  const rbacMatrix = {
    production_db: {
      tables: ['users', 'orders', 'products', 'payments'],
      access: {
        admin: { select: true, insert: true, update: true, delete: true, grant: true },
        developer: { select: true, insert: false, update: false, delete: false, grant: false },
        analyst: { select: true, insert: false, update: false, delete: false, grant: false },
        app_user: { select: true, insert: true, update: true, delete: true, grant: false },
      },
    },
    staging_db: {
      tables: ['users', 'orders', 'test_data'],
      access: {
        admin: { select: true, insert: true, update: true, delete: true, grant: true },
        developer: { select: true, insert: true, update: true, delete: true, grant: false },
      },
    },
    analytics_db: {
      tables: ['events', 'metrics', 'reports'],
      access: {
        admin: { select: true, insert: true, update: true, delete: true, grant: true },
        analyst: { select: true, insert: false, update: false, delete: false, grant: false },
      },
    },
  };

  const getRoleBadgeVariant = (role: string) => {
    switch(role) {
      case 'Superuser': return 'destructive';
      case 'Developer': return 'default';
      case 'Read-only': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">Управління користувачами</h2>
          <p className="text-slate-600">Керування користувачами PostgreSQL</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Створити користувача
        </Button>
      </div>

      {/* Users Table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-slate-700" />
            <CardTitle>Користувачі</CardTitle>
          </div>
          <CardDescription>Всі користувачі PostgreSQL сервера</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ім'я користувача</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Доступ до БД</TableHead>
                <TableHead>Останній вхід</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.username}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-900">{user.username}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{user.databases}</TableCell>
                  <TableCell className="text-slate-600">{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-600">{user.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user.username);
                          setShowRBACModal(true);
                        }}
                        title="Права доступу"
                      >
                        <Lock className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Змінити пароль">
                        <Key className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user.username)}
                        disabled={user.username === 'admin'}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Roles Reference */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Довідник ролей та прав доступу</CardTitle>
          <CardDescription>Опис привілеїв для кожної ролі</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <div key={role.name} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-slate-900">{role.name}</h4>
                </div>
                <ul className="space-y-2">
                  {role.permissions.map((permission, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create User Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Створити нового користувача</DialogTitle>
            <DialogDescription>
              Введіть параметри для створення нового користувача PostgreSQL
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Ім'я користувача</Label>
              <Input
                id="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="new_user"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Роль</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Superuser">Superuser</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Read-only">Read-only</SelectItem>
                  <SelectItem value="Application">Application</SelectItem>
                  <SelectItem value="Backup">Backup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-access">Доступ до баз даних</Label>
              <Input
                id="db-access"
                placeholder="database1, database2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Скасувати
            </Button>
            <Button onClick={handleCreateUser}>Створити користувача</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* RBAC Matrix Modal */}
      <Dialog open={showRBACModal} onOpenChange={setShowRBACModal}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Матриця контролю доступу на основі ролей (RBAC)</DialogTitle>
            <DialogDescription>
              Перегляд та управління правами доступу до баз даних та таблиць
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {Object.entries(rbacMatrix).map(([dbName, dbData]) => (
              <Card key={dbName} className="border-slate-200">
                <CardHeader className="bg-slate-50">
                  <CardTitle className="text-lg">{dbName}</CardTitle>
                  <CardDescription>Таблиці: {dbData.tables.join(', ')}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Користувач/Роль</TableHead>
                        <TableHead className="text-center">SELECT</TableHead>
                        <TableHead className="text-center">INSERT</TableHead>
                        <TableHead className="text-center">UPDATE</TableHead>
                        <TableHead className="text-center">DELETE</TableHead>
                        <TableHead className="text-center">GRANT</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(dbData.access).map(([user, permissions]) => (
                        <TableRow
                          key={user}
                          className={selectedUser === user ? 'bg-blue-50' : ''}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-900">{user}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {permissions.select ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-slate-300 rounded-full mx-auto"></div>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {permissions.insert ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-slate-300 rounded-full mx-auto"></div>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {permissions.update ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-slate-300 rounded-full mx-auto"></div>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {permissions.delete ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-slate-300 rounded-full mx-auto"></div>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {permissions.grant ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-slate-300 rounded-full mx-auto"></div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowRBACModal(false);
              setSelectedUser(null);
            }}>
              Закрити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}