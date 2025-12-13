import { TableRow, TableCell } from '../../ui/table';
import type { TableEmptyStateProps } from './types';

/**
 * Empty state for table when no records found
 */
export default function TableEmptyState({ columnsCount }: TableEmptyStateProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={columnsCount}
        className="h-24 text-center text-slate-500"
      >
        Записів не знайдено
      </TableCell>
    </TableRow>
  );
}
