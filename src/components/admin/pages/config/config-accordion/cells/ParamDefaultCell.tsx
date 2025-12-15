import { TableCell } from '../../../../../ui/table';
import { Badge } from '../../../../../ui/badge';
import type { ParamCellProps } from '../types';

export default function ParamDefaultCell({ param }: ParamCellProps) {
  return (
    <TableCell>
      <Badge variant="outline" className="font-mono">
        {param.defaultValue}
        {param.unit && <span className="ml-1 text-slate-500">{param.unit}</span>}
      </Badge>
    </TableCell>
  );
}
