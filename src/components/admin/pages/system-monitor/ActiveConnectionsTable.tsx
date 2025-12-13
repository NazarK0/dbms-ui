import { Activity } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../ui/table';
import ConnectionRow from './ConnectionRow';
import type { ActiveConnectionsTableProps } from './types';

export default function ActiveConnectionsTable({
  connections,
}: ActiveConnectionsTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-slate-700" />
          <CardTitle>Активні з'єднання</CardTitle>
        </div>
        <CardDescription>
          Поточні підключення до PostgreSQL серверу
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PID</TableHead>
              <TableHead>База даних</TableHead>
              <TableHead>Користувач</TableHead>
              <TableHead>Стан</TableHead>
              <TableHead>Запит</TableHead>
              <TableHead>Тривалість</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {connections.map((conn) => (
              <ConnectionRow key={conn.pid} connection={conn} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
