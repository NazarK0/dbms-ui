import { useState } from 'react';
import { Plus, Upload, X, Database as DatabaseIcon, Download, FileCode } from 'lucide-react';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { Alert, AlertDescription } from '../../ui/alert';
import { userDatabases } from '../../../mockData/admin';
import DatabaseToolsView from '../database-manager/DatabaseToolsView';
import UserDatabasesTable from '../database-manager/UserDatabasesTable';
import TemplateDatabasesCard from '../database-manager/TemplateDatabasesCard';
import AdminDatabasesCard from '../database-manager/AdminDatabasesCard';

export default function DatabaseManager() {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [databases, setDatabases] = useState(userDatabases);

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
          type: 'user' as const,
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
  };

  const handleExport = (dbName: string) => {
    setSelectedDb(dbName);
    setShowExportModal(true);
  };

  const handleCopy = (dbName: string) => {
    setSelectedDb(dbName);
    setShowCopyModal(true);
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
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
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
        <DatabaseToolsView selectedDatabase={selectedDatabase} />
      )}

      {/* Database List - показується тільки коли не вибрана БД */}
      {!selectedDatabase && (
        <>
          <UserDatabasesTable
            databases={databases}
            onDatabaseSelect={handleSelectDatabase}
            onDeleteDatabase={handleDeleteDatabase}
            onExport={handleExport}
            onCopy={handleCopy}
          />

          <TemplateDatabasesCard
            onDatabaseSelect={handleSelectDatabase}
            onExport={handleExport}
            onCopy={handleCopy}
          />

          <AdminDatabasesCard
            onDatabaseSelect={handleSelectDatabase}
            onExport={handleExport}
            onCopy={handleCopy}
          />
        </>
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
            <Button 
              onClick={handleCreateDatabase}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
              Створити
            </Button>
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
            <Button 
              onClick={() => {
                setShowCopyModal(false);
                setSelectedDb(null);
              }}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
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
            <Button 
              onClick={() => {
                setShowExportModal(false);
                setSelectedDb(null);
              }}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
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
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-lime-500 transition-colors cursor-pointer bg-slate-50 hover:bg-lime-50">
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
            <Button 
              onClick={() => setShowImportModal(false)}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Імпортувати
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
