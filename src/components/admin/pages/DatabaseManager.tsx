import { useState } from 'react';
import { X, Database as DatabaseIcon } from 'lucide-react';
import { Alert, AlertDescription } from '../../ui/alert';
import { Button } from '../../ui/button';
import {
  DatabaseList,
  DatabaseToolsView,
  CreateDatabaseModal,
  CopyDatabaseModal,
  ExportSchemaModal,
  ImportSchemaModal,
} from '../database-manager';

type SubTab = 'query' | 'schemas' | 'schema' | 'extensions' | 'functions' | 'triggers' | 'backup';

interface Database {
  name: string;
  owner: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
}

export default function DatabaseManager() {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('schemas');
  const [databases, setDatabases] = useState<Database[]>([
    { name: 'production_db', owner: 'admin', size: '1.2 ГБ', tables: 45, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'staging_db', owner: 'admin', size: '850 МБ', tables: 42, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'analytics_db', owner: 'analyst', size: '720 МБ', tables: 28, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'test_db', owner: 'developer', size: '340 МБ', tables: 18, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'backup_db', owner: 'admin', size: '2.1 ГБ', tables: 67, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'logs_db', owner: 'system', size: '1.8 ГБ', tables: 12, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
  ]);

  // Modal states
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
    setActiveSubTab('schemas');
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

      {/* Database Tools View - shows when database is selected */}
      {selectedDatabase ? (
        <DatabaseToolsView
          selectedDatabase={selectedDatabase}
          activeSubTab={activeSubTab}
          onSubTabChange={setActiveSubTab}
        />
      ) : (
        /* Database List - shows when no database is selected */
        <DatabaseList
          databases={databases}
          onDatabaseSelect={handleSelectDatabase}
          onDeleteDatabase={handleDeleteDatabase}
          onExport={handleExport}
          onCopy={handleCopy}
          onCreateDatabase={() => setShowCreateModal(true)}
          onImportSchema={() => setShowImportModal(true)}
        />
      )}

      {/* Modals */}
      <CreateDatabaseModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        dbName={newDbName}
        onDbNameChange={setNewDbName}
        dbOwner={newDbOwner}
        onDbOwnerChange={setNewDbOwner}
        onCreate={handleCreateDatabase}
      />

      <CopyDatabaseModal
        open={showCopyModal}
        onOpenChange={(open) => {
          setShowCopyModal(open);
          if (!open) setSelectedDb(null);
        }}
        selectedDb={selectedDb}
        onConfirm={() => {
          setShowCopyModal(false);
          setSelectedDb(null);
        }}
      />

      <ExportSchemaModal
        open={showExportModal}
        onOpenChange={(open) => {
          setShowExportModal(open);
          if (!open) setSelectedDb(null);
        }}
        selectedDb={selectedDb}
        onConfirm={() => {
          setShowExportModal(false);
          setSelectedDb(null);
        }}
      />

      <ImportSchemaModal
        open={showImportModal}
        onOpenChange={setShowImportModal}
        databases={databases}
        onConfirm={() => setShowImportModal(false)}
      />
    </div>
  );
}