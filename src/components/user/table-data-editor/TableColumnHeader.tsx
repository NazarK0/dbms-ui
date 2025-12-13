import { TableHead } from '../../ui/table';
import { Badge } from '../../ui/badge';
import type { TableColumnHeaderProps } from './types';

/**
 * Table column header with optional primary key badge
 */
export default function TableColumnHeader({ column }: TableColumnHeaderProps) {
  return (
    <TableHead className="font-medium">
      {column.name}
      {column.primaryKey && (
        <Badge variant="outline" className="ml-2 text-xs">
          PK
        </Badge>
      )}
    </TableHead>
  );
}
