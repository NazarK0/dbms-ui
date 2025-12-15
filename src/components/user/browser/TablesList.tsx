import { Table as TableIcon, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { ScrollArea } from '../../ui/scroll-area';
import TableListItem from './TableListItem';

interface TableInfo {
  name: string;
  records: number;
  size: string;
  permissions: string[];
  rlsEnabled: boolean;
  description: string;
}

interface TablesListProps {
  database: string | null;
  tables: TableInfo[];
  copied: boolean;
  searchTerm: string;
  onTableSelect: (tableName: string, permissions: string[]) => void;
  onCopy: (text: string) => void;
}

export default function TablesList({ 
  database, 
  tables, 
  copied, 
  searchTerm,
  onTableSelect, 
  onCopy 
}: TablesListProps) {
  const filteredTables = tables.filter((table) =>
    searchTerm === '' ||
    table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border-violet-200 shadow-sm lg:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TableIcon className="w-5 h-5 text-violet-600" />
          {database ? `Таблиці: ${database}` : 'Таблиці'}
        </CardTitle>
        <CardDescription>
          {database 
            ? 'Оберіть таблицю для роботи з даними' 
            : 'Оберіть базу даних щоб побачити таблиці'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {database ? (
          <ScrollArea className="h-[600px]">
            {filteredTables.length === 0 ? (
              <div className="h-[600px] flex items-center justify-center text-slate-500">
                <div className="text-center">
                  <TableIcon className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-lg mb-2">Таблиці не знайдено</p>
                  <p className="text-sm">
                    {searchTerm
                      ? 'Спробуйте змінити критерії пошуку'
                      : 'В цій базі даних немає доступних таблиць'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {filteredTables.map((table) => (
                  <TableListItem
                    key={table.name}
                    table={table}
                    database={database}
                    copied={copied}
                    onTableClick={() => onTableSelect(table.name, table.permissions)}
                    onCopy={onCopy}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        ) : (
          <div className="h-[600px] flex items-center justify-center text-slate-500">
            <div className="text-center">
              <Database className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <p className="text-lg mb-2">Оберіть базу даних</p>
              <p className="text-sm">Виберіть базу даних зліва для перегляду таблиць</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}