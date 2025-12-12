import { Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';

export default function TemplateDatabasesCard() {
  const templateDatabases = [
    {
      name: 'template0',
      description: 'Базовий незмінний шаблон PostgreSQL',
      size: '7.8 МБ',
      encoding: 'UTF8',
      collation: 'uk_UA.UTF-8',
      allowCloning: false,
    },
    {
      name: 'template1',
      description: 'Шаблон за замовчуванням для нових БД',
      size: '7.9 МБ',
      encoding: 'UTF8',
      collation: 'uk_UA.UTF-8',
      allowCloning: true,
    },
  ];

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>Шаблонні бази даних</CardTitle>
            <CardDescription>Системні шаблони для створення нових баз даних</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Назва</TableHead>
              <TableHead>Опис</TableHead>
              <TableHead>Розмір</TableHead>
              <TableHead>Кодування</TableHead>
              <TableHead>Сортування</TableHead>
              <TableHead>Дозволене клонування</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templateDatabases.map((db) => (
              <TableRow key={db.name} className="bg-yellow-50/30">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                    <code className="text-slate-900">{db.name}</code>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{db.description}</TableCell>
                <TableCell className="text-slate-600">{db.size}</TableCell>
                <TableCell className="text-slate-600">{db.encoding}</TableCell>
                <TableCell className="text-slate-600">{db.collation}</TableCell>
                <TableCell>
                  <Badge variant={db.allowCloning ? 'default' : 'destructive'}>
                    {db.allowCloning ? 'Так' : 'Ні'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}