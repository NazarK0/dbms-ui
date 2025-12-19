/**
 * ClusterTableRow Component
 * 
 * Single table row displaying complete cluster/server information.
 * Composes all cell components to create a unified row.
 * 
 * @module ClusterTableRow
 */

import { TableRow } from '../../../../ui/table';
import type { ClusterServer } from '../types';
import {
  ClusterNameCell,
  ClusterRoleCell,
  ClusterStatusCell,
  ClusterLocationCell,
  ClusterHostCell,
  ClusterConnectionsCell,
  ClusterLagCell,
  ClusterActionsCell,
} from './cells';

interface ClusterTableRowProps {
  /**
   * Cluster server data
   */
  cluster: ClusterServer;
  
  /**
   * Callback when row is clicked
   */
  onSelect?: (clusterId: number) => void;
  
  /**
   * Callback for configure action
   */
  onConfigure?: (clusterId: number) => void;
  
  /**
   * Callback for promote replica action
   */
  onPromote?: (clusterId: number) => void;
}

/**
 * Cluster table row component
 * 
 * Displays all cluster information in a clickable table row.
 * Composes 8 specialized cell components for different data types.
 * 
 * Features:
 * - Clickable row (calls onSelect)
 * - 8 data cells with specialized formatting
 * - Action buttons with event propagation control
 */
export default function ClusterTableRow({
  cluster,
  onSelect,
  onConfigure,
  onPromote,
}: ClusterTableRowProps) {
  return (
    <TableRow 
      className="cursor-pointer" 
      onClick={() => onSelect?.(cluster.id)}
    >
      <ClusterNameCell name={cluster.name} />
      
      <ClusterRoleCell role={cluster.role} />
      
      <ClusterStatusCell status={cluster.status} />
      
      <ClusterLocationCell location={cluster.location} />
      
      <ClusterHostCell host={cluster.host} port={cluster.port} />
      
      <ClusterConnectionsCell connections={cluster.connections} />
      
      <ClusterLagCell replicationLag={cluster.replicationLag} />
      
      <ClusterActionsCell
        clusterId={cluster.id}
        role={cluster.role}
        onConfigure={onConfigure}
        onPromote={onPromote}
      />
    </TableRow>
  );
}
