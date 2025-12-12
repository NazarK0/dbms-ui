import { Database, Table, Plus, Edit, Trash2, Activity, Shield, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import DatabaseCard from './DatabaseCard';
import ActivityRecordItem from './ActivityRecordItem';
import AccessedTableItem from './AccessedTableItem';

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
  // Last modified records
  const lastModifiedRecords = [
    {
      id: 1,
      database: 'app_production',
      table: 'users',
      recordId: '42',
      action: 'UPDATE',
      field: 'email',
      timestamp: '2 хвилини тому',
    },
    {
      id: 2,
      database: 'app_production',
      table: 'orders',
      recordId: '158',
      action: 'CREATE',
      field: 'new record',
      timestamp: '15 хвилин тому',
    },
    {
      id: 3,
      database: 'app_staging',
      table: 'products',
      recordId: '89',
      action: 'UPDATE',
      field: 'price',
      timestamp: '1 година тому',
    },
    {
      id: 4,
      database: 'app_production',
      table: 'users',
      recordId: '43',
      action: 'CREATE',
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

  const statistics = [
    {
      label: 'Доступні бази даних',
      value: myDatabases.length,
      icon: Database,
      color: 'bg-violet-100 text-violet-700',
    },
    {
      label: 'Таблиці з доступом',
      value: myDatabases.reduce((sum, db) => sum + db.tables, 0),
      icon: Table,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      label: 'Активних ролей',
      value: userRoles.length,
      icon: Shield,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      label: 'Операцій сьогодні',
      value: lastModifiedRecords.length,
      icon: Activity,
      color: 'bg-green-100 text-green-700',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Databases Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-slate-900 font-medium">Мої бази даних</h3>
          <Badge variant="outline" className="text-xs">
            {myDatabases.length} доступних
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {myDatabases.map((db) => (
            <DatabaseCard 
              key={db.id}
              name={db.name}
              tables={db.tables}
              records={db.records}
              lastAccess={db.lastAccess}
              grantedByRoles={db.grantedByRoles}
              color={db.color}
              onClick={() => onDatabaseSelect?.(db.name)}
            />
          ))}
        </div>
      </div>

      {/* Last Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Last Modified Records */}
        <Card className="border-violet-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-violet-600" />
              Останні зміни записів
            </CardTitle>
            <CardDescription>Нещодавно змінені дані</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-200">
              {lastModifiedRecords.map((record) => (
                <ActivityRecordItem 
                  key={record.id}
                  database={record.database}
                  table={record.table}
                  recordId={record.recordId}
                  action={record.action as 'CREATE' | 'UPDATE' | 'DELETE'}
                  field={record.field}
                  timestamp={record.timestamp}
                  onClick={() => {
                    const tableData = lastAccessedTables.find(
                      t => t.database === record.database && t.table === record.table
                    );
                    onTableSelect?.(
                      record.database, 
                      record.table, 
                      tableData?.permissions || ['SELECT'], 
                      record.recordId
                    );
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Last Accessed Tables */}
        <Card className="border-violet-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-violet-600" />
              Останні таблиці
            </CardTitle>
            <CardDescription>Нещодавно використані таблиці</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-200">
              {lastAccessedTables.map((table) => (
                <AccessedTableItem 
                  key={table.id}
                  database={table.database}
                  table={table.table}
                  records={table.records}
                  lastAccess={table.lastAccess}
                  onClick={() => onTableSelect?.(table.database, table.table, table.permissions)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}