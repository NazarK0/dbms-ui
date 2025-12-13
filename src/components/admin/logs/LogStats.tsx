import LogStatsCard from './LogStatsCard';
import type { LogStats as LogStatsType } from './types';

interface LogStatsProps {
  stats: LogStatsType;
}

export default function LogStats({ stats }: LogStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <LogStatsCard label="Всього записів" value={stats.total} />
      <LogStatsCard
        label="Помилки"
        value={stats.errors}
        colorClass="text-red-600"
        borderColor="border-l-red-500"
      />
      <LogStatsCard
        label="Попередження"
        value={stats.warnings}
        colorClass="text-yellow-600"
        borderColor="border-l-yellow-500"
      />
      <LogStatsCard
        label="Інформаційні"
        value={stats.info}
        colorClass="text-blue-600"
        borderColor="border-l-blue-500"
      />
    </div>
  );
}
