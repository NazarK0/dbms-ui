/**
 * WidgetCard Component
 * 
 * Displays an individual widget card with checkbox, name, description, and visibility icon.
 * Allows users to toggle widget visibility on the dashboard.
 */


import { Checkbox } from '../../../../ui/checkbox';
import { Label } from '../../../../ui/label';

interface WidgetCardProps {
  /** Unique widget identifier */
  id: number;
  /** Widget display name */
  title: string;
  /** Widget description */
  description: string;
  /** Whether widget is visible */
  visible: boolean;
  /** Callback when visibility is toggled */
  onToggle: () => void;
}

export default function WidgetCard({
  id,
  title,
  description,
  visible,
  onToggle,
}: WidgetCardProps) {
  return (
    <div className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
      <Checkbox
        id={id}
        checked={visible}
        onCheckedChange={onToggle}
        className="mt-1"
      />
      <div className="flex-1">
        <Label htmlFor={id} className="text-sm cursor-pointer block mb-1">
          {title}
        </Label>
        <p className="text-xs text-slate-600">{description}</p>
      </div>
    </div>
  );
}
