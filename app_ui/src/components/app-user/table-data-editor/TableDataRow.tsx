import { Paperclip, Edit, Trash2 } from 'lucide-react';
import { TableRow, TableCell } from '../../ui/table';
import { Button } from '../../ui/button';
import type { TableDataRowProps } from './types';

/**
 * Table row with data cells and action buttons
 */
export default function TableDataRow({
  record,
  columns,
  highlightRecordId,
  canUpdate,
  canDelete,
  onEditRecord,
  onDeleteRecord,
}: TableDataRowProps) {
  const isHighlighted = highlightRecordId && record.id.toString() === highlightRecordId;

  return (
    <TableRow
      className={`hover:bg-violet-50/50 ${
        isHighlighted ? 'bg-violet-100 border-l-4 border-l-violet-600 animate-pulse' : ''
      }`}
    >
      {/* Data cells */}
      {columns.map((col) => (
        <TableCell key={col.name} className="text-sm">
          {col.name === 'attachments' && Array.isArray(record[col.name]) ? (
            record[col.name].length > 0 ? (
              <div className="flex items-center gap-1.5">
                <Paperclip className="w-4 h-4 text-violet-600" />
                <span className="text-violet-600 font-medium">{record[col.name].length}</span>
              </div>
            ) : (
              <span className="text-slate-400">—</span>
            )
          ) : (
            record[col.name]
          )}
        </TableCell>
      ))}

      {/* Actions cell */}
      {(canUpdate || canDelete) && (
        <TableCell className="text-center">
          <div className="flex items-center justify-center gap-1">
            {canUpdate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditRecord(record)}
                className="h-7 w-7 p-0"
              >
                <Edit className="w-3.5 h-3.5 text-blue-600" />
              </Button>
            )}
            {canDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteRecord(record)}
                className="h-7 w-7 p-0"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-600" />
              </Button>
            )}
          </div>
        </TableCell>
      )}
    </TableRow>
  );
}
