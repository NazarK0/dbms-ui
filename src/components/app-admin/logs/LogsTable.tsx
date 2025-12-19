import { FileText } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { Badge } from '../../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import LogTableRow from './LogTableRow';
import Pagination from './Pagination';
import type { LogEntry } from './types';

interface LogsTableProps {
  logs: LogEntry[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  totalFilteredLogs: number;
  onViewDetails: (log: LogEntry) => void;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

export default function LogsTable({
  logs,
  currentPage,
  totalPages,
  itemsPerPage,
  startIndex,
  endIndex,
  totalFilteredLogs,
  onViewDetails,
  onPageChange,
  onItemsPerPageChange,
}: LogsTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-lime-600" />
            <CardTitle>Записи логів</CardTitle>
          </div>
          <Badge
            variant="secondary"
            className="bg-lime-100 text-lime-700 border-lime-300"
          >
            {totalFilteredLogs} записів
          </Badge>
        </div>
        <CardDescription>Хронологічний список подій системи</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-t border-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="w-[140px] font-medium">Час</TableHead>
                <TableHead className="w-[100px] font-medium">Рівень</TableHead>
                <TableHead className="w-[120px] font-medium">Джерело</TableHead>
                <TableHead className="w-[140px] font-medium">База даних</TableHead>
                <TableHead className="w-[120px] font-medium">Користувач</TableHead>
                <TableHead className="font-medium">Повідомлення</TableHead>
                <TableHead className="w-[80px] text-center font-medium">
                  Деталі
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <LogTableRow key={log.id} log={log} onViewDetails={onViewDetails} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                    Записів не знайдено
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalFilteredLogs > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={totalFilteredLogs}
            onPageChange={onPageChange}
            onItemsPerPageChange={(value) => {
              onItemsPerPageChange(value);
              onPageChange(1);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
