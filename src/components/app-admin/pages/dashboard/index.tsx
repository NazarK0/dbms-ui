// Central exports for Dashboard components
import DashboardHeader from './DashboardHeader';
import CustomizeDialog from './customize/CustomizeDialog';
import StatsGrid from './StatsGrid';
import PerformanceOverview from './PerformanceOverview';
import RecentActivityCard from './RecentActivityCard';
import ActiveConnectionsCard from './ActiveConnectionsCard';

import { useDashboardCustomization } from '../../hooks/useDashboardCustomization';
import { useEffect, useState } from 'react';
import { api, ApiEndpointFn } from '../../../../api';
import { SkeletonCardGrid, SkeletonChart } from '../../../ui/skeletons';
import { StatCard } from '../../dashboard/StatCard';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { Widget } from '../../dashboard/Widget';

export default function Dashboard() {
  const {
    visibleCards,
    customizeDialogOpen,
    setCustomizeDialogOpen,
    toggleCardVisibility,
    isCardVisible,
    visibleCount,
  } = useDashboardCustomization();


  const widgetsList = (api.adminApp().get.dashboard.widgets.list as ApiEndpointFn)();
  const databasesCount = (api.adminApp().get.dashboard.widgets.databasesCount as ApiEndpointFn)();
  const adminsCount = (api.adminApp().get.dashboard.widgets.adminsCount as ApiEndpointFn)();
  const usersCount = (api.adminApp().get.dashboard.widgets.usersCount as ApiEndpointFn)();
  const tablesCount = (api.adminApp().get.dashboard.widgets.tablesCount as ApiEndpointFn)();
  const usedStorage = (api.adminApp().get.dashboard.widgets.usedStorage as ApiEndpointFn)();
  const performance = (api.adminApp().get.dashboard.widgets.performance as ApiEndpointFn)();
  const activity = (api.adminApp().get.dashboard.widgets.recentActivity as ApiEndpointFn)();
  const connections = (api.adminApp().get.dashboard.widgets.activeConnections as ApiEndpointFn)();



  const visibleWidgets = useLocalStorage<Array<string>>('admin-dashboard-visible-widgets', widgetsList.map(w => w.id));



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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {visibleWidgets.map((wgt) => (
              <Widget key={wgt.id} {...wgt} visible={isCardVisible(wgt.id)} />
            ))}
        </div>
      )}

      {/* Performance Overview */}
      {performance.isLoading ? (
        isCardVisible('performance') && <SkeletonChart type="bar" height={280} showLegend={false} />
      ) : (
        <PerformanceOverview
          metrics={performance.data}
          visible={isCardVisible('performance')}
        />
      )}

      {/* Activity Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activity.isLoading ? (
          isCardVisible('activity') && (
            <SkeletonChart type="line" height={400} showHeader showLegend={false} />
          )
        ) : (
          <RecentActivityCard
            activities={activity.data}
            visible={isCardVisible('activity')}
          />
        )}

        {connections.isLoading ? (
          isCardVisible('connections') && (
            <SkeletonChart type="line" height={400} showHeader showLegend={false} />
          )
        ) : (
          <ActiveConnectionsCard
            connections={connections.data}
            visible={isCardVisible('connections')}
          />
        )}
      </div>
    </div>
  );
}