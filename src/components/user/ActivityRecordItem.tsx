import { Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ActivityRecordItemProps {
  database: string;
  table: string;
  recordId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  field: string;
  timestamp: string;
  onClick: () => void;
}

export default function ActivityRecordItem({
  database,
  table,
  recordId,
  action,
  field,
  timestamp,
  onClick,
}: ActivityRecordItemProps) {
  return (
    <div 
      className="p-4 hover:bg-violet-50/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          action === 'CREATE' ? 'bg-green-100' :
          action === 'UPDATE' ? 'bg-blue-100' :
          'bg-red-100'
        }`}>
          {action === 'CREATE' && <Plus className="w-4 h-4 text-green-700" />}
          {action === 'UPDATE' && <Edit className="w-4 h-4 text-blue-700" />}
          {action === 'DELETE' && <Trash2 className="w-4 h-4 text-red-700" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-slate-900 font-medium">
              {table}
            </span>
            <Badge variant="outline" className="text-xs">
              #{recordId}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>{database}</span>
            <span className="text-slate-400">•</span>
            <span>{field}</span>
            <span className="text-slate-400">•</span>
            <span>{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
