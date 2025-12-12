import { useState } from 'react';
import { Table2, Search, Filter, Download, RefreshCw, Edit, Trash2, Plus, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { ScrollArea } from '../../ui/scroll-area';

export default function TableBrowser({ selectedDatabase }: { selectedDatabase?: string }) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const tables = ['users', 'orders', 'products', 'customers', 'payments', 'invoices', 'shipping'];

  const tableSchema = {
    users: [
      { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
      { column: 'username', type: 'varchar(255)', nullable: false, default: null, key: 'UNI' },
      { column: 'email', type: 'varchar(255)', nullable: false, default: null, key: 'UNI' },
      { column: 'password_hash', type: 'varchar(255)', nullable: false, default: null, key: '' },
      { column: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', key: '' },
      { column: 'updated_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', key: '' },
      { column: 'status', type: 'varchar(50)', nullable: false, default: "'active'", key: '' },
    ],
    orders: [
      { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
      { column: 'user_id', type: 'integer', nullable: false, default: null, key: 'FOR' },
      { column: 'total_amount', type: 'decimal(10,2)', nullable: false, default: null, key: '' },
      { column: 'status', type: 'varchar(50)', nullable: false, default: "'pending'", key: '' },
      { column: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', key: '' },
    ],
  };

  const tableData = {
    users: [
      { id: 1, username: 'john_doe', email: 'john@example.com', password_hash: '***', created_at: '2024-01-15', updated_at: '2024-01-15', status: 'active' },
      { id: 2, username: 'jane_smith', email: 'jane@example.com', password_hash: '***', created_at: '2024-01-16', updated_at: '2024-01-16', status: 'active' },
      { id: 3, username: 'bob_wilson', email: 'bob@example.com', password_hash: '***', created_at: '2024-01-17', updated_at: '2024-01-17', status: 'inactive' },
    ],
    orders: [
      { id: 1, user_id: 1, total_amount: '149.99', status: 'completed', created_at: '2024-01-20' },
      { id: 2, user_id: 2, total_amount: '89.50', status: 'pending', created_at: '2024-01-21' },
      { id: 3, user_id: 1, total_amount: '299.00', status: 'shipped', created_at: '2024-01-22' },
    ],
  };

  const filteredTables = tables.filter((table) =>
    table.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getKeyBadge = (key: string) => {
    if (!key) return null;
    const variants: Record<string, any> = {
      'PRI': 'default',
      'UNI': 'secondary',
      'FOR': 'outline',
    };
    return <Badge variant={variants[key] || 'outline'}>{key}</Badge>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        {/* Table List */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Таблиці</CardTitle>
            <CardDescription>{selectedDatabase}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Пошук таблиць..."
                className="pl-9"
              />
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-1">
                {filteredTables.map((table) => (
                  <button
                    key={table}
                    onClick={() => setSelectedTable(table)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-left rounded-lg transition-colors ${
                      selectedTable === table 
                        ? 'bg-blue-600 text-white' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Table2 className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm truncate">{table}</span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {selectedTable ? (
          <>
            {/* Table Header */}
            <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Table2 className="w-5 h-5 text-blue-600" />
                      {selectedTable}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {selectedDatabase} • {(tableSchema[selectedTable as keyof typeof tableSchema] || []).length} колонок
                    </CardDescription>
                  </div>
                  <Database className="w-6 h-6 text-blue-400" />
                </div>
              </CardHeader>
            </Card>

            {/* Schema */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Схема таблиці</CardTitle>
                <CardDescription>Структура та типи даних колонок</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Колонка</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Nullable</TableHead>
                      <TableHead>За замовчуванням</TableHead>
                      <TableHead>Ключ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(tableSchema[selectedTable as keyof typeof tableSchema] || []).map((col, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-slate-900">{col.column}</TableCell>
                        <TableCell>
                          <code className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700">
                            {col.type}
                          </code>
                        </TableCell>
                        <TableCell>
                          {col.nullable ? (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              No
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {col.default ? (
                            <code className="text-xs text-slate-600">{col.default}</code>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </TableCell>
                        <TableCell>{getKeyBadge(col.key)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Data Preview */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Попередній перегляд даних</CardTitle>
                <CardDescription>Перші 100 рядків таблиці</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys((tableData[selectedTable as keyof typeof tableData] || [])[0] || {}).map((key) => (
                        <TableHead key={key}>{key}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(tableData[selectedTable as keyof typeof tableData] || []).map((row: any, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value: any, cellIndex) => (
                          <TableCell key={cellIndex} className="font-mono text-sm text-slate-600">
                            {value}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Table2 className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-slate-900 mb-2">Таблицю не вибрано</h3>
              <p className="text-slate-600">Оберіть таблицю зі списку, щоб переглянути її схему та дані</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}