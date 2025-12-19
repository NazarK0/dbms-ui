import { CalendarIcon, Code, Eye } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Calendar } from '../../ui/calendar';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';

interface TableColumn {
  name: string;
  type: string;
  nullable?: boolean;
  required?: boolean;
  autoIncrement?: boolean;
  primaryKey?: boolean;
  enumValues?: string[];
  min?: number;
  max?: number;
  systemGenerated?: boolean;
}

interface FieldInputProps {
  field: TableColumn;
  value: any;
  error?: string;
  onChange: (value: any) => void;
  isReadOnly?: boolean;
  isPreview?: boolean;
  onTogglePreview?: () => void;
}

export default function FieldInput({ 
  field, 
  value, 
  error, 
  onChange, 
  isReadOnly = false,
  isPreview = false,
  onTogglePreview
}: FieldInputProps) {
  const errorClass = error ? 'border-red-500' : '';

  // Read-only display for primary keys or auto-increment fields
  if (isReadOnly) {
    return (
      <div className="px-3 py-2 bg-slate-50 rounded-md border border-slate-200 text-slate-600">
        {value || 'N/A'}
      </div>
    );
  }

  // Enum - dropdown select
  if (field.type === 'enum' && field.enumValues) {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={errorClass}>
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
            className={`w-full justify-start text-left ${errorClass}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(new Date(value), 'PPP', { locale: uk }) : <span>Оберіть дату</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => onChange(date ? format(date, 'yyyy-MM-dd') : '')}
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
            className={`w-full justify-start text-left ${errorClass}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(new Date(value), 'PPP HH:mm', { locale: uk }) : <span>Оберіть дату та час</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => onChange(date ? date.toISOString() : '')}
            locale={uk}
          />
        </PopoverContent>
      </Popover>
    );
  }

  // Text area for text type with markdown support
  if (field.type === 'text') {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onTogglePreview?.()}
            className={`gap-2 ${!isPreview ? 'bg-violet-100 text-violet-700' : ''}`}
          >
            <Code className="w-4 h-4" />
            Код
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onTogglePreview?.()}
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
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Введіть ${field.name}... (підтримується Markdown)`}
            className={errorClass}
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
          onChange={(e) => onChange(e.target.checked)}
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
        onChange={(e) => onChange(parseFloat(e.target.value) || '')}
        placeholder={`Введіть ${field.name}...`}
        className={errorClass}
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
        onChange={(e) => onChange(parseInt(e.target.value) || '')}
        placeholder={`Введіть ${field.name}...`}
        className={errorClass}
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
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Введіть ${field.name}...`}
      className={errorClass}
    />
  );
}
