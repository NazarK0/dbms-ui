import { TableCell } from '../../../../../ui/table';
import { Input } from '../../../../../ui/input';
import type { ParamValueCellProps } from '../types';

export default function ParamValueCell({ param, onParamChange }: ParamValueCellProps) {
  return (
    <TableCell>
      <Input
        defaultValue={param.value}
        className="font-mono text-sm"
        onChange={(e) => onParamChange?.(param.name, e.target.value)}
      />
    </TableCell>
  );
}
