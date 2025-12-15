/**
 * WidgetCard Component
 * 
 * Displays an individual widget card with checkbox, name, description, and visibility icon.
 * Allows users to toggle widget visibility on the dashboard.
 * 
 * @component
 * @example
 * ```tsx
 * <WidgetCard
 *   id="database-count"
 *   name="Кількість баз даних"
 *   description="Показує загальну кількість баз даних"
 *   visible={true}
 *   onToggle={handleToggle}
 * />
 * ```
 */

import { Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '../../../../ui/checkbox';
import { Label } from '../../../../ui/label';

interface WidgetCardProps {
  /** Unique widget identifier */
  id: string;
  /** Widget display name */
  name: string;
  /** Widget description */
  description: string;
  /** Whether widget is visible */
  visible: boolean;
  /** Callback when visibility is toggled */
  onToggle: () => void;
}

export default function WidgetCard({
  id,
  name,
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
          {name}
        </Label>
        <p className="text-xs text-slate-600">{description}</p>
      </div>
      {visible ? (
        <Eye className="w-4 h-4 text-green-600 mt-1" />
      ) : (
        <EyeOff className="w-4 h-4 text-slate-400 mt-1" />
      )}
    </div>
  );
}
