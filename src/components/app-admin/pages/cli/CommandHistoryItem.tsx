import { Copy } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { getStatusBadgeVariant, getStatusLabel, getStatusColorClass } from './utils';
import type { CommandHistoryItemProps } from './types';

export default function CommandHistoryItem({ entry, onCopy }: CommandHistoryItemProps) {
  return (
    <div className="border-l-2 border-lime-600 pl-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-lime-400">postgres=#</span>
          <span className="text-white">{entry.command}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-slate-400 hover:text-white"
            onClick={() => onCopy(entry.command)}
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Badge variant={getStatusBadgeVariant(entry.status)} className="text-xs">
            {getStatusLabel(entry.status)}
          </Badge>
          <span className="text-slate-500">{entry.executionTime}</span>
          <span className="text-slate-600">{entry.timestamp}</span>
        </div>
      </div>
      <pre className={`text-sm whitespace-pre-wrap ${getStatusColorClass(entry.status)}`}>
        {entry.output}
      </pre>
    </div>
  );
}
