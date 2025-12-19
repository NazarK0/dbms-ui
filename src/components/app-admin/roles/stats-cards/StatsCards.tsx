/**
 * StatsCards Component
 * Displays statistics cards for roles, admins, users, and permissions
 */

import { Shield, UserCog, Users, Key } from 'lucide-react';
import SingleStatCard from './SingleStatCard';
import { statsConfig } from './data';
import type { StatsCardsProps } from './types';

// Map icon names to actual icon components
const iconMap = {
  Shield,
  UserCog,
  Users,
  Key,
} as const;

export default function StatsCards({ 
  totalRoles, 
  totalAdmins, 
  totalUsers,
  totalPermissions = 47
}: StatsCardsProps) {
  // Map stat types to values
  const values = {
    roles: totalRoles,
    admins: totalAdmins,
    users: totalUsers,
    permissions: totalPermissions,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap];
        const value = values[stat.id];

        return (
          <SingleStatCard
            key={stat.id}
            icon={Icon}
            gradient={stat.gradient}
            value={value}
            title={stat.title}
            description={stat.description}
          />
        );
      })}
    </div>
  );
}
