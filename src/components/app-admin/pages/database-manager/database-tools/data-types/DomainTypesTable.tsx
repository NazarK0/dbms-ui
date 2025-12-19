import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../ui/table';
import TypeActions from './TypeActions';
import { getCategoryIcon, getCategoryGradient } from './utils';
import type { DomainType } from '../../../../../../mockData/admin';

interface DomainTypesTableProps {
  types: DomainType[];
  onDelete: (typeName: string) => void;
  onEdit?: (typeName: string) => void;
}

export default function DomainTypesTable({ types, onDelete, onEdit }: DomainTypesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Назва типу</TableHead>
          <TableHead>Базовий тип</TableHead>
          <TableHead>Обмеження</TableHead>
          <TableHead>Опис</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {types.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-slate-500 py-8">
              Не знайдено domain типів
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
                  <code className="text-xs bg-slate-100 px-2 py-1 rounded">{type.baseType}</code>
                </TableCell>
                <TableCell>
                  <code className="text-xs text-slate-600 max-w-xs truncate block">{type.constraint}</code>
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
