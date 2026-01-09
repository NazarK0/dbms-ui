import { Server, Database } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../ui/table';
import { Badge } from '../../../../../ui/badge';
import ServerActions from './ServerActions';
import { getStatusBadge } from './utils';
import type { ForeignServer } from '../../../../../../mockData/admin';

interface ServersTableProps {
  servers: ForeignServer[];
  onTest: (serverName: string) => void;
  onEdit?: (serverName: string) => void;
  onDelete: (serverName: string) => void;
}

export default function ServersTable({ servers, onTest, onEdit, onDelete }: ServersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Назва сервера</TableHead>
          <TableHead>Wrapper</TableHead>
          <TableHead>Хост</TableHead>
          <TableHead>База даних</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Таблиці</TableHead>
          <TableHead>Остання перевірка</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {servers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center text-slate-500 py-8">
              Зовнішні сервери не налаштовані
            </TableCell>
          </TableRow>
        ) : (
          servers.map((server) => (
            <TableRow key={server.name}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Server className="w-4 h-4 text-white" />
                  </div>
                  <code className="text-slate-900">{server.name}</code>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {server.wrapper}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-600">
                <div className="flex items-center gap-1">
                  <Database className="w-3 h-3 text-slate-400" />
                  <span className="text-sm">{server.host}:{server.port}</span>
                </div>
              </TableCell>
              <TableCell className="text-slate-600">
                <code className="text-xs bg-slate-100 px-2 py-1 rounded">{server.dbname}</code>
              </TableCell>
              <TableCell>{getStatusBadge(server.status)}</TableCell>
              <TableCell className="text-slate-600">{server.foreignTables}</TableCell>
              <TableCell className="text-slate-600 text-sm">{server.lastChecked}</TableCell>
              <TableCell>
                <ServerActions
                  serverName={server.name}
                  onTest={onTest}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
