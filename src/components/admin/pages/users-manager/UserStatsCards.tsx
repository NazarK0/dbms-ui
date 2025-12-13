import UserStatsCard from './UserStatsCard';
import { userStatsCardConfig } from './data';
import type { UserStatsCardsProps } from './types';
import { formatStatsValue } from './utils';

export default function UserStatsCards({ stats }: UserStatsCardsProps) {
  const cardsData = [
    {
      ...userStatsCardConfig[0],
      value: formatStatsValue(stats.totalUsers),
    },
    {
      ...userStatsCardConfig[1],
      value: formatStatsValue(stats.administrators),
    },
    {
      ...userStatsCardConfig[2],
      value: formatStatsValue(stats.endUsers),
    },
    {
      ...userStatsCardConfig[3],
      value: formatStatsValue(stats.newThisMonth, '+'),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cardsData.map((data, index) => (
        <UserStatsCard key={index} data={data} />
      ))}
    </div>
  );
}
