/**
 * Utility functions for UsersManager components
 */

import type {
  User,
  UserType,
  UserStatus,
  UserStats,
  UserFilter,
  UserSort,
  UsersByRole,
  UsersByStatus,
  UsersByTimezone,
  UserMetrics,
  UserSearchResult,
} from './types';
import { userActivityThresholds } from './data';

/**
 * Calculate user statistics
 */
export const calculateUserStats = (
  administrators: User[],
  endUsers: User[],
  newThisMonth: number
): UserStats => {
  return {
    totalUsers: administrators.length + endUsers.length,
    administrators: administrators.length,
    endUsers: endUsers.length,
    newThisMonth,
  };
};

/**
 * Format user stats value
 */
export const formatStatsValue = (value: number, prefix?: string): string => {
  if (prefix === '+') {
    return `+${value.toLocaleString('uk-UA')}`;
  }
  return value.toLocaleString('uk-UA');
};

/**
 * Filter users by search query
 */
export const filterUsersBySearch = (
  users: User[],
  searchQuery: string
): User[] => {
  if (!searchQuery || searchQuery.trim().length < 2) {
    return users;
  }

  const query = searchQuery.toLowerCase().trim();

  return users.filter((user) => {
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.timezone.toLowerCase().includes(query)
    );
  });
};

/**
 * Filter users by criteria
 */
export const filterUsers = (users: User[], filter: UserFilter): User[] => {
  let filtered = [...users];

  // Search
  if (filter.search) {
    filtered = filterUsersBySearch(filtered, filter.search);
  }

  // Role
  if (filter.role) {
    filtered = filtered.filter((user) => user.role === filter.role);
  }

  // Status
  if (filter.status) {
    filtered = filtered.filter((user) => user.status === filter.status);
  }

  // Timezone
  if (filter.timezone) {
    filtered = filtered.filter((user) => user.timezone === filter.timezone);
  }

  return filtered;
};

/**
 * Sort users
 */
export const sortUsers = (users: User[], sort: UserSort): User[] => {
  const sorted = [...users];

  sorted.sort((a, b) => {
    let aValue: any = a[sort.field];
    let bValue: any = b[sort.field];

    // Handle undefined values
    if (aValue === undefined) aValue = '';
    if (bValue === undefined) bValue = '';

    // String comparison
    if (typeof aValue === 'string') {
      const comparison = aValue.localeCompare(bValue, 'uk-UA');
      return sort.direction === 'asc' ? comparison : -comparison;
    }

    // Number comparison
    if (typeof aValue === 'number') {
      const comparison = aValue - bValue;
      return sort.direction === 'asc' ? comparison : -comparison;
    }

    return 0;
  });

  return sorted;
};

/**
 * Group users by role
 */
export const groupUsersByRole = (users: User[]): UsersByRole[] => {
  const roleMap = new Map<string, User[]>();

  users.forEach((user) => {
    const existing = roleMap.get(user.role) || [];
    roleMap.set(user.role, [...existing, user]);
  });

  return Array.from(roleMap.entries()).map(([role, roleUsers]) => ({
    role,
    count: roleUsers.length,
    users: roleUsers,
    color: roleUsers[0]?.roleColor || 'from-slate-400 to-slate-500',
  }));
};

/**
 * Group users by status
 */
export const groupUsersByStatus = (users: User[]): UsersByStatus[] => {
  const statusMap = new Map<UserStatus, User[]>();

  users.forEach((user) => {
    const existing = statusMap.get(user.status) || [];
    statusMap.set(user.status, [...existing, user]);
  });

  return Array.from(statusMap.entries()).map(([status, statusUsers]) => ({
    status,
    count: statusUsers.length,
    users: statusUsers,
  }));
};

/**
 * Group users by timezone
 */
export const groupUsersByTimezone = (users: User[]): UsersByTimezone[] => {
  const timezoneMap = new Map<string, User[]>();

  users.forEach((user) => {
    const existing = timezoneMap.get(user.timezone) || [];
    timezoneMap.set(user.timezone, [...existing, user]);
  });

  return Array.from(timezoneMap.entries()).map(([timezone, tzUsers]) => ({
    timezone,
    count: tzUsers.length,
    users: tzUsers,
  }));
};

/**
 * Get active users (active status)
 */
export const getActiveUsers = (users: User[]): User[] => {
  return users.filter((user) => user.status === 'active');
};

/**
 * Get inactive users
 */
export const getInactiveUsers = (users: User[]): User[] => {
  return users.filter((user) => user.status === 'inactive');
};

/**
 * Parse last active time to minutes ago
 */
export const parseLastActive = (lastActive?: string): number | null => {
  if (!lastActive) return null;

  const lastActiveDate = new Date(lastActive);
  const now = new Date();
  const diffMs = now.getTime() - lastActiveDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  return diffMinutes;
};

/**
 * Check if user is online
 */
export const isUserOnline = (user: User): boolean => {
  const minutesAgo = parseLastActive(user.lastActive);
  if (minutesAgo === null) return false;

  return minutesAgo <= userActivityThresholds.online;
};

/**
 * Check if user is recently active
 */
export const isUserRecentlyActive = (user: User): boolean => {
  const minutesAgo = parseLastActive(user.lastActive);
  if (minutesAgo === null) return false;

  return minutesAgo <= userActivityThresholds.recent;
};

/**
 * Get recently active users
 */
export const getRecentlyActiveUsers = (
  users: User[],
  limit: number = 10
): User[] => {
  return users
    .filter((user) => user.lastActive)
    .sort((a, b) => {
      const aTime = new Date(a.lastActive || 0).getTime();
      const bTime = new Date(b.lastActive || 0).getTime();
      return bTime - aTime;
    })
    .slice(0, limit);
};

/**
 * Parse registration date to days ago
 */
export const parseRegistered = (registered?: string): number | null => {
  if (!registered) return null;

  const registeredDate = new Date(registered);
  const now = new Date();
  const diffMs = now.getTime() - registeredDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Get recently registered users
 */
export const getRecentlyRegisteredUsers = (
  users: User[],
  limit: number = 10
): User[] => {
  return users
    .filter((user) => user.registered)
    .sort((a, b) => {
      const aTime = new Date(a.registered || 0).getTime();
      const bTime = new Date(b.registered || 0).getTime();
      return bTime - aTime;
    })
    .slice(0, limit);
};

/**
 * Get users registered this month
 */
export const getUsersRegisteredThisMonth = (users: User[]): User[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return users.filter((user) => {
    if (!user.registered) return false;

    const registeredDate = new Date(user.registered);
    return (
      registeredDate.getMonth() === currentMonth &&
      registeredDate.getFullYear() === currentYear
    );
  });
};

/**
 * Calculate user metrics
 */
export const calculateUserMetrics = (
  administrators: User[],
  endUsers: User[]
): UserMetrics => {
  const allUsers = [...administrators, ...endUsers];

  return {
    totalAdmins: administrators.length,
    totalUsers: endUsers.length,
    activeAdmins: getActiveUsers(administrators).length,
    activeUsers: getActiveUsers(endUsers).length,
    inactiveAdmins: getInactiveUsers(administrators).length,
    inactiveUsers: getInactiveUsers(endUsers).length,
    rolesDistribution: groupUsersByRole(allUsers),
    timezonesDistribution: groupUsersByTimezone(allUsers),
    recentlyActive: getRecentlyActiveUsers(allUsers),
    recentlyRegistered: getRecentlyRegisteredUsers(allUsers),
  };
};

/**
 * Format last active time
 */
export const formatLastActive = (lastActive?: string): string => {
  if (!lastActive) return 'Ніколи';

  const minutesAgo = parseLastActive(lastActive);
  if (minutesAgo === null) return 'Ніколи';

  if (minutesAgo < 1) return 'Щойно';
  if (minutesAgo < 60) return `${minutesAgo} хв тому`;

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} год тому`;

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo === 1) return 'Вчора';
  if (daysAgo < 7) return `${daysAgo} дн тому`;

  // Return formatted date
  const date = new Date(lastActive);
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format registration date
 */
export const formatRegistered = (registered?: string): string => {
  if (!registered) return '—';

  const date = new Date(registered);
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get user initials from name
 */
export const getUserInitials = (name: string): string => {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return '??';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();

  return (parts[0][0] + parts[1][0]).toUpperCase();
};

/**
 * Generate avatar color from name
 */
export const getAvatarColor = (name: string): string => {
  const gradients = [
    'from-lime-500 to-green-600',
    'from-green-500 to-lime-600',
    'from-yellow-500 to-lime-600',
    'from-lime-600 to-yellow-600',
    'from-blue-500 to-cyan-600',
    'from-violet-500 to-purple-600',
    'from-indigo-500 to-violet-600',
    'from-red-500 to-red-600',
  ];

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

/**
 * Validate user name
 */
export const validateUserName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 100;
};

/**
 * Search users with scoring
 */
export const searchUsers = (
  users: User[],
  query: string
): UserSearchResult[] => {
  if (!query || query.trim().length < 2) {
    return users.map((user) => ({
      user,
      matchFields: [],
      score: 0,
    }));
  }

  const lowerQuery = query.toLowerCase().trim();
  const results: UserSearchResult[] = [];

  users.forEach((user) => {
    const matchFields: string[] = [];
    let score = 0;

    // Check name (highest priority)
    if (user.name.toLowerCase().includes(lowerQuery)) {
      matchFields.push('name');
      score += user.name.toLowerCase().startsWith(lowerQuery) ? 10 : 5;
    }

    // Check email
    if (user.email.toLowerCase().includes(lowerQuery)) {
      matchFields.push('email');
      score += user.email.toLowerCase().startsWith(lowerQuery) ? 8 : 4;
    }

    // Check role
    if (user.role.toLowerCase().includes(lowerQuery)) {
      matchFields.push('role');
      score += 3;
    }

    // Check timezone
    if (user.timezone.toLowerCase().includes(lowerQuery)) {
      matchFields.push('timezone');
      score += 1;
    }

    if (matchFields.length > 0) {
      results.push({ user, matchFields, score });
    }
  });

  // Sort by score (descending)
  return results.sort((a, b) => b.score - a.score);
};

/**
 * Get unique roles from users
 */
export const getUniqueRoles = (users: User[]): string[] => {
  const roles = new Set<string>();
  users.forEach((user) => roles.add(user.role));
  return Array.from(roles).sort();
};

/**
 * Get unique timezones from users
 */
export const getUniqueTimezones = (users: User[]): string[] => {
  const timezones = new Set<string>();
  users.forEach((user) => timezones.add(user.timezone));
  return Array.from(timezones).sort();
};

/**
 * Get users by role
 */
export const getUsersByRole = (users: User[], role: string): User[] => {
  return users.filter((user) => user.role === role);
};

/**
 * Get users by timezone
 */
export const getUsersByTimezone = (users: User[], timezone: string): User[] => {
  return users.filter((user) => user.timezone === timezone);
};

/**
 * Get users by status
 */
export const getUsersByStatus = (
  users: User[],
  status: UserStatus
): User[] => {
  return users.filter((user) => user.status === status);
};

/**
 * Count users by type
 */
export const countUsersByType = (users: User[], type: UserType): number => {
  // In this implementation, we assume administrators have admin roles
  // and end users have user roles
  // This is a simplified version; in production, you'd have a proper field
  const adminRoles = ['Superadmin', 'Database Admin', 'Developer', 'Analyst', 'Viewer'];
  
  if (type === 'admin') {
    return users.filter((user) => adminRoles.includes(user.role)).length;
  }
  
  return users.filter((user) => !adminRoles.includes(user.role)).length;
};

/**
 * Export users to CSV
 */
export const exportUsersToCSV = (users: User[]): string => {
  const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Timezone', 'Last Active', 'Registered'];
  const rows = users.map((user) => [
    user.id,
    user.name,
    user.email,
    user.role,
    user.status,
    user.timezone,
    user.lastActive || '',
    user.registered || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
};

/**
 * Export users to JSON
 */
export const exportUsersToJSON = (users: User[]): string => {
  return JSON.stringify(users, null, 2);
};

/**
 * Get user activity status
 */
export const getUserActivityStatus = (
  user: User
): 'online' | 'recent' | 'inactive' => {
  if (user.status === 'inactive') return 'inactive';

  const minutesAgo = parseLastActive(user.lastActive);
  if (minutesAgo === null) return 'inactive';

  if (minutesAgo <= userActivityThresholds.online) return 'online';
  if (minutesAgo <= userActivityThresholds.recent) return 'recent';
  return 'inactive';
};

/**
 * Get activity status color
 */
export const getActivityStatusColor = (
  status: 'online' | 'recent' | 'inactive'
): string => {
  const colors = {
    online: 'bg-green-500',
    recent: 'bg-yellow-500',
    inactive: 'bg-slate-300',
  };
  return colors[status];
};

/**
 * Get activity status label
 */
export const getActivityStatusLabel = (
  status: 'online' | 'recent' | 'inactive'
): string => {
  const labels = {
    online: 'Онлайн',
    recent: 'Нещодавно',
    inactive: 'Неактивний',
  };
  return labels[status];
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

/**
 * Format percentage
 */
export const formatPercentage = (percentage: number): string => {
  return `${percentage}%`;
};

/**
 * Get top roles by user count
 */
export const getTopRoles = (
  users: User[],
  limit: number = 5
): UsersByRole[] => {
  const roleGroups = groupUsersByRole(users);
  return roleGroups.sort((a, b) => b.count - a.count).slice(0, limit);
};

/**
 * Get top timezones by user count
 */
export const getTopTimezones = (
  users: User[],
  limit: number = 5
): UsersByTimezone[] => {
  const timezoneGroups = groupUsersByTimezone(users);
  return timezoneGroups.sort((a, b) => b.count - a.count).slice(0, limit);
};
