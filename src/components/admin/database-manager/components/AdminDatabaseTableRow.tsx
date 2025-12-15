import { TableCell, TableRow } from '../../../ui/table';
import DatabaseIconBadge from './DatabaseIconBadge';
import DatabaseActionButtons from './DatabaseActionButtons';

interface Database {
  name: string;
  description: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
}

interface AdminDatabaseTableRowProps {
  database: Database;
  onDatabaseSelect: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
}

export default function AdminDatabaseTableRow({
  database,
  onDatabaseSelect,
  onExport,
  onCopy,
}: AdminDatabaseTableRowProps) {
  return (
    <TableRow 
      className="bg-red-50/30 cursor-pointer hover:bg-red-50/50 transition-colors"
      onClick={() => onDatabaseSelect(database.name)}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <DatabaseIconBadge size="sm" variant="red" />
          <code className="text-slate-900">{database.name}</code>
        </div>
      </TableCell>
      <TableCell className="text-slate-600">{database.description}</TableCell>
      <TableCell className="text-slate-600">{database.size}</TableCell>
      <TableCell className="text-slate-600">{database.tables}</TableCell>
      <TableCell className="text-slate-600">{database.encoding}</TableCell>
      <TableCell className="text-slate-600">{database.collation}</TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <DatabaseActionButtons
          databaseName={database.name}
          onView={onDatabaseSelect}
          onExport={onExport}
          onCopy={onCopy}
        />
      </TableCell>
    </TableRow>
  );
}
