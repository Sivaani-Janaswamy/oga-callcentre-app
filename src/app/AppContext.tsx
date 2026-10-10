import { type ReactNode } from 'react';
import { AppContext, type AppContextValue } from './context';

export function AppProvider({ children }: { children: ReactNode }): JSX.Element {
  const value: AppContextValue = {
    appName: 'On-Ground.ai',
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
