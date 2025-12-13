import StatCard from '../../../dashboard/StatCard';
import type { StatsGridProps } from './types';

export default function StatsGrid({ stats, isCardVisible }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} visible={isCardVisible(stat.id)} />
      ))}
    </div>
  );
}
