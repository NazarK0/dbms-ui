import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Checkbox } from '../../ui/checkbox';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

export default function RBACMatrix() {
  const permissions = [
    { section: 'Бази даних', read: true, write: true, delete: true, execute: true },
    { section: 'Таблиці', read: true, write: true, delete: false, execute: false },
    { section: 'Користувачі', read: true, write: false, delete: false, execute: false },
    { section: 'Ролі', read: true, write: false, delete: false, execute: false },
    { section: 'Схеми', read: true, write: true, delete: false, execute: true },
    { section: 'Функції', read: true, write: true, delete: true, execute: true },
    { section: 'Тригери', read: true, write: true, delete: true, execute: true },
    { section: 'Розширення', read: true, write: false, delete: false, execute: false },
  ];

  return (
    <Card className="border-lime-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-900">RBAC Матриця прав доступу</CardTitle>
            <CardDescription>Налаштування детальних прав доступу для ролей</CardDescription>
          </div>
          <Badge variant="outline" className="bg-lime-50 text-lime-700 border-lime-300">
            Row Level Security
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-lime-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-lime-50">
                <TableHead className="text-slate-900">Секція UI</TableHead>
                <TableHead className="text-center text-slate-900">Читання</TableHead>
                <TableHead className="text-center text-slate-900">Запис</TableHead>
                <TableHead className="text-center text-slate-900">Видалення</TableHead>
                <TableHead className="text-center text-slate-900">Виконання</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((perm, idx) => (
                <TableRow key={idx} className="hover:bg-lime-50/50">
                  <TableCell className="text-slate-900">{perm.section}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={perm.read} className="data-[state=checked]:bg-lime-600 data-[state=checked]:border-lime-600" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={perm.write} className="data-[state=checked]:bg-lime-600 data-[state=checked]:border-lime-600" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={perm.delete} className="data-[state=checked]:bg-lime-600 data-[state=checked]:border-lime-600" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={perm.execute} className="data-[state=checked]:bg-lime-600 data-[state=checked]:border-lime-600" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
