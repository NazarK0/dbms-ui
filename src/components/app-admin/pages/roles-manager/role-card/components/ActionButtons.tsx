/**
 * ActionButtons Component
 * Edit and Delete buttons (top-right corner, visible on hover)
 */

import { Edit, Trash2 } from 'lucide-react';
import { Button } from '../../../../../ui/button';
import type { Role } from '../types';

interface ActionButtonsProps {
  role: Role;
  onEdit: (role: Role) => void;
  onDelete?: (role: Role) => void;
  canDelete: boolean;
}

export default function ActionButtons({ role, onEdit, onDelete, canDelete }: ActionButtonsProps) {
  return (
    <div className="absolute top-1.5 right-1.5 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      {/* Edit Button */}
      <Button 
        variant="ghost" 
        size="sm"
        className="h-5 w-5 p-0 bg-white/90 hover:bg-white shadow-sm"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(role);
        }}
      >
        <Edit className="w-3 h-3 text-slate-700" />
      </Button>
      
      {/* Delete Button */}
      {canDelete && (
        <Button 
          variant="ghost" 
          size="sm"
          className="h-5 w-5 p-0 bg-white/90 hover:bg-white shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) {
              onDelete(role);
            }
          }}
        >
          <Trash2 className="w-3 h-3 text-red-600" />
        </Button>
      )}
    </div>
  );
}
