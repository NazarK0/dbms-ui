import { useState, useEffect } from 'react';
import { UserInfoCard, DatabaseAccessCard } from './profile';
import { mockApiCall } from '../../utils/mockApi';
import { SkeletonCard } from '../ui/skeletons';

interface UserRole {
  id: number;
  name: string;
  color: string;
  permissions: string[];
}

interface UserProfileProps {
  userRoles: UserRole[];
  onBack?: () => void;
}

export default function UserProfile({ userRoles, onBack }: UserProfileProps) {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingDatabases, setIsLoadingDatabases] = useState(true);

  useEffect(() => {
    // Load user profile data
    mockApiCall('user/profile', {}, 800).then((data) => {
      setIsLoadingUser(false);
    });

    // Load database access data
    mockApiCall('user/database-access', {}, 900).then((data) => {
      setIsLoadingDatabases(false);
    });
  }, []);

  const user = {
    name: 'Олександр Петренко',
    email: 'oleksandr.petrenko@example.com',
    avatar: 'AP',
    department: 'IT Department',
    position: 'Senior Developer',
    joinedDate: '15 січня 2024',
    lastLogin: '2 хвилини тому',
  };

  const activityStats = [
    { label: 'Запитів сьогодні', value: '1,245', change: '+12%', trend: 'up' as const },
    { label: 'Створено записів', value: '47', change: '+5%', trend: 'up' as const },
    { label: 'Оновлено записів', value: '128', change: '+8%', trend: 'up' as const },
    { label: 'Видалено записів', value: '3', change: '-2%', trend: 'down' as const },
  ];

  const groupedDatabases = [
    {
      group: 'Production Databases',
      databases: ['app_production', 'analytics_production'],
      grantedBy: ['Developer', 'Data Analyst'],
    },
    {
      group: 'Staging Databases',
      databases: ['app_staging', 'test_environment'],
      grantedBy: ['Developer'],
    },
    {
      group: 'Analytics Databases',
      databases: ['analytics_production', 'reports_db'],
      grantedBy: ['Data Analyst'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">Профіль користувача</h2>
        <p className="text-slate-600">Інформація про обліковий запис та призначені ролі</p>
      </div>

      {/* User Info */}
      {isLoadingUser ? (
        <SkeletonCard height="300px" />
      ) : (
        <UserInfoCard 
          user={user}
          userRoles={userRoles}
          activityStats={activityStats}
        />
      )}

      {/* Database Access by Role */}
      {isLoadingDatabases ? (
        <SkeletonCard height="400px" />
      ) : (
        <DatabaseAccessCard 
          groupedDatabases={groupedDatabases}
        />
      )}
    </div>
  );
}