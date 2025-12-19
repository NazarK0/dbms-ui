import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../ui/table';
import { Badge } from '../../../../../ui/badge';
import TypeActions from './TypeActions';
import { getCategoryIcon, getCategoryGradient } from './utils';
import type { CompositeType } from '../../../../../../mockData/admin';

interface CompositeTypesTableProps {
  types: CompositeType[];
  onDelete: (typeName: string) => void;
  onEdit?: (typeName: string) => void;
}

export default function CompositeTypesTable({ types, onDelete, onEdit }: CompositeTypesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Назва типу</TableHead>
          <TableHead>Атрибути</TableHead>
          <TableHead>Опис</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {types.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-slate-500 py-8">
              Не знайдено composite типів
            </TableCell>
          </TableRow>
        ) : (
          types.map((type) => {
            const Icon = getCategoryIcon(type.category);
            const gradient = getCategoryGradient(type.category);

            return (
              <TableRow key={type.name}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <code className="text-slate-900">{type.name}</code>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {type.attributes.map((attr, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {attr.name}: {attr.type}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{type.description}</TableCell>
                <TableCell>
                  <TypeActions
                    typeName={type.name}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
