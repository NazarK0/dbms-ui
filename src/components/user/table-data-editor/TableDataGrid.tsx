import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableHeader as TableHeaderUI, TableRow } from '../../ui/table';
import TableColumnHeader from './TableColumnHeader';
import TableDataRow from './TableDataRow';
import TableEmptyState from './TableEmptyState';
import type { TableDataGridProps } from './types';

/**
 * Main data table grid with header and body
 */
export default function TableDataGrid({
  schema,
  currentRecords,
  highlightRecordId,
  canUpdate,
  canDelete,
  onEditRecord,
  onDeleteRecord,
}: TableDataGridProps) {
  const columnsCount = schema.columns.length + (canUpdate || canDelete ? 1 : 0);

  return (
    <Card className="border-violet-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle>Дані таблиці</CardTitle>
        <CardDescription>Перегляд та редагування записів</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-t border-slate-200">
          <Table>
            <TableHeaderUI>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                {schema.columns.map((col) => (
                  <TableColumnHeader key={col.name} column={col} />
                ))}
                {(canUpdate || canDelete) && (
                  <TableColumnHeader
                    column={{ name: 'Дії', type: 'actions' }}
                  />
                )}
              </TableRow>
            </TableHeaderUI>
            <TableBody>
              {currentRecords.length > 0 ? (
                currentRecords.map((record) => (
                  <TableDataRow
                    key={record.id}
                    record={record}
                    columns={schema.columns}
                    highlightRecordId={highlightRecordId}
                    canUpdate={canUpdate}
                    canDelete={canDelete}
                    onEditRecord={onEditRecord}
                    onDeleteRecord={onDeleteRecord}
                  />
                ))
              ) : (
                <TableEmptyState columnsCount={columnsCount} />
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
