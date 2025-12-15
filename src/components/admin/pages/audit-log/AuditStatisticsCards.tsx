import type { AuditStatisticsCardsProps } from './types';
import { StatisticCard, statisticCardsConfig } from './audit-statistics-cards';

export default function AuditStatisticsCards({ statistics }: AuditStatisticsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statisticCardsConfig.map((config) => (
        <StatisticCard
          key={config.key}
          config={config}
          value={statistics[config.key as keyof typeof statistics]}
        />
      ))}
    </div>
  );
}
