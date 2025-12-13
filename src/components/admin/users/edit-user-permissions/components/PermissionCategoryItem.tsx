import { ChevronDown, ChevronRight } from 'lucide-react';
import { Checkbox } from '../../../../ui/checkbox';
import { Label } from '../../../../ui/label';
import { Badge } from '../../../../ui/badge';
import { getCategoryIconBgClasses, getIconColorClasses } from '../utils/themeUtils';
import { getCategoryProgressText } from '../utils/permissionUtils';
import type { PermissionCategoryItemProps } from '../types';

/**
 * Single permission category with collapsible permissions list
 */
export default function PermissionCategoryItem({
  category,
  isExpanded,
  permissions,
  userType,
  progress,
  onToggle,
  onPermissionChange,
  onCategoryToggle,
}: PermissionCategoryItemProps) {
  const Icon = category.icon;
  const allEnabled = progress.enabled === progress.total;

  return (
    <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
      <div 
        className={`p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors ${
          isExpanded ? 'border-b border-slate-200' : ''
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryIconBgClasses(userType)}`}>
            <Icon className={`w-4 h-4 ${getIconColorClasses(userType)}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h5 className="text-slate-900">{category.label}</h5>
              <Badge variant="secondary" className="text-xs">
                {progress.enabled}/{progress.total}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {getCategoryProgressText(progress)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            checked={allEnabled}
            onCheckedChange={(checked) => {
              onCategoryToggle(checked as boolean);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 bg-slate-50/50 space-y-3">
          {category.permissions.map((permission) => (
            <div key={permission.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <Label htmlFor={permission.id} className="text-sm text-slate-900 cursor-pointer flex-1">
                {permission.label}
              </Label>
              <Checkbox
                id={permission.id}
                checked={permissions[permission.id] || false}
                onCheckedChange={() => onPermissionChange(permission.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
