import { TableCell } from '../../../../../ui/table';
import type { ParamCellProps } from '../types';

export default function ParamNameCell({ param }: ParamCellProps) {
  return (
    <TableCell>
      <code className="text-sm text-slate-900 font-mono">{param.name}</code>
    </TableCell>
  );
}
