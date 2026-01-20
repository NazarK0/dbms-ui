// Logs components
import LogsHeader from './LogsHeader';
import LogWidgetsPanel from './widgets-panel/LogWidgetsPanel';
import LogTable from './table';

// Utils and types
export * from './utils';
export * from './types';
export * from './data';



import { useState, useEffect } from 'react';
import { API, api } from '../../../../utils/api';
import { SkeletonCardGrid } from '../../../ui/skeletons';


import type { LogStats as LogStatsType } from './types';


export default function Logs() {

  // Loading states
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [stats, setStats] = useState<LogStatsType | null>(null);

  useEffect(() => {
    // Load statistics
    api.get(API.admin.logs.stats())
      .then((data) => {
        setStats(data);
        setIsLoadingStats(false);
      })
      .catch((error) => {
        console.error('Error loading log statistics:', error);
        setIsLoadingStats(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <LogsHeader />

      {isLoadingStats ? (
        <SkeletonCardGrid count={4} columns={4} cardType="stat" />
      ) : stats ? (
        <LogWidgetsPanel stats={stats} />
      ) : null}

      <LogTable />
    </div>
  );
}
