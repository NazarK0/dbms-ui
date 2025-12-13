import { useState } from 'react';
import {
  ReplicaHeader,
  ReplicationStats,
  TopologyDiagram,
  ClusterDetailsTable,
  ReplicationActivityTable,
  AddReplicaDialog,
} from './replicas';
import { 
  replicationStats, 
  clusters as initialClusters, 
  replicationActivity 
} from './replicas/data';
import type { AddReplicaFormData } from './replicas/types';

export default function ReplicaClusters() {
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [clusters, setClusters] = useState(initialClusters);

  const handleAddReplica = (data: AddReplicaFormData) => {
    console.log('Adding replica:', data);
    
    // In a real app, this would make an API call
    const newCluster = {
      id: clusters.length + 1,
      name: data.name,
      role: 'Replica' as const,
      status: 'healthy' as const,
      location: data.location,
      host: data.host,
      port: data.port,
      connections: 0,
      replicationLag: '0ms',
    };
    
    setClusters([...clusters, newCluster]);
  };

  const handleSelectCluster = (clusterId: number) => {
    setSelectedCluster(clusterId);
    console.log('Selected cluster:', clusterId);
  };

  const handleConfigureCluster = (clusterId: number) => {
    console.log('Configuring cluster:', clusterId);
  };

  const handlePromoteReplica = (clusterId: number) => {
    console.log('Promoting replica to primary:', clusterId);
  };

  return (
    <div className="space-y-6">
      <ReplicaHeader onAddReplica={() => setShowAddModal(true)} />

      <ReplicationStats stats={replicationStats} />

      <TopologyDiagram />

      <ClusterDetailsTable
        clusters={clusters}
        onSelectCluster={handleSelectCluster}
        onConfigureCluster={handleConfigureCluster}
        onPromoteReplica={handlePromoteReplica}
      />

      <ReplicationActivityTable activities={replicationActivity} />

      <AddReplicaDialog
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddReplica}
      />
    </div>
  );
}
