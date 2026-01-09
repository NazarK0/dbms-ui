/**
 * QueryEditorHeader Component
 * ============================
 * 
 * Заголовок редактора SQL запитів з іконкою Terminal.
 */

import { Terminal } from 'lucide-react';
import { CardTitle } from '../../../../../../ui/card';
import { QueryEditorHeaderProps } from './types';

export function QueryEditorHeader({ }: QueryEditorHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <Terminal className="w-5 h-5 text-slate-700" />
      <CardTitle>Редактор SQL запитів</CardTitle>
    </div>
  );
}
