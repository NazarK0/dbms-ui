import { Download, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../../../../ui/button';

interface SchemaActionsProps {
  schemaName: string;
  isPublicSchema: boolean;
  onExport?: (schemaName: string) => void;
  onEdit?: (schemaName: string) => void;
  onDelete: (schemaName: string) => void;
}

export default function SchemaActions({
  schemaName,
  isPublicSchema,
  onExport,
  onEdit,
  onDelete
}: SchemaActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      {onExport && (
        <Button
          variant="ghost"
          size="icon"
          title="Експорт схеми"
          onClick={() => onExport(schemaName)}
        >
          <Download className="w-4 h-4" />
        </Button>
      )}
      {onEdit && (
        <Button
          variant="ghost"
          size="icon"
          title="Редагувати"
          onClick={() => onEdit(schemaName)}
        >
          <Edit className="w-4 h-4" />
        </Button>
      )}
      {!isPublicSchema && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(schemaName)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          title="Видалити схему"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
