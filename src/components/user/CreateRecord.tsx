import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { simpleTableSchema } from '../../mockData/user';
import FormField from './form/FormField';
import FileUpload from './form/FileUpload';
import RecordBreadcrumb from './form/RecordBreadcrumb';
import { shouldHideField, validateFormData } from './form/formUtils';

interface CreateRecordProps {
  database: string;
  table: string;
  onBack: () => void;
  onSave: (recordId: number) => void;
}

export default function CreateRecord({ database, table, onBack, onSave }: CreateRecordProps) {
  // Mock table schema - в реальності це буде з API
  const tableSchema = simpleTableSchema;

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
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
    
    const validationErrors = validateFormData(tableSchema, formData, 'create');
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSave({ ...formData, attachments: attachedFiles });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
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
      </div>

      {/* Breadcrumb */}
      <RecordBreadcrumb
        database={database}
        table={table}
        action="Новий запис"
      />

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="border-violet-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="w-5 h-5 text-violet-600" />
              Створення нового запису
            </CardTitle>
            <CardDescription>
              Заповніть форму для створення нового запису в таблиці "{table}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-400px)]">
              <div className="space-y-6 pr-4">
                {tableSchema.map((field) => {
                  // Skip fields that should be hidden
                  if (shouldHideField(field, 'create')) return null;

                  return (
                    <FormField
                      key={field.name}
                      field={field}
                      value={formData[field.name] || ''}
                      error={errors[field.name]}
                      onChange={(value) => handleChange(field.name, value)}
                      isPreview={markdownPreview[field.name]}
                      onTogglePreview={() => toggleMarkdownPreview(field.name)}
                    />
                  );
                })}

                {/* File Upload Section */}
                <FileUpload
                  files={attachedFiles}
                  onFileChange={handleFileChange}
                  onRemoveFile={handleRemoveFile}
                />
              </div>
            </ScrollArea>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-200">
              <Button
                type="submit"
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Зберегти запис
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
