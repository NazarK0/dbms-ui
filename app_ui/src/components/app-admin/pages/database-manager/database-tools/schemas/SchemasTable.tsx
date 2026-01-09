import { Layers } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../ui/table';
import { Badge } from '../../../../../ui/badge';
import SchemaActions from './SchemaActions';
import type { Schema } from '../../../../../../mockData/admin';

interface SchemasTableProps {
  schemas: Schema[];
  onSelectSchema: (schemaName: string) => void;
  onExport?: (schemaName: string) => void;
  onEdit?: (schemaName: string) => void;
  onDelete: (schemaName: string) => void;
}

export default function SchemasTable({
  schemas,
  onSelectSchema,
  onExport,
  onEdit,
  onDelete
}: SchemasTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Назва схеми</TableHead>
          <TableHead>Власник</TableHead>
          <TableHead>Таблиці</TableHead>
          <TableHead>Функції</TableHead>
          <TableHead>Опис</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schemas.map((schema) => (
          <TableRow
            key={schema.name}
            onClick={() => onSelectSchema(schema.name)}
            className={`cursor-pointer hover:bg-olive-50/50 transition-colors ${schema.name === 'public' ? 'bg-olive-50/30' : ''
              }`}
          >
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-olive-500 to-olive-600 rounded-lg flex items-center justify-center">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <code className="text-slate-900">{schema.name}</code>
                {schema.name === 'public' && (
                  <Badge variant="secondary" className="ml-2">За замовчуванням</Badge>
                )}
              </div>
            </TableCell>
            <TableCell className="text-slate-600">{schema.owner}</TableCell>
            <TableCell className="text-slate-600">{schema.tables}</TableCell>
            <TableCell className="text-slate-600">{schema.functions}</TableCell>
            <TableCell className="text-slate-600">{schema.description}</TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <SchemaActions
                schemaName={schema.name}
                isPublicSchema={schema.name === 'public'}
                onExport={onExport}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}