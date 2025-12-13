import { TableSearchBar } from './table';
import {
  DatabaseBrowserHeader,
  DatabaseBrowserTablesView,
  DatabaseBrowserGridView,
  useDatabaseBrowser,
} from './database-browser';

export interface DatabaseBrowserProps {
  onTableSelect: (database: string, table: string, permissions: string[]) => void;
  selectedDatabase?: string | null;
  onBack?: () => void;
}

export default function DatabaseBrowser({
  onTableSelect,
  selectedDatabase: propSelectedDatabase,
  onBack,
}: DatabaseBrowserProps) {
  const {
    searchTerm,
    selectedDatabase,
    copied,
    filteredDatabases,
    selectedDatabaseData,
    setSearchTerm,
    setLocalSelectedDatabase,
    handleCopy,
  } = useDatabaseBrowser(propSelectedDatabase);

  return (
    <div className="space-y-6">
      {/* Header */}
      <DatabaseBrowserHeader propSelectedDatabase={propSelectedDatabase} onBack={onBack} />

      {/* Search */}
      <TableSearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={
          propSelectedDatabase
            ? 'Пошук таблиць...'
            : 'Пошук баз даних або таблиць...'
        }
      />

      {/* Content based on whether a database is pre-selected */}
      {propSelectedDatabase ? (
        // Show only tables for the selected database
        <DatabaseBrowserTablesView
          database={propSelectedDatabase}
          tables={selectedDatabaseData?.tables || []}
          searchTerm={searchTerm}
          copied={copied}
          onTableSelect={onTableSelect}
          onCopy={handleCopy}
        />
      ) : (
        // Show database browser with sidebar
        <DatabaseBrowserGridView
          databases={filteredDatabases}
          selectedDatabase={selectedDatabase}
          searchTerm={searchTerm}
          copied={copied}
          onDatabaseSelect={setLocalSelectedDatabase}
          onTableSelect={onTableSelect}
          onCopy={handleCopy}
        />
      )}
    </div>
  );
}
