/**
 * Custom hook for DatabaseBrowser component state management
 */

import { useState } from 'react';
import { mockDatabases } from './mockDatabases';
import { filterDatabases } from './utils';

export function useDatabaseBrowser(propSelectedDatabase?: string | null) {
  const [searchTerm, setSearchTerm] = useState('');
  const [localSelectedDatabase, setLocalSelectedDatabase] = useState<string | null>(
    propSelectedDatabase || null
  );
  const [copied, setCopied] = useState(false);

  // Use prop if provided, otherwise use local state
  const selectedDatabase = propSelectedDatabase || localSelectedDatabase;

  // Copy to clipboard handler
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter databases by search term
  const filteredDatabases = filterDatabases(mockDatabases, searchTerm);

  // Get selected database data
  const selectedDatabaseData = mockDatabases.find((db) => db.name === selectedDatabase);

  return {
    // State
    searchTerm,
    selectedDatabase,
    copied,
    databases: mockDatabases,
    filteredDatabases,
    selectedDatabaseData,

    // Setters
    setSearchTerm,
    setLocalSelectedDatabase,

    // Handlers
    handleCopy,
  };
}
