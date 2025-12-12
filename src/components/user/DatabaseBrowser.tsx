import { useState } from 'react';
import { Database, Table as TableIcon, ChevronRight, Shield, Search, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Copy, Check } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface DatabaseBrowserProps {
  onTableSelect: (database: string, table: string, permissions: string[]) => void;
  selectedDatabase?: string | null;
  onBack?: () => void;
}

export default function DatabaseBrowser({ onTableSelect, selectedDatabase: propSelectedDatabase, onBack }: DatabaseBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [localSelectedDatabase, setLocalSelectedDatabase] = useState<string | null>(propSelectedDatabase || null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Use prop if provided, otherwise use local state
  const selectedDatabase = propSelectedDatabase || localSelectedDatabase;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTableApiEndpoint = (dbName: string, tableName: string) => {
    return `https://api.dbms.company.com/v1/databases/${dbName}/tables/${tableName}`;
  };

  const databases = [
    {
      id: 1,
      name: 'app_production',
      description: 'Production database',
      tables: [
        { 
          name: 'users', 
          records: 6745, 
          size: '2.4 MB',
          permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
          rlsEnabled: true,
          description: 'User accounts and profiles'
        },
        { 
          name: 'orders', 
          records: 45230, 
          size: '18.7 MB',
          permissions: ['SELECT', 'INSERT', 'UPDATE'],
          rlsEnabled: true,
          description: 'Customer orders'
        },
        { 
          name: 'products', 
          records: 1245, 
          size: '850 KB',
          permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
          rlsEnabled: false,
          description: 'Product catalog'
        },
        { 
          name: 'audit_logs', 
          records: 125430, 
          size: '45.2 MB',
          permissions: ['SELECT', 'INSERT'],
          rlsEnabled: true,
          description: 'System audit trail'
        },
        { 
          name: 'categories', 
          records: 42, 
          size: '12 KB',
          permissions: ['SELECT'],
          rlsEnabled: false,
          description: 'Product categories'
        },
        { 
          name: 'sessions', 
          records: 3450, 
          size: '1.2 MB',
          permissions: ['SELECT', 'INSERT', 'DELETE'],
          rlsEnabled: true,
          description: 'User sessions'
        },
      ],
    },
    {
      id: 2,
      name: 'app_staging',
      description: 'Staging environment',
      tables: [
        { 
          name: 'users', 
          records: 850, 
          size: '320 KB',
          permissions: ['SELECT', 'INSERT', 'UPDATE'],
          rlsEnabled: true,
          description: 'Test user accounts'
        },
        { 
          name: 'orders', 
          records: 5200, 
          size: '2.1 MB',
          permissions: ['SELECT', 'INSERT'],
          rlsEnabled: false,
          description: 'Test orders'
        },
        { 
          name: 'products', 
          records: 145, 
          size: '95 KB',
          permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
          rlsEnabled: false,
          description: 'Test products'
        },
      ],
    },
    {
      id: 3,
      name: 'app_analytics',
      description: 'Analytics and reporting',
      tables: [
        { 
          name: 'daily_stats', 
          records: 2450, 
          size: '850 KB',
          permissions: ['SELECT'],
          rlsEnabled: false,
          description: 'Daily statistics'
        },
        { 
          name: 'user_events', 
          records: 85230, 
          size: '28.4 MB',
          permissions: ['SELECT'],
          rlsEnabled: true,
          description: 'User activity events'
        },
        { 
          name: 'reports', 
          records: 124, 
          size: '245 KB',
          permissions: ['SELECT'],
          rlsEnabled: false,
          description: 'Generated reports'
        },
      ],
    },
  ];

  const filteredDatabases = databases.filter((db) =>
    db.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    db.tables.some((table) => table.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getPermissionColor = (perm: string) => {
    switch (perm) {
      case 'SELECT':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'INSERT':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'UPDATE':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'DELETE':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {propSelectedDatabase && onBack && (
            <Button variant="outline" size="sm" onClick={onBack}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Назад
            </Button>
          )}
          <div>
            <h2 className="text-slate-900">
              {propSelectedDatabase ? `Таблиці: ${propSelectedDatabase}` : 'Браузер баз даних'}
            </h2>
            <p className="text-slate-600">
              {propSelectedDatabase 
                ? 'Оберіть таблицю для роботи з даними'
                : 'Перегляд доступних баз даних та таблиць'}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={propSelectedDatabase ? "Пошук таблиць..." : "Пошук баз даних або таблиць..."}
          className="pl-10"
        />
      </div>

      {/* Content based on whether a database is pre-selected */}
      {propSelectedDatabase ? (
        // Show only tables for the selected database
        <Card className="border-violet-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TableIcon className="w-5 h-5 text-violet-600" />
              Таблиці бази даних: {propSelectedDatabase}
            </CardTitle>
            <CardDescription>
              Оберіть таблицю для роботи з даними
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="divide-y divide-slate-200">
                {databases
                  .find((db) => db.name === propSelectedDatabase)
                  ?.tables
                  .filter((table) =>
                    searchTerm === '' ||
                    table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    table.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((table) => (
                    <div
                      key={table.name}
                      onClick={() => onTableSelect(propSelectedDatabase, table.name, table.permissions)}
                      className="p-3 hover:bg-violet-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-violet-200 transition-colors">
                            <TableIcon className="w-4 h-4 text-violet-700" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-slate-900 font-medium mb-0.5">{table.name}</h4>
                            <p className="text-xs text-slate-600 mb-1.5">{table.description}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span>{table.records.toLocaleString()} записів</span>
                            </div>
                          </div>
                        </div>

                        {/* API Endpoint - Compact */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <code className="text-xs text-slate-600 font-mono px-2 py-1 bg-slate-50 rounded border border-slate-200 max-w-[200px] truncate">
                            {getTableApiEndpoint(propSelectedDatabase, table.name)}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(getTableApiEndpoint(propSelectedDatabase, table.name));
                            }}
                            className="h-7 w-7 p-0"
                          >
                            {copied ? (
                              <Check className="w-3 h-3 text-green-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        // Show database browser with sidebar
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Databases Sidebar */}
          <Card className="border-violet-200 shadow-sm lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database className="w-5 h-5 text-violet-600" />
                Бази даних
              </CardTitle>
              <CardDescription>Доступні бази даних</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="divide-y divide-slate-200">
                  {filteredDatabases.map((db) => (
                    <button
                      key={db.id}
                      onClick={() => {
                        setLocalSelectedDatabase(db.name);
                        setSelectedTable(null);
                      }}
                      className={`w-full text-left p-4 hover:bg-violet-50 transition-colors ${
                        selectedDatabase === db.name ? 'bg-violet-50 border-l-4 border-l-violet-600' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Database className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{db.name}</p>
                            <p className="text-xs text-slate-500">{db.description}</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${
                          selectedDatabase === db.name ? 'rotate-90' : ''
                        }`} />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <TableIcon className="w-3 h-3" />
                        <span>{db.tables.length} таблиць</span>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Tables List */}
          <Card className="border-violet-200 shadow-sm lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TableIcon className="w-5 h-5 text-violet-600" />
                {selectedDatabase ? `Таблиці: ${selectedDatabase}` : 'Таблиці'}
              </CardTitle>
              <CardDescription>
                {selectedDatabase 
                  ? 'Оберіть таблицю для роботи з даними' 
                  : 'Оберіть базу даних щоб побачити таблиці'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {selectedDatabase ? (
                <ScrollArea className="h-[600px]">
                  <div className="divide-y divide-slate-200">
                    {databases
                      .find((db) => db.name === selectedDatabase)
                      ?.tables.map((table) => (
                        <div
                          key={table.name}
                          onClick={() => {
                            setSelectedTable(table.name);
                            onTableSelect(selectedDatabase, table.name, table.permissions);
                          }}
                          className="p-3 hover:bg-violet-50 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-violet-200 transition-colors">
                                <TableIcon className="w-4 h-4 text-violet-700" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-slate-900 font-medium mb-0.5">{table.name}</h3>
                                <p className="text-xs text-slate-600 mb-1.5">{table.description}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <span>{table.records.toLocaleString()} записів</span>
                                </div>
                              </div>
                            </div>

                            {/* API Endpoint - Compact */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <code className="text-xs text-slate-600 font-mono px-2 py-1 bg-slate-50 rounded border border-slate-200 max-w-[200px] truncate">
                                {getTableApiEndpoint(selectedDatabase, table.name)}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(getTableApiEndpoint(selectedDatabase, table.name));
                                }}
                                className="h-7 w-7 p-0"
                              >
                                {copied ? (
                                  <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </Button>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="h-[600px] flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <Database className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <p className="text-lg mb-2">Оберіть базу даних</p>
                    <p className="text-sm">Виберіть базу даних зліва для перегляду таблиць</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}