/**
 * TypeScript types for StatsCards component
 */

export interface StatsCardsProps {
  totalRoles: number;
  totalAdmins: number;
  totalUsers: number;
  totalPermissions?: number;
}

export interface SingleStatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  value: number;
  title: string;
  description: string;
}

export type StatType = 'roles' | 'admins' | 'users' | 'permissions';

export interface StatConfig {
  id: StatType;
  icon: string; // Icon name from lucide-react
  gradient: string; // Tailwind gradient classes
  title: string;
  description: string;
  defaultValue?: number;
}
