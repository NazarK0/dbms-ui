import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';

const roleHistory = [
  { action: 'Створено роль "Developer"', user: 'admin', timestamp: '2024-01-20 14:30', type: 'create' as const },
  { action: 'Змінено права ролі "Analyst"', user: 'admin', timestamp: '2024-01-20 10:15', type: 'modify' as const },
  { action: 'Видалено роль "Temporary"', user: 'root', timestamp: '2024-01-19 16:45', type: 'delete' as const },
];

export default function RoleHistory() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Історія змін ролей</CardTitle>
        <CardDescription>Останні дії з ролями та правами доступу</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дія</TableHead>
              <TableHead>Користувач</TableHead>
              <TableHead>Час</TableHead>
              <TableHead>Тип</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roleHistory.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-slate-900">{item.action}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.user}</Badge>
                </TableCell>
                <TableCell className="text-slate-600 text-sm">{item.timestamp}</TableCell>
                <TableCell>
                  {item.type === 'create' && <Badge variant="default">Створення</Badge>}
                  {item.type === 'modify' && <Badge variant="secondary">Зміна</Badge>}
                  {item.type === 'delete' && <Badge variant="destructive">Видалення</Badge>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
