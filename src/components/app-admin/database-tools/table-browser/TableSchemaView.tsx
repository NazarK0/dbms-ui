import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { getKeyBadgeVariant } from './utils';
import type { TableSchemaViewProps } from './types';

export default function TableSchemaView({ schema }: TableSchemaViewProps) {
  const getKeyBadge = (key: string) => {
    if (!key) return null;
    return <Badge variant={getKeyBadgeVariant(key as any)}>{key}</Badge>;
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Схема таблиці</CardTitle>
        <CardDescription>Структура та типи даних колонок</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Колонка</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Nullable</TableHead>
              <TableHead>За замовчуванням</TableHead>
              <TableHead>Ключ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schema.map((col, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-slate-900">{col.column}</TableCell>
                <TableCell>
                  <code className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700">
                    {col.type}
                  </code>
                </TableCell>
                <TableCell>
                  {col.nullable ? (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Yes
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      No
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {col.default ? (
                    <code className="text-xs text-slate-600">{col.default}</code>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </TableCell>
                <TableCell>{getKeyBadge(col.key)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
