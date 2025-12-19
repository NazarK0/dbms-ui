import { Database, Table as TableIcon } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';

interface RecordBreadcrumbProps {
  database: string;
  table: string;
  action: string;
  actionColor?: string;
}

export default function RecordBreadcrumb({ 
  database, 
  table, 
  action, 
  actionColor = 'text-violet-600' 
}: RecordBreadcrumbProps) {
  return (
    <Card className="border-violet-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Database className="w-4 h-4" />
          <span className="font-medium text-slate-900">{database}</span>
          <span>/</span>
          <TableIcon className="w-4 h-4" />
          <span className="font-medium text-slate-900">{table}</span>
          <span>/</span>
          <span className={actionColor}>{action}</span>
        </div>
      </CardContent>
    </Card>
  );
}
