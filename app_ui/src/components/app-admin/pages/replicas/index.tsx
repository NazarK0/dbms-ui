// Central exports for Replica Clusters components
import ReplicaHeader from './ReplicaHeader';
import TopologyDiagram from './topology-diagram'; 
import { ClusterDetailsTable } from './cluster-details'; 
import ReplicationActivityTable from './replication-activity-table';
import AddReplicaDialog from './add-replica-dialog'; 
import { SkeletonTable } from '../../../ui/skeletons';
import { useClustersData } from './useClustersData';


export default function ReplicaClusters() {
  const { data: clusters, isLoading, error } = useClustersData();
      
  if (isLoading) return <SkeletonTable rows={10} columns={6} showActions />;
  if (error) return <div>Error: {error.message}</div>;
  

  return (
    <div className="space-y-6">
      <ReplicaHeader />
      <TopologyDiagram clusters={clusters!} />
      <ClusterDetailsTable clusters={clusters!} />
      <ReplicationActivityTable />

      <AddReplicaDialog />
    </div>
  );
}