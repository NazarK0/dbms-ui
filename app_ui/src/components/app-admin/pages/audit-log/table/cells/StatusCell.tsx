import { TableCell } from '../../../../../ui/table';
import { Badge } from '../../../../../ui/badge';
import type { AuditStatus } from '../../types';
import { getStatusBadgeClass } from '../utils';

interface StatusCellProps {
  status: AuditStatus;
}

export default function StatusCell({ status }: StatusCellProps) {
  const statusBadgeClass = getStatusBadgeClass(status);

  switch (status) {
    case 'success':
      return (
        <Badge variant="outline" className={statusBadgeClass}>
          Успішно
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="outline" className={statusBadgeClass}>
          Помилка
        </Badge>
      );
  }
}
