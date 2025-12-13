import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import type { ConfigParam } from './types';
import { generateConfigFile, exportConfigAsFile } from './utils';

interface ConfigPreviewProps {
  params: ConfigParam[];
  onExport?: () => void;
}

export default function ConfigPreview({ params, onExport }: ConfigPreviewProps) {
  const configFileContent = generateConfigFile(params);

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      exportConfigAsFile(params);
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Попередній перегляд postgresql.conf</CardTitle>
            <CardDescription>Згенерований конфігураційний файл</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="w-4 h-4 mr-2" />
            Завантажити файл
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 font-mono text-sm">
            <code>{configFileContent}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
