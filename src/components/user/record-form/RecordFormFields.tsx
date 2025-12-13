import { ScrollArea } from '../../ui/scroll-area';
import FormField from '../form/FormField';
import { shouldHideField, isFieldReadOnly } from '../form/formUtils';
import type { RecordFormFieldsProps } from './types';

export default function RecordFormFields({
  tableSchema,
  formData,
  errors,
  markdownPreview,
  mode,
  recordId,
  onFieldChange,
  onTogglePreview,
}: RecordFormFieldsProps) {
  return (
    <ScrollArea className="h-[calc(100vh-400px)]">
      <div className="space-y-6 pr-4">
        {tableSchema.map((field) => {
          // Skip fields that should be hidden
          if (shouldHideField(field, mode)) return null;

          // Get field value - for edit mode, use recordId for ID field
          const fieldValue = mode === 'edit' && field.name === 'id' 
            ? recordId 
            : formData[field.name] || '';

          return (
            <FormField
              key={field.name}
              field={field}
              value={fieldValue}
              error={errors[field.name]}
              onChange={(value) => onFieldChange(field.name, value)}
              isReadOnly={mode === 'edit' ? isFieldReadOnly(field) : false}
              isPreview={markdownPreview[field.name]}
              onTogglePreview={() => onTogglePreview(field.name)}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
}
