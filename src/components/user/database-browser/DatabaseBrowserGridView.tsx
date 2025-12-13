import { DatabaseSidebar, TablesList } from '../browser';
import type { DatabaseBrowserGridViewProps } from './types';

/**
 * Grid view for database browser mode
 * Shows sidebar with databases + tables list
 */
export default function DatabaseBrowserGridView({
  databases,
  selectedDatabase,
  searchTerm,
  copied,
  onDatabaseSelect,
  onTableSelect,
  onCopy,
}: DatabaseBrowserGridViewProps) {
  const selectedDatabaseData = databases.find((db) => db.name === selectedDatabase);
  const tables = selectedDatabaseData?.tables || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Databases Sidebar */}
      <DatabaseSidebar
        databases={databases}
        selectedDatabase={selectedDatabase}
        onDatabaseSelect={onDatabaseSelect}
      />

      {/* Tables List */}
      <TablesList
        database={selectedDatabase}
        tables={tables}
        copied={copied}
        searchTerm={searchTerm}
        onTableSelect={(tableName, permissions) => {
          if (selectedDatabase) {
            onTableSelect(selectedDatabase, tableName, permissions);
          }
        }}
        onCopy={onCopy}
      />
    </div>
  );
}
