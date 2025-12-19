import { useState } from 'react';
import { simpleTableSchema } from '../../mockData/user';
import RecordBreadcrumb from './form/RecordBreadcrumb';
import DeleteConfirmation from './form/DeleteConfirmation';
import {
  RecordFormHeader,
  RecordFormCard,
  RecordFormFields,
  RecordFormActions,
  EditRecordFileManager,
  useRecordForm,
} from './record-form';

export interface EditRecordProps {
  database: string;
  table: string;
  recordId: string;
  onBack: () => void;
  onSave: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
}

export default function EditRecord({
  database,
  table,
  recordId,
  onBack,
  onSave,
  onDelete,
  canDelete = true,
}: EditRecordProps) {
  // Mock table schema - в реальності це буде з API
  const tableSchema = simpleTableSchema;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    formData,
    errors,
    attachedFiles,
    existingFiles,
    markdownPreview,
    handleChange,
    handleFileChange,
    handleRemoveNewFile,
    handleRemoveExistingFile,
    toggleMarkdownPreview,
    validateForm,
  } = useRecordForm(tableSchema, 'edit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const handleDownloadFile = (filename: string) => {
    // В реальності це буде API запит для завантаження файлу
    console.log('Downloading file:', filename);

    // Mock download - створюємо посилання для завантаження
    const link = document.createElement('a');
    link.href = '#'; // В реальності тут буде URL файлу з API
    link.download = filename;
    link.click();

    // Показуємо повідомлення
    alert(
      `Завантаження файлу: ${filename}\n\nURL: https://api.dbms.company.com/v1/databases/${database}/tables/${table}/records/${recordId}/files/${filename}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <RecordFormHeader
        onBack={onBack}
        onDelete={() => setShowDeleteConfirm(true)}
        canDelete={canDelete}
        showDeleteButton={true}
      />

      {/* Breadcrumb */}
      <RecordBreadcrumb database={database} table={table} action={`Запис #${recordId}`} />

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <RecordFormCard
          title="Редагування запису"
          description={`Внесіть зміни у запис таблиці "${table}"`}
        >
          <RecordFormFields
            tableSchema={tableSchema}
            formData={formData}
            errors={errors}
            markdownPreview={markdownPreview}
            mode="edit"
            recordId={recordId}
            onFieldChange={handleChange}
            onTogglePreview={toggleMarkdownPreview}
          />

          {/* File Management Section */}
          <EditRecordFileManager
            existingFiles={existingFiles}
            attachedFiles={attachedFiles}
            onFileChange={handleFileChange}
            onRemoveNewFile={handleRemoveNewFile}
            onRemoveExistingFile={handleRemoveExistingFile}
            onDownloadFile={handleDownloadFile}
          />

          <RecordFormActions submitLabel="Зберегти зміни" onCancel={onBack} />
        </RecordFormCard>
      </form>
    </div>
  );
}
