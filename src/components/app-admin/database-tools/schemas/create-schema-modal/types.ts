/**
 * Create Schema Modal - Type Definitions
 * 
 * TypeScript interfaces for schema creation modal.
 */

/**
 * Form data structure for creating a schema
 */
export interface SchemaFormData {
  schemaName: string;         // Schema identifier
  schemaOwner: string;        // Owner role name
  schemaDescription: string;  // Optional description
}

/**
 * Props for the CreateSchemaModal component
 */
export interface CreateSchemaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SchemaFormData) => void;
  selectedDatabase: string;   // Database context
}

/**
 * Default form values
 */
export const DEFAULT_FORM_VALUES: Omit<SchemaFormData, 'schemaOwner'> = {
  schemaName: '',
  schemaDescription: '',
};
