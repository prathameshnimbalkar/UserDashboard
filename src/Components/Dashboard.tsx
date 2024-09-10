import React, { useEffect} from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import FormStepper from "./Stepper/FormStepper";
import { Sidebar } from './Sidebar/Sidebar';
import { FormProvider, useFormContext } from './Helper/FormContext';
import { useNavigation } from '../Components/Helper/NavigationContext';
import ConfirmModal from './Modal/confirmModal';

type User = {
  name: string;
  gender: string;
  age: number | null;
  collegeName: string;
  location: string;
  branch: string;
  SpocName: string;
  relation: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, setFormData, visited, setVisited, setTriggerValidation, currentStep, setCurrentStep, hasUnsavedChanges, setHasUnsavedChanges, resetFormState } = useFormContext();
  const { data, edit, pendingNavigation, setPendingNavigation, isModalOpen, setIsModalOpen, setHasUnsaved } = useNavigation();
// console.log(data)

  const paths = ['/one', '/two', '/three'];
  const validation: { [key: number]: (keyof User)[] } = {
    0: ['name', 'gender', 'age'],
    1: ['collegeName', 'location', 'branch'],
    2: ['SpocName', 'relation'],
  };

  const checkStepValidity = (step: number) => {
    const requiredFields = validation[step] || [];
    return requiredFields.every(field => formData[field] !== null && formData[field] !== '');
  };

  useEffect(() => {
    const newVisited = [...visited];
    newVisited[currentStep] = true;
    setVisited(newVisited);

    if (edit) {
      const userData: Partial<User> = JSON.parse(JSON.stringify(data));
      setFormData(userData);
    }
  }, [currentStep]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const checkAllPreviousStepsCompleted = (step: number) => {
    return visited.slice(0, step).every(isVisited => isVisited);
  };

  const handleStepChange = (step: number) => {
    setTriggerValidation(true);

    if (checkStepValidity(currentStep) || step < currentStep) {
      const newVisited = [...visited];
      newVisited[step] = true;
      setVisited(newVisited);

      setCurrentStep(step);
      setTriggerValidation(false);
      navigate(paths[step]);
    }
  };

  const handleConfirmNavigation = () => {
    if (pendingNavigation) {
      setIsModalOpen(false);
      setHasUnsaved(false)
      setHasUnsavedChanges(false);
      navigate(pendingNavigation);
    }
  };

  const handleCancelNavigation = () => {
    setIsModalOpen(false);
    setPendingNavigation(null);
  };

  useEffect(() => {
    const unblock = () => {
      if (hasUnsavedChanges && location.pathname === '/profile') {
        setPendingNavigation(location.pathname);
        setIsModalOpen(true);
      }
    };
    if (hasUnsavedChanges && location.pathname === '/profile') {
      unblock();
    }
    return () => {
      setIsModalOpen(false);
    };
  }, [location, hasUnsavedChanges]);

  const getButtonColor = (index: number) => {
    if (index === currentStep) {
      return 'gray';
    } else if (visited[index]) {
      if (visited && !checkStepValidity(index)) {
        return 'rgb(167, 18, 18)';
      } else if (checkStepValidity(index)) {
        return 'blue';
      }
      return 'rgb(66, 65, 65)';
    }
    return 'rgba(75, 40, 109, 1)';
  };

  const isButtonDisabled = (index: number) => {
    return index > currentStep && !checkAllPreviousStepsCompleted(index);
  };
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar 
  resetFormState={resetFormState}
/>
      <div style={{ flexGrow: 1 }}>
        {location.pathname !== '/' &&(
        <FormStepper
          steps={['S-1', 'S-2', 'S-3']}
          currentStep={currentStep}
          visited={visited}
          handleStepChange={handleStepChange}
          getButtonColor={getButtonColor}
          isButtonDisabled={isButtonDisabled}
        />)}
        {location.pathname === '/' &&
          <div className='mainContainer'>
            <h1 className='welcomeText'>Welcome to User Dashboard</h1>
            <button className='btn' onClick={() => navigate('/one')}>Get started</button>
          </div>
        }
        <Outlet />
        <ConfirmModal
          isOpen={isModalOpen}
          onConfirm={handleConfirmNavigation}
          onCancel={handleCancelNavigation}
          message="You have unsaved changes, Do yu want to Proceed?" 
        />
      </div>
    </div>
  );
};

export const DashboardView = () => {
  return (
    <FormProvider>
      <Dashboard />
      
    </FormProvider>
  );
};
