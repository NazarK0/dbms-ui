/**
 * CustomizeDialogHeader Component
 * 
 * Displays the header section of the customize dialog with title and description.
 * 
 * @component
 * @example
 * ```tsx
 * <CustomizeDialogHeader />
 * ```
 */

import { DialogDescription, DialogHeader, DialogTitle } from '../../../../ui/dialog';

export default function CustomizeDialogHeader() {
  return (
    <DialogHeader>
      <DialogTitle>Налаштування панелі керування</DialogTitle>
      <DialogDescription>
        Виберіть, які віджети відображати на панелі керування
      </DialogDescription>
    </DialogHeader>
  );
}
