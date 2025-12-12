import { useState } from 'react';
import { Code, Plus, Trash2, Search, Edit, FileCode } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

export default function FunctionsManager({ selectedDatabase }: { selectedDatabase?: string }) {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  const functions = [
    {
      name: 'calculate_total',
      schema: 'public',
      returns: 'decimal',
      language: 'plpgsql',
      arguments: 'order_id integer',
      description: 'Обчислює загальну суму замовлення',
    },
    {
      name: 'update_timestamp',
      schema: 'public',
      returns: 'trigger',
      language: 'plpgsql',
      arguments: '',
      description: 'Оновлює timestamp при зміні запису',
    },
    {
      name: 'get_user_stats',
      schema: 'public',
      returns: 'TABLE',
      language: 'sql',
      arguments: 'user_id integer',
      description: 'Повертає статистику користувача',
    },
  ];

  const functionCode = `CREATE OR REPLACE FUNCTION calculate_total(order_id integer)
RETURNS decimal AS $$
DECLARE
  total decimal;
BEGIN
  SELECT SUM(quantity * price) INTO total
  FROM order_items
  WHERE order_id = $1;
  
  RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;`;

  return (
    <div className="space-y-6">
      {/* Functions List */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-slate-700" />
              <CardTitle>Функції</CardTitle>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Створити функцію
            </Button>
          </div>
          <CardDescription>База даних: {selectedDatabase}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Назва</TableHead>
                <TableHead>Схема</TableHead>
                <TableHead>Аргументи</TableHead>
                <TableHead>Повертає</TableHead>
                <TableHead>Мова</TableHead>
                <TableHead className="text-right">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {functions.map((func) => (
                <TableRow 
                  key={func.name}
                  onClick={() => setSelectedFunction(func.name)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium text-slate-900">{func.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{func.schema}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-600">
                    {func.arguments || <span className="text-slate-400">—</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{func.returns}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{func.language}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Function Details */}
      {selectedFunction && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Код функції: {selectedFunction}</CardTitle>
            <CardDescription>Вихідний код SQL функції</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 rounded-lg p-4">
              <pre className="text-slate-100 text-sm font-mono overflow-x-auto">
                <code>{functionCode}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}