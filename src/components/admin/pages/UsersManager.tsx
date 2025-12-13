import { useState } from 'react';
import {
  UserStatsCards,
  UserTableCard,
  EditUserModalWrapper,
  calculateUserStats,
} from './users-manager';
import { administrators, endUsers } from '../../../mockData/admin/users';
import type { User, UserType } from './users-manager';

export default function UsersManager() {
  const [activeTab, setActiveTab] = useState<UserType>('admin');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const stats = calculateUserStats(administrators, endUsers, 156);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user: User) => {
    console.log('Delete user:', user);
    // TODO: Implement delete functionality
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <UserStatsCards stats={stats} />

      {/* Users Table with Tabs */}
      <UserTableCard
        activeTab={activeTab}
        onTabChange={setActiveTab}
        administrators={administrators}
        endUsers={endUsers}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />

      {/* Edit User Permissions Modal */}
      <EditUserModalWrapper
        open={showEditModal}
        onOpenChange={handleCloseEditModal}
        user={selectedUser}
        userType={activeTab}
      />
    </div>
  );
}
