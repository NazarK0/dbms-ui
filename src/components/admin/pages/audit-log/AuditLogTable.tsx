import { User } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Badge } from '../../../ui/badge';
import { getCategoryIcon, getActionBadge, getTableRowClass } from './utils';
import type { AuditLogTableProps } from './types';

export default function AuditLogTable({ entries }: AuditLogTableProps) {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Час</TableHead>
            <TableHead>Користувач</TableHead>
            <TableHead>Дія</TableHead>
            <TableHead>Категорія</TableHead>
            <TableHead>Ціль</TableHead>
            <TableHead>Деталі</TableHead>
            <TableHead>IP адреса</TableHead>
            <TableHead>Статус</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => {
            const Icon = getCategoryIcon(entry.category);
            const actionBadge = getActionBadge(entry.action);

            return (
              <TableRow key={entry.id} className={getTableRowClass(entry.status)}>
                <TableCell className="text-slate-600 text-sm font-mono">
                  {entry.timestamp}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-900">{entry.user}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={actionBadge.variant}>{actionBadge.label}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-700">{entry.category}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-900 font-mono text-sm max-w-xs truncate">
                  {entry.target}
                </TableCell>
                <TableCell className="text-slate-600 text-sm max-w-md truncate">
                  {entry.details}
                </TableCell>
                <TableCell className="text-slate-600 text-sm font-mono">{entry.ip}</TableCell>
                <TableCell>
                  {entry.status === 'success' ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-300"
                    >
                      Успішно
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                      Помилка
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
