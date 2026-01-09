/**
 * TopologyDiagram Component
 * 
 * Visual diagram showing database replication topology with primary and replica servers.
 * 
 * @module topology-diagram/TopologyDiagram
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { clusters } from '../../../../../mockData/admin/replicas';
import PrimaryNode from './PrimaryNode';
import ConnectionLines from './ConnectionLines';
import ReplicaNodesGrid from './ReplicaNodesGrid';

/**
 * Topology Diagram Component
 * 
 * Displays database replication topology:
 * 1. Primary server at the top
 * 2. Connection lines showing replication flow
 * 3. Replica servers in a grid layout
 * 
 * Data is fetched from mockData (will be replaced with API calls).
 * 
 * Visual layout:
 * ```
 *         [Primary]
 *            |
 *      ------+------
 *      |     |     |
 *    [R1]  [R2]  [R3]
 * ```
 */
export default function TopologyDiagram() {
  // Separate primary and replicas from clusters data
  const primary = clusters.find(cluster => cluster.role === 'Primary');
  const replicas = clusters.filter(cluster => cluster.role === 'Replica');

  // Fallback if no primary found (shouldn't happen with proper data)
  if (!primary) {
    return (
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Топологія реплікації</CardTitle>
          <CardDescription>Схема підключень primary та replica серверів</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500 text-center py-8">
            Дані топології недоступні
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Топологія реплікації</CardTitle>
        <CardDescription>Схема підключень primary та replica серверів</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-center space-y-8">
          {/* Primary Server */}
          <PrimaryNode
            name={primary.name}
            host={primary.host}
            port={primary.port}
            location={primary.location}
            status={primary.status}
          />

          {/* Connection Lines */}
          <ConnectionLines replicaCount={replicas.length} />

          {/* Replica Servers Grid */}
          <ReplicaNodesGrid replicas={replicas} />
        </div>
      </CardContent>
    </Card>
  );
}
