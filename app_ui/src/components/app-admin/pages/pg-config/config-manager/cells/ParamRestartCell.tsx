import { RotateCcw } from 'lucide-react';
import { TableCell } from '../../../../../ui/table';
import { Badge } from '../../../../../ui/badge';
import type { ParamCellProps } from '../types';

export default function ParamRestartCell({ param }: ParamCellProps) {
  return (
    <TableCell className="text-center">
      {param.requiresRestart ? (
        <Badge variant="destructive" className="text-xs">
          <RotateCcw className="w-3 h-3 mr-1" />
          Так
        </Badge>
      ) : (
        <Badge variant="secondary" className="text-xs">
          Ні
        </Badge>
      )}
    </TableCell>
  );
}
