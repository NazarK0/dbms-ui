import { TableCell } from '../../../../../ui/table';
import { Badge } from '../../../../../ui/badge';
import type { AuditStatus } from '../../types';

interface StatusCellProps {
  status: AuditStatus;
}

export default function StatusCell({ status }: StatusCellProps) {
  return (
    <TableCell>
      {status === 'success' ? (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-300"
        >
          Успішно
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
          Помилка
        </Badge>
      )}
    </TableCell>
  );
}
