/**
 * Hook for managing permissions state
 */

import { useState, useEffect } from 'react';
import { initializePermissions } from '../utils/permissionUtils';
import type { PermissionCategory, PermissionsState } from '../types';

interface UsePermissionsStateProps {
  open: boolean;
  permissionCategories: PermissionCategory[];
}

export function usePermissionsState({ open, permissionCategories }: UsePermissionsStateProps) {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [timezoneSearchMode, setTimezoneSearchMode] = useState<'common' | 'all'>('common');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<PermissionsState>({});

  // Initialize state when modal opens
  useEffect(() => {
    if (open) {
      setSelectedRole('');
      setSelectedTimezone('');
      setTimezoneSearchMode('common');
      setExpandedCategories([]);
      setPermissions(initializePermissions(permissionCategories));
    }
  }, [open, permissionCategories]);

  return {
    selectedRole,
    setSelectedRole,
    selectedTimezone,
    setSelectedTimezone,
    timezoneSearchMode,
    setTimezoneSearchMode,
    expandedCategories,
    setExpandedCategories,
    permissions,
    setPermissions,
  };
}
