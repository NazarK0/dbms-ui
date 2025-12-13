import { Eye } from 'lucide-react';
import UiMenuItemCard from './UiMenuItemCard';
import { sectionTitles, sectionDescriptions, hints, gridLayouts, alertStyles } from './data';
import type { UiVisibilitySettingsProps } from './types';

export default function UiVisibilitySettings({
  uiSettings,
  onSettingChange,
  menuItems,
}: UiVisibilitySettingsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Eye className="w-5 h-5 text-lime-600" />
        <div>
          <h4 className="text-slate-900">{sectionTitles.uiVisibility}</h4>
          <p className="text-sm text-slate-600">
            {sectionDescriptions.uiVisibility}
          </p>
        </div>
      </div>

      <div className={`grid ${gridLayouts.uiMenu} gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200`}>
        {menuItems.map((item) => (
          <UiMenuItemCard
            key={item.id}
            item={item}
            checked={uiSettings[item.id as keyof typeof uiSettings]}
            onCheckedChange={() => onSettingChange(item.id)}
          />
        ))}
      </div>

      <div className={`${alertStyles.info.bg} border ${alertStyles.info.border} rounded-lg p-3`}>
        <p className={`text-sm ${alertStyles.info.text}`}>
          <strong>Примітка:</strong> {hints.uiVisibility}
        </p>
      </div>
    </div>
  );
}
