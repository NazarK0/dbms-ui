import {
  getRoleTypeColorClasses,
  getRadioButtonColorClasses,
  getRadioButtonFillColor,
} from './utils/styleHelpers';
import { roleTypeData } from './data';
import type { RoleTypeOptionProps } from './types';

export default function RoleTypeOption({
  type,
  selected,
  onSelect,
}: RoleTypeOptionProps) {
  const data = roleTypeData[type];
  const Icon = data.icon;

  return (
    <div
      onClick={() => onSelect(type)}
      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${getRoleTypeColorClasses(
        type,
        selected
      )}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${getRadioButtonColorClasses(
              type,
              selected
            )}`}
          >
            {selected && (
              <div
                className={`w-3 h-3 rounded-full ${getRadioButtonFillColor(
                  type
                )}`}
              />
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Icon className={`w-5 h-5 ${data.iconColor}`} />
            <span className="text-slate-900">{data.label}</span>
          </div>
          <p className="text-sm text-slate-600">{data.description}</p>
        </div>
      </div>
    </div>
  );
}