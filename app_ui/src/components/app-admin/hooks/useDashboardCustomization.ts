import { useState } from 'react';


export function useDashboardCustomization() {
  const [customizeDialogOpen, setCustomizeDialogOpen] = useState(false);

  return {
    customizeDialogOpen,
    setCustomizeDialogOpen,
  };
}