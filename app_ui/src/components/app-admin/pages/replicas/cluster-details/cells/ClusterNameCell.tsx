/**
 * ClusterNameCell Component
 * 
 * Table cell displaying cluster/replica server name with icon.
 * 
 * @module cells/ClusterNameCell
 */

import { Server } from 'lucide-react';
import { TableCell } from '../../../../../ui/table';

interface ClusterNameCellProps {
  /**
   * Cluster/server name
   */
  name: string;
}

/**
 * Name cell with server icon
 * 
 * Displays cluster name with a server icon prefix.
 */
export default function ClusterNameCell({ name }: ClusterNameCellProps) {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Server className="w-4 h-4 text-slate-400" />
        <span className="text-slate-900">{name}</span>
      </div>
    </TableCell>
  );
}
