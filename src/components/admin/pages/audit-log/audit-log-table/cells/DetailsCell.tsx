import { TableCell } from '../../../../../ui/table';

interface DetailsCellProps {
  details: string;
}

export default function DetailsCell({ details }: DetailsCellProps) {
  return (
    <TableCell className="text-slate-600 text-sm max-w-md truncate">
      {details}
    </TableCell>
  );
}
