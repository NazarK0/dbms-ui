import type { ConfigProfile } from '../types';

/**
 * Props for ProfileCard component
 */
export interface ProfileCardProps {
  profile: ConfigProfile;
  onApply?: (profileId: string) => void;
  onDownload?: (profileId: string) => void;
  onDelete?: (profileId: string) => void;
}

/**
 * Props for ProfilesHeader component
 */
export interface ProfilesHeaderProps {
  onImport: () => void;
  onSave: () => void;
}

/**
 * Props for EmptyState component
 */
export interface EmptyStateProps {
  onCreateProfile: () => void;
}

/**
 * Props for ProfilesManager component
 */
export interface ProfilesManagerProps {
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
