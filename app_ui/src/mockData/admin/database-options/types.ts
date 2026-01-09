/**
 * Type definitions for database creation options
 */

// Database owners (PostgreSQL users/roles)
export interface DatabaseOwner {
  username: string;
  displayName: string;
  roleType: 'superuser' | 'admin' | 'user';
  description?: string;
}

// Database character encodings
export interface DatabaseEncoding {
  value: string;
  label: string;
  description: string;
  recommended?: boolean;
}

// Template databases
export interface TemplateDatabaseOption {
  name: string;
  description: string;
  isDefault?: boolean;
  canConnect?: boolean;
}

// Tablespaces
export interface Tablespace {
  name: string;
  location: string;
  owner: string;
  description?: string;
}

// Collations (sorting rules)
export interface Collation {
  name: string;
  encoding: string;
  description: string;
  language?: string;
}

// Character type classifications
export interface CharacterType {
  name: string;
  encoding: string;
  description: string;
}

// Connection limit presets
export interface ConnectionLimitPreset {
  value: number;
  label: string;
  description: string;
  recommended?: string;
}
