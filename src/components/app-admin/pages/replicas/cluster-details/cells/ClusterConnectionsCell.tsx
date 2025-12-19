/**
 * ClusterConnectionsCell Component
 * 
 * Table cell displaying number of active connections to cluster.
 * 
 * @module cells/ClusterConnectionsCell
 */

import { Badge } from '../../../../../ui/badge';
import { TableCell } from '../../../../../ui/table';

interface ClusterConnectionsCellProps {
  /**
   * Number of active connections
   */
  connections: number;
}

/**
 * Connections cell with badge
 * 
 * Displays connection count in an outline badge.
 */
export default function ClusterConnectionsCell({ connections }: ClusterConnectionsCellProps) {
  return (
    <TableCell>
      <Badge variant="outline">{connections}</Badge>
    </TableCell>
  );
}
