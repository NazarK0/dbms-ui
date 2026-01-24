import TerminalWindow from './TerminalWindow';
import SqlReference from './sql_reference';
import CliHistory from './history';

export default function CLI() {
  return (
    <div className="space-y-6">
      <TerminalWindow />
      <SqlReference />
      <CliHistory />
    </div>
  );
}