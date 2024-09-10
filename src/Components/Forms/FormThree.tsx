import React from "react";
import "./Form.css";
import { useForm, Controller } from "react-hook-form";
import { useFormContext } from "../Helper/FormContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useNavigation } from '../Helper/NavigationContext';

interface FormData {
  SpocName: string;
  relation: string;
  // id: number;
}

interface User {
  name: string;
  gender: string;
  age: number;
  collegename: string;
  location: string;
  branch: string;
  spocname: string;
  relation: string;
}

const FormThree: React.FC = () => {
  const navigate = useNavigate();
  const { setHasUnsaved} = useNavigation(); 
  const { formData, setFormData, resetFormState, setHasUnsavedChanges} = useFormContext();
  console.log(formData)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    // trigger
  } = useForm<FormData>({

    defaultValues:  {
      SpocName: formData.SpocName || "",
      relation: formData.relation || "",
    },
    mode: "onChange",
  });
  
  // useEffect(() => {
  //   if (triggerValidation) {
  //     trigger(); 
  //     setTriggerValidation(false); 
  //   }
  // }, [triggerValidation, trigger, setTriggerValidation]);

  // const onSubmit = async (data: FormData) => {
  //   const updatedFormData = {
  //     ...formData,
  //     SpocName: data.SpocName,
  //     relation: data.relation,
  //   };
    
  //   setFormData(updatedFormData);
  
  //   const user: User = {
  //     name: updatedFormData.name,
  //     gender: updatedFormData.gender,
  //     age: updatedFormData.age ?? 0,
  //     collegename: updatedFormData.collegeName,
  //     location: updatedFormData.location,
  //     branch: updatedFormData.branch,
  //     spocname: updatedFormData.SpocName,
  //     relation: updatedFormData.relation,
  //   };
  //   console.log("user",user)

  //   let apiUrl = 'https://66d58feff5859a7042669345.mockapi.io/api/user';
  
  //   if (formData.id) {
  //   apiUrl += `/${formData.id}`;
  //   }
  //   try {
  //     const response = await axios[formData.id ? 'put' : 'post'](apiUrl, user);
  //     console.log("eeee",response.data);

  //     setHasUnsaved(false); 
  //     setHasUnsavedChanges(false)
  //     resetFormState();
  //      navigate('/one');
      
    
  //   } catch (error) {
  //     console.error('Error', error);
  //     alert('Failed');
  //   }
  // };
  console.log(formData)
  const onSubmit = async (data: FormData) => {
    const updatedFormData = {
      ...formData,
      SpocName: data.SpocName,
      relation: data.relation,
    };
  
    setFormData(updatedFormData);
  
    const user: User = {
      name: updatedFormData.name,
      gender: updatedFormData.gender,
      age: updatedFormData.age ?? 0,
      collegename: updatedFormData.collegeName,
      location: updatedFormData.location,
      branch: updatedFormData.branch,
      spocname: updatedFormData.SpocName,
      relation: updatedFormData.relation,
    };
    console.log("user", user);
  
    let apiUrl = "https://66d58feff5859a7042669345.mockapi.io/api/user";
   
    if (formData.id) {
      console.log(formData.id)
      apiUrl += `/${formData.id}`;
    }
  
    try {
      const response = await axios[formData.id ? "put" : "post"](apiUrl, user);
      console.log("Response Data:", response.data);
  
      setHasUnsaved(false);
      setHasUnsavedChanges(false);
  
      resetFormState(); 
      navigate("/one");
    } catch (error) {
      console.error("Error", error);
      alert("Failed");
    }
  };
  
  return (
    <>
      <div className="form-container">
        <h2>SPOC Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-element">
            <label htmlFor="SpocName" className="form-label">SPOC Full Name</label>
            <input
              {...register("SpocName", { required: true })}
              id="SpocName"
              className="form-input"
              placeholder="Enter SPOC name"
              defaultValue={formData?.SpocName}
            />
            {errors.SpocName && (
              <span className="error-message">SPOC is required</span>
            )}
          </div>

          <Controller
            name="relation"
            control={control}
            defaultValue=""
            rules={{ required: "Select Relation" }}
            render={({ field }) => (
              <>
                <label htmlFor="select" className="form-label">
                  Select Relation:
                </label>
                <select {...field} className="form-select">
                  <option value="">Please Select Relation</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Friend">Friend</option>
                </select>
              </>
            )}
          />
          {errors.relation && (
            <span className="error-message">{errors.relation.message}</span>
          )}

          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FormThree;
