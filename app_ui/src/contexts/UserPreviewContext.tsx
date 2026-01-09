/**
 * UserPreviewContext
 * Context for User UI Preview mode in Admin panel
 * Provides preview configuration and user identification
 */

import { createContext, useContext, ReactNode } from 'react';

export interface UserPreviewConfig {
  isPreviewMode: boolean;
  username?: string;
  userId?: string;
  previewRole?: string;
  // CRUD stub is automatically available in preview mode via useUserCrud hook
}

interface UserPreviewContextValue {
  config: UserPreviewConfig;
}

const UserPreviewContext = createContext<UserPreviewContextValue | undefined>(undefined);

interface UserPreviewProviderProps {
  children: ReactNode;
  config?: UserPreviewConfig;
}

export function UserPreviewProvider({ children, config }: UserPreviewProviderProps) {
  const defaultConfig: UserPreviewConfig = {
    isPreviewMode: false,
  };

  const value = {
    config: config || defaultConfig,
  };

  return (
    <UserPreviewContext.Provider value={value}>
      {children}
    </UserPreviewContext.Provider>
  );
}

export function useUserPreview() {
  const context = useContext(UserPreviewContext);
  if (context === undefined) {
    // Return default if not in preview context
    return {
      config: {
        isPreviewMode: false,
      },
    };
  }
  return context;
}