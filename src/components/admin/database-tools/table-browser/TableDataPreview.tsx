import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { ShieldAlert } from 'lucide-react';
import { getDataKeys, limitTableData } from './utils';
import type { TableDataPreviewProps } from './types';

export default function TableDataPreview({ data, limit = 100, canViewData = true }: TableDataPreviewProps) {
  // Перевірка доступу до перегляду даних
  if (!canViewData) {
    return (
      <Card className="border-amber-200 shadow-sm bg-amber-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900">
            <ShieldAlert className="w-5 h-5" />
            Немає доступу до даних
          </CardTitle>
          <CardDescription className="text-amber-700">
            У вас немає дозволу на перегляд даних цієї таблиці
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-amber-600 text-sm">
            Зверніться до адміністратора системи для отримання необхідних прав доступу.
          </p>
        </CardContent>
      </Card>
    );
  }
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
