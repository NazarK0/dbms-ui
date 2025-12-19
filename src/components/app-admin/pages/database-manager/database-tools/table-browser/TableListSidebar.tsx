import { Search, Table2, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../ui/card';
import { Input } from '../../../../../ui/input';
import { ScrollArea } from '../../../../../ui/scroll-area';
import { useAdminUser } from '../../../../../../contexts/AdminUserContext';
import { filterTables } from './utils';
import type { TableListSidebarProps } from './types';

export default function TableListSidebar({
  tables,
  selectedTable,
  selectedDatabase,
  searchTerm,
  onSearchChange,
  onTableSelect,
}: TableListSidebarProps) {
  const { user } = useAdminUser();
  const filteredTables = filterTables(tables, searchTerm);

  // Check if admin is owner of a table
  const isOwner = (owner?: string) => {
    return owner === 'admin' ||
      (user.permissions.ownedDatabases.includes('*'));
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Таблиці</CardTitle>
        <CardDescription>{selectedDatabase}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Пошук таблиць..."
            className="pl-9"
          />
        </div>
        <ScrollArea className="h-[400px]">
          <div className="space-y-1">
            {filteredTables.map((table) => (
              <button
                key={table.name}
                onClick={() => onTableSelect(table.name)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-left rounded-lg transition-colors ${selectedTable === table.name
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
                  }`}
              >
                <Table2 className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate flex-1">{table.name}</span>
                {isOwner(table.owner) && (
                  <Crown
                    className={`w-3.5 h-3.5 flex-shrink-0 ${selectedTable === table.name ? 'text-yellow-300' : 'text-olive-600'
                      }`}
                    title="Ви власник цієї таблиці"
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}