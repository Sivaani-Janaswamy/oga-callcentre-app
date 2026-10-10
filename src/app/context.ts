import { createContext } from 'react';

export interface AppContextValue {
  appName: string;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);
