import { useState, useEffect } from 'react';
import { DatabaseGrid, ActivitySection } from './dashboard';
import { mockApiCall } from '../../utils/mockApi';
import { SkeletonCardGrid, SkeletonListCard } from '../ui/skeletons';
import { dashboardDatabases, activityRecords, tableAccess } from '../../mockData/user';

interface UserDashboardProps {
  userRoles: string[];
  onDatabaseSelect: (database: string) => void;
  onTableSelect: (database: string, table: string) => void;
}

export default function UserDashboard({
  userRoles,
  onDatabaseSelect,
  onTableSelect,
}: UserDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await mockApiCall('user-dashboard', {}, 850);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-8 w-48 bg-slate-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-64 bg-slate-200 rounded animate-pulse" />
        </div>

        <div>
          <div className="h-6 w-32 bg-slate-200 rounded mb-4 animate-pulse" />
          <SkeletonCardGrid count={6} />
        </div>

        <div>
          <div className="h-6 w-32 bg-slate-200 rounded mb-4 animate-pulse" />
          <SkeletonListCard count={5} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-slate-900 mb-2">Вітаємо в системі</h1>
        <p className="text-slate-600">
          Оберіть базу даних для початку роботи
        </p>
      </div>

      {/* Database Grid */}
      <DatabaseGrid
        databases={dashboardDatabases}
        onDatabaseSelect={onDatabaseSelect}
      />

      {/* Recent Activity */}
      <ActivitySection 
        lastModifiedRecords={activityRecords}
        lastAccessedTables={tableAccess}
        onRecordClick={(database, table, permissions, recordId) => {
          // Користувач клікнув на запис - відкриваємо таблицю
          onTableSelect(database, table);
        }}
        onTableClick={(database, table, permissions) => {
          // Користувач клікнув на таблицю - відкриваємо її
          onTableSelect(database, table);
        }}
      />
    </div>
  );
}