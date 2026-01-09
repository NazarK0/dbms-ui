import { Table } from 'lucide-react';
import { Badge } from '../ui/badge';

interface AccessedTableItemProps {
  database: string;
  table: string;
  records: number;
  lastAccess: string;
  onClick: () => void;
}

export default function AccessedTableItem({
  database,
  table,
  records,
  lastAccess,
  onClick,
}: AccessedTableItemProps) {
  return (
    <div 
      className="p-4 hover:bg-violet-50/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
          <Table className="w-4 h-4 text-violet-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-slate-900 font-medium truncate">
              {table}
            </span>
            <Badge variant="outline" className="text-xs">
              {records.toLocaleString()}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>{database}</span>
            <span className="text-slate-400">•</span>
            <span>{lastAccess}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
