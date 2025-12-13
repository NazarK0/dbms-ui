import { useState } from 'react';
import {
  TableListSidebar,
  TableHeaderCard,
  TableSchemaView,
  TableDataPreview,
  EmptyTableState,
} from './table-browser';
import { tables as allTables, tableSchema, tableData } from '@/mockData/admin/tableBrowser';
import type { TableBrowserProps } from './table-browser/types';

export default function TableBrowser({ selectedDatabase }: TableBrowserProps) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const currentSchema = selectedTable ? (tableSchema[selectedTable as keyof typeof tableSchema] || []) : [];
  const currentData = selectedTable ? (tableData[selectedTable as keyof typeof tableData] || []) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <TableListSidebar
          tables={allTables}
          selectedTable={selectedTable}
          selectedDatabase={selectedDatabase}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onTableSelect={setSelectedTable}
        />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {selectedTable ? (
          <>
            <TableHeaderCard
              tableName={selectedTable}
              databaseName={selectedDatabase}
              columnCount={currentSchema.length}
            />

            <TableSchemaView schema={currentSchema} />

            <TableDataPreview data={currentData} limit={100} />
          </>
        ) : (
          <EmptyTableState />
        )}
      </div>
    </div>
  );
}