import { Clock, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import ActivityRecordItem from '../ActivityRecordItem';
import AccessedTableItem from '../AccessedTableItem';

interface ActivityRecord {
  id: number;
  database: string;
  table: string;
  recordId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  field: string;
  timestamp: string;
}

interface AccessedTable {
  id: number;
  database: string;
  table: string;
  records: number;
  lastAccess: string;
  permissions: string[];
}

interface ActivitySectionProps {
  lastModifiedRecords: ActivityRecord[];
  lastAccessedTables: AccessedTable[];
  onRecordClick?: (database: string, table: string, permissions: string[], recordId: string) => void;
  onTableClick?: (database: string, table: string, permissions: string[]) => void;
}

export default function ActivitySection({
  lastModifiedRecords,
  lastAccessedTables,
  onRecordClick,
  onTableClick,
}: ActivitySectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Last Modified Records */}
      <Card className="border-violet-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-violet-600" />
            Останні зміни записів
          </CardTitle>
          <CardDescription>Нещодавно змінені дані</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-200">
            {lastModifiedRecords.map((record) => (
              <ActivityRecordItem 
                key={record.id}
                database={record.database}
                table={record.table}
                recordId={record.recordId}
                action={record.action}
                field={record.field}
                timestamp={record.timestamp}
                onClick={() => {
                  const tableData = lastAccessedTables.find(
                    t => t.database === record.database && t.table === record.table
                  );
                  onRecordClick?.(
                    record.database, 
                    record.table, 
                    tableData?.permissions || ['SELECT'], 
                    record.recordId
                  );
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Last Accessed Tables */}
      <Card className="border-violet-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-600" />
            Останні таблиці
          </CardTitle>
          <CardDescription>Нещодавно використані таблиці</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-200">
            {lastAccessedTables.map((table) => (
              <AccessedTableItem 
                key={table.id}
                database={table.database}
                table={table.table}
                records={table.records}
                lastAccess={table.lastAccess}
                onClick={() => onTableClick?.(table.database, table.table, table.permissions)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
