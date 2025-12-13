import { Database } from 'lucide-react';
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
import DatabaseStatsRow from './DatabaseStatsRow';
import type { DatabaseStatsTableProps } from './types';

export default function DatabaseStatsTable({
  databases,
}: DatabaseStatsTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-slate-700" />
          <CardTitle>Статистика баз даних</CardTitle>
        </div>
        <CardDescription>
          Метрики продуктивності для кожної бази даних
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>База даних</TableHead>
              <TableHead>Розмір</TableHead>
              <TableHead>З'єднання</TableHead>
              <TableHead>TPS</TableHead>
              <TableHead>Коеф. попадань кешу</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {databases.map((db) => (
              <DatabaseStatsRow key={db.name} database={db} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
