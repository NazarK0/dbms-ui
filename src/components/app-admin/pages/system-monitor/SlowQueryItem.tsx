import { Badge } from '../../../ui/badge';
import type { SlowQueryItemProps } from './types';

export default function SlowQueryItem({ query }: SlowQueryItemProps) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <code className="text-sm text-slate-900 flex-1 font-mono">
          {query.query}
        </code>
        <Badge variant="destructive" className="shrink-0">
          {query.duration}
        </Badge>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <Badge variant="secondary">{query.calls} викликів</Badge>
        <span className="text-slate-400">•</span>
        <span className="text-slate-600">{query.database}</span>
      </div>
    </div>
  );
}
