import { useState } from 'react';
import { Plus } from 'lucide-react';
import StatsCards from '../roles/StatsCards';
import AdminRolesPanel from '../roles/AdminRolesPanel';
import UserRolesPanel from '../roles/UserRolesPanel';
import RBACMatrix from '../roles/RBACMatrix';
import CreateRoleModal from '../roles/CreateRoleModal';
import EditAdminRoleModal from '../roles/EditAdminRoleModal';
import EditUserRoleModal from '../roles/EditUserRoleModal';
import { Role } from '../roles/RoleCard';
import { Button } from '../../ui/button';

type RoleType = 'admin' | 'user';

export default function RolesManager() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showEditAdminModal, setShowEditAdminModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [roleType, setRoleType] = useState<RoleType>('admin');

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
      name: 'Data Analyst',
      users: 245,
      description: 'Аналіз даних та створення звітів',
      color: 'from-violet-500 to-purple-600',
      badge: 'default',
      type: 'user'
    },
    {
      name: 'Content Manager',
      users: 1823,
      description: 'Управління контентом системи',
      color: 'from-blue-500 to-cyan-600',
      badge: 'secondary',
      type: 'user'
    },
    {
      name: 'Report Viewer',
      users: 4521,
      description: 'Перегляд звітів та даних',
      color: 'from-indigo-500 to-violet-600',
      badge: 'outline',
      type: 'user'
    },
    {
      name: 'Guest User',
      users: 156,
      description: 'Обмежений доступ для гостей',
      color: 'from-slate-400 to-slate-500',
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
    setEditingRole(role);
    if (role.type === 'admin') {
      setShowEditAdminModal(true);
    } else {
      setShowEditUserModal(true);
    }
  };

  const handleDeleteRole = (role: Role) => {
    console.log('Delete role:', role);
    // TODO: Implement delete functionality
  };

  const handleCreateRole = () => {
    setEditingRole(null);
    setRoleType('admin');
    setShowRoleModal(true);
  };

  const handleCloseModal = () => {
    setShowRoleModal(false);
    setEditingRole(null);
  };

  const handleCloseEditAdminModal = () => {
    setShowEditAdminModal(false);
    setEditingRole(null);
  };

  const handleCloseEditUserModal = () => {
    setShowEditUserModal(false);
    setEditingRole(null);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-slate-900">Управління ролями</h2>
          <p className="text-sm text-slate-600 mt-1">Налаштування прав доступу та RBAC політик</p>
        </div>
        <Button 
          onClick={handleCreateRole}
          className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Створити роль
        </Button>
      </div>

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
      />

      {/* User Roles Section */}
      <UserRolesPanel
        roles={userRoles}
        onEdit={handleEditRole}
        onSelect={setSelectedRole}
        onDelete={handleDeleteRole}
      />

      {/* RBAC Matrix */}
      <RBACMatrix />

      {/* Role Modal (Create/Edit) */}
      <CreateRoleModal
        open={showRoleModal}
        onOpenChange={handleCloseModal}
        roleType={roleType}
        onRoleTypeChange={setRoleType}
        editingRole={editingRole}
      />

      {/* Edit Admin Role Modal */}
      {editingRole && editingRole.type === 'admin' && (
        <EditAdminRoleModal
          open={showEditAdminModal}
          onOpenChange={handleCloseEditAdminModal}
          role={editingRole}
        />
      )}

      {/* Edit User Role Modal */}
      {editingRole && editingRole.type === 'user' && (
        <EditUserRoleModal
          open={showEditUserModal}
          onOpenChange={handleCloseEditUserModal}
          role={editingRole}
        />
      )}
    </div>
  );
}