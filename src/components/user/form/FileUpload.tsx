import { Upload, X } from 'lucide-react';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';

interface FileUploadProps {
  files: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  showNewFileLabel?: boolean;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

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

export default function FileUpload({ files, onFileChange, onRemoveFile, showNewFileLabel = false }: FileUploadProps) {
  return (
    <div className="space-y-3">
      {!showNewFileLabel && (
        <div className="flex items-center gap-2">
          <Upload className="w-4 h-4 text-violet-600" />
          <Label className="text-slate-900">Прикріплені файли</Label>
          <Badge variant="outline" className="text-xs bg-violet-50 text-violet-600">
            Необов'язково
          </Badge>
        </div>
      )}

      <input
        type="file"
        multiple
        onChange={onFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <div className="cursor-pointer border-2 border-dashed border-violet-300 rounded-lg p-6 hover:border-violet-500 hover:bg-violet-50/50 transition-colors text-center">
          <Upload className="w-8 h-8 text-violet-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600 mb-1">
            Натисніть для вибору файлів або перетягніть сюди
          </p>
          <p className="text-xs text-slate-500">
            Підтримуються всі типи файлів
          </p>
        </div>
      </label>

      {/* Attached Files List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {showNewFileLabel && (
            <p className="text-xs text-slate-500">
              Нових файлів для завантаження: {files.length}
            </p>
          )}
          {!showNewFileLabel && (
            <p className="text-sm text-slate-600">
              Вибрано файлів: {files.length}
            </p>
          )}
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-2xl flex-shrink-0">{getFileIcon(file.name)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900 truncate">{file.name}</p>
                  <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
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
          ))}
        </div>
      )}
    </div>
  );
}