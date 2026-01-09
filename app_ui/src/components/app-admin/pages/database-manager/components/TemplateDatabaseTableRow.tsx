import { TableCell, TableRow } from '../../../../ui/table';
import { Badge } from '../../../../ui/badge';
import TemplateIconBadge from './TemplateIconBadge';
import TemplateDatabaseActionButtons from './TemplateDatabaseActionButtons';

interface TemplateDatabase {
  name: string;
  description: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
  allowCloning: boolean;
}

interface TemplateDatabaseTableRowProps {
  database: TemplateDatabase;
  onDatabaseSelect: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
}

export default function TemplateDatabaseTableRow({
  database,
  onDatabaseSelect,
  onExport,
  onCopy,
}: TemplateDatabaseTableRowProps) {
  return (
    <TableRow
      className="bg-yellow-50/30 cursor-pointer hover:bg-yellow-50/50 transition-colors"
      onClick={() => onDatabaseSelect(database.name)}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <TemplateIconBadge size="sm" />
          <code className="text-slate-900">{database.name}</code>
        </div>
      </TableCell>
      <TableCell className="text-slate-600">{database.description}</TableCell>
      <TableCell className="text-slate-600">{database.size}</TableCell>
      <TableCell className="text-slate-600">{database.tables}</TableCell>
      <TableCell className="text-slate-600">{database.encoding}</TableCell>
      <TableCell className="text-slate-600">{database.collation}</TableCell>
      <TableCell>
        <Badge variant={database.allowCloning ? 'default' : 'destructive'}>
          {database.allowCloning ? 'Так' : 'Ні'}
        </Badge>
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <TemplateDatabaseActionButtons
          databaseName={database.name}
          allowCloning={database.allowCloning}
          onView={onDatabaseSelect}
          onExport={onExport}
          onCopy={onCopy}
        />
      </TableCell>
    </TableRow>
  );
}