import { FolderOpen, Download, Trash2, Settings } from 'lucide-react';
import { Button } from '../../../../ui/button';
import type { ProfileCardProps } from './types';

/**
 * Individual profile card component
 * 
 * Displays a single configuration profile with:
 * - Profile icon and metadata
 * - Name and description
 * - Parameters count and creation date
 * - Action buttons (Download, Apply, Delete)
 */
export default function ProfileCard({ profile, onApply, onDownload, onDelete }: ProfileCardProps) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/30 hover:bg-slate-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-slate-900 mb-1">{profile.name}</h4>
            <p className="text-slate-600 text-sm mb-2">{profile.description}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Settings className="w-3 h-3" />
                {profile.parametersCount} параметрів
              </span>
              <span>Створено: {profile.createdAt}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDownload?.(profile.id)}
          >
            <Download className="w-4 h-4 mr-2" />
            Завантажити
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onApply?.(profile.id)}
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            Застосувати
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete?.(profile.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
