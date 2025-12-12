import { Plus, Upload } from 'lucide-react';
import { Button } from '../../ui/button';
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
}

interface DatabaseListProps {
  databases: Database[];
  onDatabaseSelect: (dbName: string) => void;
  onDeleteDatabase: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
  onCreateDatabase: () => void;
  onImportSchema: () => void;
}

export default function DatabaseList({
  databases,
  onDatabaseSelect,
  onDeleteDatabase,
  onExport,
  onCopy,
  onCreateDatabase,
  onImportSchema,
}: DatabaseListProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">Керування базами даних</h2>
          <p className="text-slate-600">Управління базами даних PostgreSQL</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onImportSchema}>
            <Upload className="w-4 h-4 mr-2" />
            Імпорт схеми
          </Button>
          <Button onClick={onCreateDatabase}>
            <Plus className="w-4 h-4 mr-2" />
            Створити базу даних
          </Button>
        </div>
      </div>

      {/* User Databases */}
      <UserDatabasesTable
        databases={databases}
        onDatabaseSelect={onDatabaseSelect}
        onDeleteDatabase={onDeleteDatabase}
        onExport={onExport}
        onCopy={onCopy}
      />

      {/* Template Databases */}
      <TemplateDatabasesCard />

      {/* Administrative Databases */}
      <AdminDatabasesCard
        onDatabaseSelect={onDatabaseSelect}
        onExport={onExport}
      />
    </>
  );
}