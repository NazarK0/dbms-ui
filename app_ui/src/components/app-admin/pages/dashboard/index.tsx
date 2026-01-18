// Central exports for Dashboard components
import DashboardHeader from './DashboardHeader';
import CustomizeDialog from './customize-dialog';

import { useDashboardCustomization } from '../../hooks/useDashboardCustomization';
import RecentActivityWidget from './widgets/RecentActivity';
import ActiveConnectionsWidget from './widgets/ActiveConnections';
import DatabasesCountWidget from './widgets/UsersCount';
import UsedStorageWidget from './widgets/UsedStorage';
import AdminsCountWidget from './widgets/AdminsCount';
import TablesCountWidget from './widgets/TablesCount';
import UsersCountWidget from './widgets/UsersCount';
import CpuUsageWidget from './widgets/CpuUsage';
import RamUsageWidget from './widgets/RamUsage';
import DiskIOWidget from './widgets/DiskIO';
import NetworkUsageWidget from './widgets/NetworkUsage';


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
        <DatabasesCountWidget />
        <TablesCountWidget />
        <AdminsCountWidget />
        <UsersCountWidget />
        <UsedStorageWidget />
        <CpuUsageWidget />
        <RamUsageWidget />
        <NetworkUsageWidget />
        <DiskIOWidget />
        <RecentActivityWidget />
        <ActiveConnectionsWidget />
      </div>


    </div>
  );
}