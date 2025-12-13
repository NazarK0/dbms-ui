import { Badge } from '../../../ui/badge';
import { TableCell, TableRow } from '../../../ui/table';
import { getStateBadge } from './utils';
import type { ConnectionRowProps } from './types';

export default function ConnectionRow({ connection }: ConnectionRowProps) {
  return (
    <TableRow>
      <TableCell className="text-slate-900 font-mono text-sm">
        {connection.pid}
      </TableCell>
      <TableCell>
        <Badge variant="outline">{connection.database}</Badge>
      </TableCell>
      <TableCell className="text-slate-600">{connection.user}</TableCell>
      <TableCell>
        <Badge variant={getStateBadge(connection.state)}>
          {connection.state}
        </Badge>
      </TableCell>
      <TableCell className="max-w-xs">
        <code className="text-xs text-slate-600 truncate block bg-slate-50 px-2 py-1 rounded">
          {connection.query}
        </code>
      </TableCell>
      <TableCell className="text-slate-600 font-mono text-sm">
        {connection.duration}
      </TableCell>
    </TableRow>
  );
}
