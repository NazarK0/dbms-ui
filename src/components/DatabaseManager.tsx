import { useState } from 'react';
import { Plus, Trash2, Edit, Copy, Download, Upload, FileCode, Terminal, Table2, Network, Puzzle, Code, Zap, Archive, X, Database as DatabaseIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import QueryExecutor from './QueryExecutor';
import TableBrowser from './TableBrowser';
import SchemaVisualizer from './SchemaVisualizer';
import ExtensionManager from './ExtensionManager';
import FunctionsManager from './FunctionsManager';
import TriggersRules from './TriggersRules';
import BackupRestore from './BackupRestore';

type SubTab = 'query' | 'tables' | 'schema' | 'extensions' | 'functions' | 'triggers' | 'backup';

export default function DatabaseManager() {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('tables');
  const [databases, setDatabases] = useState([
    { name: 'production_db', owner: 'admin', size: '1.2 ГБ', tables: 45, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'staging_db', owner: 'admin', size: '850 МБ', tables: 42, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'analytics_db', owner: 'analyst', size: '720 МБ', tables: 28, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'test_db', owner: 'developer', size: '340 МБ', tables: 18, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'backup_db', owner: 'admin', size: '2.1 ГБ', tables: 67, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'logs_db', owner: 'system', size: '1.8 ГБ', tables: 12, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedDb, setSelectedDb] = useState<string | null>(null);
  const [newDbName, setNewDbName] = useState('');
  const [newDbOwner, setNewDbOwner] = useState('admin');

  const handleCreateDatabase = () => {
    if (newDbName.trim()) {
      setDatabases([
        ...databases,
        {
          name: newDbName,
          owner: newDbOwner,
          size: '0 МБ',
          tables: 0,
          encoding: 'UTF8',
          collation: 'uk_UA.UTF-8',
        },
      ]);
      setNewDbName('');
      setShowCreateModal(false);
    }
  };

  const handleDeleteDatabase = (dbName: string) => {
    if (confirm(`Ви впевнені, що хочете видалити базу даних "${dbName}"?`)) {
      setDatabases(databases.filter((db) => db.name !== dbName));
      if (selectedDatabase === dbName) {
        setSelectedDatabase(null);
      }
    }
  };

  const handleSelectDatabase = (dbName: string) => {
    setSelectedDatabase(dbName);
    setActiveSubTab('tables');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">Керування базами даних</h2>
          <p className="text-slate-600">Управління базами даних PostgreSQL</p>
        </div>
        {!selectedDatabase && (
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setShowImportModal(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Імпорт схеми
            </Button>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Створити базу даних
            </Button>
          </div>
        )}
      </div>

      {/* Selected Database Info & Close */}
      {selectedDatabase && (
        <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <DatabaseIcon className="h-5 w-5 text-blue-600" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <p className="text-blue-900">Обрана база даних</p>
              <p className="text-blue-700 text-sm">{selectedDatabase}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelectedDatabase(null)}>
              <X className="w-4 h-4 mr-2" />
              Закрити
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Sub Navigation - показується тільки коли вибрана БД */}
      {selectedDatabase && (
        <Tabs value={activeSubTab} onValueChange={(value) => setActiveSubTab(value as SubTab)}>
          <TabsList className="bg-white shadow-sm border border-slate-200 h-auto">
            <TabsTrigger value="query" className="gap-2">
              <Terminal className="w-4 h-4" />
              Запити
            </TabsTrigger>
            <TabsTrigger value="tables" className="gap-2">
              <Table2 className="w-4 h-4" />
              Таблиці
            </TabsTrigger>
            <TabsTrigger value="schema" className="gap-2">
              <Network className="w-4 h-4" />
              Схема БД
            </TabsTrigger>
            <TabsTrigger value="extensions" className="gap-2">
              <Puzzle className="w-4 h-4" />
              Розширення
            </TabsTrigger>
            <TabsTrigger value="functions" className="gap-2">
              <Code className="w-4 h-4" />
              Функції
            </TabsTrigger>
            <TabsTrigger value="triggers" className="gap-2">
              <Zap className="w-4 h-4" />
              Тригери
            </TabsTrigger>
            <TabsTrigger value="backup" className="gap-2">
              <Archive className="w-4 h-4" />
              Резервні копії
            </TabsTrigger>
          </TabsList>

          <TabsContent value="query">
            <QueryExecutor selectedDatabase={selectedDatabase} />
          </TabsContent>
          <TabsContent value="tables">
            <TableBrowser selectedDatabase={selectedDatabase} />
          </TabsContent>
          <TabsContent value="schema">
            <SchemaVisualizer selectedDatabase={selectedDatabase} />
          </TabsContent>
          <TabsContent value="extensions">
            <ExtensionManager selectedDatabase={selectedDatabase} />
          </TabsContent>
          <TabsContent value="functions">
            <FunctionsManager selectedDatabase={selectedDatabase} />
          </TabsContent>
          <TabsContent value="triggers">
            <TriggersRules selectedDatabase={selectedDatabase} />
          </TabsContent>
          <TabsContent value="backup">
            <BackupRestore selectedDatabase={selectedDatabase} />
          </TabsContent>
        </Tabs>
      )}

      {/* Database List - показується тільки коли не вибрана БД */}
      {!selectedDatabase && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Список баз даних</CardTitle>
            <CardDescription>Клацніть на рядок для відкриття деталей бази даних</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Назва бази даних</TableHead>
                  <TableHead>Власник</TableHead>
                  <TableHead>Розмір</TableHead>
                  <TableHead>Таблиці</TableHead>
                  <TableHead>Кодування</TableHead>
                  <TableHead>Сортування</TableHead>
                  <TableHead className="text-right">Дії</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {databases.map((db) => (
                  <TableRow 
                    key={db.name} 
                    onClick={() => handleSelectDatabase(db.name)}
                    className="cursor-pointer hover:bg-blue-50/50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                          <DatabaseIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-900">{db.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{db.owner}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{db.size}</TableCell>
                    <TableCell className="text-slate-600">{db.tables}</TableCell>
                    <TableCell className="text-slate-600">{db.encoding}</TableCell>
                    <TableCell className="text-slate-600">{db.collation}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedDb(db.name);
                            setShowExportModal(true);
                          }}
                          title="Експорт схеми"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedDb(db.name);
                            setShowCopyModal(true);
                          }}
                          title="Копіювати БД"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Редагувати">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteDatabase(db.name)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
      )}

      {/* Create Database Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Створити нову базу даних</DialogTitle>
            <DialogDescription>
              Введіть параметри для створення нової бази даних PostgreSQL
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="db-name">Назва бази даних</Label>
              <Input
                id="db-name"
                value={newDbName}
                onChange={(e) => setNewDbName(e.target.value)}
                placeholder="my_database"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-owner">Власник</Label>
              <Select value={newDbOwner} onValueChange={setNewDbOwner}>
                <SelectTrigger id="db-owner">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="developer">developer</SelectItem>
                  <SelectItem value="analyst">analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-encoding">Кодування</Label>
              <Select defaultValue="UTF8">
                <SelectTrigger id="db-encoding">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTF8">UTF8</SelectItem>
                  <SelectItem value="LATIN1">LATIN1</SelectItem>
                  <SelectItem value="SQL_ASCII">SQL_ASCII</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Скасувати
            </Button>
            <Button onClick={handleCreateDatabase}>Створити</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Copy Database Modal */}
      <Dialog open={showCopyModal} onOpenChange={setShowCopyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Копіювати базу даних</DialogTitle>
            <DialogDescription>
              Створити копію бази даних "{selectedDb}" з усіма таблицями та даними
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="copy-name">Назва нової бази даних</Label>
              <Input
                id="copy-name"
                placeholder={`${selectedDb}_copy`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="copy-type">Тип копіювання</Label>
              <Select defaultValue="full">
                <SelectTrigger id="copy-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Повна копія (структура + дані)</SelectItem>
                  <SelectItem value="schema">Тільки структура</SelectItem>
                  <SelectItem value="data">Структура + дані (без індексів)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Alert>
              <AlertDescription>
                <strong>Примітка:</strong> Копіювання великих баз даних може зайняти деякий час.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowCopyModal(false);
              setSelectedDb(null);
            }}>
              Скасувати
            </Button>
            <Button onClick={() => {
              setShowCopyModal(false);
              setSelectedDb(null);
            }}>
              Копіювати
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Schema Modal */}
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Експорт схеми бази даних</DialogTitle>
            <DialogDescription>
              Експортувати схему бази даних "{selectedDb}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="export-format">Формат експорту</Label>
              <Select defaultValue="sql">
                <SelectTrigger id="export-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sql">SQL (pg_dump)</SelectItem>
                  <SelectItem value="custom">Custom (pg_dump -Fc)</SelectItem>
                  <SelectItem value="tar">TAR архів</SelectItem>
                  <SelectItem value="directory">Директорія</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label>Що експортувати</Label>
              <div className="space-y-2">
                {['Структура таблиць', 'Дані', 'Індекси', 'Тригери та функції', 'Права доступу'].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} defaultChecked />
                    <Label htmlFor={item} className="text-sm font-normal cursor-pointer">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowExportModal(false);
              setSelectedDb(null);
            }}>
              Скасувати
            </Button>
            <Button onClick={() => {
              setShowExportModal(false);
              setSelectedDb(null);
            }}>
              <Download className="w-4 h-4 mr-2" />
              Експортувати
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Schema Modal */}
      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Імпорт схеми бази даних</DialogTitle>
            <DialogDescription>
              Імпортувати схему з файлу резервної копії
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="target-db">Цільова база даних</Label>
              <Select defaultValue="">
                <SelectTrigger id="target-db">
                  <SelectValue placeholder="Створити нову базу даних" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Створити нову базу даних</SelectItem>
                  {databases.map((db) => (
                    <SelectItem key={db.name} value={db.name}>{db.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Файл схеми</Label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100">
                <FileCode className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-600">Перетягніть файл сюди або клацніть для вибору</p>
                <p className="text-xs text-slate-500 mt-2">SQL, Custom, TAR файли</p>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Параметри імпорту</Label>
              <div className="space-y-2">
                {[
                  { label: 'Очистити цільову БД перед імпортом', checked: false },
                  { label: 'Ігнорувати помилки', checked: true },
                  { label: 'Відключити тригери під час імпорту', checked: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-2">
                    <Checkbox id={item.label} defaultChecked={item.checked} />
                    <Label htmlFor={item.label} className="text-sm font-normal cursor-pointer">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportModal(false)}>
              Скасувати
            </Button>
            <Button onClick={() => setShowImportModal(false)}>
              <Upload className="w-4 h-4 mr-2" />
              Імпортувати
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}