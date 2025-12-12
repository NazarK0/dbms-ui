import { useState } from 'react';
import StatsCards from './roles/StatsCards';
import AdminRolesPanel from './roles/AdminRolesPanel';
import UserRolesPanel from './roles/UserRolesPanel';
import RBACMatrix from './roles/RBACMatrix';
import RoleHistory from './roles/RoleHistory';
import CreateRoleModal from './roles/CreateRoleModal';
import { Role } from './roles/RoleCard';

type RoleType = 'admin' | 'user';

export default function RolesManager() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [roleType, setRoleType] = useState<RoleType>('user');

  // Mock data - in real app this would come from API/database
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

  // Separate roles by type
  const adminRoles = roles.filter(role => role.type === 'admin');
  const userRoles = roles.filter(role => role.type === 'user');
  
  // Calculate totals
  const totalAdmins = adminRoles.reduce((sum, role) => sum + role.users, 0);
  const totalUsers = userRoles.reduce((sum, role) => sum + role.users, 0);

  // Event handlers
  const handleEditRole = (role: Role) => {
    console.log('Edit role:', role);
    // TODO: Implement edit functionality
  };

  const handleDeleteRole = (role: Role) => {
    console.log('Delete role:', role);
    // TODO: Implement delete functionality
  };

  const handleCreateAdminRole = () => {
    setRoleType('admin');
    setShowCreateModal(true);
  };

  const handleCreateUserRole = () => {
    setRoleType('user');
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <StatsCards 
        totalRoles={roles.length}
        totalAdmins={totalAdmins}
        totalUsers={totalUsers}
        totalPermissions={47}
      />

      {/* Admin Roles Section */}
      <AdminRolesPanel
        roles={adminRoles}
        onEdit={handleEditRole}
        onSelect={setSelectedRole}
        onDelete={handleDeleteRole}
        onCreateClick={handleCreateAdminRole}
      />

      {/* User Roles Section */}
      <UserRolesPanel
        roles={userRoles}
        onEdit={handleEditRole}
        onSelect={setSelectedRole}
        onDelete={handleDeleteRole}
        onCreateClick={handleCreateUserRole}
      />

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
