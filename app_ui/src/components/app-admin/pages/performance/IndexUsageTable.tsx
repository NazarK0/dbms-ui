import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Progress } from '../../../ui/progress';
import type { IndexUsage } from '../../../../mockData/admin';

interface IndexUsageTableProps {
  indexes: IndexUsage[];
}

export default function IndexUsageTable({ indexes }: IndexUsageTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Використання індексів</CardTitle>
        <CardDescription>Статистика використання індексів таблиць</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Таблиця</TableHead>
              <TableHead>Індекс</TableHead>
              <TableHead>Сканування</TableHead>
              <TableHead>Прочитано рядків</TableHead>
              <TableHead>Використання</TableHead>
              <TableHead>Розмір</TableHead>
              <TableHead className="text-right">Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {indexes.map((idx, index) => (
              <TableRow key={index}>
                <TableCell className="text-slate-900">{idx.table}</TableCell>
                <TableCell>
                  <code className="text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded">
                    {idx.index}
                  </code>
                </TableCell>
                <TableCell className="text-slate-600">{idx.scans.toLocaleString()}</TableCell>
                <TableCell className="text-slate-600">{idx.rowsRead.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Progress value={idx.usage} className="h-2 flex-1 max-w-[100px]" />
                    <span className="text-sm text-slate-900 min-w-[45px]">{idx.usage}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{idx.size}</TableCell>
                <TableCell className="text-right">
                  {idx.usage < 10 && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Не використовується
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
