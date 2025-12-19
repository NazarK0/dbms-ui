import { Card, CardContent } from '../../../ui/card';
import SaveProfileDialog from './SaveProfileDialog';
import ImportDialog from './ImportDialog';
import { ProfileCard, ProfilesHeader, EmptyState } from './profiles-manager';
import type { ProfilesManagerProps } from './profiles-manager/types';

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
        <ProfilesHeader 
          onImport={() => onImportDialogChange(true)}
          onSave={() => onSaveDialogChange(true)}
        />
        <CardContent>
          <div className="space-y-3">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onApply={onApplyProfile}
                onDownload={onDownloadProfile}
                onDelete={onDeleteProfile}
              />
            ))}

            {profiles.length === 0 && (
              <EmptyState onCreateProfile={() => onSaveDialogChange(true)} />
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
