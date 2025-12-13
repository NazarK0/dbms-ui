import { useState } from 'react';
import { Database, Plus, Trash2, Edit, Search, Play, Link2, Server, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Alert, AlertDescription } from '../../ui/alert';
import { Textarea } from '../../ui/textarea';
import { foreignTables, foreignServersSimple } from '../../../mockData';

interface ForeignTablesManagerProps {
  selectedDatabase: string;
}

export default function ForeignTablesManager({ selectedDatabase }: ForeignTablesManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tableName, setTableName] = useState('');
  const [serverName, setServerName] = useState('');
  const [remoteSchema, setRemoteSchema] = useState('');
  const [remoteTable, setRemoteTable] = useState('');

  const filteredTables = foreignTables.filter(table =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.server.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.remoteTable.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTable = () => {
    if (tableName.trim() && serverName && remoteSchema && remoteTable) {
      // Mock creation
      setTableName('');
      setServerName('');
      setRemoteSchema('');
      setRemoteTable('');
      setShowCreateModal(false);
    }
  };

  const handleDeleteTable = (tableName: string) => {
    if (confirm(`Ви впевнені, що хочете видалити зовнішню таблицю "${tableName}"?`)) {
      // Mock deletion
    }
  };

  const handleRefreshTable = (tableName: string) => {
    // Mock refresh/sync
    console.log(`Refreshing foreign table: ${tableName}`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Зовнішні таблиці</CardTitle>
                <CardDescription>Управління Foreign Data Wrappers (FDW) таблицями</CardDescription>
              </div>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Створити зовнішню таблицю
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Пошук зовнішніх таблиць..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Alert about FDW */}
          <Alert className="bg-blue-50 border-blue-200">
            <Link2 className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              Зовнішні таблиці дозволяють отримувати доступ до даних з інших баз даних або систем через Foreign Data Wrappers (FDW)
            </AlertDescription>
          </Alert>

          {/* Foreign Tables Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Локальна таблиця</TableHead>
                <TableHead>Сервер</TableHead>
                <TableHead>Віддалена таблиця</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Остання синхронізація</TableHead>
                <TableHead className="text-right">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTables.map((table) => (
                <TableRow key={table.name}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Database className="w-4 h-4 text-white" />
                      </div>
                      <code className="text-slate-900">{table.name}</code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">{table.server}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                      {table.remoteSchema}.{table.remoteTable}
                    </code>
                  </TableCell>
                  <TableCell>
                    {table.status === 'active' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Активна</Badge>
                    ) : (
                      <Badge variant="destructive">Помилка</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-600 text-sm">{table.lastSync}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Оновити дані"
                        onClick={() => handleRefreshTable(table.name)}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Редагувати">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTable(table.name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Видалити таблицю"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Foreign Table Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Створити зовнішню таблицю</DialogTitle>
            <DialogDescription>
              Створення нової зовнішньої таблиці для доступу до віддалених даних
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="table-name">Локальна назва таблиці</Label>
                <Input
                  id="table-name"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="remote_users"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="server-name">Зовнішній сервер</Label>
                <Select value={serverName} onValueChange={setServerName}>
                  <SelectTrigger id="server-name">
                    <SelectValue placeholder="Виберіть сервер" />
                  </SelectTrigger>
                  <SelectContent>
                    {foreignServersSimple.map((server) => (
                      <SelectItem key={server.name} value={server.name}>
                        {server.name} ({server.wrapper})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="remote-schema">Віддалена схема</Label>
                <Input
                  id="remote-schema"
                  value={remoteSchema}
                  onChange={(e) => setRemoteSchema(e.target.value)}
                  placeholder="public"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="remote-table">Віддалена таблиця</Label>
                <Input
                  id="remote-table"
                  value={remoteTable}
                  onChange={(e) => setRemoteTable(e.target.value)}
                  placeholder="users"
                />
              </div>
            </div>

            <Alert>
              <AlertDescription>
                <strong>Примітка:</strong> Переконайтеся, що зовнішній сервер налаштований і доступний. Для налаштування серверів використовуйте розділ "Розширення".
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Скасувати
            </Button>
            <Button 
              onClick={handleCreateTable}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Створити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}