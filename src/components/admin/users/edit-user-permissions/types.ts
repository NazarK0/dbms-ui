/**
 * TypeScript types for EditUserPermissionsModal component
 */

import type { User } from '../../../../mockData/admin';

export type UserType = 'admin' | 'user';

export interface EditUserPermissionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  userType: UserType;
}

export interface Role {
  value: string;
  label: string;
  color: string;
}

export interface Permission {
  id: string;
  label: string;
}

export interface PermissionCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  permissions: Permission[];
}

export interface PermissionsState {
  [key: string]: boolean;
}

export interface CategoryProgress {
  enabled: number;
  total: number;
}

export interface RoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  roles: Role[];
  userType: UserType;
  themeColor: string;
}

export interface TimezoneSelectorProps {
  selectedTimezone: string;
  onTimezoneChange: (timezone: string) => void;
  userType: UserType;
  themeColor: string;
}

export interface PermissionsCategoriesListProps {
  categories: PermissionCategory[];
  permissions: PermissionsState;
  expandedCategories: string[];
  userType: UserType;
  onPermissionChange: (permId: string) => void;
  onCategoryToggle: (categoryId: string, checked: boolean) => void;
  onToggleCategory: (categoryId: string) => void;
  getCategoryProgress: (categoryId: string) => CategoryProgress;
}

export interface PermissionCategoryItemProps {
  category: PermissionCategory;
  isExpanded: boolean;
  permissions: PermissionsState;
  userType: UserType;
  progress: CategoryProgress;
  onToggle: () => void;
  onPermissionChange: (permId: string) => void;
  onCategoryToggle: (checked: boolean) => void;
}

export interface ADWarningProps {
  // No props needed - static component
}

export interface DialogHeaderUserProps {
  user: User;
}
