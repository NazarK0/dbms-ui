// Mock data for database backups (Admin)

export interface Backup {
  id: string;
  filename: string;
  type: 'Повна' | 'Інкрементна';
  size: string;
  created: string;
  status: 'success' | 'failed' | 'in_progress';
  duration: string;
}

export interface BackupSchedule {
  id: string;
  name: string;
  frequency: string;
  type: 'Повна' | 'Інкрементна';
  retention: string;
  enabled: boolean;
}

export const backups: Backup[] = [
  {
    id: '1',
    filename: 'production_db_2024_01_20_full.sql',
    type: 'Повна',
    size: '1.2 ГБ',
    created: '2024-01-20 02:00:00',
    status: 'success',
    duration: '12м 34с',
  },
  {
    id: '2',
    filename: 'production_db_2024_01_19_full.sql',
    type: 'Повна',
    size: '1.18 ГБ',
    created: '2024-01-19 02:00:00',
    status: 'success',
    duration: '11м 58с',
  },
  {
    id: '3',
    filename: 'production_db_2024_01_18_incremental.sql',
    type: 'Інкрементна',
    size: '245 МБ',
    created: '2024-01-18 02:00:00',
    status: 'success',
    duration: '3м 12с',
  },
];

export const backupSchedules: BackupSchedule[] = [
  { id: '1', name: 'Щоденне повне резервування', frequency: 'Щодня о 02:00', type: 'Повна', retention: '7 днів', enabled: true },
  { id: '2', name: 'Щотижневе архівування', frequency: 'Неділя о 03:00', type: 'Повна', retention: '30 днів', enabled: true },
  { id: '3', name: 'Погодинне інкрементне', frequency: 'Щогодини', type: 'Інкрементна', retention: '24 години', enabled: false },
];