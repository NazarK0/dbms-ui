/**
 * Custom hook for TableDataEditor state and logic management
 */

import { useState } from 'react';
import { tableSchemas, defaultTableSchema } from '../../../mockData/user';
import { filterRecords, getPaginationData, paginateRecords, generateNewRecordId } from './recordUtils';
import { getPermissions } from './permissionUtils';
import type { TableRecord, TableSchema } from './types';

export function useTableDataEditor(
  table: string,
  permissions: string[]
) {
  // Get table schema
  const getTableSchema = (): TableSchema => {
    return tableSchemas[table] || defaultTableSchema;
  };

  const schema = getTableSchema();

  // State
  const [records, setRecords] = useState<TableRecord[]>(schema.data);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TableRecord | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Derived state - filtering
  const filteredRecords = filterRecords(records, searchTerm);

  // Derived state - pagination
  const paginationData = getPaginationData(filteredRecords.length, currentPage, itemsPerPage);
  const currentRecords = paginateRecords(filteredRecords, currentPage, itemsPerPage);

  // Derived state - permissions
  const permissionFlags = getPermissions(permissions);

  // CRUD Operations
  const handleCreate = (onCreateCallback?: () => void) => {
    const newRecord: TableRecord = { id: generateNewRecordId(records) };
    schema.columns.forEach((col: any) => {
      if (!col.autoIncrement && !col.primaryKey) {
        newRecord[col.name] = formData[col.name] || '';
      }
    });
    setRecords([...records, newRecord]);
    setIsCreateModalOpen(false);
    setFormData({});
    if (onCreateCallback) onCreateCallback();
  };

  const handleUpdate = (onEditCallback?: (record: TableRecord) => void) => {
    if (!selectedRecord) return;
    setRecords(records.map((r) => (r.id === selectedRecord.id ? { ...r, ...formData } : r)));
    setIsEditModalOpen(false);
    setFormData({});
    const updatedRecord = selectedRecord;
    setSelectedRecord(null);
    if (onEditCallback) onEditCallback(updatedRecord);
  };

  const handleDelete = () => {
    if (!selectedRecord) return;
    setRecords(records.filter((r) => r.id !== selectedRecord.id));
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  // Modal openers
  const openCreateModal = (onCreateCallback?: () => void) => {
    setFormData({});
    if (onCreateCallback) {
      onCreateCallback();
    } else {
      setIsCreateModalOpen(true);
    }
  };

  const openEditModal = (record: TableRecord, onEditCallback?: (record: TableRecord) => void) => {
    setSelectedRecord(record);
    setFormData(record);
    if (onEditCallback) {
      onEditCallback(record);
    } else {
      setIsEditModalOpen(true);
    }
  };

  const openDeleteModal = (record: TableRecord) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setFormData({});
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setFormData({});
    setSelectedRecord(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  return {
    // Schema
    schema,

    // Records
    records,
    filteredRecords,
    currentRecords,

    // Pagination
    currentPage,
    itemsPerPage,
    totalPages: paginationData.totalPages,
    startIndex: paginationData.startIndex,
    endIndex: paginationData.endIndex,
    setCurrentPage,
    setItemsPerPage,

    // Search
    searchTerm,
    setSearchTerm,

    // Modals state
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedRecord,
    formData,
    setFormData,

    // Permissions
    ...permissionFlags,

    // CRUD handlers
    handleCreate,
    handleUpdate,
    handleDelete,

    // Modal openers/closers
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
  };
}
