import { Database } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import { TableCell, TableRow } from '../../../ui/table';
import type { DatabaseStatsRowProps } from './types';

export default function DatabaseStatsRow({ database }: DatabaseStatsRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <span className="text-slate-900">{database.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-slate-600">{database.size}</TableCell>
      <TableCell>
        <Badge variant="secondary">{database.connections}</Badge>
      </TableCell>
      <TableCell className="text-slate-600">{database.tps}</TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Progress
            value={database.cache_hit}
            className="h-2 flex-1 max-w-[120px]"
          />
          <span className="text-slate-900 text-sm min-w-[50px]">
            {database.cache_hit}%
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}
