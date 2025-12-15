import { TableCell } from '../../../../../ui/table';
import { Badge } from '../../../../../ui/badge';
import { getActionBadge } from '../../utils/uiHelpers';
import type { ActionType } from '../../types';

interface ActionCellProps {
  action: ActionType;
}

export default function ActionCell({ action }: ActionCellProps) {
  const actionBadge = getActionBadge(action);

  return (
    <TableCell>
      <Badge variant={actionBadge.variant}>{actionBadge.label}</Badge>
    </TableCell>
  );
}
