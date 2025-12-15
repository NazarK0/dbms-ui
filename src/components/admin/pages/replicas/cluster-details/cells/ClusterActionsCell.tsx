/**
 * ClusterActionsCell Component
 * 
 * Table cell with action buttons for cluster management.
 * 
 * @module cells/ClusterActionsCell
 */

import { Button } from '../../../../../ui/button';
import { TableCell } from '../../../../../ui/table';

interface ClusterActionsCellProps {
  /**
   * Cluster ID
   */
  clusterId: number;
  
  /**
   * Cluster role (Primary or Replica)
   */
  role: string;
  
  /**
   * Callback for configure action
   */
  onConfigure?: (id: number) => void;
  
  /**
   * Callback for promote replica action
   */
  onPromote?: (id: number) => void;
}

/**
 * Actions cell with management buttons
 * 
 * Displays:
 * - Configure button: Always visible
 * - Promote button: Only visible for replicas (not Primary)
 * 
 * Both buttons stop event propagation to prevent row click.
 */
export default function ClusterActionsCell({
  clusterId,
  role,
  onConfigure,
  onPromote,
}: ClusterActionsCellProps) {
  return (
    <TableCell className="text-right">
      <div className="flex items-center justify-end gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onConfigure?.(clusterId);
          }}
        >
          Налаштувати
        </Button>
        
        {role !== 'Primary' && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-green-600"
            onClick={(e) => {
              e.stopPropagation();
              onPromote?.(clusterId);
            }}
          >
            Promote
          </Button>
        )}
      </div>
    </TableCell>
  );
}
