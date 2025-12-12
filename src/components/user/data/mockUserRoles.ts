export interface UserRole {
  id: number;
  name: string;
  color: string;
  permissions: string[];
}

export const mockUserRoles: UserRole[] = [
  {
    id: 1,
    name: 'Developer',
    color: 'bg-violet-100 text-violet-700 border-violet-300',
    permissions: [
      'Database: app_production (SELECT, INSERT, UPDATE, DELETE)',
      'Database: app_staging (SELECT, INSERT, UPDATE)',
      'Table: users (RLS enabled)',
      'Table: orders (RLS enabled)',
      'Table: products (Full access)',
    ],
  },
  {
    id: 2,
    name: 'Data Analyst',
    color: 'bg-blue-100 text-blue-700 border-blue-300',
    permissions: [
      'Database: app_production (SELECT)',
      'Database: app_analytics (SELECT)',
      'Table: orders (RLS enabled)',
      'Table: audit_logs (SELECT only)',
    ],
  },
];
