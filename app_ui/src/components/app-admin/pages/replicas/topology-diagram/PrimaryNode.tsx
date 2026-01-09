/**
 * PrimaryNode Component
 * 
 * Visual representation of the primary database server in replication topology.
 * 
 * @module topology-diagram/PrimaryNode
 */

import { Server, CheckCircle, AlertCircle, MapPin } from 'lucide-react';

interface PrimaryNodeProps {
  /**
   * Server name
   */
  name: string;
  
  /**
   * Host address with port
   */
  host: string;
  
  /**
   * Port number
   */
  port: number;
  
  /**
   * Geographic location
   */
  location: string;
  
  /**
   * Health status
   */
  status: 'healthy' | 'warning' | 'error';
}

/**
 * Primary Database Node Component
 * 
 * Displays the primary database server with:
 * - Server icon with gradient background
 * - Server name
 * - Status indicator (check/alert icon)
 * - Host and port information
 * - Geographic location
 * 
 * Visual styling:
 * - Lime/green gradient background
 * - Border color based on status
 * - Larger size compared to replica nodes
 */
export default function PrimaryNode({
  name,
  host,
  port,
  location,
  status,
}: PrimaryNodeProps) {
  const isHealthy = status === 'healthy';
  const StatusIcon = isHealthy ? CheckCircle : AlertCircle;
  const statusColor = isHealthy ? 'text-green-600' : 'text-yellow-600';
  
  return (
    <div className="w-full max-w-md">
      <div className="bg-gradient-to-br from-lime-50 to-green-50 border-2 border-lime-500 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900">{name}</span>
          </div>
          <StatusIcon className={`w-6 h-6 ${statusColor}`} />
        </div>
        
        <div className="text-sm text-slate-600">
          <p className="font-mono">
            {host}:{port}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="w-3 h-3" />
            <p className="text-xs">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
