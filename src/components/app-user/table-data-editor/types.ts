/**
 * TypeScript types for TableDataEditor component
 */

export interface TableRecord {
  id: number;
  [key: string]: any;
}

export interface TableColumn {
  name: string;
  type: string;
  primaryKey?: boolean;
  autoIncrement?: boolean;
  required?: boolean;
}

export interface TableSchema {
  columns: TableColumn[];
  data: TableRecord[];
}

export interface TableDataEditorProps {
  database: string;
  table: string;
  permissions: string[];
  highlightRecordId?: string;
  onBack: () => void;
  onCreateRecord?: () => void;
  onEditRecord?: (record: TableRecord) => void;
}

export interface TableDataGridProps {
  schema: TableSchema;
  currentRecords: TableRecord[];
  highlightRecordId?: string;
  canUpdate: boolean;
  canDelete: boolean;
  onEditRecord: (record: TableRecord) => void;
  onDeleteRecord: (record: TableRecord) => void;
}

export interface TableDataRowProps {
  record: TableRecord;
  columns: TableColumn[];
  highlightRecordId?: string;
  canUpdate: boolean;
  canDelete: boolean;
  onEditRecord: (record: TableRecord) => void;
  onDeleteRecord: (record: TableRecord) => void;
}

export interface TableColumnHeaderProps {
  column: TableColumn;
}

export interface TableEmptyStateProps {
  columnsCount: number;
}

export interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  schema: TableSchema;
  formData: Record<string, any>;
  onFormDataChange: (data: Record<string, any>) => void;
  onSubmit: () => void;
}

export interface RecordCreateModalProps extends RecordModalProps {
  table: string;
}

export interface RecordEditModalProps extends RecordModalProps {
  recordId?: number;
}

export interface RecordDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordId?: number;
  onConfirm: () => void;
}

export interface RecordFormFieldsProps {
  columns: TableColumn[];
  formData: Record<string, any>;
  onFormDataChange: (data: Record<string, any>) => void;
  showRequired?: boolean;
}
