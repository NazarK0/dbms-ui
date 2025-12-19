import { Save, FolderOpen } from 'lucide-react';
import { Button } from '../../../../ui/button';
import type { EmptyStateProps } from './types';

/**
 * Empty state component when no profiles exist
 * 
 * Displays a friendly message and call-to-action button
 * to encourage users to create their first profile
 */
export default function EmptyState({ onCreateProfile }: EmptyStateProps) {
  return (
    <div className="text-center py-12 border border-dashed border-slate-300 rounded-lg bg-slate-50/50">
      <FolderOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
      <p className="text-slate-600 mb-2">Немає збережених профілів</p>
      <p className="text-slate-500 text-sm mb-4">
        Збережіть поточні налаштування як профіль для швидкого доступу
      </p>
      <Button variant="outline" onClick={onCreateProfile}>
        <Save className="w-4 h-4 mr-2" />
        Створити перший профіль
      </Button>
    </div>
  );
}
