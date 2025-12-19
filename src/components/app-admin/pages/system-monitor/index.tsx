// Central exports for SystemMonitor components
import SystemMonitorHeader from './SystemMonitorHeader';
import SystemStatsGrid from './SystemStatsGrid';
import DatabaseStatsTable from './DatabaseStatsTable';
import ActiveConnectionsTable from './ActiveConnectionsTable';
import SlowQueriesCard from './SlowQueriesCard';
import { useState, useEffect } from 'react';
import {
  systemStats,
  connections,
  slowQueries,
  databaseStats,
} from '../../../../mockData/admin';
import { API, api } from '../../../../utils/api';
import { SkeletonCardGrid, SkeletonTable, SkeletonListCard } from '../../../ui/skeletons';

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
    // Load system statistics
    api.get(API.admin.systemMonitor.system.stats())
      .then((data) => {
        setStats(data);
        setIsLoadingStats(false);
      })
      .catch((error) => {
        console.error('Error loading system stats:', error);
        setIsLoadingStats(false);
      });

    // Load database statistics
    api.get(API.admin.systemMonitor.databases.stats())
      .then((data) => {
        setDatabases(data);
        setIsLoadingDatabases(false);
      })
      .catch((error) => {
        console.error('Error loading database stats:', error);
        setIsLoadingDatabases(false);
      });

    // Load connections
    api.get(API.admin.systemMonitor.connections.active())
      .then((data) => {
        setActiveConnections(data);
        setIsLoadingConnections(false);
      })
      .catch((error) => {
        console.error('Error loading connections:', error);
        setIsLoadingConnections(false);
      });

    // Load slow queries
    api.get(API.admin.systemMonitor.queries.slow())
      .then((data) => {
        setQueries(data);
        setIsLoadingQueries(false);
      })
      .catch((error) => {
        console.error('Error loading slow queries:', error);
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
