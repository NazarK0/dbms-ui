/**
 * ConnectionLines Component
 * 
 * Visual representation of replication connections from primary to replicas.
 * 
 * @module topology-diagram/ConnectionLines
 */

interface ConnectionLinesProps {
  /**
   * Number of replica nodes to connect
   * @default 3
   */
  replicaCount?: number;
}

/**
 * Connection Lines Component
 * 
 * Displays connection lines showing replication flow from primary to replicas.
 * 
 * Structure:
 * - Vertical line down from primary
 * - Horizontal line spanning all replicas
 * - Vertical lines down to each replica
 * 
 * Supports 1-4 replica connections with dynamic positioning.
 */
export default function ConnectionLines({ replicaCount = 3 }: ConnectionLinesProps) {
  // Generate positions for replica connection points
  const getReplicaPositions = () => {
    switch (replicaCount) {
      case 1:
        return ['left-1/2'];
      case 2:
        return ['left-1/3', 'left-2/3'];
      case 3:
        return ['left-1/4', 'left-1/2', 'left-3/4'];
      case 4:
        return ['left-1/5', 'left-2/5', 'left-3/5', 'left-4/5'];
      default:
        return ['left-1/4', 'left-1/2', 'left-3/4'];
    }
  };

  const positions = getReplicaPositions();

  return (
    <div className="relative w-full max-w-4xl h-16">
      {/* Vertical line from primary */}
      <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-slate-300"></div>
      
      {/* Horizontal line spanning replicas */}
      <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-300"></div>
      
      {/* Vertical lines to each replica */}
      {positions.map((position, index) => (
        <div
          key={index}
          className={`absolute top-8 ${position} w-0.5 h-8 bg-slate-300`}
        ></div>
      ))}
    </div>
  );
}
