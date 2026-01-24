import { TableCell } from '../../../../../ui/table';
import { Badge } from '../../../../../ui/badge';
import type { ActionType } from '../../types';
import { getActionBadge } from '../utils';

interface ActionCellProps {
  action: ActionType;
}

export default function ActionCell({ action }: ActionCellProps) {
  const actionBadge = getActionBadge(action);

  return <Badge variant={actionBadge.variant}>{actionBadge.label}</Badge>;
}
