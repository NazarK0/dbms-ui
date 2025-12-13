import { Table as TableIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { ScrollArea } from '../../ui/scroll-area';
import { TableListItem } from '../browser';
import { filterTables } from './utils';
import type { DatabaseBrowserTablesViewProps } from './types';

/**
 * Tables view for when a specific database is pre-selected
 * Shows only the tables list in a card
 */
export default function DatabaseBrowserTablesView({
  database,
  tables,
  searchTerm,
  copied,
  onTableSelect,
  onCopy,
}: DatabaseBrowserTablesViewProps) {
  const filteredTables = filterTables(tables, searchTerm);

  return (
    <Card className="border-violet-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TableIcon className="w-5 h-5 text-violet-600" />
          Таблиці бази даних: {database}
        </CardTitle>
        <CardDescription>Оберіть таблицю для роботи з даними</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="divide-y divide-slate-200">
            {filteredTables.map((table) => (
              <TableListItem
                key={table.name}
                table={table}
                database={database}
                copied={copied}
                onTableClick={() => onTableSelect(database, table.name, table.permissions)}
                onCopy={onCopy}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
