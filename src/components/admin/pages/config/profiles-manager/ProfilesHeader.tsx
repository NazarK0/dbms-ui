import { Save, Upload } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '../../../../ui/card';
import { Button } from '../../../../ui/button';
import type { ProfilesHeaderProps } from './types';

/**
 * Header section for Profiles Manager
 * 
 * Displays title, description, and action buttons for importing and saving profiles
 */
export default function ProfilesHeader({ onImport, onSave }: ProfilesHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Збережені профілі налаштувань</CardTitle>
          <CardDescription>Керування профілями конфігурацій для швидкого завантаження</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onImport}
          >
            <Upload className="w-4 h-4 mr-2" />
            Імпорт з файлу
          </Button>
          <Button 
            size="sm"
            onClick={onSave}
          >
            <Save className="w-4 h-4 mr-2" />
            Зберегти профіль
          </Button>
        </div>
      </div>
    </CardHeader>
  );
}
