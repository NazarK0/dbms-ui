import { useState } from 'react';
import { Server, Plus, Trash2, Edit, Search, CheckCircle, XCircle, AlertCircle, Link2, Database } from 'lucide-react';
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

interface ForeignServersManagerProps {
  selectedDatabase: string;
}

export default function ForeignServersManager({ selectedDatabase }: ForeignServersManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [serverName, setServerName] = useState('');
  const [wrapperType, setWrapperType] = useState('postgres_fdw');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('5432');
  const [dbname, setDbname] = useState('');
  const [username, setUsername] = useState('');

  // Mock check for postgres_fdw extension
  const getInstalledExtensions = () => {
    // Mock data - in real app this would query the database
    const extensions = [
      { name: 'postgres_fdw', version: '1.1', description: 'Foreign-data wrapper for remote PostgreSQL servers' },
      { name: 'pg_stat_statements', version: '1.10', description: 'Track planning and execution statistics' },
      { name: 'pgcrypto', version: '1.3', description: 'Cryptographic functions' },
    ];
    return extensions;
  };

  const installedExtensions = getInstalledExtensions();
  const hasFDWExtension = installedExtensions.some(ext => 
    ext.name === 'postgres_fdw' || ext.name === 'mysql_fdw' || ext.name === 'oracle_fdw' || ext.name === 'multicorn'
  );

  // Mock data - foreign servers
  const foreignServers = [
    {
      name: 'external_db',
      wrapper: 'postgres_fdw',
      host: 'external.example.com',
      port: 5432,
      dbname: 'external_database',
      status: 'connected',
      foreignTables: 3,
      lastChecked: '2025-12-13 10:30:00',
    },
    {
      name: 'warehouse_db',
      wrapper: 'postgres_fdw',
      host: 'warehouse.example.com',
      port: 5432,
      dbname: 'warehouse',
      status: 'connected',
      foreignTables: 5,
      lastChecked: '2025-12-13 09:15:00',
    },
    {
      name: 'old_system',
      wrapper: 'postgres_fdw',
      host: 'legacy.example.com',
      port: 5432,
      dbname: 'legacy_db',
      status: 'error',
      foreignTables: 1,
      lastChecked: '2025-12-12 18:45:00',
    },
    {
      name: 'api_server',
      wrapper: 'multicorn',
      host: 'api.example.com',
      port: 443,
      dbname: 'N/A',
      status: 'disconnected',
      foreignTables: 0,
      lastChecked: '2025-12-10 14:20:00',
    },
  ];

  const filteredServers = foreignServers.filter(server =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.wrapper.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateServer = () => {
    if (serverName.trim() && host.trim()) {
      // Mock creation
      setServerName('');
      setWrapperType('postgres_fdw');
      setHost('');
      setPort('5432');
      setDbname('');
      setUsername('');
      setShowCreateModal(false);
    }
  };

  const handleDeleteServer = (serverName: string) => {
    if (confirm(`Ви впевнені, що хочете видалити зовнішній сервер "${serverName}"? Всі пов'язані зовнішні таблиці будуть видалені.`)) {
      // Mock deletion
    }
  };

  const handleTestConnection = (serverName: string) => {
    // Mock connection test
    console.log(`Testing connection to: ${serverName}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Підключено
          </Badge>
        );
      case 'disconnected':
        return (
          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            Відключено
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Помилка
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // If FDW extension is not installed, show alert
  if (!hasFDWExtension) {
    return (
      <Alert className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-5 w-5 text-amber-600" />
        <AlertDescription className="text-amber-900">
          <div className="space-y-2">
            <p className="font-semibold">Розширення Foreign Data Wrapper не встановлено</p>
            <p>
              Для використання зовнішніх серверів необхідно встановити розширення <code className="bg-amber-100 px-2 py-0.5 rounded">postgres_fdw</code> або інше FDW розширення.
            </p>
            <p className="text-sm">
              Перейдіть до розділу "Розширення" для встановлення необхідних компонентів.
            </p>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                <Server className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Зовнішні сервери</CardTitle>
                <CardDescription>Управління підключеннями до віддалених баз даних через FDW</CardDescription>
              </div>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Додати сервер
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Пошук серверів..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Alert about FDW */}
          <Alert className="bg-blue-50 border-blue-200">
            <Link2 className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              Зовнішні сервери дозволяють підключатися до віддалених баз даних та створювати foreign tables для доступу до даних
            </AlertDescription>
          </Alert>

          {/* Foreign Servers Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Назва сервера</TableHead>
                <TableHead>Wrapper</TableHead>
                <TableHead>Хост</TableHead>
                <TableHead>База даних</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Таблиці</TableHead>
                <TableHead>Остання перевірка</TableHead>
                <TableHead className="text-right">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServers.map((server) => (
                <TableRow key={server.name}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Server className="w-4 h-4 text-white" />
                      </div>
                      <code className="text-slate-900">{server.name}</code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {server.wrapper}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    <div className="flex items-center gap-1">
                      <Database className="w-3 h-3 text-slate-400" />
                      <span className="text-sm">{server.host}:{server.port}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded">{server.dbname}</code>
                  </TableCell>
                  <TableCell>{getStatusBadge(server.status)}</TableCell>
                  <TableCell className="text-slate-600">{server.foreignTables}</TableCell>
                  <TableCell className="text-slate-600 text-sm">{server.lastChecked}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Перевірити з'єднання"
                        onClick={() => handleTestConnection(server.name)}
                      >
                        <Link2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Редагувати">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteServer(server.name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Видалити сервер"
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

      {/* Create Foreign Server Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Додати зовнішній сервер</DialogTitle>
            <DialogDescription>
              Налаштування підключення до віддаленої бази даних
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="server-name">Назва сервера</Label>
                <Input
                  id="server-name"
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  placeholder="external_db"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wrapper-type">Foreign Data Wrapper</Label>
                <Select value={wrapperType} onValueChange={setWrapperType}>
                  <SelectTrigger id="wrapper-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="postgres_fdw">postgres_fdw (PostgreSQL)</SelectItem>
                    <SelectItem value="mysql_fdw">mysql_fdw (MySQL)</SelectItem>
                    <SelectItem value="oracle_fdw">oracle_fdw (Oracle)</SelectItem>
                    <SelectItem value="multicorn">multicorn (API/Custom)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="host">Хост</Label>
                <Input
                  id="host"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder="external.example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="port">Порт</Label>
                <Input
                  id="port"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="5432"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dbname">База даних</Label>
              <Input
                id="dbname"
                value={dbname}
                onChange={(e) => setDbname(e.target.value)}
                placeholder="remote_database"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Користувач (опціонально)</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="remote_user"
              />
            </div>

            <Alert>
              <AlertDescription>
                <strong>Примітка:</strong> Після створення сервера, вам потрібно буде створити USER MAPPING для автентифікації та налаштувати foreign tables.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Скасувати
            </Button>
            <Button 
              onClick={handleCreateServer}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Додати сервер
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
