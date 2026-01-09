import { Table, TableBody } from '../../../ui/table';
import type { AuditLogTableProps } from './types';
import { AuditLogTableHeader, AuditLogTableRow } from './audit-log-table';

export default function AuditLogTable({ entries }: AuditLogTableProps) {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <Table>
        <AuditLogTableHeader />
        <TableBody>
          {entries.map((entry) => (
            <AuditLogTableRow key={entry.id} entry={entry} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
