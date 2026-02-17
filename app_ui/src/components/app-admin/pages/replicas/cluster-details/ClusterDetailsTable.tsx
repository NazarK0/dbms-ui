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
  clusters: ClusterServer[];
}


export default function ClusterDetailsTable({
  clusters
}: ClusterDetailsTableProps) {

  const handleSelectCluster = (clusterId: number) => {
    
    console.log('Selected cluster:', clusterId);
  };

  const handleConfigureCluster = (clusterId: number) => {
    console.log('Configuring cluster:', clusterId);
  };

  const handlePromoteReplica = (clusterId: number) => {
    console.log('Promoting replica to primary:', clusterId);
  };

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
                onSelect={handleSelectCluster}
                onConfigure={handleConfigureCluster}
                onPromote={handlePromoteReplica}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
