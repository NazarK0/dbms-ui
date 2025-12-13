import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { getDataKeys, limitTableData } from './utils';
import type { TableDataPreviewProps } from './types';

export default function TableDataPreview({ data, limit = 100 }: TableDataPreviewProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Попередній перегляд даних</CardTitle>
          <CardDescription>Немає даних для відображення</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 text-center py-8">Таблиця порожня</p>
        </CardContent>
      </Card>
    );
  }

  const displayData = limitTableData(data, limit);
  const columns = getDataKeys(displayData);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Попередній перегляд даних</CardTitle>
        <CardDescription>Перші {limit} рядків таблиці</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column} className="font-mono text-sm text-slate-600">
                    {row[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
