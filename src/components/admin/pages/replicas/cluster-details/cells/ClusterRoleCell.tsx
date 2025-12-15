/**
 * ClusterRoleCell Component
 * 
 * Table cell displaying cluster role (Primary or Replica).
 * 
 * @module cells/ClusterRoleCell
 */

import { Badge } from '../../../../../ui/badge';
import { TableCell } from '../../../../../ui/table';

interface ClusterRoleCellProps {
  /**
   * Cluster role
   */
  role: string;
}

/**
 * Role cell with badge
 * 
 * Displays cluster role with different badge variants:
 * - Primary: Default variant (olive theme)
 * - Replica: Secondary variant
 */
export default function ClusterRoleCell({ role }: ClusterRoleCellProps) {
  return (
    <TableCell>
      <Badge variant={role === 'Primary' ? 'default' : 'secondary'}>
        {role}
      </Badge>
    </TableCell>
  );
}
