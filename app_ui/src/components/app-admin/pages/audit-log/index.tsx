// Central exports for Audit Log components
import LogTable from './table';
import ActionStatsPanel from './actions-stats-panel';
import SuccessActionsWidget from './widgets/SuccessActions';
import FailureActionsWidget from './widgets/FailureActions';

export default function AuditLog() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SuccessActionsWidget />
                <FailureActionsWidget />
            </div>
            <ActionStatsPanel />
            <LogTable />
        </div>
    );
}
