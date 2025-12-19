import UserDatabasesTable from './UserDatabasesTable';
import TemplateDatabasesCard from './TemplateDatabasesCard';
import AdminDatabasesCard from './AdminDatabasesCard';
import DatabaseToolsView from './DatabaseToolsView';
import DatabaseManagerHeader from './DatabaseManagerHeader';
import SelectedDatabaseAlert from './SelectedDatabaseAlert';
import DatabaseListView from './DatabaseListView';


// Database tools sections configuration
export * from './databaseToolsSections';





import { useState, useEffect, lazy, Suspense } from 'react';
import { userDatabases } from '../../../../mockData/admin';
import { API, api } from '../../../../utils/api';
import { SkeletonCardGrid } from '../../../ui/skeletons';

// Lazy load modals (only needed when opened)
const CreateDatabaseModal = lazy(() => import('./CreateDatabaseModal'));
const CopyDatabaseModal = lazy(() => import('./CopyDatabaseModal'));
const ExportDatabaseModal = lazy(() => import('./ExportDatabaseModal'));
const ImportDatabaseModal = lazy(() => import('./ImportDatabaseModal'));

export default function DatabaseManager() {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [databases, setDatabases] = useState(userDatabases);
  const [isLoadingDatabases, setIsLoadingDatabases] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedDb, setSelectedDb] = useState<string | null>(null);
  const [newDbName, setNewDbName] = useState('');
  const [newDbOwner, setNewDbOwner] = useState('admin');

  useEffect(() => {
    // Load databases
    api.get(API.admin.databaseManager.userDatabases.list())
      .then((data) => {
        setDatabases(data);
        setIsLoadingDatabases(false);
      })
      .catch((error) => {
        console.error('Error loading databases:', error);
        setIsLoadingDatabases(false);
      });
  }, []);

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

  const handleExportComplete = () => {
    setShowExportModal(false);
    setSelectedDb(null);
  };

  const handleCopyComplete = () => {
    setShowCopyModal(false);
    setSelectedDb(null);
  };

  const handleImportComplete = () => {
    setShowImportModal(false);
  };

  const handleCloseCopyModal = () => {
    setShowCopyModal(false);
    setSelectedDb(null);
  };

  const handleCloseExportModal = () => {
    setShowExportModal(false);
    setSelectedDb(null);
  };

  return (
    <div className="space-y-6">
      <DatabaseManagerHeader
        selectedDatabase={selectedDatabase}
        onCreateClick={() => setShowCreateModal(true)}
        onImportClick={() => setShowImportModal(true)}
      />

      {selectedDatabase && (
        <SelectedDatabaseAlert
          databaseName={selectedDatabase}
          onClose={() => setSelectedDatabase(null)}
        />
      )}

      {selectedDatabase && (
        <DatabaseToolsView selectedDatabase={selectedDatabase} />
      )}

      {!selectedDatabase && (
        isLoadingDatabases ? (
          <SkeletonCardGrid count={6} columns={3} />
        ) : (
          <DatabaseListView
            databases={databases}
            onDatabaseSelect={handleSelectDatabase}
            onDeleteDatabase={handleDeleteDatabase}
            onExport={handleExport}
            onCopy={handleCopy}
          />
        )
      )}

      <Suspense fallback={<div>Loading...</div>}>
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
          onOpenChange={setShowCopyModal}
          sourceDatabaseName={selectedDb}
          onCopy={handleCopyComplete}
          onClose={handleCloseCopyModal}
        />

        <ExportDatabaseModal
          open={showExportModal}
          onOpenChange={setShowExportModal}
          databaseName={selectedDb}
          onExport={handleExportComplete}
          onClose={handleCloseExportModal}
        />

        <ImportDatabaseModal
          open={showImportModal}
          onOpenChange={setShowImportModal}
          databases={databases}
          onImport={handleImportComplete}
        />
      </Suspense>
    </div>
  );
}