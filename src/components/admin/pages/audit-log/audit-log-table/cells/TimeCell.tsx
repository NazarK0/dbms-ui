import { TableCell } from '../../../../../ui/table';

interface TimeCellProps {
  timestamp: string;
}

export default function TimeCell({ timestamp }: TimeCellProps) {
  return (
    <TableCell className="text-slate-600 text-sm font-mono">
      {timestamp}
    </TableCell>
  );
}
