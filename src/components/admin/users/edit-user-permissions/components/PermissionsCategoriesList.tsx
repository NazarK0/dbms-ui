import { Shield } from 'lucide-react';
import PermissionCategoryItem from './PermissionCategoryItem';
import { getIconColorClasses } from '../utils/themeUtils';
import type { PermissionsCategoriesListProps } from '../types';

/**
 * List of permission categories with granular permissions
 */
export default function PermissionsCategoriesList({
  categories,
  permissions,
  expandedCategories,
  userType,
  onPermissionChange,
  onCategoryToggle,
  onToggleCategory,
  getCategoryProgress,
}: PermissionsCategoriesListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Shield className={`w-5 h-5 ${getIconColorClasses(userType)}`} />
        <div>
          <h4 className="text-slate-900">Детальні права доступу</h4>
          <p className="text-sm text-slate-600">
            Точне налаштування дозволів для цього користувача
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {categories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id);
          const progress = getCategoryProgress(category.id);

          return (
            <PermissionCategoryItem
              key={category.id}
              category={category}
              isExpanded={isExpanded}
              permissions={permissions}
              userType={userType}
              progress={progress}
              onToggle={() => onToggleCategory(category.id)}
              onPermissionChange={onPermissionChange}
              onCategoryToggle={(checked) => onCategoryToggle(category.id, checked)}
            />
          );
        })}
      </div>

      <div className={`rounded-lg p-3 border ${
        userType === 'admin' 
          ? 'bg-amber-50 border-amber-200' 
          : 'bg-blue-50 border-blue-200'
      }`}>
        <p className={`text-sm ${
          userType === 'admin' ? 'text-amber-900' : 'text-blue-900'
        }`}>
          <strong>Порада:</strong> Натисніть на категорію, щоб розгорнути детальні права. Використовуйте чекбокс біля назви категорії для швидкого вибору всіх дозволів.
        </p>
      </div>
    </div>
  );
}
