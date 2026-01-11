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
 */

import { Dialog, DialogContent } from '../../../../ui/dialog';
import type { CustomizeDialogProps } from './types';
import CustomizeDialogHeader from './CustomizeDialogHeader';
import CustomizeDialogFooter from './CustomizeDialogFooter';
import CategorySection from './CategorySection';
import { useWidgetListData } from './hooks/useWidgetList';

export default function CustomizeDialog({
  open,
  onOpenChange,
}: CustomizeDialogProps) {
  const { data, isLoading, error } = useWidgetListData();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const byCategory = Object.groupBy(data!, ({ category }) => category);
  console.log(byCategory);

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <CustomizeDialogHeader />

        <div className="py-4 space-y-4">
          {Object.entries(byCategory).map(([key, widgetData]) => {
            if (!widgetData) return null;

            const widgetCards = widgetData.map((widget) => {
              // TODO: Map WidgetData to WidgetCardData
              return {
                ...widget,
                visible: true,
              };
            });

            return (
              <CategorySection
                key={key}
                categoryLabel={widgetCards[0].categoryTitle}
                cards={widgetCards}
              />
            );
          })}
        </div>

        <CustomizeDialogFooter onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
