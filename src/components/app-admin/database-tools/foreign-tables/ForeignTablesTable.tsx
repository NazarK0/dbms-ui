import { Database, Server } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Badge } from '../../../ui/badge';
import TableActions from './TableActions';
import type { ForeignTable } from '../../../../mockData/admin';

interface ForeignTablesTableProps {
  tables: ForeignTable[];
  onRefresh: (tableName: string) => void;
  onEdit?: (tableName: string) => void;
  onDelete: (tableName: string) => void;
}

export default function ForeignTablesTable({ 
  tables, 
  onRefresh,
  onEdit,
  onDelete 
}: ForeignTablesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Локальна таблиця</TableHead>
          <TableHead>Сервер</TableHead>
          <TableHead>Віддалена таблиця</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Остання синхронізація</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tables.map((table) => (
          <TableRow key={table.name}>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Database className="w-4 h-4 text-white" />
                </div>
                <code className="text-slate-900">{table.name}</code>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">{table.server}</span>
              </div>
            </TableCell>
            <TableCell className="text-slate-600">
              <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                {table.remoteSchema}.{table.remoteTable}
              </code>
            </TableCell>
            <TableCell>
              {table.status === 'active' ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Активна</Badge>
              ) : (
                <Badge variant="destructive">Помилка</Badge>
              )}
            </TableCell>
            <TableCell className="text-slate-600 text-sm">{table.lastSync}</TableCell>
            <TableCell>
              <TableActions
                tableName={table.name}
                onRefresh={onRefresh}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
