/**
 * ClusterLagCell Component
 * 
 * Table cell displaying replication lag with color-coded badge.
 * 
 * @module cells/ClusterLagCell
 */

import { Badge } from '../../../../../ui/badge';
import { TableCell } from '../../../../../ui/table';
import { getLagVariant } from '../../utils/uiHelpers';

interface ClusterLagCellProps {
  /**
   * Replication lag value (e.g., "< 1s", "5s")
   */
  replicationLag: string;
}

/**
 * Replication lag cell with color-coded badge
 * 
 * Displays replication lag with badge variant based on severity:
 * - Low lag (< 1s): Success variant
 * - Medium lag: Warning variant
 * - High lag: Destructive variant
 */
export default function ClusterLagCell({ replicationLag }: ClusterLagCellProps) {
  return (
    <TableCell>
      <Badge variant={getLagVariant(replicationLag)}>
        {replicationLag}
      </Badge>
    </TableCell>
  );
}
