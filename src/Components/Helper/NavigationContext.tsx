import React, { createContext, useContext, useState } from 'react';

type NavigationContextType = {
  data:   {
    name: string;
    gender: string;
    age: number | null;
    collegeName: string;
    location: string;
    branch: string;
    SpocName: string;
    relation: string;
    id?: number | null;
  };
  setData:(data: Partial<NavigationContextType['data']>) => void;
  edit: boolean;
  setEdit: (value: boolean) => void;
  pendingNavigation: string | null;
  setPendingNavigation: React.Dispatch<React.SetStateAction<string | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasUnsavedChanges: boolean;
  setHasUnsaved: (hasUnsavedChanges: boolean) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsaved] = useState(false);

// console.log(hasUnsavedChanges)
const value = {
    data, 
    setData ,
    edit,
    setEdit,
    pendingNavigation,
    setPendingNavigation,
    isModalOpen,
   setIsModalOpen,
      hasUnsavedChanges,
    setHasUnsaved,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  // console.log(context)
  if (context === undefined) {
    throw new Error('use within a NavigationProvider');
  }
  return context;
};
