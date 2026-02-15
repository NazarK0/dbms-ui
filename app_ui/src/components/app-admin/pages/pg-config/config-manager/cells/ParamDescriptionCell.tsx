import { TableCell } from '../../../../../ui/table';
import type { ParamCellProps } from '../types';

export default function ParamDescriptionCell({ param }: ParamCellProps) {
  return (
    <TableCell className="text-slate-600 text-sm">
      {param.description}
    </TableCell>
  );
}
