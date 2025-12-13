import { useState } from 'react';
import { ArrowLeft, Save, Trash2, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { simpleTableSchema } from '../../mockData/user';
import FormField from './form/FormField';
import FileUpload from './form/FileUpload';
import ExistingFilesList from './form/ExistingFilesList';
import RecordBreadcrumb from './form/RecordBreadcrumb';
import DeleteConfirmation from './form/DeleteConfirmation';
import { shouldHideField, isFieldReadOnly, validateFormData } from './form/formUtils';

interface EditRecordProps {
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
  canDelete = true
}: EditRecordProps) {
  // Mock table schema - в реальності це буде з API
  const tableSchema = simpleTableSchema;

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>([]);
  const [markdownPreview, setMarkdownPreview] = useState<Record<string, boolean>>({});

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateFormData(tableSchema, formData, 'edit');
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSave();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveNewFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingFile = (index: number) => {
    setExistingFiles(prev => prev.filter((_, i) => i !== index));
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
    alert(`Завантаження файлу: ${filename}\n\nURL: https://api.dbms.company.com/v1/databases/${database}/tables/${table}/records/${recordId}/files/${filename}`);
  };

  const toggleMarkdownPreview = (fieldName: string) => {
    setMarkdownPreview(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад до таблиці
          </Button>
        </div>
        {canDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Видалити запис
          </Button>
        )}
      </div>

      {/* Breadcrumb */}
      <RecordBreadcrumb
        database={database}
        table={table}
        action={`Запис #${recordId}`}
      />

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="border-violet-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="w-5 h-5 text-violet-600" />
              Редагування запису
            </CardTitle>
            <CardDescription>
              Внесіть зміни у запис таблиці "{table}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-400px)]">
              <div className="space-y-6 pr-4">
                {tableSchema.map((field) => {
                  // Skip fields that should be hidden
                  if (shouldHideField(field, 'edit')) return null;

                  return (
                    <FormField
                      key={field.name}
                      field={field}
                      value={formData[field.name] || recordId}
                      error={errors[field.name]}
                      onChange={(value) => handleChange(field.name, value)}
                      isReadOnly={isFieldReadOnly(field)}
                      isPreview={markdownPreview[field.name]}
                      onTogglePreview={() => toggleMarkdownPreview(field.name)}
                    />
                  );
                })}

                {/* File Management Section */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-violet-600" />
                    <Label className="text-slate-900">Прикріплені файли</Label>
                    <Badge variant="outline" className="text-xs bg-violet-50 text-violet-600">
                      Необов'язково
                    </Badge>
                  </div>

                  {/* Existing Files */}
                  <ExistingFilesList
                    files={existingFiles}
                    onRemoveFile={handleRemoveExistingFile}
                    onDownloadFile={handleDownloadFile}
                  />

                  {/* Upload New Files */}
                  <FileUpload
                    files={attachedFiles}
                    onFileChange={handleFileChange}
                    onRemoveFile={handleRemoveNewFile}
                    showNewFileLabel={true}
                  />
                </div>
              </div>
            </ScrollArea>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-200">
              <Button
                type="submit"
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Зберегти зміни
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
              >
                Скасувати
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}