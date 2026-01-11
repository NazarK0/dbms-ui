// Central exports for Dashboard components
import DashboardHeader from './DashboardHeader';
import CustomizeDialog from './customize-dialog';

import { useDashboardCustomization } from '../../hooks/useDashboardCustomization';
import RecentActivityWidget from './widgets/RecentActivity';
import ActiveConnectionsWidget from './widgets/ActiveConnections';

export default function Dashboard() {
  const {
    customizeDialogOpen,
    setCustomizeDialogOpen,
  } = useDashboardCustomization();


  return (
    <div className="space-y-6">
      {/* Header with Customize Button */}
      <DashboardHeader
        visibleCount={2}
        totalCount={2}
        onCustomizeClick={() => setCustomizeDialogOpen(true)} // TODO: Repolace with redux
      />

      {/* Customize Dialog */}
      <CustomizeDialog
        open={customizeDialogOpen}
        onOpenChange={setCustomizeDialogOpen}
      />

      <div className="grid ">
        <RecentActivityWidget />
        <ActiveConnectionsWidget />
      </div>


    </div>
  );
}