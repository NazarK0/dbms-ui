import { useState, useEffect } from 'react';
import { TableHeader, TableInfoCard, TablePagination, TableSearchBar } from './table';
import {
  TableDataGrid,
  RecordCreateModal,
  RecordEditModal,
  RecordDeleteModal,
  useTableDataEditor,
} from './table-data-editor';
import type { TableDataEditorProps } from './table-data-editor';
import { API, api } from '../../utils/api';
import { SkeletonTable, SkeletonCard } from '../ui/skeletons';

export default function TableDataEditor({
  database,
  table,
  permissions,
  highlightRecordId,
  onBack,
  onCreateRecord,
  onEditRecord,
}: TableDataEditorProps) {
  const [isLoadingData, setIsLoadingData] = useState(true);

  const {
    schema,
    filteredRecords,
    currentRecords,
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    searchTerm,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedRecord,
    formData,
    canInsert,
    canUpdate,
    canDelete,
    setCurrentPage,
    setItemsPerPage,
    setSearchTerm,
    setFormData,
    handleCreate,
    handleUpdate,
    handleDelete,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
  } = useTableDataEditor(table, permissions);

  useEffect(() => {
    // Load table data
    api.get(API.user.tables.records({ database, table }))
      .then((data) => {
        setIsLoadingData(false);
      })
      .catch((error) => {
        console.error('Error loading table records:', error);
        setIsLoadingData(false);
      });
  }, [database, table]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <TableHeader
        database={database}
        table={table}
        canInsert={canInsert}
        onBack={onBack}
        onCreateRecord={() => openCreateModal(onCreateRecord)}
      />

      {isLoadingData ? (
        <>
          <SkeletonCard contentLines={2} />
          <SkeletonTable rows={10} columns={schema.length} showActions={canUpdate || canDelete} />
        </>
      ) : (
        <>
          {/* Info Card */}
          <TableInfoCard database={database} recordsCount={filteredRecords.length} />

          {/* Search */}
          <TableSearchBar value={searchTerm} onChange={setSearchTerm} />

          {/* Data Table */}
          <TableDataGrid
            schema={schema}
            currentRecords={currentRecords}
            highlightRecordId={highlightRecordId}
            canUpdate={canUpdate}
            canDelete={canDelete}
            onEditRecord={(record) => openEditModal(record, onEditRecord)}
            onDeleteRecord={openDeleteModal}
          />

          {/* Pagination */}
          {filteredRecords.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              startIndex={startIndex}
              endIndex={endIndex}
              totalRecords={filteredRecords.length}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          )}
        </>
      )}

      {/* Create Modal */}
      <RecordCreateModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        schema={schema}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={() => handleCreate(onCreateRecord)}
        table={table}
      />

      {/* Edit Modal */}
      <RecordEditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        schema={schema}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={() => handleUpdate(onEditRecord)}
        recordId={selectedRecord?.id}
      />

      {/* Delete Modal */}
      <RecordDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        recordId={selectedRecord?.id}
        onConfirm={handleDelete}
      />
    </div>
  );
}