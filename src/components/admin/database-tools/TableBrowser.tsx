import { useState, useEffect } from 'react';
import {
  TableListSidebar,
  TableHeaderCard,
  TableSchemaView,
  TableDataPreview,
  EmptyTableState,
} from './table-browser';
import { tables as allTables, tableSchema, tableData } from '@/mockData/admin/tableBrowser';
import type { TableBrowserProps } from './table-browser/types';
import { mockApiCall } from '../../../utils/mockApi';
import { SkeletonList, SkeletonTable } from '../../ui/skeletons';

export default function TableBrowser({ selectedDatabase }: TableBrowserProps) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingTables, setIsLoadingTables] = useState(true);
  const [isLoadingTableData, setIsLoadingTableData] = useState(false);
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    // Load tables list
    mockApiCall('tables/list', { database: selectedDatabase }, 800).then((data) => {
      setTables(allTables);
      setIsLoadingTables(false);
    });
  }, [selectedDatabase]);

  useEffect(() => {
    if (selectedTable) {
      setIsLoadingTableData(true);
      mockApiCall('tables/data', { database: selectedDatabase, table: selectedTable }, 700).then((data) => {
        setIsLoadingTableData(false);
      });
    }
  }, [selectedTable, selectedDatabase]);

  const currentSchema = selectedTable ? (tableSchema[selectedTable as keyof typeof tableSchema] || []) : [];
  const currentData = selectedTable ? (tableData[selectedTable as keyof typeof tableData] || []) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        {isLoadingTables ? (
          <SkeletonList items={10} showAvatar={false} showMeta={false} />
        ) : (
          <TableListSidebar
            tables={tables}
            selectedTable={selectedTable}
            selectedDatabase={selectedDatabase}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onTableSelect={setSelectedTable}
          />
        )}
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

            {isLoadingTableData ? (
              <>
                <SkeletonTable rows={5} columns={4} />
                <SkeletonTable rows={10} columns={currentSchema.length || 4} />
              </>
            ) : (
              <>
                <TableSchemaView schema={currentSchema} />
                <TableDataPreview data={currentData} limit={100} />
              </>
            )}
          </>
        ) : (
          <EmptyTableState />
        )}
      </div>
    </div>
  );
}