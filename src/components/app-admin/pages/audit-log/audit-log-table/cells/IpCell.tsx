import { TableCell } from '../../../../../ui/table';

interface IpCellProps {
  ip: string;
}

export default function IpCell({ ip }: IpCellProps) {
  return (
    <TableCell className="text-slate-600 text-sm font-mono">
      {ip}
    </TableCell>
  );
}
