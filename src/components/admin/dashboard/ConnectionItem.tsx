import { Badge } from '../../ui/badge';
import { Database } from 'lucide-react';

interface ConnectionItemProps {
  database: string;
  user: string;
  state: string;
  duration: string;
  queries: number;
}

export function ConnectionItem({ database, user, state, duration, queries }: ConnectionItemProps) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-lime-50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-lime-100 rounded-lg flex items-center justify-center">
          <Database className="w-4 h-4 text-lime-700" />
        </div>
        <div>
          <p className="text-sm text-slate-900 font-medium">{database}</p>
          <p className="text-xs text-slate-600">{user}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant={state === 'активний' ? 'default' : 'secondary'} className="text-xs">
          {state}
        </Badge>
        <div className="text-right">
          <p className="text-xs text-slate-900">{duration}</p>
          <p className="text-xs text-slate-600">{queries} запитів</p>
        </div>
      </div>
    </div>
  );
}
