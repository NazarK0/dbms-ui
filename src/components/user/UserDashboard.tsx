import { useState, useEffect } from 'react';
import { DatabaseGrid, ActivitySection } from './dashboard';
import { mockApiCall } from '../../utils/mockApi';
import { SkeletonCardGrid, SkeletonListCard } from '../ui/skeletons';

interface UserRole {
  id: number;
  name: string;
  color: string;
}

interface UserDashboardProps {
  userRoles: UserRole[];
  onDatabaseSelect?: (database: string) => void;
  onTableSelect?: (database: string, table: string, permissions: string[], highlightRecordId?: string) => void;
}

export default function UserDashboard({ userRoles, onDatabaseSelect, onTableSelect }: UserDashboardProps) {
  // Loading states
  const [isLoadingDatabases, setIsLoadingDatabases] = useState(true);
  const [isLoadingActivity, setIsLoadingActivity] = useState(true);

  // Last modified records
  const lastModifiedRecords = [
    {
      id: 1,
      database: 'app_production',
      table: 'users',
      recordId: '42',
      action: 'UPDATE' as const,
      field: 'email',
      timestamp: '2 хвилини тому',
    },
    {
      id: 2,
      database: 'app_production',
      table: 'orders',
      recordId: '158',
      action: 'CREATE' as const,
      field: 'new record',
      timestamp: '15 хвилин тому',
    },
    {
      id: 3,
      database: 'app_staging',
      table: 'products',
      recordId: '89',
      action: 'UPDATE' as const,
      field: 'price',
      timestamp: '1 година тому',
    },
    {
      id: 4,
      database: 'app_production',
      table: 'users',
      recordId: '43',
      action: 'CREATE' as const,
      field: 'new record',
      timestamp: '2 години тому',
    },
  ];

  // Last accessed tables
  const lastAccessedTables = [
    {
      id: 1,
      database: 'app_production',
      table: 'users',
      records: 1243,
      lastAccess: '2 хвилини тому',
      permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    },
    {
      id: 2,
      database: 'app_production',
      table: 'orders',
      records: 5847,
      lastAccess: '15 хвилин тому',
      permissions: ['SELECT', 'INSERT', 'UPDATE'],
    },
    {
      id: 3,
      database: 'app_staging',
      table: 'products',
      records: 324,
      lastAccess: '1 година тому',
      permissions: ['SELECT', 'UPDATE'],
    },
    {
      id: 4,
      database: 'app_analytics',
      table: 'audit_logs',
      records: 15243,
      lastAccess: '3 години тому',
      permissions: ['SELECT'],
    },
  ];

  const myDatabases = [
    {
      id: 1,
      name: 'app_production',
      tables: 12,
      records: 125430,
      lastAccess: '2 хвилини тому',
      permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
      grantedByRoles: ['Developer', 'Data Analyst'],
      color: 'from-violet-500 to-purple-600',
    },
    {
      id: 2,
      name: 'app_staging',
      tables: 8,
      records: 15200,
      lastAccess: '1 година тому',
      permissions: ['SELECT', 'INSERT', 'UPDATE'],
      grantedByRoles: ['Developer'],
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 3,
      name: 'app_analytics',
      tables: 5,
      records: 4600,
      lastAccess: '3 години тому',
      permissions: ['SELECT'],
      grantedByRoles: ['Data Analyst'],
      color: 'from-purple-500 to-pink-600',
    },
  ];

  // Data states
  const [databases, setDatabases] = useState(myDatabases);
  const [modifiedRecords, setModifiedRecords] = useState(lastModifiedRecords);
  const [accessedTables, setAccessedTables] = useState(lastAccessedTables);

  useEffect(() => {
    // Імітація завантаження баз даних
    mockApiCall(myDatabases, 'fast').then((data) => {
      setDatabases(data);
      setIsLoadingDatabases(false);
    });

    // Імітація завантаження активності
    Promise.all([
      mockApiCall(lastModifiedRecords, 'normal'),
      mockApiCall(lastAccessedTables, 'normal'),
    ]).then(([records, tables]) => {
      setModifiedRecords(records);
      setAccessedTables(tables);
      setIsLoadingActivity(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Databases Grid */}
      {isLoadingDatabases ? (
        <SkeletonCardGrid count={3} columns={3} cardType="icon" />
      ) : (
        <DatabaseGrid 
          databases={databases}
          onDatabaseSelect={onDatabaseSelect}
        />
      )}

      {/* Last Activity Grid */}
      {isLoadingActivity ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonListCard items={4} />
          <SkeletonListCard items={4} />
        </div>
      ) : (
        <ActivitySection
          lastModifiedRecords={modifiedRecords}
          lastAccessedTables={accessedTables}
          onRecordClick={onTableSelect}
          onTableClick={onTableSelect}
        />
      )}
    </div>
  );
}