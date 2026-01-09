import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../ui/select';
import { Label } from '../../../../ui/label';
import { templateDatabaseOptions } from '../../../../../mockData/admin';
import { FileCode, Info } from 'lucide-react';

interface TemplateSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TemplateSelect({
  value,
  onChange
}: TemplateSelectProps) {
  const selectedTemplate = templateDatabaseOptions.find(t => t.name === value);

  return (
    <div className="space-y-2">
      <Label htmlFor="db-template">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4" />
          <span>Шаблон</span>
        </div>
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="db-template">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {templateDatabaseOptions.map((template) => (
            <SelectItem key={template.name} value={template.name}>
              <div className="flex items-center gap-2">
                <span>{template.name}</span>
                {template.isDefault && (
                  <span className="text-xs text-slate-500">(за замовчуванням)</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedTemplate && (
        <div className="flex items-start gap-1.5 text-xs text-slate-500">
          <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <span>{selectedTemplate.description}</span>
        </div>
      )}
    </div>
  );
}
