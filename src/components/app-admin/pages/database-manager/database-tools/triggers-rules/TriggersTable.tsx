import { Zap, Plus, Edit, Trash2, Power } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../ui/card';
import { Button } from '../../../../../ui/button';
import { Badge } from '../../../../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../ui/table';
import { getEventBadgeColor } from './utils';
import type { TriggersTableProps } from './types';

export default function TriggersTable({
  triggers,
  selectedDatabase,
  onCreateTrigger,
  onEditTrigger,
  onDeleteTrigger,
}: TriggersTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <CardTitle>Тригери</CardTitle>
          </div>
          <Button onClick={onCreateTrigger}>
            <Plus className="w-4 h-4 mr-2" />
            Створити тригер
          </Button>
        </div>
        <CardDescription>База даних: {selectedDatabase}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Назва</TableHead>
              <TableHead>Таблиця</TableHead>
              <TableHead>Подія</TableHead>
              <TableHead>Функція</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Дії</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {triggers.map((trigger) => (
              <TableRow key={trigger.name}>
                <TableCell className="font-medium text-slate-900">{trigger.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{trigger.table}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getEventBadgeColor(trigger.event)}>
                    {trigger.event}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-600">
                  {trigger.function}
                </TableCell>
                <TableCell>
                  {trigger.enabled ? (
                    <Badge variant="default" className="gap-1">
                      <Power className="w-3 h-3" />
                      Увімкнено
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Вимкнено</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditTrigger?.(trigger)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                      onClick={() => onDeleteTrigger?.(trigger)}
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
