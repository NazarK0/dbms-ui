import { Badge } from '../../../ui/badge';
import LogLevelBadge from './LogLevelBadge';
import type { LogEntry } from './types';

interface LogDetailsContentProps {
  log: LogEntry;
}

export default function LogDetailsContent({ log }: LogDetailsContentProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-slate-600 mb-1">Час події</p>
          <p className="text-sm font-mono bg-slate-100 px-3 py-2 rounded">
            {log.timestamp}
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-600 mb-1">Рівень</p>
          <div>
            <LogLevelBadge level={log.level} />
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-600 mb-1">Джерело</p>
          <Badge variant="outline">{log.source}</Badge>
        </div>
        <div>
          <p className="text-sm text-slate-600 mb-1">База даних</p>
          <p className="text-sm font-medium">{log.database}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-slate-600 mb-1">Користувач</p>
          <p className="text-sm font-medium">{log.user}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-slate-600 mb-2">Повідомлення</p>
        <p className="text-sm bg-slate-100 px-3 py-2 rounded">{log.message}</p>
      </div>

      <div>
        <p className="text-sm text-slate-600 mb-2">Технічні деталі</p>
        <div className="bg-slate-900 rounded-lg p-4">
          <code className="text-sm text-slate-100 font-mono whitespace-pre-wrap break-all">
            {log.details}
          </code>
        </div>
      </div>
    </div>
  );
}
