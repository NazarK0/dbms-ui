/**
 * ReplicaNode Component
 * 
 * Visual representation of a replica database server in replication topology.
 * 
 * @module topology-diagram/ReplicaNode
 */

import { Server, CheckCircle, AlertCircle } from 'lucide-react';

interface ReplicaNodeProps {
  /**
   * Replica server name
   */
  name: string;
  
  /**
   * Host address
   */
  host: string;
  
  /**
   * Geographic location
   */
  location: string;
  
  /**
   * Replication lag
   */
  lag: string;
  
  /**
   * Health status
   */
  status: 'healthy' | 'warning' | 'error';
}

/**
 * Replica Database Node Component
 * 
 * Displays a replica database server with:
 * - Server icon
 * - Replica name
 * - Status indicator
 * - Host address
 * - Location and replication lag
 * 
 * Visual styling:
 * - Green gradient for healthy replicas
 * - Yellow/orange gradient for warning status
 * - Smaller size compared to primary node
 */
export default function ReplicaNode({
  name,
  host,
  location,
  lag,
  status,
}: ReplicaNodeProps) {
  const isHealthy = status === 'healthy';
  const StatusIcon = isHealthy ? CheckCircle : AlertCircle;
  
  // Gradient and border colors based on status
  const bgGradient = isHealthy 
    ? 'from-green-50 to-emerald-50' 
    : 'from-yellow-50 to-orange-50';
  const borderColor = isHealthy ? 'border-green-500' : 'border-yellow-500';
  const iconColor = isHealthy ? 'text-green-600' : 'text-yellow-600';
  const statusIconColor = isHealthy ? 'text-green-600' : 'text-yellow-600';
  
  return (
    <div className={`bg-gradient-to-br ${bgGradient} border-2 ${borderColor} rounded-xl p-4 shadow-md`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Server className={`w-4 h-4 ${iconColor}`} />
          <span className="text-slate-900 text-sm">{name}</span>
        </div>
        <StatusIcon className={`w-4 h-4 ${statusIconColor}`} />
      </div>
      
      <div className="text-xs text-slate-600">
        <p className="font-mono truncate">{host}</p>
        <p className="mt-1">
          {location} • Lag: {lag}
        </p>
      </div>
    </div>
  );
}
