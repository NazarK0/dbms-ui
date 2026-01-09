// Central exports for UsersManager components
import UserStatsCards from './UserStatsCards';
import UserTableCard from './UserTableCard';
import EditUserModalWrapper from './EditUserModalWrapper';
import { useState, useEffect } from 'react';
import { administrators, endUsers } from '../../../../mockData/admin/users';
import type { User, UserType } from './types';
import { API, api } from '../../../../utils/api';
import { SkeletonCardGrid, SkeletonTableWithPagination } from '../../../ui/skeletons';
import { calculateUserStats } from './utils';

export default function UsersManager() {
  const [activeTab, setActiveTab] = useState<UserType>('admin');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Loading states
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  // Data states
  const [admins, setAdmins] = useState(administrators);
  const [users, setUsers] = useState(endUsers);
  const [stats, setStats] = useState(calculateUserStats(administrators, endUsers, 156));

  useEffect(() => {
    // Load statistics
    api.get(API.admin.usersManager.stats())
      .then((data) => {
        setStats(data);
        setIsLoadingStats(false);
      })
      .catch((error) => {
        console.error('Error loading user stats:', error);
        setIsLoadingStats(false);
      });

    // Load users
    Promise.all([
      api.get(API.admin.usersManager.users.administrators()),
      api.get(API.admin.usersManager.users.endUsers()),
    ]).then(([adminData, userData]) => {
      setAdmins(adminData);
      setUsers(userData);
      setIsLoadingUsers(false);
    }).catch((error) => {
      console.error('Error loading users:', error);
      setIsLoadingUsers(false);
    });
  }, []);

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
      {isLoadingStats ? (
        <SkeletonCardGrid count={4} columns={4} cardType="stat" />
      ) : (
        <UserStatsCards stats={stats} />
      )}

      {/* Users Table with Tabs */}
      {isLoadingUsers ? (
        <SkeletonTableWithPagination rows={10} columns={6} showCheckbox showActions />
      ) : (
        <UserTableCard
          activeTab={activeTab}
          onTabChange={setActiveTab}
          administrators={admins}
          endUsers={users}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      )}

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
