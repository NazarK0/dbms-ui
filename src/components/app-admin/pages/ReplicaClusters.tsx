import { useState, useEffect } from 'react';
import {
  ReplicaHeader,
  ReplicationStats,
  TopologyDiagram,
  ClusterDetailsTable,
  ReplicationActivityTable,
  AddReplicaDialog,
} from './replicas';
import { replicationStats } from './replicas/data';
import { 
  clusters as initialClusters, 
  replicationActivity 
} from '@/mockData/admin/replicas';
import type { AddReplicaFormData } from './replicas/types';
import { API, api } from '../../../utils/api';
import { SkeletonCardGrid, SkeletonTable, SkeletonDiagram } from '../../ui/skeletons';

export default function ReplicaClusters() {
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [clusters, setClusters] = useState(initialClusters);

  // Loading states
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingTopology, setIsLoadingTopology] = useState(true);
  const [isLoadingClusters, setIsLoadingClusters] = useState(true);
  const [isLoadingActivity, setIsLoadingActivity] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    // Load replication stats
    api.get(API.admin.replicaClusters.replication.stats())
      .then((data) => {
        setStats(data);
        setIsLoadingStats(false);
      })
      .catch((error) => {
        console.error('Error loading replication stats:', error);
        setIsLoadingStats(false);
      });

    // Load topology
    api.get(API.admin.replicaClusters.replicas.list())
      .then((data) => {
        setIsLoadingTopology(false);
      })
      .catch((error) => {
        console.error('Error loading topology:', error);
        setIsLoadingTopology(false);
      });

    // Load clusters
    api.get(API.admin.replicaClusters.replicas.list())
      .then((data) => {
        setClusters(data);
        setIsLoadingClusters(false);
      })
      .catch((error) => {
        console.error('Error loading clusters:', error);
        setIsLoadingClusters(false);
      });

    // Load activity
    api.get(API.admin.replicaClusters.replication.activity())
      .then((data) => {
        setActivity(data);
        setIsLoadingActivity(false);
      })
      .catch((error) => {
        console.error('Error loading activity:', error);
        setIsLoadingActivity(false);
      });
  }, []);

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

      {isLoadingStats ? (
        <SkeletonCardGrid count={3} columns={3} cardType="stat" />
      ) : (
        stats && <ReplicationStats stats={stats} />
      )}

      {isLoadingTopology ? (
        <SkeletonDiagram />
      ) : (
        <TopologyDiagram />
      )}

      {isLoadingClusters ? (
        <SkeletonTable />
      ) : (
        <ClusterDetailsTable
          clusters={clusters}
          onSelectCluster={handleSelectCluster}
          onConfigureCluster={handleConfigureCluster}
          onPromoteReplica={handlePromoteReplica}
        />
      )}

      {isLoadingActivity ? (
        <SkeletonTable />
      ) : (
        <ReplicationActivityTable activities={activity} />
      )}

      <AddReplicaDialog
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddReplica}
      />
    </div>
  );
}