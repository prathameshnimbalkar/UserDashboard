import React, { createContext, useContext, useState } from 'react';

type FormContextType = {
  formData: {
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
  setFormData: (data: Partial<FormContextType['formData']>) => void;
  visited: boolean[]; 
  setVisited: (visited: boolean[]) => void;
  triggerValidation: boolean;
  setTriggerValidation: (value: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  edit: boolean;
  setEdit: (value: boolean) => void;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void;
  resetFormState: () => void; 
  };

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormContextType['formData']>({
    name: '',
    gender: '',
    age: null,
    collegeName: '',
    location: '',
    branch: '',
    SpocName: '',
    relation: '',
    id: null,
  });
  console.log(formData)
  const [visited, setVisited] = useState<boolean[]>([false, false, false]);
  const [triggerValidation, setTriggerValidation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [edit, setEdit] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const handleSetFormData = (data: Partial<FormContextType['formData']>) => {
    setFormData(prevData => {
      const updatedData = { ...prevData, ...data };
      setHasUnsavedChanges(JSON.stringify(updatedData) !== JSON.stringify(formData));
      return updatedData;
    });
    
  };  

  const resetFormState = () => {
    setFormData({
      name: '',
      gender: '',
      age: null,
      collegeName: '',
      location: '',
      branch: '',
      SpocName: '',
      relation: '',
      id: null,
    });
    console.log("helo")
    setCurrentStep(0);
    setVisited([true, false, false]);
  };
//   console.log("1",formData)
// console.log("context-data change:",hasUnsavedChanges)
  const value = {
    formData,
    setFormData: handleSetFormData,
    visited,
    setVisited,
    triggerValidation,
    setTriggerValidation,
    currentStep,
    setCurrentStep,
    edit,
    setEdit,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    resetFormState
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

