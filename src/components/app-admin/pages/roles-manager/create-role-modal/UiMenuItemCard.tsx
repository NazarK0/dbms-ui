import { Checkbox } from '../../../../ui/checkbox';
import { Label } from '../../../../ui/label';
import type { UiMenuItemCardProps } from './types';

export default function UiMenuItemCard({
  item,
  checked,
  onCheckedChange,
}: UiMenuItemCardProps) {
  const Icon = item.icon;

  return (
    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-lime-300 transition-colors">
      <Checkbox
        id={`ui-${item.id}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="mt-1"
      />
      <div className="flex-1">
        <Label
          htmlFor={`ui-${item.id}`}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Icon className="w-4 h-4 text-slate-600" />
          <span className="text-slate-900">{item.label}</span>
        </Label>
        <p className="text-xs text-slate-500 mt-1">{item.description}</p>
      </div>
    </div>
  );
}
