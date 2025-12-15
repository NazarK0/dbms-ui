/**
 * SavedQueriesHeader Component
 * =============================
 * 
 * Заголовок панелі збережених запитів з іконкою, назвою, badge та описом.
 */

import { BookmarkCheck } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '../../../../ui/card';
import { Badge } from '../../../../ui/badge';
import { SavedQueriesHeaderProps } from './types';

export function SavedQueriesHeader({ totalCount }: SavedQueriesHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookmarkCheck className="w-5 h-5 text-slate-700" />
          <CardTitle>Збережені запити</CardTitle>
          <Badge variant="secondary">{totalCount}</Badge>
        </div>
      </div>
      <CardDescription>
        Ваші збережені SQL запити для швидкого доступу
      </CardDescription>
    </CardHeader>
  );
}
