/**
 * SavedQueryCardHeader Component
 * ===============================
 * 
 * Заголовок картки збереженого запиту з назвою та описом.
 */

import { SavedQueryCardHeaderProps } from './types';

export function SavedQueryCardHeader({ name, description }: SavedQueryCardHeaderProps) {
  return (
    <div className="flex-1">
      <h4 className="font-semibold text-slate-900">{name}</h4>
      {description && (
        <p className="text-sm text-slate-600 mt-1">{description}</p>
      )}
    </div>
  );
}
