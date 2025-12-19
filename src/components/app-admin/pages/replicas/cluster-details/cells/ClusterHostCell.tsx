/**
 * ClusterHostCell Component
 * 
 * Table cell displaying cluster host address and port in code format.
 * 
 * @module cells/ClusterHostCell
 */

import { TableCell } from '../../../../../ui/table';

interface ClusterHostCellProps {
  /**
   * Host address
   */
  host: string;
  
  /**
   * Port number
   */
  port: number;
}

/**
 * Host cell with code formatting
 * 
 * Displays host:port in monospace code format with light background.
 */
export default function ClusterHostCell({ host, port }: ClusterHostCellProps) {
  return (
    <TableCell>
      <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
        {host}:{port}
      </code>
    </TableCell>
  );
}
