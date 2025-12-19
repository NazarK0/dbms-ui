/**
 * QueryResultsTable Component
 * ============================
 * 
 * Таблиця для відображення результатів SQL запиту.
 */

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../../ui/table';
import { formatCellValue } from '../utils';
import { QueryResultsTableProps } from './types';

export function QueryResultsTable({ columns, rows }: QueryResultsTableProps) {
  return (
    <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-slate-50 z-10">
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col} className="font-semibold">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className="font-mono text-sm"
                  title={String(cell)}
                >
                  {formatCellValue(cell)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}