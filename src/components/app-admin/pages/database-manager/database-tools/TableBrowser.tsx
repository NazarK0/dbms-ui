import { useState, useEffect } from 'react';
import {
  TableListSidebar,
  TableHeaderCard,
  TableSchemaView,
  TableDataPreview,
  EmptyTableState,
  AddRecordModal,
} from './table-browser';
import { tables as allTables, tableSchema, tableData } from '../../../../../mockData/admin/tableBrowser';
import type { TableBrowserProps } from './table-browser/types';
import { API, api } from '../../../../../utils/api';
import { SkeletonList, SkeletonTable } from '../../../../ui/skeletons';
import { useAdminUser } from '../../../../../contexts/AdminUserContext';
import { toast } from 'sonner';

export default function TableBrowser({ selectedDatabase }: TableBrowserProps) {
  const { hasPermission, canAccessDatabase } = useAdminUser();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingTables, setIsLoadingTables] = useState(true);
  const [isLoadingTableData, setIsLoadingTableData] = useState(false);
  const [tables, setTables] = useState<any[]>([]);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);

  useEffect(() => {
    // Load tables list
    api.get(API.admin.databaseTools.tables.list(), { database: selectedDatabase })
      .then((data) => {
        setTables(data);
        setIsLoadingTables(false);
      })
      .catch((error) => {
        console.error('Error loading tables:', error);
        setIsLoadingTables(false);
      });
  }, [selectedDatabase]);

  useEffect(() => {
    if (selectedTable) {
      setIsLoadingTableData(true);
      api.get(API.admin.databaseTools.tables.data(), { database: selectedDatabase, table: selectedTable })
        .then((data) => {
          setIsLoadingTableData(false);
        })
        .catch((error) => {
          console.error('Error loading table data:', error);
          setIsLoadingTableData(false);
        });
    }
  }, [selectedTable, selectedDatabase]);

  const currentSchema = selectedTable ? (tableSchema[selectedTable as keyof typeof tableSchema] || []) : [];
  const currentData = selectedTable ? (tableData[selectedTable as keyof typeof tableData] || []) : [];

  // Get owner info for selected table
  const currentTableOwner = tables.find(t => t.name === selectedTable)?.owner;

  // Перевірка чи користувач має доступ до перегляду даних
  const canViewData = hasPermission('canViewTableData') && canAccessDatabase(selectedDatabase || '');

  // Handle adding a new record
  const handleAddRecord = async (data: Record<string, any>) => {
    try {
      // API call to insert record
      await api.post(API.admin.databaseTools.tables.data(), {
        database: selectedDatabase,
        table: selectedTable,
        data,
      });

      toast.success('Запис успішно додано', {
        description: `Новий запис додано до таблиці ${selectedTable}`,
      });

      // In a real app, you would refresh the table data here
      // For now, we'll just show the success message
    } catch (error) {
      throw new Error('Не вдалося додати запис. Спробуйте ще раз.');
    }
  };

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
              owner={currentTableOwner}
            />

            {isLoadingTableData ? (
              <>
                <SkeletonTable rows={5} columns={4} />
                <SkeletonTable rows={10} columns={currentSchema.length || 4} />
              </>
            ) : (
              <>
                <TableSchemaView schema={currentSchema} />
                <TableDataPreview
                  data={currentData}
                  limit={100}
                  canViewData={canViewData}
                  onAddRecord={() => setShowAddRecordModal(true)}
                />
              </>
            )}
          </>
        ) : (
          <EmptyTableState />
        )}
      </div>

      {/* Add Record Modal */}
      {selectedTable && (
        <AddRecordModal
          open={showAddRecordModal}
          onOpenChange={setShowAddRecordModal}
          tableName={selectedTable}
          schema={currentSchema}
          onAddRecord={handleAddRecord}
        />
      )}
    </div>
  );
}