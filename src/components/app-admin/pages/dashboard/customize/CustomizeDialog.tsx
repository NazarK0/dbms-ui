/**
 * CustomizeDialog Component
 * 
 * Main dialog for customizing dashboard widget visibility.
 * Allows users to show/hide different dashboard widgets organized by categories.
 * 
 * Features:
 * - Categorized widget management (stats, performance, activity)
 * - Real-time visibility toggling
 * - Visual feedback with eye icons
 * - Responsive modal design
 * 
 * @component
 * @example
 * ```tsx
 * <CustomizeDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   visibleCards={dashboardCards}
 *   onToggleVisibility={handleToggle}
 * />
 * ```
 */

import { Dialog, DialogContent } from '../../../../ui/dialog';
import { getCategoryLabel, getCardsByCategory } from '../utils';
import type { CustomizeDialogProps, DashboardCategory } from '../types';
import CustomizeDialogHeader from './CustomizeDialogHeader';
import CustomizeDialogFooter from './CustomizeDialogFooter';
import CategorySection from './CategorySection';

export default function CustomizeDialog({
  open,
  onOpenChange,
  visibleCards,
  onToggleVisibility,
}: CustomizeDialogProps) {
  const categories: DashboardCategory[] = ['stats', 'performance', 'activity'];

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <CustomizeDialogHeader />

        <div className="py-4 space-y-4">
          {categories.map((category) => {
            const categoryCards = getCardsByCategory(visibleCards, category);

            return (
              <CategorySection
                key={category}
                category={category}
                categoryLabel={getCategoryLabel(category)}
                cards={categoryCards}
                onToggleVisibility={onToggleVisibility}
              />
            );
          })}
        </div>

        <CustomizeDialogFooter onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
