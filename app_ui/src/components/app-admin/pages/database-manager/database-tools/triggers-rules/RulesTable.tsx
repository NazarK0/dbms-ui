import { Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../ui/card';
import { Button } from '../../../../../ui/button';
import { Badge } from '../../../../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../ui/table';
import { getRuleTypeBadgeColor } from './utils';
import type { RulesTableProps } from './types';

export default function RulesTable({
  rules,
  onCreateRule,
  onEditRule,
  onDeleteRule,
}: RulesTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Правила (Rules)</CardTitle>
          <Button onClick={onCreateRule}>
            <Plus className="w-4 h-4 mr-2" />
            Створити правило
          </Button>
        </div>
        <CardDescription>Правила перезапису запитів</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Назва</TableHead>
              <TableHead>Таблиця/View</TableHead>
              <TableHead>Подія</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead className="text-right">Дії</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.name}>
                <TableCell className="font-medium text-slate-900">{rule.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{rule.table}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{rule.event}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getRuleTypeBadgeColor(rule.type)}>
                    {rule.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditRule?.(rule)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                      onClick={() => onDeleteRule?.(rule)}
                    >
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
  );
}
