import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Table, TableBody } from '../../../ui/table';
import { adminDatabases } from '../../../../mockData/admin';
import { DatabaseIconBadge, DatabaseTableHeader, AdminDatabaseTableRow } from './components';

interface AdminDatabasesCardProps {
  onDatabaseSelect: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
}

export default function AdminDatabasesCard({ 
  onDatabaseSelect, 
  onExport,
  onCopy 
}: AdminDatabasesCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <DatabaseIconBadge size="md" variant="red" />
          <div>
            <CardTitle>Адміністративні бази даних</CardTitle>
            <CardDescription>Системні бази даних PostgreSQL</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <DatabaseTableHeader />
          <TableBody>
            {adminDatabases.map((db) => (
              <AdminDatabaseTableRow
                key={db.name}
                database={db}
                onDatabaseSelect={onDatabaseSelect}
                onExport={onExport}
                onCopy={onCopy}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}