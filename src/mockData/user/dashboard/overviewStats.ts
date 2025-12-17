/**
 * Mock data for User Dashboard Overview Stats
 * Quick summary of user's database access and activity
 */

export interface DashboardOverviewStats {
  totalDatabases: number;
  totalTables: number;
  totalRecords: number;
  recentActivity: number;
  lastLoginDate: string;
  lastActivityDate: string;
}

/**
 * Overview statistics for user dashboard
 */
export const overviewStats: DashboardOverviewStats = {
  totalDatabases: 6,
  totalTables: 48,
  totalRecords: 12543,
  recentActivity: 23,
  lastLoginDate: '2024-12-17T09:30:00',
  lastActivityDate: '2024-12-17T14:45:00',
};
