import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import {
  ConfigHeader,
  RestartDialog,
  RestartAlert,
  ConfigStatistics,
  ConfigAccordion,
  ConfigPreview,
  ProfilesManager,
  QuickPresets,
  calculateStatistics,
} from './config';
import { configParams, savedProfiles as initialProfiles } from '@/mockData/admin/postgresConfig';

export default function PostgresConfig() {
  const [hasChanges, setHasChanges] = useState(false);
  const [restartDialogOpen, setRestartDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [profiles, setProfiles] = useState(initialProfiles);

  const statistics = calculateStatistics(configParams);

  const handleParamChange = (paramName: string, value: string) => {
    setHasChanges(true);
    console.log(`Parameter ${paramName} changed to ${value}`);
  };

  const handleSave = () => {
    console.log('Saving configuration...');
    setHasChanges(false);
  };

  const handleReset = () => {
    console.log('Resetting configuration...');
    setHasChanges(false);
  };

  const handleRestart = () => {
    console.log('Server restarted');
  };

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
    <div className="space-y-6">
      <ConfigHeader
        restartDialogOpen={restartDialogOpen}
        onRestartDialogChange={setRestartDialogOpen}
        onRestart={handleRestart}
      />

      <RestartDialog open={restartDialogOpen} onClose={setRestartDialogOpen} />

      <RestartAlert count={statistics.requiresRestart} />

      <ConfigStatistics statistics={statistics} />

      <ConfigAccordion
        params={configParams}
        hasChanges={hasChanges}
        onParamChange={handleParamChange}
        onSave={handleSave}
        onReset={handleReset}
      />

      <ConfigPreview params={configParams} />

      <ProfilesManager
        profiles={profiles}
        saveDialogOpen={saveDialogOpen}
        importDialogOpen={importDialogOpen}
        parametersCount={statistics.totalParams}
        onSaveDialogChange={setSaveDialogOpen}
        onImportDialogChange={setImportDialogOpen}
        onSaveProfile={handleSaveProfile}
        onImportFile={handleImportFile}
        onApplyProfile={handleApplyProfile}
        onDownloadProfile={handleDownloadProfile}
        onDeleteProfile={handleDeleteProfile}
      />

      <QuickPresets onApplyPreset={handleApplyPreset} />
    </div>
  );
}