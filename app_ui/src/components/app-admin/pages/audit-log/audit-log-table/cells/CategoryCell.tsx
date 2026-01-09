import { TableCell } from '../../../../../ui/table';
import { getCategoryIcon } from '../../utils/uiHelpers';
import type { AuditCategory } from '../../types';

interface CategoryCellProps {
  category: AuditCategory;
}

export default function CategoryCell({ category }: CategoryCellProps) {
  const Icon = getCategoryIcon(category);

  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-slate-500" />
        <span className="text-slate-700">{category}</span>
      </div>
    </TableCell>
  );
}
