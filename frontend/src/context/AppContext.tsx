import { createContext, useContext, type ReactNode } from "react";

interface AppContextType {}

export const AppContext = createContext<AppContextType | null>(null);

interface AppProviderType {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderType) => {

    
 

  const value = {};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
