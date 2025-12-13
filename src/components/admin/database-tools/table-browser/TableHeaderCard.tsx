import { Table2, Database } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import type { TableHeaderCardProps } from './types';

export default function TableHeaderCard({
  tableName,
  databaseName,
  columnCount,
}: TableHeaderCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Table2 className="w-5 h-5 text-blue-600" />
              {tableName}
            </CardTitle>
            <CardDescription className="mt-1">
              {databaseName} • {columnCount} колонок
            </CardDescription>
          </div>
          <Database className="w-6 h-6 text-blue-400" />
        </div>
      </CardHeader>
    </Card>
  );
}
