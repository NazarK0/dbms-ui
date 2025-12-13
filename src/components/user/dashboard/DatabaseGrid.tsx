import { Badge } from '../../ui/badge';
import DatabaseCard from '../DatabaseCard';

interface Database {
  id: number;
  name: string;
  tables: number;
  records: number;
  lastAccess: string;
  permissions: string[];
  grantedByRoles: string[];
  color: string;
}

interface DatabaseGridProps {
  databases: Database[];
  onDatabaseSelect?: (database: string) => void;
}

export default function DatabaseGrid({ databases, onDatabaseSelect }: DatabaseGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-slate-900 font-medium">Мої бази даних</h3>
        <Badge variant="outline" className="text-xs">
          {databases.length} доступних
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {databases.map((db) => (
          <DatabaseCard 
            key={db.id}
            name={db.name}
            tables={db.tables}
            records={db.records}
            lastAccess={db.lastAccess}
            grantedByRoles={db.grantedByRoles}
            color={db.color}
            onClick={() => onDatabaseSelect?.(db.name)}
          />
        ))}
      </div>
    </div>
  );
}
