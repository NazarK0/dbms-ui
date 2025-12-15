/**
 * ClusterLocationCell Component
 * 
 * Table cell displaying cluster geographic location with map pin icon.
 * 
 * @module cells/ClusterLocationCell
 */

import { MapPin } from 'lucide-react';
import { TableCell } from '../../../../../ui/table';

interface ClusterLocationCellProps {
  /**
   * Geographic location
   */
  location: string;
}

/**
 * Location cell with map pin icon
 * 
 * Displays geographic location (e.g., "US East", "Europe") with a map pin icon.
 */
export default function ClusterLocationCell({ location }: ClusterLocationCellProps) {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <MapPin className="w-3 h-3 text-slate-400" />
        <span className="text-slate-600 text-sm">{location}</span>
      </div>
    </TableCell>
  );
}
