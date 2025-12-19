/**
 * Shared types for CreateRecord and EditRecord components
 */

export type RecordFormMode = 'create' | 'edit';

export interface RecordFormState {
  formData: Record<string, any>;
  errors: Record<string, string>;
  attachedFiles: File[];
  existingFiles: string[];
  markdownPreview: Record<string, boolean>;
}

export interface RecordFormHeaderProps {
  onBack: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
  showDeleteButton?: boolean;
}

export interface RecordFormCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export interface RecordFormFieldsProps {
  tableSchema: any[];
  formData: Record<string, any>;
  errors: Record<string, string>;
  markdownPreview: Record<string, boolean>;
  mode: RecordFormMode;
  recordId?: string;
  onFieldChange: (field: string, value: any) => void;
  onTogglePreview: (fieldName: string) => void;
}

export interface RecordFormActionsProps {
  submitLabel: string;
  cancelLabel?: string;
  onCancel: () => void;
}

export interface EditRecordFileManagerProps {
  existingFiles: string[];
  attachedFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveNewFile: (index: number) => void;
  onRemoveExistingFile: (index: number) => void;
  onDownloadFile: (filename: string) => void;
}
