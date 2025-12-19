import { X } from 'lucide-react';
import { Button } from '../../ui/button';

interface TabCloseButtonProps {
  isActive: boolean;
  onClose: (e: React.MouseEvent) => void;
}

export default function TabCloseButton({ isActive, onClose }: TabCloseButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`
        flex-shrink-0 w-5 h-5 rounded-sm
        ${
          isActive
            ? 'opacity-60 hover:opacity-100 hover:bg-violet-100'
            : 'opacity-0 group-hover:opacity-60 hover:opacity-100 hover:bg-slate-300'
        }
      `}
      onClick={onClose}
    >
      <X className="w-3.5 h-3.5" />
    </Button>
  );
}
