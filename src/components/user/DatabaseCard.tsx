import { Database, Table, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface DatabaseCardProps {
  name: string;
  tables: number;
  records: number;
  lastAccess: string;
  grantedByRoles: string[];
  color: string;
  onClick: () => void;
}

export default function DatabaseCard({
  name,
  tables,
  records,
  lastAccess,
  grantedByRoles,
  color,
  onClick,
}: DatabaseCardProps) {
  return (
    <Card 
      className="border-violet-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 bg-gradient-to-br ${color} rounded-md flex items-center justify-center shadow-sm`}>
              <Database className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-slate-900 font-medium text-sm leading-tight truncate">{name}</h4>
              <p className="text-xs text-slate-500 leading-tight truncate">{lastAccess}</p>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-1.5">
          <div className="flex items-center gap-0.5">
            <Table className="w-2.5 h-2.5" />
            <span>{tables}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Database className="w-2.5 h-2.5" />
            <span>{records.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {grantedByRoles.map((role) => (
            <Badge key={role} variant="outline" className="text-xs h-5 px-2 py-0 bg-violet-50 text-violet-700 border-violet-300">
              {role}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
