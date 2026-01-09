import { Bell } from 'lucide-react';
import ActionButton from './ActionButton';
import { actionConfigs, welcomeTitle, welcomeText, prioritySupportText } from './data';
import { getActionGridCols } from './utils';
import type { UIContentProps } from './types';

export default function UIContent({
  deviceType,
  roleName,
  permissions,
}: UIContentProps) {
  const gridCols = getActionGridCols(deviceType);

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="space-y-4">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-4">
          <h3 className="text-slate-900 mb-1">{welcomeTitle}</h3>
          <p className="text-sm text-slate-600">
            {welcomeText} <strong>{roleName}</strong>
          </p>
        </div>

        {/* Actions Grid */}
        <div className={`grid grid-cols-${gridCols} gap-3`}>
          {actionConfigs.map((action) => (
            <ActionButton
              key={action.key}
              icon={action.icon}
              label={action.label}
              enabled={permissions[action.key]}
            />
          ))}
        </div>

        {/* Support Badge */}
        {permissions.prioritySupport && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-amber-900">
              {prioritySupportText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
