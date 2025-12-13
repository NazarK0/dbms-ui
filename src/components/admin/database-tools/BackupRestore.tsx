import { useState, useEffect } from 'react';
import { Archive, Upload, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { backups, backupSchedules } from '../../../mockData/admin';
import {
  BackupHeader,
  BackupProgress,
  BackupsTable,
  RestoreUpload,
  RestoreWarning,
  ScheduleHeader,
  SchedulesTable,
} from './backup-restore';
import { mockApiCall } from '../../../utils/mockApi';
import { SkeletonTable } from '../../ui/skeletons';

export default function BackupRestore({ selectedDatabase }: { selectedDatabase?: string }) {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isLoadingBackups, setIsLoadingBackups] = useState(true);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(true);
  const [backupsList, setBackupsList] = useState<any[]>([]);
  const [schedulesList, setSchedulesList] = useState<any[]>([]);

  useEffect(() => {
    // Load backups
    mockApiCall('backups/list', { database: selectedDatabase }, 900).then((data) => {
      setBackupsList(backups);
      setIsLoadingBackups(false);
    });

    // Load schedules
    mockApiCall('backups/schedules', { database: selectedDatabase }, 950).then((data) => {
      setSchedulesList(backupSchedules);
      setIsLoadingSchedules(false);
    });
  }, [selectedDatabase]);

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    // Mock backup creation - in real app, this would call API
    // After completion, set isBackingUp to false
    setTimeout(() => setIsBackingUp(false), 5000);
  };

  const handleDownloadBackup = (backupId: string) => {
    console.log('Downloading backup:', backupId);
    // Mock download - in real app, this would trigger file download
  };

  const handleRestoreBackup = (backupId: string) => {
    if (confirm('Ви впевнені, що хочете відновити цю резервну копію? Всі поточні дані будуть замінені.')) {
      console.log('Restoring backup:', backupId);
      // Mock restore - in real app, this would call API
    }
  };

  const handleAddSchedule = () => {
    console.log('Adding new schedule');
    // Mock - in real app, this would open create schedule modal
  };

  const handleToggleSchedule = (scheduleId: string) => {
    console.log('Toggling schedule:', scheduleId);
    // Mock - in real app, this would call API to enable/disable schedule
  };

  const handleEditSchedule = (scheduleId: string) => {
    console.log('Editing schedule:', scheduleId);
    // Mock - in real app, this would open edit schedule modal
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="backups" className="space-y-6">
        <TabsList className="bg-white shadow-sm border border-slate-200">
          <TabsTrigger value="backups" className="gap-2">
            <Archive className="w-4 h-4" />
            Резервні копії
          </TabsTrigger>
          <TabsTrigger value="restore" className="gap-2">
            <Upload className="w-4 h-4" />
            Відновлення
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Clock className="w-4 h-4" />
            Розклад
          </TabsTrigger>
        </TabsList>

        {/* Backups Tab */}
        <TabsContent value="backups">
          <Card className="border-slate-200 shadow-sm">
            <BackupHeader 
              selectedDatabase={selectedDatabase}
              onCreateBackup={handleCreateBackup}
            />
            <CardContent>
              {isBackingUp && (
                <BackupProgress 
                  progress={45} 
                  estimatedTimeRemaining="~8 хвилин" 
                />
              )}
              {isLoadingBackups ? (
                <SkeletonTable rows={5} columns={4} />
              ) : (
                <BackupsTable
                  backups={backupsList}
                  onDownload={handleDownloadBackup}
                  onRestore={handleRestoreBackup}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Restore Tab */}
        <TabsContent value="restore">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Відновлення з резервної копії</CardTitle>
              <CardDescription>Відновити базу даних з файлу резервної копії</CardDescription>
            </CardHeader>
            <CardContent>
              <RestoreUpload />
              <RestoreWarning />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <Card className="border-slate-200 shadow-sm">
            <ScheduleHeader onAddSchedule={handleAddSchedule} />
            <CardContent>
              {isLoadingSchedules ? (
                <SkeletonTable rows={5} columns={4} />
              ) : (
                <SchedulesTable
                  schedules={schedulesList}
                  onToggleSchedule={handleToggleSchedule}
                  onEditSchedule={handleEditSchedule}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}