/**
 * ReplicaNodesGrid Component
 * 
 * Grid layout for displaying multiple replica nodes.
 * 
 * @module topology-diagram/ReplicaNodesGrid
 */

import type { ClusterServer } from '../types';
import ReplicaNode from './ReplicaNode';

interface ReplicaNodesGridProps {
  /**
   * Array of replica servers
   */
  replicas: ClusterServer[];
}

/**
 * Replica Nodes Grid Component
 * 
 * Displays replica servers in a responsive grid layout.
 * 
 * Layout:
 * - 1 column on mobile
 * - 3 columns on medium+ screens
 * - Auto-adjusts to number of replicas
 * 
 * Each replica displays:
 * - Name and status
 * - Host address
 * - Location and lag time
 */
export default function ReplicaNodesGrid({ replicas }: ReplicaNodesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {replicas.map((replica) => (
        <ReplicaNode
          key={replica.id}
          name={replica.name}
          host={replica.host}
          location={replica.location}
          lag={replica.replicationLag}
          status={replica.status}
        />
      ))}
    </div>
  );
}
