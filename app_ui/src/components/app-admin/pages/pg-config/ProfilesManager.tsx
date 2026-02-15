import { Card, CardContent } from '../../../ui/card';
import SaveProfileDialog from './SaveProfileDialog';
import ImportDialog from './ImportDialog';
import { ProfileCard, ProfilesHeader, EmptyState } from './profiles-manager';
import type { ProfilesManagerProps } from './profiles-manager/types';
import { useState } from 'react';
import { savedProfiles as initialProfiles } from '../../../../mockData/admin/postgresConfig';

export default function ProfilesManager() {

  const [hasChanges, setHasChanges] = useState(false);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const [profiles, setProfiles] = useState(initialProfiles);
  
    // Loading states
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);
    const [config, setConfig] = useState<any[]>([]);
    const [statistics, setStatistics] = useState<any>(null);

  const handleSaveProfile = (name: string, description: string) => {
    const newProfile = {
      id: Date.now().toString(),
      name,
      description,
      createdAt: new Date().toLocaleString('uk-UA'),
      parametersCount: statistics.totalParams,
    };
    setProfiles([...profiles, newProfile]);
    console.log('Profile saved:', newProfile);
  };

  const handleImportFile = (file: File) => {
    console.log('Importing file:', file.name);
  };

  const handleApplyProfile = (profileId: string) => {
    console.log('Applying profile:', profileId);
  };

  const handleDownloadProfile = (profileId: string) => {
    console.log('Downloading profile:', profileId);
  };

  const handleDeleteProfile = (profileId: string) => {
    setProfiles(profiles.filter(p => p.id !== profileId));
    console.log('Profile deleted:', profileId);
  };

  const handleApplyPreset = (presetType: 'development' | 'production' | 'highload') => {
    console.log('Applying preset:', presetType);
    setHasChanges(true);
  };







  return (
    <>
      <Card className="border-slate-200 shadow-sm">
        <ProfilesHeader 
          onImport={() => setImportDialogOpen(true)}
          onSave={() => setSaveDialogOpen(true)}
        />
        <CardContent>
          <div className="space-y-3">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onApply={handleApplyProfile}
                onDownload={handleDownloadProfile}
                onDelete={handleDeleteProfile}
              />
            ))}

            {profiles.length === 0 && (
              <EmptyState onCreateProfile={() => setSaveDialogOpen(true)} />
            )}
          </div>
        </CardContent>
      </Card>

      <SaveProfileDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        parametersCount={statistics?.totalParams || 0}
        onSave={handleSaveProfile}
      />

      <ImportDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImport={handleImportFile}
      />
    </>
  );
}
