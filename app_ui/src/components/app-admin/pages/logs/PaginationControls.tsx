import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { getVisiblePages, shouldShowEllipsis } from './utils';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0"
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          const showEllipsis = shouldShowEllipsis(index, visiblePages);

          return (
            <div key={page} className="flex items-center gap-1">
              {showEllipsis && <span className="px-2 text-slate-400">...</span>}
              <Button
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page)}
                className={`h-8 w-8 p-0 ${currentPage === page
                    ? 'bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700'
                    : ''
                  }`}
              >
                {page}
              </Button>
            </div>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0"
      >
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
