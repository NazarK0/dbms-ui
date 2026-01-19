import LogWidget from './LogWidget';
import { type LogStats as LogStatsType } from './types';

import { type LogLevel } from './table/types';

interface LogStatsProps {
  stats: LogStatsType;
}

export default function LogWidgetsPanel({ stats }: LogStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <LogWidget label="Всього записів" value={stats.total} />
      <LogWidget
        label="Помилки"
        level='error'
        value={stats.errors}
      />
      <LogWidget
        label="Попередження"
        level='warning'
        value={stats.warnings}
      />
      <LogWidget
        label="Інформаційні"
        level='info'
        value={stats.info}
      />
    </div>
  );
}
