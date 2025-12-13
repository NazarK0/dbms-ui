import { Eye } from 'lucide-react';
import DisplaySettingCard from './DisplaySettingCard';
import {
  sectionTitles,
  sectionDescriptions,
  hints,
  displaySettingItems,
  gridLayouts,
} from './data';
import { getDisplaySettingContainerClasses, getHintBoxClasses, getIconColor } from './utils';
import type { UiDisplaySettingsProps } from './types';

export default function UiDisplaySettings({
  roleType,
  uiDisplaySettings,
  onSettingChange,
}: UiDisplaySettingsProps) {
  const filteredSettings = displaySettingItems.filter(
    (item) => roleType === 'admin' || !item.adminOnly
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Eye className={`w-5 h-5 ${getIconColor(roleType)}`} />
        <div>
          <h4 className="text-slate-900">{sectionTitles.uiDisplay}</h4>
          <p className="text-sm text-slate-600">
            {sectionDescriptions.uiDisplay}
          </p>
        </div>
      </div>

      <div
        className={`grid ${gridLayouts.displaySettings} gap-3 p-4 rounded-lg border ${getDisplaySettingContainerClasses(
          roleType
        )}`}
      >
        {filteredSettings.map((setting) => (
          <DisplaySettingCard
            key={setting.id}
            setting={setting}
            checked={uiDisplaySettings[setting.id]}
            onCheckedChange={() => onSettingChange(setting.id)}
            roleType={roleType}
          />
        ))}
      </div>

      <div className={`rounded-lg p-3 border ${getHintBoxClasses(roleType)}`}>
        <p className="text-sm">
          <strong>Рекомендація:</strong> {hints.uiDisplay}
        </p>
      </div>
    </div>
  );
}
