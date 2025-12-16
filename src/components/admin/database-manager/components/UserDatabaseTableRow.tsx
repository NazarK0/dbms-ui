import { TableCell, TableRow } from '../../../ui/table';
import { Badge } from '../../../ui/badge';
import { Crown } from 'lucide-react';
import DatabaseIconBadge from './DatabaseIconBadge';
import UserDatabaseActionButtons from './UserDatabaseActionButtons';
import { useAdminUser } from '../../../../contexts/AdminUserContext';

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
  const { user } = useAdminUser();
  
  // Check if admin is owner of this database
  const isOwner = database.owner === 'admin' || 
                  (user.permissions.ownedDatabases.includes('*')) ||
                  (user.permissions.ownedDatabases.includes(database.name));

  return (
    <TableRow 
      onClick={() => onDatabaseSelect(database.name)}
      className="cursor-pointer hover:bg-blue-50/50 transition-colors"
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <DatabaseIconBadge size="sm" variant="green" />
          <span className="text-slate-900">{database.name}</span>
          {isOwner && (
            <Crown className="w-4 h-4 text-olive-600" title="Ви власник цієї БД" />
          )}
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