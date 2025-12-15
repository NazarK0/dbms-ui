import { TableCell, TableRow } from '../../../ui/table';
import { Badge } from '../../../ui/badge';
import DatabaseIconBadge from './DatabaseIconBadge';
import UserDatabaseActionButtons from './UserDatabaseActionButtons';

interface Database {
  name: string;
  owner: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
}

interface UserDatabaseTableRowProps {
  database: Database;
  onDatabaseSelect: (dbName: string) => void;
  onDeleteDatabase: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
}

export default function UserDatabaseTableRow({
  database,
  onDatabaseSelect,
  onDeleteDatabase,
  onExport,
  onCopy,
}: UserDatabaseTableRowProps) {
  return (
    <TableRow 
      onClick={() => onDatabaseSelect(database.name)}
      className="cursor-pointer hover:bg-blue-50/50 transition-colors"
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <DatabaseIconBadge size="sm" variant="green" />
          <span className="text-slate-900">{database.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{database.owner}</Badge>
      </TableCell>
      <TableCell className="text-slate-600">{database.size}</TableCell>
      <TableCell className="text-slate-600">{database.tables}</TableCell>
      <TableCell className="text-slate-600">{database.encoding}</TableCell>
      <TableCell className="text-slate-600">{database.collation}</TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <UserDatabaseActionButtons
          databaseName={database.name}
          onView={onDatabaseSelect}
          onExport={onExport}
          onCopy={onCopy}
          onDelete={onDeleteDatabase}
        />
      </TableCell>
    </TableRow>
  );
}
