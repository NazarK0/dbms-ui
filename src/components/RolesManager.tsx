import { useState } from 'react';
import { Shield, Plus, Users, Key, UserCog } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import CreateRoleModal from './roles/CreateRoleModal';
import RoleCard from './roles/RoleCard';
import RBACMatrix from './roles/RBACMatrix';
import RoleHistory from './roles/RoleHistory';

type RoleType = 'admin' | 'user';

interface Role {
  name: string;
  users: number;
  description: string;
  color: string;
  badge: string;
  type: 'admin' | 'user';
}

export default function RolesManager() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [roleType, setRoleType] = useState<RoleType>('user');

  const roles: Role[] = [
    { 
      name: 'Superadmin', 
      users: 2, 
      description: 'Повний доступ до всіх функцій системи',
      color: 'from-red-500 to-red-600',
      badge: 'destructive',
      type: 'admin'
    },
    { 
      name: 'Database Admin', 
      users: 5, 
      description: 'Управління базами даних, таблицями, схемами',
      color: 'from-lime-500 to-green-600',
      badge: 'default',
      type: 'admin'
    },
    { 
      name: 'Developer', 
      users: 12, 
      description: 'Доступ до query editor, перегляд схем',
      color: 'from-yellow-500 to-lime-600',
      badge: 'secondary',
      type: 'admin'
    },
    { 
      name: 'Analyst', 
      users: 8, 
      description: 'Тільки читання даних, виконання SELECT запитів',
      color: 'from-green-500 to-lime-600',
      badge: 'outline',
      type: 'admin'
    },
    { 
      name: 'Viewer', 
      users: 15, 
      description: 'Перегляд метрик та моніторингу без можливості змін',
      color: 'from-lime-600 to-yellow-600',
      badge: 'secondary',
      type: 'admin'
    },
    {
      name: 'Premium User',
      users: 245,
      description: 'Повний доступ до всіх функцій застосунку',
      color: 'from-violet-500 to-purple-600',
      badge: 'default',
      type: 'user'
    },
    {
      name: 'Standard User',
      users: 1823,
      description: 'Стандартний набір функцій',
      color: 'from-blue-500 to-cyan-600',
      badge: 'secondary',
      type: 'user'
    },
    {
      name: 'Free User',
      users: 4521,
      description: 'Базовий доступ до застосунку',
      color: 'from-slate-400 to-slate-500',
      badge: 'outline',
      type: 'user'
    },
    {
      name: 'Trial User',
      users: 156,
      description: 'Пробний доступ на 14 днів',
      color: 'from-amber-500 to-orange-600',
      badge: 'secondary',
      type: 'user'
    },
  ];

  const adminRoles = roles.filter(role => role.type === 'admin');
  const userRoles = roles.filter(role => role.type === 'user');
  const totalAdmins = adminRoles.reduce((sum, role) => sum + role.users, 0);
  const totalUsers = userRoles.reduce((sum, role) => sum + role.users, 0);

  const handleEditRole = (role: Role) => {
    console.log('Edit role:', role);
  };

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">{roles.length}</Badge>
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
              <div className="w-12 h-12 bg-gradient-to-br from-lime-600 to-green-500 rounded-xl flex items-center justify-center">
                <UserCog className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">{totalAdmins}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Адміністраторів</CardTitle>
            <CardDescription>З адмін ролями</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">{totalUsers}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Користувачів</CardTitle>
            <CardDescription>З користувацькими ролями</CardDescription>
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
          <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2.5">
            {roles.map((role) => (
              <RoleCard
                key={role.name}
                role={role}
                onEdit={handleEditRole}
                onSelect={setSelectedRole}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RBAC Matrix */}
      <RBACMatrix />

      {/* Role History */}
      <RoleHistory />

      {/* Create Role Modal */}
      <CreateRoleModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        roleType={roleType}
        onRoleTypeChange={setRoleType}
      />
    </div>
  );
}