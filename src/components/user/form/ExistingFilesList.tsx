import { Download, X } from 'lucide-react';
import { Button } from '../../ui/button';

interface ExistingFilesListProps {
  files: string[];
  onRemoveFile: (index: number) => void;
  onDownloadFile: (filename: string) => void;
}

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
    return '🖼️';
  }
  if (['pdf'].includes(ext || '')) {
    return '📄';
  }
  if (['doc', 'docx'].includes(ext || '')) {
    return '📝';
  }
  if (['xls', 'xlsx'].includes(ext || '')) {
    return '📊';
  }
  if (['zip', 'rar', '7z'].includes(ext || '')) {
    return '🗜️';
  }
  return '📎';
};

export default function ExistingFilesList({ files, onRemoveFile, onDownloadFile }: ExistingFilesListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500">Існуючі файли:</p>
      {files.map((filename, index) => (
        <div
          key={`existing-${index}`}
          className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0">{getFileIcon(filename)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-900 truncate">{filename}</p>
              <p className="text-xs text-green-600">Збережено</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onDownloadFile(filename)}
              className="flex-shrink-0 hover:bg-blue-100 hover:text-blue-600"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemoveFile(index)}
              className="flex-shrink-0 hover:bg-red-100 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
