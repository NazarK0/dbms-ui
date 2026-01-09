import { useState, useEffect } from 'react';
import { TableSearchBar } from './table';
import {
  DatabaseBrowserHeader,
  DatabaseBrowserTablesView,
  DatabaseBrowserGridView,
  useDatabaseBrowser,
} from './database-browser';
import { API, api } from '../../utils/api';
import { SkeletonCardGrid, SkeletonList } from '../ui/skeletons';

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

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load databases
    api.get(API.user.databases.list())
      .then((data) => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading databases:', error);
        setIsLoading(false);
      });
  }, []);

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
      {isLoading ? (
        propSelectedDatabase ? (
          <SkeletonList items={8} showAvatar={false} />
        ) : (
          <SkeletonCardGrid count={6} columns={3} />
        )
      ) : propSelectedDatabase ? (
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