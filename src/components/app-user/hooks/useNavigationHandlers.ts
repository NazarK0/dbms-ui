import { Tab } from '../BrowserTabs';

interface UseNavigationHandlersProps {
  updateActiveTab: (updates: Partial<Tab>) => void;
  selectedDatabase: string | null;
}

export function useNavigationHandlers({ updateActiveTab, selectedDatabase }: UseNavigationHandlersProps) {
  const handleTableSelect = (database: string, table: string, permissions: string[], highlightRecordId?: string) => {
    updateActiveTab({
      type: 'table',
      title: table,
      view: 'table',
      selectedDatabase: database,
      selectedTable: { database, table, permissions, highlightRecordId },
      recordId: null,
    });
  };

  const handleBackToDatabase = () => {
    updateActiveTab({
      type: 'database',
      title: selectedDatabase || 'Database',
      view: 'database-tables',
      selectedTable: null,
      recordId: null,
    });
  };

  const handleDatabaseSelect = (database: string) => {
    updateActiveTab({
      type: 'database',
      title: database,
      view: 'database-tables',
      selectedDatabase: database,
      selectedTable: null,
      recordId: null,
    });
  };

  const handleBackToDashboard = () => {
    updateActiveTab({
      type: 'dashboard',
      title: 'Dashboard',
      view: 'dashboard',
      selectedDatabase: null,
      selectedTable: null,
      recordId: null,
    });
  };

  const handleCreateRecord = () => {
    updateActiveTab({
      view: 'create-record',
    });
  };

  const handleEditRecord = (id: string) => {
    updateActiveTab({
      view: 'edit-record',
      recordId: id,
    });
  };

  return {
    handleTableSelect,
    handleBackToDatabase,
    handleDatabaseSelect,
    handleBackToDashboard,
    handleCreateRecord,
    handleEditRecord,
  };
}
