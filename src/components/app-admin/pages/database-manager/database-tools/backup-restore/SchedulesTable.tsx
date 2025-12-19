import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../ui/table';
import { Badge } from '../../../../../ui/badge';
import ScheduleActions from './ScheduleActions';
import type { BackupSchedule } from '../../../../../../mockData/admin';

interface SchedulesTableProps {
  schedules: BackupSchedule[];
  onToggleSchedule: (scheduleId: string) => void;
  onEditSchedule: (scheduleId: string) => void;
}

export default function SchedulesTable({ schedules, onToggleSchedule, onEditSchedule }: SchedulesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Назва</TableHead>
          <TableHead>Частота</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Зберігання</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedules.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-slate-500 py-8">
              Розклади не налаштовані
            </TableCell>
          </TableRow>
        ) : (
          schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell className="font-medium text-slate-900">
                {schedule.name}
              </TableCell>
              <TableCell className="text-slate-600">
                {schedule.frequency}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{schedule.type}</Badge>
              </TableCell>
              <TableCell className="text-slate-600">
                {schedule.retention}
              </TableCell>
              <TableCell>
                {schedule.enabled ? (
                  <Badge variant="default">Увімкнено</Badge>
                ) : (
                  <Badge variant="secondary">Вимкнено</Badge>
                )}
              </TableCell>
              <TableCell>
                <ScheduleActions
                  scheduleId={schedule.id}
                  isEnabled={schedule.enabled}
                  onToggle={onToggleSchedule}
                  onEdit={onEditSchedule}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
