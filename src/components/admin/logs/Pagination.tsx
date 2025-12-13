import PaginationInfo from './PaginationInfo';
import PaginationControls from './PaginationControls';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/30">
      <PaginationInfo
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        onItemsPerPageChange={onItemsPerPageChange}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
