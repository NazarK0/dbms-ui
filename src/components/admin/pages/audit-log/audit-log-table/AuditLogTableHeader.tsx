import { TableHead, TableHeader, TableRow } from '../../../../ui/table';
import { tableHeaders } from './data';

export default function AuditLogTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        {tableHeaders.map((header) => (
          <TableHead key={header.key}>{header.label}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
