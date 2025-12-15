import { TableRow } from '../../../../ui/table';
import { getTableRowClass } from '../utils/uiHelpers';
import type { AuditEntry } from '../types';
import {
  TimeCell,
  UserCell,
  ActionCell,
  CategoryCell,
  TargetCell,
  DetailsCell,
  IpCell,
  StatusCell,
} from './cells';

interface AuditLogTableRowProps {
  entry: AuditEntry;
}

export default function AuditLogTableRow({ entry }: AuditLogTableRowProps) {
  return (
    <TableRow className={getTableRowClass(entry.status)}>
      <TimeCell timestamp={entry.timestamp} />
      <UserCell user={entry.user} />
      <ActionCell action={entry.action} />
      <CategoryCell category={entry.category} />
      <TargetCell target={entry.target} />
      <DetailsCell details={entry.details} />
      <IpCell ip={entry.ip} />
      <StatusCell status={entry.status} />
    </TableRow>
  );
}
