import { Upload } from 'lucide-react';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import FileUpload from '../form/FileUpload';
import ExistingFilesList from '../form/ExistingFilesList';
import type { EditRecordFileManagerProps } from './types';

export default function EditRecordFileManager({
  existingFiles,
  attachedFiles,
  onFileChange,
  onRemoveNewFile,
  onRemoveExistingFile,
  onDownloadFile,
}: EditRecordFileManagerProps) {
  return (
    <div className="space-y-3 pt-4 border-t border-slate-200">
      <div className="flex items-center gap-2">
        <Upload className="w-4 h-4 text-violet-600" />
        <Label className="text-slate-900">Прикріплені файли</Label>
        <Badge variant="outline" className="text-xs bg-violet-50 text-violet-600">
          Необов'язково
        </Badge>
      </div>

      {/* Existing Files */}
      <ExistingFilesList
        files={existingFiles}
        onRemoveFile={onRemoveExistingFile}
        onDownloadFile={onDownloadFile}
      />

      {/* Upload New Files */}
      <FileUpload
        files={attachedFiles}
        onFileChange={onFileChange}
        onRemoveFile={onRemoveNewFile}
        showNewFileLabel={true}
      />
    </div>
  );
}
