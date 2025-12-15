import type { ConfigStatistics as ConfigStats } from './types';
import { StatisticCard, totalParamsConfig, changedConfig, requiresRestartConfig } from './config-statistics';

interface ConfigStatisticsProps {
  statistics: ConfigStats;
}

export default function ConfigStatistics({ statistics }: ConfigStatisticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatisticCard value={statistics.totalParams} config={totalParamsConfig} />
      <StatisticCard value={statistics.changed} config={changedConfig} />
      <StatisticCard value={statistics.requiresRestart} config={requiresRestartConfig} />
    </div>
  );
}
