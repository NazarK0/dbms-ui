import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { itemsPerPageOptions } from './data';

interface PaginationInfoProps {
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onItemsPerPageChange: (value: number) => void;
}

export default function PaginationInfo({
  itemsPerPage,
  startIndex,
  endIndex,
  totalItems,
  onItemsPerPageChange,
}: PaginationInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600">Показувати по:</span>
      <Select
        value={itemsPerPage.toString()}
        onValueChange={(value) => onItemsPerPageChange(Number(value))}
      >
        <SelectTrigger className="w-[70px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {itemsPerPageOptions.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-sm text-slate-600">
        Показано {startIndex + 1}-{Math.min(endIndex, totalItems)} з {totalItems}
      </span>
    </div>
  );
}
