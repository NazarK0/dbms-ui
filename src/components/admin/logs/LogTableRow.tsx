import { Eye } from 'lucide-react';
import { TableCell, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import LogLevelBadge from './LogLevelBadge';
import type { LogEntry } from './types';

interface LogTableRowProps {
  log: LogEntry;
  onViewDetails: (log: LogEntry) => void;
}

export default function LogTableRow({ log, onViewDetails }: LogTableRowProps) {
  return (
    <TableRow className="hover:bg-slate-50/50">
      <TableCell className="font-mono text-xs text-slate-600">
        {log.timestamp}
      </TableCell>
      <TableCell>
        <LogLevelBadge level={log.level} />
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs">
          {log.source}
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-slate-700 font-medium">
        {log.database}
      </TableCell>
      <TableCell className="text-sm text-slate-600">{log.user}</TableCell>
      <TableCell className="text-sm text-slate-900 max-w-md truncate">
        {log.message}
      </TableCell>
      <TableCell className="text-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => onViewDetails(log)}
        >
          <Eye className="w-4 h-4 text-slate-600" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
