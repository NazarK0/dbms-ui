/**
 * ClusterStatusCell Component
 * 
 * Table cell displaying cluster health status with icon and text.
 * 
 * @module cells/ClusterStatusCell
 */

import { CheckCircle, AlertCircle } from 'lucide-react';
import { TableCell } from '../../../../../ui/table';
import { getStatusText } from '../../utils/uiHelpers';

interface ClusterStatusCellProps {
  /**
   * Cluster health status
   */
  status: 'healthy' | 'syncing' | 'warning';
}

/**
 * Status cell with conditional icon
 * 
 * Displays health status with appropriate icon and color:
 * - healthy: Green check circle
 * - syncing/warning: Yellow alert circle
 */
export default function ClusterStatusCell({ status }: ClusterStatusCellProps) {
  const isHealthy = status === 'healthy';
  const Icon = isHealthy ? CheckCircle : AlertCircle;
  const colorClass = isHealthy ? 'text-green-600' : 'text-yellow-600';

  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${colorClass}`} />
        <span className={`text-sm ${colorClass}`}>
          {getStatusText(status)}
        </span>
      </div>
    </TableCell>
  );
}
