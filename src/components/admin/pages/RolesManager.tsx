import { useState } from 'react';
import { UserCog, Plus, Edit, Trash2, Shield, Users, ChevronDown, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../ui/collapsible';
import { Alert, AlertDescription } from '../../ui/alert';
import CreateRoleModal from '../roles/CreateRoleModal';
import EditAdminRoleModal from '../roles/EditAdminRoleModal';
import EditUserRoleModal from '../roles/EditUserRoleModal';
import RBACMatrix from '../roles/RBACMatrix';
import AdminRolesPanel from '../roles/AdminRolesPanel';
import UserRolesPanel from '../roles/UserRolesPanel';
import StatsCards from '../roles/StatsCards';
import { roles, adminRoles, userRoles, totalAdmins, totalUsers, type Role, type RoleType } from '../../../mockData/admin';

export default function RolesManager() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditAdminModal, setShowEditAdminModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleType, setRoleType] = useState<RoleType>('admin');

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
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
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
      />

      {/* Admin Roles Section */}
      <AdminRolesPanel
        roles={adminRoles}
        onEdit={handleEditRole}
        onDelete={handleDeleteRole}
      />

      {/* User Roles Section */}
      <UserRolesPanel
        roles={userRoles}
        onEdit={handleEditRole}
        onDelete={handleDeleteRole}
      />

      {/* RBAC Matrix */}
      <RBACMatrix />

      {/* Role Modal (Create/Edit) */}
      <CreateRoleModal
        open={showCreateModal}
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