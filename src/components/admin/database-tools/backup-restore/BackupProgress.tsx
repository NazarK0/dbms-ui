import { Progress } from '../../../ui/progress';

interface BackupProgressProps {
  progress: number;
  estimatedTimeRemaining?: string;
}

export default function BackupProgress({ progress, estimatedTimeRemaining }: BackupProgressProps) {
  return (
    <div className="mb-6 border border-blue-200 bg-blue-50 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        <span className="text-blue-900">Створення резервної копії...</span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-blue-700 mt-2">
        {progress}% завершено
        {estimatedTimeRemaining && ` • Залишилось ${estimatedTimeRemaining}`}
      </p>
    </div>
  );
}
