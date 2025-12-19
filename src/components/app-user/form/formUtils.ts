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

// System field names to skip
export const SYSTEM_FIELD_NAMES = [
  'created_at', 
  'updated_at', 
  'deleted_at', 
  'created_by', 
  'updated_by', 
  'deleted_by'
];

// Check if field should be hidden
export const shouldHideField = (field: TableColumn, mode: 'create' | 'edit'): boolean => {
  // Always hide system-generated fields
  if (field.systemGenerated) return true;
  
  // Always hide common system field names
  if (SYSTEM_FIELD_NAMES.includes(field.name.toLowerCase())) return true;
  
  // Hide auto-increment and primary key on create
  if (mode === 'create' && (field.autoIncrement || field.primaryKey)) return true;
  
  return false;
};

// Check if field should be read-only
export const isFieldReadOnly = (field: TableColumn): boolean => {
  return field.primaryKey || field.autoIncrement;
};

// Validate form data
export const validateFormData = (
  schema: TableColumn[],
  formData: Record<string, any>,
  mode: 'create' | 'edit'
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  schema.forEach(field => {
    // Skip fields that should be hidden
    if (shouldHideField(field, mode)) return;
    
    // Skip auto-increment and system-generated fields
    if (field.autoIncrement || field.systemGenerated) return;
    
    // Check required fields
    if (!field.nullable && !formData[field.name]) {
      errors[field.name] = `Поле "${field.name}" обов'язкове`;
    }
  });

  return errors;
};
