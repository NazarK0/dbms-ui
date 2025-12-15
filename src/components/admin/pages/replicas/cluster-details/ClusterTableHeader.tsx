/**
 * ClusterTableHeader Component
 * 
 * Table header row for cluster details table.
 * Defines column headers for cluster information display.
 * 
 * @module ClusterTableHeader
 */

import { TableHead, TableHeader, TableRow } from '../../../../ui/table';

/**
 * Table header for cluster details
 * 
 * Displays column headers: Name, Role, Status, Location, Host,
 * Connections, Replication Lag, and Actions.
 */
export default function ClusterTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Назва</TableHead>
        <TableHead>Роль</TableHead>
        <TableHead>Статус</TableHead>
        <TableHead>Локація</TableHead>
        <TableHead>Host</TableHead>
        <TableHead>З'єднання</TableHead>
        <TableHead>Затримка репл.</TableHead>
        <TableHead className="text-right">Дії</TableHead>
      </TableRow>
    </TableHeader>
  );
}
