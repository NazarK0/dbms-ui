import { Table as TableIcon, ChevronRight, Copy, Check } from 'lucide-react';
import { Button } from '../../ui/button';

interface TableInfo {
  name: string;
  records: number;
  description: string;
  permissions: string[];
}

interface TableListItemProps {
  table: TableInfo;
  database: string;
  copied: boolean;
  onTableClick: () => void;
  onCopy: (text: string) => void;
}

export default function TableListItem({ table, database, copied, onTableClick, onCopy }: TableListItemProps) {
  const getTableApiEndpoint = (dbName: string, tableName: string) => {
    return `https://api.dbms.company.com/v1/databases/${dbName}/tables/${tableName}`;
  };

  return (
    <div
      onClick={onTableClick}
      className="p-3 hover:bg-violet-50 transition-colors cursor-pointer group"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-violet-200 transition-colors">
            <TableIcon className="w-4 h-4 text-violet-700" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-slate-900 font-medium mb-0.5">{table.name}</h4>
            <p className="text-xs text-slate-600 mb-1.5">{table.description}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{table.records.toLocaleString()} записів</span>
            </div>
          </div>
        </div>

        {/* API Endpoint - Compact */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <code className="text-xs text-slate-600 font-mono px-2 py-1 bg-slate-50 rounded border border-slate-200 max-w-[200px] truncate">
            {getTableApiEndpoint(database, table.name)}
          </code>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onCopy(getTableApiEndpoint(database, table.name));
            }}
            className="h-7 w-7 p-0"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
        </div>
      </div>
    </div>
  );
}
