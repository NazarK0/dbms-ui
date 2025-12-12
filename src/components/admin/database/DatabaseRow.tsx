import { Database, Edit, Trash2 } from 'lucide-react';
import { TableRow, TableCell } from '../../ui/table';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface DatabaseRowProps {
  name: string;
  owner: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export default function DatabaseRow({
  name,
  owner,
  size,
  tables,
  encoding,
  collation,
  isSelected,
  onSelect,
  onDelete,
}: DatabaseRowProps) {
  return (
    <TableRow 
      className={`cursor-pointer hover:bg-lime-50 ${isSelected ? 'bg-lime-100/50 border-l-4 border-lime-600' : ''}`}
      onClick={onSelect}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-slate-900">{name}</p>
            <p className="text-xs text-slate-600">{owner}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{size}</Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="bg-lime-50 text-lime-700 border-lime-300">
          {tables} таблиць
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-slate-600">{encoding}</TableCell>
      <TableCell className="text-sm text-slate-600">{collation}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              // Edit functionality
            }}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
