import { useState } from 'react';
import { ArrowLeft, Save, Trash2, X, Upload, Download, Eye, Database as DatabaseIcon, Table as TableIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Alert, AlertDescription } from '../ui/alert';
import { simpleTableSchema } from '../../mockData/user';

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    tableSchema.forEach(field => {
      // Skip auto-increment fields
      if (field.autoIncrement) return;
      
      // Check required fields
      if (!field.nullable && !formData[field.name]) {
        newErrors[field.name] = `Поле "${field.name}" обов'язкове`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    // Наприклад: fetch(`/api/files/${database}/${table}/${recordId}/${filename}`)
    console.log('Downloading file:', filename);
    
    // Mock download - створюємо посилання для завантаження
    const link = document.createElement('a');
    link.href = '#'; // В реальності тут буде URL файлу з API
    link.download = filename;
    link.click();
    
    // Показуємо повідомлення
    alert(`Завантаження файлу: ${filename}\n\nURL: https://api.dbms.company.com/v1/databases/${database}/tables/${table}/records/${recordId}/files/${filename}`);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      return '🖼️';
    }
    if (['pdf'].includes(ext || '')) {
      return '📄';
    }
    if (['doc', 'docx'].includes(ext || '')) {
      return '📝';
    }
    if (['xls', 'xlsx'].includes(ext || '')) {
      return '📊';
    }
    if (['zip', 'rar', '7z'].includes(ext || '')) {
      return '🗜️';
    }
    return '📎';
  };

  const getFieldInput = (field: typeof tableSchema[0]) => {
    // Primary key and auto-increment fields are read-only
    const isReadOnly = field.primaryKey || field.autoIncrement;
    const isRequired = !field.nullable;
    const value = formData[field.name] || '';

    // Text area for text type
    if (field.type === 'text') {
      return (
        <Input
          type="text"
          id={field.name}
          value={value}
          onChange={(e) => handleChange(field.name, e.target.value)}
          placeholder={`Введіть ${field.name}...`}
          disabled={isReadOnly}
          className={`${errors[field.name] ? 'border-red-500' : ''} ${isReadOnly ? 'bg-slate-100' : ''}`}
        />
      );
    }

    // Checkbox for boolean
    if (field.type === 'boolean') {
      return (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={field.name}
            checked={value === true || value === 'true' || value === 1}
            onChange={(e) => handleChange(field.name, e.target.checked)}
            disabled={isReadOnly}
            className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500 disabled:opacity-50"
          />
          <label htmlFor={field.name} className="text-sm text-slate-600">
            Активувати
          </label>
        </div>
      );
    }

    // Number input for integer
    if (field.type === 'integer') {
      return (
        <Input
          type="number"
          id={field.name}
          value={value}
          onChange={(e) => handleChange(field.name, parseInt(e.target.value) || '')}
          placeholder={`Введіть ${field.name}...`}
          disabled={isReadOnly}
          className={`${errors[field.name] ? 'border-red-500' : ''} ${isReadOnly ? 'bg-slate-100' : ''}`}
        />
      );
    }

    // Date input for timestamp
    if (field.type === 'timestamp') {
      return (
        <Input
          type="datetime-local"
          id={field.name}
          value={value}
          onChange={(e) => handleChange(field.name, e.target.value)}
          disabled={isReadOnly}
          className={`${errors[field.name] ? 'border-red-500' : ''} ${isReadOnly ? 'bg-slate-100' : ''}`}
        />
      );
    }

    // Default text input
    return (
      <Input
        type="text"
        id={field.name}
        value={value}
        onChange={(e) => handleChange(field.name, e.target.value)}
        placeholder={`Введіть ${field.name}...`}
        disabled={isReadOnly}
        className={`${errors[field.name] ? 'border-red-500' : ''} ${isReadOnly ? 'bg-slate-100' : ''}`}
      />
    );
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
      <Card className="border-violet-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <DatabaseIcon className="w-4 h-4" />
            <span className="font-medium text-slate-900">{database}</span>
            <span>/</span>
            <TableIcon className="w-4 h-4" />
            <span className="font-medium text-slate-900">{table}</span>
            <span>/</span>
            <span className="text-violet-600">Запис #{recordId}</span>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-900 font-medium">Підтвердити видалення</p>
                <p className="text-sm text-slate-600">Ця дія незворотна. Запис буде видалено назавжди.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                >
                  Так, видалити
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Скасувати
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
                  const isReadOnly = field.primaryKey || field.autoIncrement;

                  return (
                    <div key={field.name} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={field.name} className="text-slate-900">
                          {field.name}
                        </Label>
                        {field.primaryKey && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                            Primary Key
                          </Badge>
                        )}
                        {isReadOnly && (
                          <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600">
                            Тільки для читання
                          </Badge>
                        )}
                        {!field.nullable && !isReadOnly && (
                          <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-300">
                            Обов'язкове
                          </Badge>
                        )}
                      </div>
                      {getFieldInput(field)}
                      {errors[field.name] && (
                        <p className="text-xs text-red-600">{errors[field.name]}</p>
                      )}
                    </div>
                  );
                })}

                {/* File Upload Section */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-violet-600" />
                    <Label className="text-slate-900">Прикріплені файли</Label>
                    <Badge variant="outline" className="text-xs bg-violet-50 text-violet-600">
                      Необов'язково
                    </Badge>
                  </div>

                  {/* Existing Files */}
                  {existingFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500">Існуючі файли:</p>
                      {existingFiles.map((filename, index) => (
                        <div
                          key={`existing-${index}`}
                          className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-2xl flex-shrink-0">{getFileIcon(filename)}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-900 truncate">{filename}</p>
                              <p className="text-xs text-green-600">Збережено</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveExistingFile(index)}
                            className="flex-shrink-0 hover:bg-red-100 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadFile(filename)}
                            className="flex-shrink-0 hover:bg-blue-100 hover:text-blue-600"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload New Files */}
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <div className="cursor-pointer border-2 border-dashed border-violet-300 rounded-lg p-6 hover:border-violet-500 hover:bg-violet-50/50 transition-colors text-center">
                      <Upload className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600 mb-1">
                        Натисніть для вибору файлів або перетягніть сюди
                      </p>
                      <p className="text-xs text-slate-500">
                        Підтримуються всі типи файлів
                      </p>
                    </div>
                  </label>

                  {/* New Files List */}
                  {attachedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500">
                        Нових файлів для завантаження: {attachedFiles.length}
                      </p>
                      {attachedFiles.map((file, index) => (
                        <div
                          key={`new-${index}`}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-2xl flex-shrink-0">{getFileIcon(file.name)}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-900 truncate">{file.name}</p>
                              <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveNewFile(index)}
                            className="flex-shrink-0 hover:bg-red-100 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
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