import { useState, useEffect } from 'react';
import {
  SystemMonitorHeader,
  SystemStatsGrid,
  DatabaseStatsTable,
  ActiveConnectionsTable,
  SlowQueriesCard,
} from './system-monitor';
import {
  systemStats,
  connections,
  slowQueries,
  databaseStats,
} from '../../../mockData/admin';
import { mockApiCall } from '../../../utils/mockApi';
import { SkeletonCardGrid, SkeletonTable, SkeletonListCard } from '../../ui/skeletons';

export default function SystemMonitor() {
  // Loading states
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingDatabases, setIsLoadingDatabases] = useState(true);
  const [isLoadingConnections, setIsLoadingConnections] = useState(true);
  const [isLoadingQueries, setIsLoadingQueries] = useState(true);

  // Data states
  const [stats, setStats] = useState(systemStats);
  const [databases, setDatabases] = useState(databaseStats);
  const [activeConnections, setActiveConnections] = useState(connections);
  const [queries, setQueries] = useState(slowQueries);

  useEffect(() => {
    // Імітація завантаження системних статистик
    mockApiCall(systemStats, 'fast').then((data) => {
      setStats(data);
      setIsLoadingStats(false);
    });

    // Імітація завантаження статистики БД
    mockApiCall(databaseStats, 'normal').then((data) => {
      setDatabases(data);
      setIsLoadingDatabases(false);
    });

    // Імітація завантаження з'єднань
    mockApiCall(connections, 'normal').then((data) => {
      setActiveConnections(data);
      setIsLoadingConnections(false);
    });

    // Імітація завантаження повільних запитів
    mockApiCall(slowQueries, 'slow').then((data) => {
      setQueries(data);
      setIsLoadingQueries(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <SystemMonitorHeader />

      {/* System Stats */}
      {isLoadingStats ? (
        <SkeletonCardGrid count={4} columns={4} cardType="stat" />
      ) : (
        <SystemStatsGrid stats={stats} />
      )}

      {/* Database Statistics */}
      {isLoadingDatabases ? (
        <SkeletonTable rows={5} columns={5} />
      ) : (
        <DatabaseStatsTable databases={databases} />
      )}

      {/* Active Connections */}
      {isLoadingConnections ? (
        <SkeletonTable rows={8} columns={6} showActions />
      ) : (
        <ActiveConnectionsTable connections={activeConnections} />
      )}

      {/* Slow Queries */}
      {isLoadingQueries ? (
        <SkeletonListCard items={5} />
      ) : (
        <SlowQueriesCard queries={queries} />
      )}
    </div>
  );
}