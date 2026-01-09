/**
 * TypeScript type definitions for UsersManager components
 */

import type { User } from '../../../../mockData/admin/users';

export type UserType = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive';

export interface UserStats {
  totalUsers: number;
  administrators: number;
  endUsers: number;
  newThisMonth: number;
}

export interface UserStatsCardData {
  icon: React.ComponentType<{ className?: string }>;
  value: number | string;
  title: string;
  description: string;
  gradient: string;
}

export interface UsersManagerHeaderProps {
  stats: UserStats;
}

export interface UserStatsCardsProps {
  stats: UserStats;
}

export interface UserStatsCardProps {
  data: UserStatsCardData;
}

export interface MicrosoftADInfoBannerProps {
  className?: string;
}

export interface UserTabsProps {
  activeTab: UserType;
  onTabChange: (tab: UserType) => void;
  administrators: User[];
  endUsers: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

export interface UserTabContentProps {
  users: User[];
  type: UserType;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export interface EditUserModalWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  userType: UserType;
}

export interface UserFilter {
  search?: string;
  role?: string;
  status?: UserStatus;
  timezone?: string;
}

export interface UserSort {
  field: 'name' | 'email' | 'role' | 'lastActive' | 'registered' | 'status';
  direction: 'asc' | 'desc';
}

export interface UserGroup {
  name: string;
  users: User[];
  totalCount: number;
}

export interface UsersByRole {
  role: string;
  count: number;
  users: User[];
  color: string;
}

export interface UsersByStatus {
  status: UserStatus;
  count: number;
  users: User[];
}

export interface UsersByTimezone {
  timezone: string;
  count: number;
  users: User[];
}

export interface UserActivity {
  user: User;
  lastActive: string;
  status: UserStatus;
  isOnline: boolean;
}

export interface UserMetrics {
  totalAdmins: number;
  totalUsers: number;
  activeAdmins: number;
  activeUsers: number;
  inactiveAdmins: number;
  inactiveUsers: number;
  rolesDistribution: UsersByRole[];
  timezonesDistribution: UsersByTimezone[];
  recentlyActive: User[];
  recentlyRegistered: User[];
}

export interface RoleInfo {
  name: string;
  color: string;
  permissions: string[];
  description: string;
  userCount: number;
}

export interface TimezoneInfo {
  value: string;
  label: string;
  title: string;
  offset: string;
  userCount: number;
}

export interface UserExportOptions {
  format: 'csv' | 'json' | 'excel';
  includeFields: string[];
  userType?: UserType;
  filter?: UserFilter;
}

export interface UserImportOptions {
  format: 'csv' | 'json' | 'excel';
  validateEmails: boolean;
  skipDuplicates: boolean;
  notifyUsers: boolean;
}

export interface UserBulkAction {
  type: 'activate' | 'deactivate' | 'delete' | 'assignRole' | 'changeTimezone';
  userIds: number[];
  params?: Record<string, any>;
}

export interface UserSearchResult {
  user: User;
  matchFields: string[];
  score: number;
}

export { User };
