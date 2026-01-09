// Central exports for Dashboard components
import DashboardHeader from './DashboardHeader';
import CustomizeDialog from './customize/CustomizeDialog';

import { useDashboardCustomization } from '../../hooks/useDashboardCustomization';
import RecentActivityWidget from './widgets/RecentActivity';
import ActiveConnectionsWidget from './widgets/ActiveConnections';

export default function Dashboard() {
  const {
    visibleCards,
    customizeDialogOpen,
    setCustomizeDialogOpen,
    toggleCardVisibility,
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

      <div className="grid ">
        <RecentActivityWidget />
        <ActiveConnectionsWidget />
      </div>


    </div>
  );
}