import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import FieldInput from './FieldInput';

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

interface FormFieldProps {
  field: TableColumn;
  value: any;
  error?: string;
  onChange: (value: any) => void;
  isReadOnly?: boolean;
  showRequiredBadge?: boolean;
  isPreview?: boolean;
  onTogglePreview?: () => void;
}

export default function FormField({
  field,
  value,
  error,
  onChange,
  isReadOnly = false,
  showRequiredBadge = true,
  isPreview = false,
  onTogglePreview
}: FormFieldProps) {
  return (
    <div className="space-y-2">
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
        {showRequiredBadge && !field.nullable && !isReadOnly && (
          <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-300">
            Обов'язкове
          </Badge>
        )}
      </div>
      <FieldInput
        field={field}
        value={value}
        error={error}
        onChange={onChange}
        isReadOnly={isReadOnly}
        isPreview={isPreview}
        onTogglePreview={onTogglePreview}
      />
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
