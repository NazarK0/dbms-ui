import {
  DashboardHeader,
  CustomizeDialog,
  StatsGrid,
  PerformanceOverview,
  RecentActivityCard,
  ActiveConnectionsCard,
} from './dashboard';
import { useDashboardCustomization } from '../hooks/useDashboardCustomization';
import {
  statsData,
  recentActivity,
  activeConnections,
  performanceMetrics,
} from '../../../mockData/admin/dashboard';
import { useEffect, useState } from 'react';
import { mockApiCall } from '../../../utils/mockApi';
import { SkeletonCardGrid, SkeletonChart } from '../../ui/skeletons';

export default function Dashboard() {
  const {
    visibleCards,
    customizeDialogOpen,
    setCustomizeDialogOpen,
    toggleCardVisibility,
    isCardVisible,
    visibleCount,
  } = useDashboardCustomization();

  // Loading states
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingActivity, setIsLoadingActivity] = useState(true);
  const [isLoadingConnections, setIsLoadingConnections] = useState(true);
  const [isLoadingPerformance, setIsLoadingPerformance] = useState(true);

  // Data states
  const [stats, setStats] = useState(statsData);
  const [activity, setActivity] = useState(recentActivity);
  const [connections, setConnections] = useState(activeConnections);
  const [performance, setPerformance] = useState(performanceMetrics);

  useEffect(() => {
    // Імітація завантаження статистики
    mockApiCall(statsData, 'fast').then((data) => {
      setStats(data);
      setIsLoadingStats(false);
    });

    // Імітація завантаження активності
    mockApiCall(recentActivity, 'normal').then((data) => {
      setActivity(data);
      setIsLoadingActivity(false);
    });

    // Імітація завантаження з'єднань
    mockApiCall(activeConnections, 'normal').then((data) => {
      setConnections(data);
      setIsLoadingConnections(false);
    });

    // Імітація завантаження метрик продуктивності
    mockApiCall(performanceMetrics, 'normal').then((data) => {
      setPerformance(data);
      setIsLoadingPerformance(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with Customize Button */}
      <DashboardHeader
        visibleCount={visibleCount}
        totalCount={visibleCards.length}
        onCustomizeClick={() => setCustomizeDialogOpen(true)}
      />

      {/* Customize Dialog */}
      <CustomizeDialog
        open={customizeDialogOpen}
        onOpenChange={setCustomizeDialogOpen}
        visibleCards={visibleCards}
        onToggleVisibility={toggleCardVisibility}
      />

      {/* Stats Grid */}
      {isLoadingStats ? (
        <SkeletonCardGrid count={5} columns={5} cardType="stat" />
      ) : (
        <StatsGrid stats={stats} isCardVisible={isCardVisible} />
      )}

      {/* Performance Overview */}
      {isLoadingPerformance ? (
        isCardVisible('performance') && <SkeletonChart type="bar" height={280} showLegend={false} />
      ) : (
        <PerformanceOverview
          metrics={performance}
          visible={isCardVisible('performance')}
        />
      )}

      {/* Activity Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoadingActivity ? (
          isCardVisible('activity') && (
            <SkeletonChart type="line" height={400} showHeader showLegend={false} />
          )
        ) : (
          <RecentActivityCard
            activities={activity}
            visible={isCardVisible('activity')}
          />
        )}
        
        {isLoadingConnections ? (
          isCardVisible('connections') && (
            <SkeletonChart type="line" height={400} showHeader showLegend={false} />
          )
        ) : (
          <ActiveConnectionsCard
            connections={connections}
            visible={isCardVisible('connections')}
          />
        )}
      </div>
    </div>
  );
}