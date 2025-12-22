import { Switch } from '../../../../ui/switch';
import { Label } from '../../../../ui/label';
import { getDisplaySettingCardClasses } from './utils/styleHelpers';
import type { DisplaySettingCardProps } from './types';

export default function DisplaySettingCard({
  setting,
  checked,
  onCheckedChange,
  roleType,
}: DisplaySettingCardProps) {
  const Icon = setting.icon;

  return (
    <div
      className={`flex items-start justify-between p-3 bg-white rounded-lg border transition-colors ${getDisplaySettingCardClasses(
        roleType
      )}`}
    >
      <div className="flex items-start gap-3 flex-1">
        <Icon className="w-4 h-4 text-slate-600 mt-1" />
        <div>
          <Label
            htmlFor={`display-${setting.id}`}
            className="text-sm text-slate-900 cursor-pointer"
          >
            {setting.label}
          </Label>
          <p className="text-xs text-slate-500 mt-0.5">{setting.description}</p>
        </div>
      </div>
      <Switch
        id={`display-${setting.id}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}