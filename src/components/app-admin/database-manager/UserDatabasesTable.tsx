import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody } from '../../ui/table';
import { UserDatabaseTableHeader, UserDatabaseTableRow } from './components';

interface Database {
  name: string;
  owner: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
}

interface UserDatabasesTableProps {
  databases: Database[];
  onDatabaseSelect: (dbName: string) => void;
  onDeleteDatabase: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
}

export default function UserDatabasesTable({
  databases,
  onDatabaseSelect,
  onDeleteDatabase,
  onExport,
  onCopy,
}: UserDatabasesTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Користувацькі бази даних</CardTitle>
        <CardDescription>Клацніть на рядок для відкриття деталей бази даних</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <UserDatabaseTableHeader />
          <TableBody>
            {databases.map((db) => (
              <UserDatabaseTableRow
                key={db.name}
                database={db}
                onDatabaseSelect={onDatabaseSelect}
                onDeleteDatabase={onDeleteDatabase}
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