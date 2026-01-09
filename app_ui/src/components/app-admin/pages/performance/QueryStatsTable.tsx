import { Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Progress } from '../../../ui/progress';
import type { QueryStat } from '../../../../mockData/admin';

interface QueryStatsTableProps {
  stats: QueryStat[];
  sortBy: string;
  onSortByChange: (value: string) => void;
}

export default function QueryStatsTable({ stats, sortBy, onSortByChange }: QueryStatsTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-slate-700" />
            <CardTitle>Статистика запитів</CardTitle>
          </div>
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="total_time">За загальним часом</SelectItem>
              <SelectItem value="avg_time">За середнім часом</SelectItem>
              <SelectItem value="calls">За кількістю викликів</SelectItem>
              <SelectItem value="hit_ratio">За коефіцієнтом попадань</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>Детальна статистика виконання SQL запитів</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Запит</TableHead>
              <TableHead>Виклики</TableHead>
              <TableHead>Загальний час</TableHead>
              <TableHead>Середній час</TableHead>
              <TableHead>Мін/Макс</TableHead>
              <TableHead>Рядки</TableHead>
              <TableHead>Попадання кешу</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((stat, index) => (
              <TableRow key={index}>
                <TableCell className="max-w-md">
                  <code className="text-xs text-slate-900 line-clamp-2 bg-slate-50 px-2 py-1 rounded">
                    {stat.query}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{stat.calls.toLocaleString()}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    {stat.totalTime}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600 font-mono text-sm">{stat.avgTime}</TableCell>
                <TableCell className="text-slate-600 text-xs font-mono">
                  {stat.minTime} / {stat.maxTime}
                </TableCell>
                <TableCell className="text-slate-600">{stat.rows.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Progress value={stat.hitRatio} className="h-2 flex-1 max-w-[80px]" />
                    <span className="text-sm text-slate-900 min-w-[50px]">{stat.hitRatio}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
