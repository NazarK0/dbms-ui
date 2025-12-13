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

export default function Dashboard() {
  const {
    visibleCards,
    customizeDialogOpen,
    setCustomizeDialogOpen,
    toggleCardVisibility,
    isCardVisible,
    visibleCount,
  } = useDashboardCustomization();

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
      <StatsGrid stats={statsData} isCardVisible={isCardVisible} />

      {/* Performance Overview */}
      <PerformanceOverview
        metrics={performanceMetrics}
        visible={isCardVisible('performance')}
      />

      {/* Activity Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityCard
          activities={recentActivity}
          visible={isCardVisible('activity')}
        />
        <ActiveConnectionsCard
          connections={activeConnections}
          visible={isCardVisible('connections')}
        />
      </div>
    </div>
  );
}
