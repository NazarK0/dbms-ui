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
} from '../../../mockData/admin/monitoring';

export default function SystemMonitor() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <SystemMonitorHeader />

      {/* System Stats */}
      <SystemStatsGrid stats={systemStats} />

      {/* Database Statistics */}
      <DatabaseStatsTable databases={databaseStats} />

      {/* Active Connections */}
      <ActiveConnectionsTable connections={connections} />

      {/* Slow Queries */}
      <SlowQueriesCard queries={slowQueries} />
    </div>
  );
}
