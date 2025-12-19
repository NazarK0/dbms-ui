import { CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../ui/table';
import { Badge } from '../../../../../ui/badge';
import BackupActions from './BackupActions';
import type { Backup } from '../../../../../../mockData/admin';

interface BackupsTableProps {
  backups: Backup[];
  onDownload: (backupId: string) => void;
  onRestore: (backupId: string) => void;
}

export default function BackupsTable({ backups, onDownload, onRestore }: BackupsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Файл</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Розмір</TableHead>
          <TableHead>Створено</TableHead>
          <TableHead>Тривалість</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {backups.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-slate-500 py-8">
              Резервних копій не знайдено
            </TableCell>
          </TableRow>
        ) : (
          backups.map((backup) => (
            <TableRow key={backup.id}>
              <TableCell className="font-mono text-sm text-slate-900">
                {backup.filename}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{backup.type}</Badge>
              </TableCell>
              <TableCell className="text-slate-600">{backup.size}</TableCell>
              <TableCell className="text-slate-600 text-sm">{backup.created}</TableCell>
              <TableCell className="text-slate-600 text-sm">{backup.duration}</TableCell>
              <TableCell>
                <Badge variant="default" className="gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Успішно
                </Badge>
              </TableCell>
              <TableCell>
                <BackupActions
                  backupId={backup.id}
                  filename={backup.filename}
                  onDownload={onDownload}
                  onRestore={onRestore}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
