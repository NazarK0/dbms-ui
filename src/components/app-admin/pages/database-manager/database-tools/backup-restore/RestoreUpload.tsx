import { Upload } from 'lucide-react';
import { Badge } from '../../../../../ui/badge';

interface RestoreUploadProps {
  onFileSelect?: (file: File) => void;
}

export default function RestoreUpload({ onFileSelect }: RestoreUploadProps) {
  return (
    <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-50">
      <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <h3 className="text-slate-900 mb-2">Завантажити файл резервної копії</h3>
      <p className="text-slate-600 mb-4">Перетягніть файл сюди або клацніть для вибору</p>
      <Badge variant="secondary">SQL, Custom, TAR, Directory формати</Badge>
    </div>
  );
}
