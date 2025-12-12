import { Database, Table, Plus, Edit, Trash2, Activity, Shield, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

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
            <Card 
              key={db.id} 
              className="border-violet-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              onClick={() => onDatabaseSelect?.(db.name)}
            >
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 bg-gradient-to-br ${db.color} rounded-md flex items-center justify-center shadow-sm`}>
                      <Database className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-slate-900 font-medium text-sm leading-tight truncate">{db.name}</h4>
                      <p className="text-xs text-slate-500 leading-tight truncate">{db.lastAccess}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
                
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-1.5">
                  <div className="flex items-center gap-0.5">
                    <Table className="w-2.5 h-2.5" />
                    <span>{db.tables}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Database className="w-2.5 h-2.5" />
                    <span>{db.records.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {db.grantedByRoles.map((role) => (
                    <Badge key={role} variant="outline" className="text-xs h-5 px-2 py-0 bg-violet-50 text-violet-700 border-violet-300">
                      {role}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                <div 
                  key={record.id} 
                  className="p-4 hover:bg-violet-50/50 transition-colors cursor-pointer"
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
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      record.action === 'CREATE' ? 'bg-green-100' :
                      record.action === 'UPDATE' ? 'bg-blue-100' :
                      'bg-red-100'
                    }`}>
                      {record.action === 'CREATE' && <Plus className="w-4 h-4 text-green-700" />}
                      {record.action === 'UPDATE' && <Edit className="w-4 h-4 text-blue-700" />}
                      {record.action === 'DELETE' && <Trash2 className="w-4 h-4 text-red-700" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-slate-900 font-medium">
                          {record.table}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          #{record.recordId}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span>{record.database}</span>
                        <span className="text-slate-400">•</span>
                        <span>{record.field}</span>
                        <span className="text-slate-400">•</span>
                        <span>{record.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div 
                  key={table.id} 
                  className="p-4 hover:bg-violet-50/50 transition-colors cursor-pointer"
                  onClick={() => onTableSelect?.(table.database, table.table, table.permissions)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                      <Table className="w-4 h-4 text-violet-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-slate-900 font-medium truncate">
                          {table.table}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {table.records.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span>{table.database}</span>
                        <span className="text-slate-400">•</span>
                        <span>{table.lastAccess}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}