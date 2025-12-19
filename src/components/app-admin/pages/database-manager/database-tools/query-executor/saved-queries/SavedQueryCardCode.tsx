/**
 * SavedQueryCardCode Component
 * =============================
 * 
 * Блок відображення SQL коду в картці збереженого запиту.
 */

import { SavedQueryCardCodeProps } from './types';

export function SavedQueryCardCode({ query }: SavedQueryCardCodeProps) {
  return (
    <code className="text-xs text-slate-700 block bg-white px-3 py-2 rounded border border-slate-200 mt-3 break-all">
      {query}
    </code>
  );
}
