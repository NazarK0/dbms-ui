import { Database, Table as TableIcon, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { ScrollArea } from '../../ui/scroll-area';

interface DatabaseInfo {
  id: number;
  name: string;
  description: string;
  tables: any[];
}

interface DatabaseSidebarProps {
  databases: DatabaseInfo[];
  selectedDatabase: string | null;
  onDatabaseSelect: (database: string) => void;
}

export default function DatabaseSidebar({ databases, selectedDatabase, onDatabaseSelect }: DatabaseSidebarProps) {
  return (
    <Card className="border-violet-200 shadow-sm lg:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Database className="w-5 h-5 text-violet-600" />
          Бази даних
        </CardTitle>
        <CardDescription>Доступні бази даних</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          {databases.length === 0 ? (
            <div className="h-[600px] flex items-center justify-center text-slate-500">
              <div className="text-center p-6">
                <Database className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <p className="text-lg mb-2">Бази даних не знайдено</p>
                <p className="text-sm">У вас немає доступу до баз даних</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {databases.map((db) => (
                <button
                  key={db.id}
                  onClick={() => onDatabaseSelect(db.name)}
                  className={`w-full text-left p-4 hover:bg-violet-50 transition-colors ${
                    selectedDatabase === db.name ? 'bg-violet-50 border-l-4 border-l-violet-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Database className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{db.name}</p>
                        <p className="text-xs text-slate-500">{db.description}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${
                      selectedDatabase === db.name ? 'rotate-90' : ''
                    }`} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <TableIcon className="w-3 h-3" />
                    <span>{db.tables.length} таблиць</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}