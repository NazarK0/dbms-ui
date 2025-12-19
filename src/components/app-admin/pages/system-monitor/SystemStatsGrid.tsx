import SystemStatCard from './SystemStatCard';
import type { SystemStatsGridProps } from './types';

export default function SystemStatsGrid({ stats }: SystemStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <SystemStatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
