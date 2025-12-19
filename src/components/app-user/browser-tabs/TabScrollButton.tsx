import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';

interface TabScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export default function TabScrollButton({ direction, onClick }: TabScrollButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`
        absolute ${direction === 'left' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 z-10 
        w-8 h-8 rounded-md bg-slate-100/95 hover:bg-slate-200 text-slate-600 shadow-sm
      `}
      onClick={onClick}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-4 h-4" />
      ) : (
        <ChevronRight className="w-4 h-4" />
      )}
    </Button>
  );
}
