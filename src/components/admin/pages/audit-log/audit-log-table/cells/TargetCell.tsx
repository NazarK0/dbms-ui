import { TableCell } from '../../../../../ui/table';

interface TargetCellProps {
  target: string;
}

export default function TargetCell({ target }: TargetCellProps) {
  return (
    <TableCell className="text-slate-900 font-mono text-sm max-w-xs truncate">
      {target}
    </TableCell>
  );
}
