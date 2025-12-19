/**
 * TypeScript type definitions for UserUIPreview components
 */

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export interface UserRole {
  id: string;
  name: string;
  color: string;
}

export interface DeviceSize {
  width: string;
  height: string;
}

export interface UserPermissions {
  createProjects: boolean;
  deleteProjects: boolean;
  shareProjects: boolean;
  exportData: boolean;
  importData: boolean;
  useApi: boolean;
  customBranding: boolean;
  prioritySupport: boolean;
}

export interface RolePermissions {
  [roleId: string]: UserPermissions;
}

export interface PreviewHeaderProps {
  username?: string;
  userId?: string;
  onUsernameChange?: (username: string) => void;
  onUserIdChange?: (userId: string) => void;
}

export interface RoleSelectorProps {
  selectedRole: string;
  roles: UserRole[];
  onRoleChange: (roleId: string) => void;
}

export interface DeviceSelectorProps {
  deviceType: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
}

export interface PreviewWindowProps {
  deviceType: DeviceType;
  deviceSize: DeviceSize;
  selectedRole: string;
  roleName: string;
  permissions: UserPermissions;
  username?: string;
  userId?: string;
}

export interface MockUserInterfaceProps {
  deviceType: DeviceType;
  selectedRole: string;
  roleName: string;
  permissions: UserPermissions;
}

export interface UIHeaderProps {
  deviceType: DeviceType;
  roleName: string;
}

export interface UINavigationProps {
  deviceType: DeviceType;
  permissions: UserPermissions;
}

export interface UIContentProps {
  deviceType: DeviceType;
  roleName: string;
  permissions: UserPermissions;
}

export interface ActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  enabled: boolean;
}

export interface PermissionsPanelProps {
  permissions: UserPermissions;
}

export interface PermissionItemProps {
  label: string;
  enabled: boolean;
}

export interface DeviceConfig {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  size: DeviceSize;
}

export interface PermissionConfig {
  key: keyof UserPermissions;
  label: string;
  description?: string;
}

export interface ActionConfig {
  key: keyof UserPermissions;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export interface PreviewConfig {
  headerColor: string;
  accentColor: string;
  disabledColor: string;
  enabledBgColor: string;
  disabledBgColor: string;
}

export interface PreviewLayout {
  type: DeviceType;
  gridCols: number;
  showNavigation: boolean;
  showFullHeader: boolean;
}

export interface RoleConfig {
  id: string;
  name: string;
  color: string;
  description: string;
  permissions: UserPermissions;
}

export interface PreviewState {
  deviceType: DeviceType;
  selectedRole: string;
  permissions: UserPermissions;
}