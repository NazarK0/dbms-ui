import { Save, Upload, Download, FolderOpen, Trash2, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import type { ConfigProfile } from './types';
import SaveProfileDialog from './SaveProfileDialog';
import ImportDialog from './ImportDialog';

interface ProfilesManagerProps {
  profiles: ConfigProfile[];
  saveDialogOpen: boolean;
  importDialogOpen: boolean;
  parametersCount: number;
  onSaveDialogChange: (open: boolean) => void;
  onImportDialogChange: (open: boolean) => void;
  onSaveProfile?: (name: string, description: string) => void;
  onImportFile?: (file: File) => void;
  onApplyProfile?: (profileId: string) => void;
  onDownloadProfile?: (profileId: string) => void;
  onDeleteProfile?: (profileId: string) => void;
}

export default function ProfilesManager({
  profiles,
  saveDialogOpen,
  importDialogOpen,
  parametersCount,
  onSaveDialogChange,
  onImportDialogChange,
  onSaveProfile,
  onImportFile,
  onApplyProfile,
  onDownloadProfile,
  onDeleteProfile,
}: ProfilesManagerProps) {
  return (
    <>
      <Card className="border-slate-200 shadow-sm">
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
                onClick={() => onImportDialogChange(true)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Імпорт з файлу
              </Button>
              <Button 
                size="sm"
                onClick={() => onSaveDialogChange(true)}
              >
                <Save className="w-4 h-4 mr-2" />
                Зберегти профіль
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {profiles.map((profile) => (
              <div 
                key={profile.id} 
                className="border border-slate-200 rounded-lg p-4 bg-slate-50/30 hover:bg-slate-50 transition-colors"
              >
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
                      onClick={() => onDownloadProfile?.(profile.id)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Завантажити
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onApplyProfile?.(profile.id)}
                    >
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Застосувати
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onDeleteProfile?.(profile.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {profiles.length === 0 && (
              <div className="text-center py-12 border border-dashed border-slate-300 rounded-lg bg-slate-50/50">
                <FolderOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 mb-2">Немає збережених профілів</p>
                <p className="text-slate-500 text-sm mb-4">
                  Збережіть поточні налаштування як профіль для швидкого доступу
                </p>
                <Button variant="outline" onClick={() => onSaveDialogChange(true)}>
                  <Save className="w-4 h-4 mr-2" />
                  Створити перший профіль
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <SaveProfileDialog
        open={saveDialogOpen}
        onOpenChange={onSaveDialogChange}
        parametersCount={parametersCount}
        onSave={onSaveProfile}
      />

      <ImportDialog
        open={importDialogOpen}
        onOpenChange={onImportDialogChange}
        onImport={onImportFile}
      />
    </>
  );
}
