/**
 * Create Foreign Server Modal - Type Definitions
 * 
 * TypeScript interfaces for foreign server creation modal.
 */

/**
 * Form data structure for creating a foreign server
 */
export interface ServerFormData {
  serverName: string;      // Unique identifier for the server
  wrapperType: string;     // FDW type (postgres_fdw, mysql_fdw, etc.)
  host: string;            // Remote server hostname or IP
  port: string;            // Remote server port
  dbname: string;          // Remote database name
  username?: string;       // Optional default username
}

/**
 * Props for the CreateServerModal component
 */
export interface CreateServerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ServerFormData) => void;
}

/**
 * Default form values
 */
export const DEFAULT_FORM_VALUES: ServerFormData = {
  serverName: '',
  wrapperType: 'postgres_fdw',
  host: '',
  port: '5432',
  dbname: '',
  username: '',
};
