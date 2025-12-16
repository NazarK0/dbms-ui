import { useState, useEffect } from 'react';
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
import { mockApiCall } from '../../../utils/mockApi';
import { SkeletonCardGrid, SkeletonCard } from '../../ui/skeletons';

export default function PostgresConfig() {
  const [hasChanges, setHasChanges] = useState(false);
  const [restartDialogOpen, setRestartDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [profiles, setProfiles] = useState(initialProfiles);

  // Loading states
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [config, setConfig] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    // Load configuration
    mockApiCall('config/parameters', {}, 1000).then((data) => {
      setConfig(configParams);
      setStatistics(calculateStatistics(configParams));
      setIsLoadingConfig(false);
    });
  }, []);

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

      {isLoadingConfig ? (
        <>
          <SkeletonCard />
          <SkeletonCardGrid count={4} columns={2} />
          <SkeletonCard showHeader contentLines={5} />
        </>
      ) : (
        <>
          <RestartAlert count={statistics?.requiresRestart || 0} />

          <ConfigStatistics statistics={statistics} />

          <ConfigAccordion
            params={config}
            hasChanges={hasChanges}
            onParamChange={handleParamChange}
            onSave={handleSave}
            onReset={handleReset}
          />

          <ConfigPreview params={config} />

          <ProfilesManager
            profiles={profiles}
            saveDialogOpen={saveDialogOpen}
            importDialogOpen={importDialogOpen}
            parametersCount={statistics?.totalParams || 0}
            onSaveDialogChange={setSaveDialogOpen}
            onImportDialogChange={setImportDialogOpen}
            onSaveProfile={handleSaveProfile}
            onImportFile={handleImportFile}
            onApplyProfile={handleApplyProfile}
            onDownloadProfile={handleDownloadProfile}
            onDeleteProfile={handleDeleteProfile}
          />

          <QuickPresets onApplyPreset={handleApplyPreset} />
        </>
      )}
    </div>
  );
}