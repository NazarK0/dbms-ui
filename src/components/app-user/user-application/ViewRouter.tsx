import UserDashboard from '../UserDashboard';
import DatabaseBrowser from '../DatabaseBrowser';
import TableDataEditor from '../TableDataEditor';
import CreateRecord from '../CreateRecord';
import EditRecord from '../EditRecord';
import UserProfile from '../UserProfile';
import { getMockEditRecordData } from './mockData';
import type { ViewRouterProps } from './types';

/**
 * View router component that handles conditional rendering of different views
 * Extracts complex ternary logic from main component
 */
export default function ViewRouter({
  currentView,
  selectedDatabase,
  selectedTable,
  recordId,
  userRoles,
  onUpdateActiveTab,
  onBackToDashboard,
  onBackToDatabase,
  onDatabaseSelect,
  onTableSelect,
  onCreateRecord,
  onEditRecord,
}: ViewRouterProps) {
  // Profile View
  if (currentView === 'profile') {
    return (
      <UserProfile
        userRoles={userRoles}
        onBack={() => onUpdateActiveTab({ view: 'dashboard' })}
      />
    );
  }

  // Create Record View
  if (currentView === 'create-record' && selectedTable) {
    return (
      <CreateRecord
        database={selectedTable.database}
        table={selectedTable.table}
        onBack={() => onUpdateActiveTab({ view: 'table' })}
        onSave={(data) => {
          console.log('Saved:', data);
          onUpdateActiveTab({ view: 'table' });
        }}
      />
    );
  }

  // Edit Record View
  if (currentView === 'edit-record' && selectedTable && recordId) {
    const initialData = getMockEditRecordData(recordId);
    const canDelete = selectedTable.permissions?.includes('DELETE') ?? false;

    return (
      <EditRecord
        database={selectedTable.database}
        table={selectedTable.table}
        recordId={recordId}
        initialData={initialData}
        onBack={() => onUpdateActiveTab({ view: 'table' })}
        onSave={(data) => {
          console.log('Updated:', data);
          onUpdateActiveTab({ view: 'table' });
        }}
        onDelete={(id) => {
          console.log('Deleted:', id);
          onUpdateActiveTab({ view: 'table' });
        }}
        canDelete={canDelete}
      />
    );
  }

  // Table Data Editor View
  if (currentView === 'table' && selectedTable) {
    return (
      <TableDataEditor
        database={selectedTable.database}
        table={selectedTable.table}
        permissions={selectedTable.permissions ?? []}
        highlightRecordId={selectedTable.highlightRecordId}
        onBack={onBackToDatabase}
        onCreateRecord={onCreateRecord}
        onEditRecord={(record) => onEditRecord(record.id.toString())}
      />
    );
  }

  // Database Tables Browser
  if (currentView === 'database-tables' && selectedDatabase) {
    return (
      <DatabaseBrowser
        onTableSelect={onTableSelect}
        selectedDatabase={selectedDatabase}
        onBack={onBackToDashboard}
      />
    );
  }

  // Default: Dashboard View
  return (
    <UserDashboard
      userRoles={userRoles}
      onDatabaseSelect={onDatabaseSelect}
      onTableSelect={onTableSelect}
    />
  );
}
