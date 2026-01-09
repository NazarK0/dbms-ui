/**
 * Mock Data - Schema Owners
 * 
 * Available database roles/users that can own schemas.
 * 
 * In production, this data should be fetched from PostgreSQL via:
 * 
 * ```sql
 * SELECT 
 *   rolname as name,
 *   rolcanlogin as can_login,
 *   rolsuper as is_superuser,
 *   CASE 
 *     WHEN rolsuper THEN 'Superuser'
 *     WHEN rolcreatedb THEN 'Can Create DB'
 *     WHEN rolcanlogin THEN 'Login Role'
 *     ELSE 'Group Role'
 *   END as role_type
 * FROM pg_roles
 * WHERE rolcanlogin = true  -- Only login-enabled roles
 *   OR rolname IN ('postgres', 'admin', 'developer', 'analyst')
 * ORDER BY rolname;
 * ```
 * 
 * Or with more details:
 * ```sql
 * SELECT 
 *   r.rolname,
 *   r.rolsuper,
 *   r.rolcreatedb,
 *   r.rolcanlogin,
 *   ARRAY(
 *     SELECT b.rolname 
 *     FROM pg_catalog.pg_auth_members m 
 *     JOIN pg_catalog.pg_roles b ON (m.roleid = b.oid) 
 *     WHERE m.member = r.oid
 *   ) as member_of
 * FROM pg_catalog.pg_roles r
 * WHERE r.rolcanlogin = true
 * ORDER BY r.rolname;
 * ```
 */

export interface SchemaOwner {
  value: string;        // Role name (used in SQL)
  label: string;        // Display name
  roleType?: string;    // Role type description
  isSuperuser?: boolean;// Is superuser role
  canCreateDB?: boolean;// Can create databases
  description?: string; // Role description
}

/**
 * Mock schema owners list
 * These represent PostgreSQL roles that can own schemas
 */
export const availableSchemaOwners: SchemaOwner[] = [
  { 
    value: 'postgres', 
    label: 'postgres',
    roleType: 'Superuser',
    isSuperuser: true,
    canCreateDB: true,
    description: 'PostgreSQL superuser роль'
  },
  { 
    value: 'admin', 
    label: 'admin',
    roleType: 'Admin',
    isSuperuser: false,
    canCreateDB: true,
    description: 'Адміністративна роль'
  },
  { 
    value: 'developer', 
    label: 'developer',
    roleType: 'Developer',
    isSuperuser: false,
    canCreateDB: true,
    description: 'Роль розробника'
  },
  { 
    value: 'analyst', 
    label: 'analyst',
    roleType: 'Data Analyst',
    isSuperuser: false,
    canCreateDB: false,
    description: 'Роль аналітика даних'
  },
  { 
    value: 'content_manager', 
    label: 'content_manager',
    roleType: 'Content Manager',
    isSuperuser: false,
    canCreateDB: false,
    description: 'Роль контент-менеджера'
  },
];

/**
 * Get schema owners for a specific database
 * In production, this would filter based on database-specific role grants
 */
export const getSchemaOwnersForDatabase = (database: string): SchemaOwner[] => {
  // In production, query:
  // SELECT DISTINCT grantee FROM information_schema.role_table_grants WHERE table_catalog = $1;
  
  switch (database) {
    case 'production_db':
      return availableSchemaOwners.filter(o => 
        ['postgres', 'admin', 'developer'].includes(o.value)
      );
    
    case 'analytics_db':
      return availableSchemaOwners.filter(o => 
        ['postgres', 'admin', 'analyst'].includes(o.value)
      );
    
    case 'content_db':
      return availableSchemaOwners.filter(o => 
        ['postgres', 'admin', 'content_manager'].includes(o.value)
      );
    
    default:
      return availableSchemaOwners;
  }
};

/**
 * Get default schema owner for a database
 */
export const getDefaultSchemaOwner = (database: string): string => {
  // In production, use current_user or database owner
  // SELECT current_user;
  // or
  // SELECT pg_catalog.pg_get_userbyid(d.datdba) FROM pg_catalog.pg_database d WHERE d.datname = $1;
  
  return 'postgres'; // Default to postgres superuser
};

/**
 * Validate if a role can own schemas
 */
export const canRoleOwnSchema = (roleName: string): boolean => {
  // In production, query:
  // SELECT rolcreaterole OR rolsuper FROM pg_roles WHERE rolname = $1;
  
  const owner = availableSchemaOwners.find(o => o.value === roleName);
  return Boolean(owner);
};

/**
 * Get role permissions summary
 */
export const getRolePermissions = (roleName: string): string[] => {
  const owner = availableSchemaOwners.find(o => o.value === roleName);
  if (!owner) return [];
  
  const permissions: string[] = [];
  
  if (owner.isSuperuser) permissions.push('Повний доступ');
  if (owner.canCreateDB) permissions.push('Створення БД');
  
  return permissions;
};
