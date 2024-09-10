import React from "react";
import "./Sidebar.css"
import { useNavigate, useLocation } from "react-router-dom";
import { useNavigation } from '../Helper/NavigationContext';
// import { useFormContext } from "../Helper/FormContext";
type Props = {
  resetFormState?: () => void;
};
export const Sidebar: React.FC <Props>= ({resetFormState}) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const {resetFormState}=useFormContext();
  const {hasUnsavedChanges, setPendingNavigation, setIsModalOpen, setHasUnsaved  } = useNavigation();
  const handleNavigation = (path: string) => {
    if (hasUnsavedChanges && location.pathname !== path) {
     
      setPendingNavigation(path);
      setIsModalOpen(true);
    } else {
      navigate(path);
    }
  };

  const navigation = () =>{
    navigate('/one');
    setHasUnsaved(false);
    if(resetFormState)resetFormState();
  }

  return (
    <div className="container">
      <ol>
        <li>
          <button
            className="btn-sidebar"
            onClick={() => 
              {navigation()}}
          >
            Student
          </button>
        </li>
        <li>
          <button
            className="btn-sidebar"
            onClick={() => handleNavigation("/profile")}
          >
            Profiles
          </button>
        </li>
      </ol>
    </div>
  );
};
