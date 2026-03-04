// Logs components
import LogsHeader from './LogsHeader';
import LogWidgetsPanel from './widgets-panel';
import LogTable from './table';


export default function Logs() {

  return (
    <div className="space-y-6">
      <LogsHeader />
      <LogWidgetsPanel />
      <LogTable />
    </div>
  );
}
