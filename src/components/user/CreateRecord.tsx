import { useState } from 'react';
import { ArrowLeft, Check, X, Save, Upload, Database, Table as TableIcon, CalendarIcon, Code, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { ScrollArea } from '../ui/scroll-area';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { simpleTableSchema } from '../../mockData/user';

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    tableSchema.forEach(field => {
      // Skip auto-increment, primary key, and system-generated fields
      if (field.autoIncrement || field.primaryKey || field.systemGenerated) return;
      
      // Also skip common system field names as fallback
      const systemFieldNames = ['created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by', 'deleted_by'];
      if (systemFieldNames.includes(field.name.toLowerCase())) return;
      
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
    // Skip auto-increment, primary key, and system-generated fields
    if (field.autoIncrement || field.primaryKey || field.systemGenerated) return null;

    // Also skip common system field names as fallback
    const systemFieldNames = ['created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by', 'deleted_by'];
    if (systemFieldNames.includes(field.name.toLowerCase())) return null;

    const isRequired = !field.nullable;
    const value = formData[field.name] || '';

    // Enum - dropdown select
    if (field.type === 'enum' && field.enumValues) {
      return (
        <Select value={value} onValueChange={(val) => handleChange(field.name, val)}>
          <SelectTrigger className={errors[field.name] ? 'border-red-500' : ''}>
            <SelectValue placeholder={`Оберіть ${field.name}...`} />
          </SelectTrigger>
          <SelectContent>
            {field.enumValues.map((enumValue) => (
              <SelectItem key={enumValue} value={enumValue}>
                {enumValue}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    // Date - calendar picker
    if (field.type === 'date') {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left ${errors[field.name] ? 'border-red-500' : ''}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(new Date(value), 'PPP', { locale: uk }) : <span>Оберіть дату</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value ? new Date(value) : undefined}
              onSelect={(date) => handleChange(field.name, date ? format(date, 'yyyy-MM-dd') : '')}
              locale={uk}
            />
          </PopoverContent>
        </Popover>
      );
    }

    // Timestamp - datetime picker
    if (field.type === 'timestamp') {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left ${errors[field.name] ? 'border-red-500' : ''}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(new Date(value), 'PPP HH:mm', { locale: uk }) : <span>Оберіть дату та час</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value ? new Date(value) : undefined}
              onSelect={(date) => handleChange(field.name, date ? date.toISOString() : '')}
              locale={uk}
            />
          </PopoverContent>
        </Popover>
      );
    }

    // Text area for text type with markdown support
    if (field.type === 'text') {
      const isPreview = markdownPreview[field.name];
      
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setMarkdownPreview(prev => ({ ...prev, [field.name]: false }))}
              className={`gap-2 ${!isPreview ? 'bg-violet-100 text-violet-700' : ''}`}
            >
              <Code className="w-4 h-4" />
              Код
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setMarkdownPreview(prev => ({ ...prev, [field.name]: true }))}
              className={`gap-2 ${isPreview ? 'bg-violet-100 text-violet-700' : ''}`}
            >
              <Eye className="w-4 h-4" />
              Перегляд
            </Button>
          </div>
          
          {isPreview ? (
            <div className="px-4 py-3 bg-slate-50 rounded-md border border-slate-200 min-h-[100px] prose prose-sm max-w-none">
              {value ? (
                <ReactMarkdown>{value}</ReactMarkdown>
              ) : (
                <p className="text-slate-400 italic">Немає вмісту для відображення</p>
              )}
            </div>
          ) : (
            <Textarea
              id={field.name}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={`Введіть ${field.name}... (підтримується Markdown)`}
              className={errors[field.name] ? 'border-red-500' : ''}
              rows={6}
            />
          )}
        </div>
      );
    }

    // Checkbox for boolean
    if (field.type === 'boolean') {
      return (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={field.name}
            checked={value === true || value === 'true'}
            onChange={(e) => handleChange(field.name, e.target.checked)}
            className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500"
          />
          <label htmlFor={field.name} className="text-sm text-slate-600">
            Активувати
          </label>
        </div>
      );
    }

    // Decimal input
    if (field.type === 'decimal') {
      return (
        <Input
          type="number"
          step="0.01"
          id={field.name}
          value={value}
          onChange={(e) => handleChange(field.name, parseFloat(e.target.value) || '')}
          placeholder={`Введіть ${field.name}...`}
          className={errors[field.name] ? 'border-red-500' : ''}
          min={field.min}
          max={field.max}
        />
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
          className={errors[field.name] ? 'border-red-500' : ''}
          min={field.min}
          max={field.max}
        />
      );
    }

    // Default text input for varchar and others
    return (
      <Input
        type="text"
        id={field.name}
        value={value}
        onChange={(e) => handleChange(field.name, e.target.value)}
        placeholder={`Введіть ${field.name}...`}
        className={errors[field.name] ? 'border-red-500' : ''}
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
      </div>

      {/* Breadcrumb */}
      <Card className="border-violet-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Database className="w-4 h-4" />
            <span className="font-medium text-slate-900">{database}</span>
            <span>/</span>
            <TableIcon className="w-4 h-4" />
            <span className="font-medium text-slate-900">{table}</span>
            <span>/</span>
            <span className="text-violet-600">Новий запис</span>
          </div>
        </CardContent>
      </Card>

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
                  // Skip auto-increment fields
                  if (field.autoIncrement) return null;

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
                        {!field.nullable && (
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

                  {/* Attached Files List */}
                  {attachedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600">
                        Вибрано файлів: {attachedFiles.length}
                      </p>
                      {attachedFiles.map((file, index) => (
                        <div
                          key={index}
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
                            onClick={() => handleRemoveFile(index)}
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