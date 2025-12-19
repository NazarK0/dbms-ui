// Utility functions for backup and restore operations

export const formatBackupSize = (size: string): string => {
  return size;
};

export const getBackupTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    'Full': 'bg-blue-100 text-blue-700',
    'Incremental': 'bg-green-100 text-green-700',
    'Differential': 'bg-purple-100 text-purple-700',
  };
  return colors[type] || 'bg-slate-100 text-slate-700';
};

export const getBackupFormatOptions = () => [
  { value: 'custom', label: 'Custom' },
  { value: 'tar', label: 'TAR' },
  { value: 'plain', label: 'SQL (Plain)' },
  { value: 'directory', label: 'Directory' },
];

export const getFrequencyOptions = () => [
  { value: 'daily', label: 'Щоденно' },
  { value: 'weekly', label: 'Щотижня' },
  { value: 'monthly', label: 'Щомісяця' },
  { value: 'hourly', label: 'Щогодини' },
];

export const getRetentionOptions = () => [
  { value: '7', label: '7 днів' },
  { value: '14', label: '14 днів' },
  { value: '30', label: '30 днів' },
  { value: '90', label: '90 днів' },
  { value: '365', label: '1 рік' },
];

export const acceptedBackupFormats = '.sql, .backup, .tar, .dump';
