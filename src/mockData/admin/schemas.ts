// Mock data for database schemas (Admin)

export interface Schema {
  name: string;
  owner: string;
  tables: number;
  functions: number;
  description: string;
}

export const allSchemas: Schema[] = [
  { name: 'public', owner: 'postgres', tables: 45, functions: 12, description: 'Схема за замовчуванням' },
  { name: 'auth', owner: 'admin', tables: 8, functions: 3, description: 'Схема аутентифікації' },
  { name: 'analytics', owner: 'analyst', tables: 15, functions: 7, description: 'Схема для аналітики' },
  { name: 'reporting', owner: 'analyst', tables: 13, functions: 5, description: 'Схема звітності' },
  { name: 'logs', owner: 'system', tables: 5, functions: 2, description: 'Схема логування' },
];

export const getSchemasByDatabase = (database: string): Schema[] => {
  if (database === 'production_db') {
    return allSchemas.filter(s => ['public', 'auth'].includes(s.name));
  } else if (database === 'analytics_db') {
    return allSchemas.filter(s => ['public', 'analytics', 'reporting'].includes(s.name));
  } else if (database === 'logs_db') {
    return allSchemas.filter(s => ['public', 'logs'].includes(s.name));
  }
  return [allSchemas[0]]; // default to public schema
};
