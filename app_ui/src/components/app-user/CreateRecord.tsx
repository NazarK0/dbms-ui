import { simpleTableSchema } from '../../mockData/user';
import RecordBreadcrumb from './form/RecordBreadcrumb';
import FileUpload from './form/FileUpload';
import {
  RecordFormHeader,
  RecordFormCard,
  RecordFormFields,
  RecordFormActions,
  useRecordForm,
} from './record-form';

export interface CreateRecordProps {
  database: string;
  table: string;
  onBack: () => void;
  onSave: (data: any) => void;
}

export default function CreateRecord({ database, table, onBack, onSave }: CreateRecordProps) {
  // Mock table schema - в реальності це буде з API
  const tableSchema = simpleTableSchema;

  const {
    formData,
    errors,
    attachedFiles,
    markdownPreview,
    handleChange,
    handleFileChange,
    handleRemoveNewFile,
    toggleMarkdownPreview,
    validateForm,
    getFormDataWithFiles,
  } = useRecordForm(tableSchema, 'create');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(getFormDataWithFiles());
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <RecordFormHeader onBack={onBack} />

      {/* Breadcrumb */}
      <RecordBreadcrumb database={database} table={table} action="Новий запис" />

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <RecordFormCard
          title="Створення нового запису"
          description={`Заповніть форму для створення нового запису в таблиці "${table}"`}
        >
          <RecordFormFields
            tableSchema={tableSchema}
            formData={formData}
            errors={errors}
            markdownPreview={markdownPreview}
            mode="create"
            onFieldChange={handleChange}
            onTogglePreview={toggleMarkdownPreview}
          />

          {/* File Upload Section */}
          <FileUpload
            files={attachedFiles}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveNewFile}
          />

          <RecordFormActions submitLabel="Зберегти запис" onCancel={onBack} />
        </RecordFormCard>
      </form>
    </div>
  );
}
