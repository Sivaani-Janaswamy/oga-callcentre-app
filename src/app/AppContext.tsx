/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode } from 'react';

export interface AppContextValue {
  appName: string;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }): JSX.Element {
  const value: AppContextValue = {
    appName: 'On-Ground.ai',
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
