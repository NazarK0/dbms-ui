import { Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import type { ReplicationActivityRow } from './types';

interface ReplicationActivityTableProps {
  activities: ReplicationActivityRow[];
}

export default function ReplicationActivityTable({ activities }: ReplicationActivityTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-slate-700" />
          <CardTitle>Активність реплікації</CardTitle>
        </div>
        <CardDescription>Поточний стан потокової реплікації</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Репліка</TableHead>
              <TableHead>Стан</TableHead>
              <TableHead>Режим синхр.</TableHead>
              <TableHead>Sent LSN</TableHead>
              <TableHead>Write LSN</TableHead>
              <TableHead>Flush LSN</TableHead>
              <TableHead>Затримка</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell className="text-slate-900">{activity.replica}</TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-green-600">
                    {activity.state}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600">{activity.syncState}</TableCell>
                <TableCell>
                  <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                    {activity.sentLSN}
                  </code>
                </TableCell>
                <TableCell>
                  <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                    {activity.writeLSN}
                  </code>
                </TableCell>
                <TableCell>
                  <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                    {activity.flushLSN}
                  </code>
                </TableCell>
                <TableCell className="text-slate-600 font-mono text-sm">{activity.lag}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
