import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { getEditableColumns } from './recordUtils';
import type { RecordFormFieldsProps } from './types';

/**
 * Shared form fields component for create/edit modals
 * Eliminates duplication between RecordCreateModal and RecordEditModal
 */
export default function RecordFormFields({
  columns,
  formData,
  onFormDataChange,
  showRequired = true,
}: RecordFormFieldsProps) {
  const editableColumns = getEditableColumns(columns);

  const handleFieldChange = (fieldName: string, value: string) => {
    onFormDataChange({ ...formData, [fieldName]: value });
  };

  return (
    <div className="space-y-4">
      {editableColumns.map((col) => (
        <div key={col.name} className="space-y-2">
          <Label htmlFor={col.name}>
            {col.name}
            {showRequired && col.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </Label>
          <Input
            id={col.name}
            type={col.type === 'integer' ? 'number' : 'text'}
            value={formData[col.name] || ''}
            onChange={(e) => handleFieldChange(col.name, e.target.value)}
            placeholder={showRequired ? `Введіть ${col.name}` : undefined}
          />
        </div>
      ))}
    </div>
  );
}
