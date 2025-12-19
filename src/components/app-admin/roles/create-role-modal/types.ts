/**
 * Type definitions for CreateRoleModal components
 */

import type { Role } from '../RoleCard';

export type RoleType = 'admin' | 'user';

export interface CreateRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roleType: RoleType;
  onRoleTypeChange: (type: RoleType) => void;
  editingRole?: Role | null;
}

export interface UiSettings {
  dashboard: boolean;
  databases: boolean;
  users: boolean;
  roles: boolean;
  query: boolean;
  performance: boolean;
  clusters: boolean;
  backups: boolean;
  logs: boolean;
  config: boolean;
}

export interface UiDisplaySettings {
  restApi: boolean;
  connectionStrings: boolean;
  technicalIds: boolean;
  debugInfo: boolean;
  queryPlans: boolean;
  rawSql: boolean;
  systemSchemas: boolean;
  internalTables: boolean;
}

export interface RlsPolicy {
  enabled: boolean;
  select: boolean;
  insert: boolean;
  update: boolean;
  delete: boolean;
  using: string;
  withCheck: string;
}

export interface RlsPolicies {
  [tableName: string]: RlsPolicy;
}

export interface UiMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export interface DisplaySettingItem {
  id: keyof UiDisplaySettings;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

export interface RoleTypeOptionProps {
  type: RoleType;
  selected: boolean;
  onSelect: (type: RoleType) => void;
}

export interface BasicInfoProps {
  roleType: RoleType;
}

export interface UiVisibilitySettingsProps {
  uiSettings: UiSettings;
  onSettingChange: (settingId: string) => void;
  menuItems: UiMenuItem[];
}

export interface UiDisplaySettingsProps {
  roleType: RoleType;
  uiDisplaySettings: UiDisplaySettings;
  onSettingChange: (settingId: string) => void;
}

export interface RlsSettingsProps {
  roleType: RoleType;
  rlsPolicies: RlsPolicies;
  onPolicyChange: (tableName: string, updates: Partial<RlsPolicy>) => void;
  onPolicyToggle: (tableName: string) => void;
}

export interface RlsTableCardProps {
  tableName: string;
  policy: RlsPolicy;
  onPolicyChange: (updates: Partial<RlsPolicy>) => void;
  onToggle: () => void;
}

export interface RlsOperationsProps {
  tableName: string;
  policy: RlsPolicy;
  onPolicyChange: (updates: Partial<RlsPolicy>) => void;
}

export interface RlsExpressionsProps {
  tableName: string;
  policy: RlsPolicy;
  onPolicyChange: (updates: Partial<RlsPolicy>) => void;
}

export interface UiMenuItemCardProps {
  item: UiMenuItem;
  checked: boolean;
  onCheckedChange: () => void;
}

export interface DisplaySettingCardProps {
  setting: DisplaySettingItem;
  checked: boolean;
  onCheckedChange: () => void;
  roleType: RoleType;
}

export interface ModalHeaderProps {
  isEditMode: boolean;
}

export interface ModalFooterProps {
  isEditMode: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export interface RoleTypeData {
  type: RoleType;
  label: string;
  description: string;
  color: string;
  borderColor: string;
  bgColor: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

export interface BaseRole {
  id: string;
  name: string;
}

export interface AdminBaseRole extends BaseRole {
  type: 'admin';
}

export interface UserBaseRole extends BaseRole {
  type: 'user';
}

export interface FormData {
  name: string;
  description: string;
  baseRole: string;
}

export interface RoleFormState {
  formData: FormData;
  uiSettings: UiSettings;
  uiDisplaySettings: UiDisplaySettings;
  rlsPolicies: RlsPolicies;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}