/**
 * ClusterDetailsTable Component
 * 
 * Table displaying detailed information about all database clusters/replicas.
 * Shows server name, role, status, location, host, connections, lag, and actions.
 * 
 * @module ClusterDetailsTable
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { Table, TableBody } from '../../../../ui/table';
import type { ClusterServer } from '../types';
import ClusterTableHeader from './ClusterTableHeader';
import ClusterTableRow from './ClusterTableRow';

interface ClusterDetailsTableProps {
  /**
   * Array of cluster servers
   */
  clusters: ClusterServer[];
  
  /**
   * Callback when cluster row is selected
   */
  onSelectCluster?: (clusterId: number) => void;
  
  /**
   * Callback to configure cluster
   */
  onConfigureCluster?: (clusterId: number) => void;
  
  /**
   * Callback to promote replica to primary
   */
  onPromoteReplica?: (clusterId: number) => void;
}

/**
 * Cluster Details Table Component
 * 
 * Displays comprehensive information about database cluster topology.
 * Includes primary server and all replica servers with their health status,
 * location, connection info, and management actions.
 * 
 * Columns:
 * 1. Name - Server name with icon
 * 2. Role - Primary or Replica badge
 * 3. Status - Health status with icon
 * 4. Location - Geographic region
 * 5. Host - Host:port in code format
 * 6. Connections - Active connection count
 * 7. Replication Lag - Lag time with color coding
 * 8. Actions - Configure and Promote buttons
 */
export default function ClusterDetailsTable({
  clusters,
  onSelectCluster,
  onConfigureCluster,
  onPromoteReplica,
}: ClusterDetailsTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Деталі кластерів</CardTitle>
        <CardDescription>Інформація про всі сервери в топології</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Table>
          <ClusterTableHeader />
          
          <TableBody>
            {clusters.map((cluster) => (
              <ClusterTableRow
                key={cluster.id}
                cluster={cluster}
                onSelect={onSelectCluster}
                onConfigure={onConfigureCluster}
                onPromote={onPromoteReplica}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
