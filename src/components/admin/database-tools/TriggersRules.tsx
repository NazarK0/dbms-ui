import { useState } from 'react';
import { Zap, Plus, Trash2, Search, Edit, Power } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

export default function TriggersRules({ selectedDatabase }: { selectedDatabase?: string }) {
  const triggers = [
    {
      name: 'update_modified_timestamp',
      table: 'users',
      event: 'BEFORE UPDATE',
      timing: 'BEFORE',
      function: 'update_timestamp()',
      enabled: true,
    },
    {
      name: 'log_order_changes',
      table: 'orders',
      event: 'AFTER INSERT OR UPDATE',
      timing: 'AFTER',
      function: 'log_changes()',
      enabled: true,
    },
    {
      name: 'validate_email',
      table: 'users',
      event: 'BEFORE INSERT',
      timing: 'BEFORE',
      function: 'validate_email_format()',
      enabled: false,
    },
  ];

  const rules = [
    { name: '_RETURN', table: 'user_view', event: 'INSERT', type: 'INSTEAD', command: 'DO INSTEAD' },
    { name: 'audit_log', table: 'sensitive_data', event: 'DELETE', type: 'ALSO', command: 'DO ALSO' },
  ];

  return (
    <div className="space-y-6">
      {/* Triggers */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <CardTitle>Тригери</CardTitle>
            </div>
            <Button>
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
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {trigger.event}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-600">{trigger.function}</TableCell>
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

      {/* Rules */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Правила (Rules)</CardTitle>
            <Button>
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
                    <Badge>{rule.type}</Badge>
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
    </div>
  );
}