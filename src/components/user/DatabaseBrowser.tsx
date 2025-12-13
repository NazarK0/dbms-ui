import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { DatabaseSidebar, TablesList, TableListItem } from './browser';
import { TableSearchBar } from './table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Table as TableIcon } from 'lucide-react';

interface DatabaseBrowserProps {
  onTableSelect: (database: string, table: string, permissions: string[]) => void;
  selectedDatabase?: string | null;
  onBack?: () => void;
}

export default function DatabaseBrowser({ onTableSelect, selectedDatabase: propSelectedDatabase, onBack }: DatabaseBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [localSelectedDatabase, setLocalSelectedDatabase] = useState<string | null>(propSelectedDatabase || null);
  const [copied, setCopied] = useState(false);

  const selectedDatabase = propSelectedDatabase || localSelectedDatabase;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const databases = [
    {
      id: 1,
      name: 'app_production',
      description: 'Production database',
      tables: [
        { name: 'users', records: 6745, size: '2.4 MB', permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'], rlsEnabled: true, description: 'User accounts and profiles' },
        { name: 'orders', records: 45230, size: '18.7 MB', permissions: ['SELECT', 'INSERT', 'UPDATE'], rlsEnabled: true, description: 'Customer orders' },
        { name: 'products', records: 1245, size: '850 KB', permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'], rlsEnabled: false, description: 'Product catalog' },
        { name: 'audit_logs', records: 125430, size: '45.2 MB', permissions: ['SELECT', 'INSERT'], rlsEnabled: true, description: 'System audit trail' },
        { name: 'categories', records: 42, size: '12 KB', permissions: ['SELECT'], rlsEnabled: false, description: 'Product categories' },
        { name: 'sessions', records: 3450, size: '1.2 MB', permissions: ['SELECT', 'INSERT', 'DELETE'], rlsEnabled: true, description: 'User sessions' },
      ],
    },
    {
      id: 2,
      name: 'app_staging',
      description: 'Staging environment',
      tables: [
        { name: 'users', records: 850, size: '320 KB', permissions: ['SELECT', 'INSERT', 'UPDATE'], rlsEnabled: true, description: 'Test user accounts' },
        { name: 'orders', records: 5200, size: '2.1 MB', permissions: ['SELECT', 'INSERT'], rlsEnabled: false, description: 'Test orders' },
        { name: 'products', records: 145, size: '95 KB', permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'], rlsEnabled: false, description: 'Test products' },
      ],
    },
    {
      id: 3,
      name: 'app_analytics',
      description: 'Analytics and reporting',
      tables: [
        { name: 'daily_stats', records: 2450, size: '850 KB', permissions: ['SELECT'], rlsEnabled: false, description: 'Daily statistics' },
        { name: 'user_events', records: 85230, size: '28.4 MB', permissions: ['SELECT'], rlsEnabled: true, description: 'User activity events' },
        { name: 'reports', records: 124, size: '245 KB', permissions: ['SELECT'], rlsEnabled: false, description: 'Generated reports' },
      ],
    },
  ];

  const filteredDatabases = databases.filter((db) =>
    db.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    db.tables.some((table) => table.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
      <TableSearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={propSelectedDatabase ? "Пошук таблиць..." : "Пошук баз даних або таблиць..."}
      />

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
                    <TableListItem
                      key={table.name}
                      table={table}
                      database={propSelectedDatabase}
                      copied={copied}
                      onTableClick={() => onTableSelect(propSelectedDatabase, table.name, table.permissions)}
                      onCopy={handleCopy}
                    />
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        // Show database browser with sidebar
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Databases Sidebar */}
          <DatabaseSidebar
            databases={filteredDatabases}
            selectedDatabase={selectedDatabase}
            onDatabaseSelect={(dbName) => {
              setLocalSelectedDatabase(dbName);
            }}
          />

          {/* Tables List */}
          <TablesList
            database={selectedDatabase}
            tables={selectedDatabase ? databases.find(db => db.name === selectedDatabase)?.tables || [] : []}
            copied={copied}
            searchTerm={searchTerm}
            onTableSelect={(tableName, permissions) => {
              if (selectedDatabase) {
                onTableSelect(selectedDatabase, tableName, permissions);
              }
            }}
            onCopy={handleCopy}
          />
        </div>
      )}
    </div>
  );
}
