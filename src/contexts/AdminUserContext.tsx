/**
 * Admin User Context
 * Provides current admin user information and permissions
 * 
 * В продакшені це має бути замінено на реальну автентифікацію через Microsoft AD
 */

import { createContext, useContext, ReactNode } from 'react';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'developer' | 'analyst';
  permissions: {
    canViewAllDatabases: boolean;
    canViewTableData: boolean;
    canModifyData: boolean;
    ownedDatabases: string[]; // Databases owned by this admin
  };
}

interface AdminUserContextValue {
  user: AdminUser;
  hasPermission: (permission: keyof AdminUser['permissions']) => boolean;
  canAccessDatabase: (databaseName: string) => boolean;
}

const AdminUserContext = createContext<AdminUserContextValue | undefined>(undefined);

// Mock superadmin user (замінити на реальну автентифікацію)
const mockSuperAdmin: AdminUser = {
  id: 'admin-001',
  name: 'Супер Адміністратор',
  email: 'admin@company.com',
  role: 'superadmin',
  permissions: {
    canViewAllDatabases: true,
    canViewTableData: true,
    canModifyData: true,
    ownedDatabases: ['*'], // * означає всі бази даних
  },
};

export function AdminUserProvider({ children }: { children: ReactNode }) {
  const user = mockSuperAdmin;

  const hasPermission = (permission: keyof AdminUser['permissions']): boolean => {
    return user.permissions[permission] === true;
  };

  const canAccessDatabase = (databaseName: string): boolean => {
    // Superadmin має доступ до всіх БД
    if (user.permissions.canViewAllDatabases) {
      return true;
    }
    
    // Перевірка чи БД належить користувачу
    if (user.permissions.ownedDatabases.includes('*')) {
      return true;
    }
    
    return user.permissions.ownedDatabases.includes(databaseName);
  };

  return (
    <AdminUserContext.Provider value={{ user, hasPermission, canAccessDatabase }}>
      {children}
    </AdminUserContext.Provider>
  );
}

export function useAdminUser() {
  const context = useContext(AdminUserContext);
  if (context === undefined) {
    throw new Error('useAdminUser must be used within AdminUserProvider');
  }
  return context;
}
