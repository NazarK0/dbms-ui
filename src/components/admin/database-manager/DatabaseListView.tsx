import UserDatabasesTable from './UserDatabasesTable';
import TemplateDatabasesCard from './TemplateDatabasesCard';
import AdminDatabasesCard from './AdminDatabasesCard';

interface Database {
  name: string;
  owner: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
  type: 'user' | 'template' | 'admin';
}

interface DatabaseListViewProps {
  databases: Database[];
  onDatabaseSelect: (dbName: string) => void;
  onDeleteDatabase: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
}

export default function DatabaseListView({
  databases,
  onDatabaseSelect,
  onDeleteDatabase,
  onExport,
  onCopy,
}: DatabaseListViewProps) {
  return (
    <>
      <UserDatabasesTable
        databases={databases}
        onDatabaseSelect={onDatabaseSelect}
        onDeleteDatabase={onDeleteDatabase}
        onExport={onExport}
        onCopy={onCopy}
      />

      <TemplateDatabasesCard
        onDatabaseSelect={onDatabaseSelect}
        onExport={onExport}
        onCopy={onCopy}
      />

      <AdminDatabasesCard
        onDatabaseSelect={onDatabaseSelect}
        onExport={onExport}
        onCopy={onCopy}
      />
    </>
  );
}
