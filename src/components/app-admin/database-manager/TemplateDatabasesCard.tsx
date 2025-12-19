import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody } from '../../ui/table';
import { templateDatabases } from '../../../mockData/admin';
import { TemplateIconBadge, TemplateDatabaseTableHeader, TemplateDatabaseTableRow } from './components';

interface TemplateDatabasesCardProps {
  onDatabaseSelect: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
}

export default function TemplateDatabasesCard({ 
  onDatabaseSelect, 
  onExport,
  onCopy 
}: TemplateDatabasesCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TemplateIconBadge size="md" />
          <div>
            <CardTitle>Шаблонні бази даних</CardTitle>
            <CardDescription>Системні шаблони для створення нових баз даних</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TemplateDatabaseTableHeader />
          <TableBody>
            {templateDatabases.map((db) => (
              <TemplateDatabaseTableRow
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